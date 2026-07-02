CREATE DATABASE IF NOT EXISTS fraud_detection_db;
USE fraud_detection_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('officer', 'admin') DEFAULT 'officer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blacklist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('nin', 'imei') NOT NULL,
    entity_value VARCHAR(50) NOT NULL UNIQUE,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscriber_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    nin VARCHAR(20) NOT NULL,
    bvn VARCHAR(20),
    residential_address TEXT,
    state VARCHAR(50),
    lga VARCHAR(50),
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100),
    id_type VARCHAR(50),
    id_number VARCHAR(50),
    passport_photo_url VARCHAR(255),
    signature_url VARCHAR(255),
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    officer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (officer_id) REFERENCES users(id)
);

CREATE TABLE biometric_information (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT,
    fingerprint_id VARCHAR(100) NOT NULL,
    face_scan_id VARCHAR(100) NOT NULL,
    FOREIGN KEY (registration_id) REFERENCES subscriber_registrations(id) ON DELETE CASCADE
);

CREATE TABLE device_information (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT,
    imei_number VARCHAR(50) NOT NULL,
    device_brand VARCHAR(50),
    device_model VARCHAR(50),
    FOREIGN KEY (registration_id) REFERENCES subscriber_registrations(id) ON DELETE CASCADE
);

CREATE TABLE registration_metadata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT,
    agent_name VARCHAR(100),
    centre_name VARCHAR(100),
    gps_location VARCHAR(100),
    FOREIGN KEY (registration_id) REFERENCES subscriber_registrations(id) ON DELETE CASCADE
);

CREATE TABLE fraud_predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT,
    status ENUM('Genuine', 'Suspicious', 'Fraudulent'),
    confidence DECIMAL(5,2),
    risk_level ENUM('Low', 'Medium', 'High'),
    reasons TEXT,
    score INT,
    FOREIGN KEY (registration_id) REFERENCES subscriber_registrations(id) ON DELETE CASCADE
);

-- Insert admin
INSERT INTO users (username, password_hash, full_name, role) VALUES ('admin', '.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'admin');

