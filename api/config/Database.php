<?php
class Database {
    private \System.Management.Automation.Internal.Host.InternalHost = 'localhost';
    private \ = 'fraud_detection_db';
    private \ = 'root';
    private \ = '';
    private \;

    public function connect() {
        \->conn = null;
        try {
            \->conn = new PDO('mysql:host=' . \->host . ';dbname=' . \->db_name, \->username, \->password);
            \->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException \) {
            echo 'Connection Error: ' . \->getMessage();
        }
        return \->conn;
    }
}
?>
