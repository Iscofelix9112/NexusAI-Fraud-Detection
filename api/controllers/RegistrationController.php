<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../engine/FraudEngine.php';
require_once __DIR__ . '/../config/headers.php';

class RegistrationController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->connect();
    }

    public function register() {
        // Read JSON input
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            echo json_encode(["status" => "error", "message" => "Invalid input data."]);
            return;
        }

        // 1. Run Fraud Engine
        $engine = new FraudEngine($this->db);
        $prediction = $engine->evaluateRegistration($data);

        // 2. Insert into subscriber_registrations
        try {
            $this->db->beginTransaction();

            $query = "INSERT INTO subscriber_registrations (full_name, dob, gender, nin, bvn, residential_address, state, lga, phone_number, email, id_type, id_number, status, officer_id)
                      VALUES (:full_name, :dob, :gender, :nin, :bvn, :residential_address, :state, :lga, :phone_number, :email, :id_type, :id_number, :status, :officer_id)";
            
            $stmt = $this->db->prepare($query);
            
            // Dummy officer ID if not provided
            $officer_id = isset($data['officer_id']) ? $data['officer_id'] : 1;
            
            // Default status based on prediction (if fraudulent, auto reject or set as pending review)
            $regStatus = 'Pending';
            
            $stmt->bindParam(':full_name', $data['full_name']);
            $stmt->bindParam(':dob', $data['dob']);
            $stmt->bindParam(':gender', $data['gender']);
            $stmt->bindParam(':nin', $data['nin']);
            $stmt->bindParam(':bvn', $data['bvn']);
            $stmt->bindParam(':residential_address', $data['residential_address']);
            $stmt->bindParam(':state', $data['state']);
            $stmt->bindParam(':lga', $data['lga']);
            $stmt->bindParam(':phone_number', $data['phone_number']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':id_type', $data['id_type']);
            $stmt->bindParam(':id_number', $data['id_number']);
            $stmt->bindParam(':status', $regStatus);
            $stmt->bindParam(':officer_id', $officer_id);
            
            $stmt->execute();
            $registration_id = $this->db->lastInsertId();

            // 3. Insert Biometrics
            if (isset($data['fingerprint_id']) && isset($data['face_scan_id'])) {
                $bioQuery = "INSERT INTO biometric_information (registration_id, fingerprint_id, face_scan_id) VALUES (:reg_id, :fingerprint, :face)";
                $bioStmt = $this->db->prepare($bioQuery);
                $bioStmt->bindParam(':reg_id', $registration_id);
                $bioStmt->bindParam(':fingerprint', $data['fingerprint_id']);
                $bioStmt->bindParam(':face', $data['face_scan_id']);
                $bioStmt->execute();
            }

            // 4. Insert Device Info
            if (isset($data['imei_number'])) {
                $devQuery = "INSERT INTO device_information (registration_id, imei_number, device_brand, device_model) VALUES (:reg_id, :imei, :brand, :model)";
                $devStmt = $this->db->prepare($devQuery);
                $devStmt->bindParam(':reg_id', $registration_id);
                $devStmt->bindParam(':imei', $data['imei_number']);
                $devStmt->bindParam(':brand', $data['device_brand']);
                $devStmt->bindParam(':model', $data['device_model']);
                $devStmt->execute();
            }

            // 5. Insert Fraud Prediction
            $fraudQuery = "INSERT INTO fraud_predictions (registration_id, status, confidence, risk_level, reasons, score) VALUES (:reg_id, :status, :conf, :risk, :reasons, :score)";
            $fraudStmt = $this->db->prepare($fraudQuery);
            $fraudStmt->bindParam(':reg_id', $registration_id);
            $fraudStmt->bindParam(':status', $prediction['status']);
            $fraudStmt->bindParam(':conf', $prediction['confidence']);
            $fraudStmt->bindParam(':risk', $prediction['risk_level']);
            $fraudStmt->bindParam(':reasons', $prediction['reasons']);
            $fraudStmt->bindParam(':score', $prediction['score']);
            $fraudStmt->execute();

            $this->db->commit();

            echo json_encode([
                "status" => "success",
                "message" => "Registration successful.",
                "registration_id" => $registration_id,
                "prediction" => $prediction
            ]);

        } catch (Exception $e) {
            $this->db->rollBack();
            echo json_encode(["status" => "error", "message" => "Registration failed: " . $e->getMessage()]);
        }
    }
}

// Handle request if called directly
if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    $controller = new RegistrationController();
    $controller->register();
}
?>
