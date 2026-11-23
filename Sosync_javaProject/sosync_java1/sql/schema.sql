-- -------------------------------------------------
-- SOSync Java – MySQL schema
-- -------------------------------------------------
CREATE DATABASE IF NOT EXISTS sosync_java;
USE sosync_java;

-- Emergencies
CREATE TABLE IF NOT EXISTS emergencies (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    type        VARCHAR(50) NOT NULL,
    description TEXT,
    priority    INT NOT NULL,
    status      VARCHAR(20) NOT NULL,
    location    VARCHAR(100),
    reported_at DATETIME NOT NULL
);

-- Response units (e.g., ambulance, fire‑truck)
CREATE TABLE IF NOT EXISTS response_units (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(50) NOT NULL,
    type      VARCHAR(50) NOT NULL,
    available BOOLEAN NOT NULL
);

-- Hospitals
CREATE TABLE IF NOT EXISTS hospitals (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    location   VARCHAR(100),
    capacity   INT NOT NULL,
    facilities TEXT
);

-- Emergency‑Response assignment (many‑to‑many)
CREATE TABLE IF NOT EXISTS emergency_assignments (
    emergency_id   INT,
    unit_id        INT,
    assigned_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (emergency_id, unit_id),
    FOREIGN KEY (emergency_id) REFERENCES emergencies(id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id)      REFERENCES response_units(id) ON DELETE CASCADE
);

-- Status history (audit trail)
CREATE TABLE IF NOT EXISTS status_history (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    emergency_id  INT,
    old_status    VARCHAR(20),
    new_status    VARCHAR(20),
    changed_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (emergency_id) REFERENCES emergencies(id) ON DELETE CASCADE
);