<?php

class FraudEngine {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function evaluateRegistration($data) {
        $riskScore = 0;
        $reasons = [];

        // 1. Check for Duplicate NIN
        $query = "SELECT COUNT(*) as count FROM subscriber_registrations WHERE nin = :nin";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':nin', $data['nin']);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row['count'] > 0) {
            $riskScore += 30;
            $reasons[] = "Duplicate NIN detected";
        }

        // 2. Check for Duplicate Fingerprint (Simulated)
        if (isset($data['fingerprint_id'])) {
            $query = "SELECT COUNT(*) as count FROM biometric_information WHERE fingerprint_id = :fingerprint_id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':fingerprint_id', $data['fingerprint_id']);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row['count'] > 0) {
                $riskScore += 40;
                $reasons[] = "Fingerprint already exists";
            }
        }

        // 3. Check for Duplicate IMEI
        if (isset($data['imei_number'])) {
            $query = "SELECT COUNT(*) as count FROM device_information WHERE imei_number = :imei_number";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':imei_number', $data['imei_number']);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row['count'] > 0) {
                $riskScore += 15;
                $reasons[] = "Multiple registrations with this IMEI";
            }
            
            // 4. Check if IMEI is blacklisted
            $query = "SELECT COUNT(*) as count FROM blacklist WHERE entity_type = 'imei' AND entity_value = :imei";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':imei', $data['imei_number']);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row['count'] > 0) {
                $riskScore += 50;
                $reasons[] = "Blacklisted IMEI";
            }
        }
        
        // 5. Check if NIN is blacklisted
        $query = "SELECT COUNT(*) as count FROM blacklist WHERE entity_type = 'nin' AND entity_value = :nin";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':nin', $data['nin']);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row['count'] > 0) {
            $riskScore += 50;
            $reasons[] = "Blacklisted NIN";
        }

        // 6. Check for multiple SIM registrations within 1 day
        $query = "SELECT COUNT(*) as count FROM subscriber_registrations WHERE full_name = :full_name AND dob = :dob AND created_at > (NOW() - INTERVAL 1 DAY)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':full_name', $data['full_name']);
        $stmt->bindParam(':dob', $data['dob']);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row['count'] > 0) {
            $riskScore += 20;
            $reasons[] = "Multiple registrations within one day for this identity";
        }

        // Determine Status
        $status = 'Genuine';
        $riskLevel = 'Low';
        if ($riskScore >= 60) {
            $status = 'Fraudulent';
            $riskLevel = 'High';
        } else if ($riskScore >= 30) {
            $status = 'Suspicious';
            $riskLevel = 'Medium';
        }

        // Calculate a dummy confidence score for ANN simulation (e.g. baseline + risk logic)
        $confidence = min(99, max(75, 100 - abs($riskScore - 60) + mt_rand(0, 5)));

        return [
            'status' => $status,
            'confidence' => $confidence,
            'risk_level' => $riskLevel,
            'reasons' => implode(', ', $reasons),
            'score' => min(100, $riskScore)
        ];
    }
}
?>
