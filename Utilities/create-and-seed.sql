CREATE DATABASE IF NOT EXISTS broker;
USE broker;

CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    concept VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATE,
    status ENUM('RECEIVED', 'PENDING') NOT NULL DEFAULT 'PENDING'
);


INSERT INTO users (id, name, email, password) VALUES 
(UUID(), 'Pedro', 'pedro@dummy.com', 'guest'),
(UUID(), 'Pablo', 'pablo@dummy.com', 'guest');