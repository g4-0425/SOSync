-- Sample data for SOSync MySQL database

-- Users
INSERT INTO users (name, phone, email, password, role) VALUES
('Admin User', '1234567890', 'admin@example.com', 'adminpass', 'ADMIN'),
('Officer Raj', '9876543210', 'raj@example.com', 'officerpass', 'OFFICER');

-- Hospitals
INSERT INTO hospitals (name, type, address, phone, icuBeds, totalBeds, occupancy, status, latitude, longitude) VALUES
('PGIMER Chandigarh', 'Trauma', 'Sector 32, Chandigarh', '0172-259-0144', 50, 300, 70, 'OPEN', 30.7355, 76.7615),
('Government Medical College', 'General', 'Sector 16, Chandigarh', '0172-261-4068', 30, 200, 60, 'OPEN', 30.7330, 76.7740);

-- Ambulances
INSERT INTO ambulances (driverName, phone, vehicleNumber, status, latitude, longitude) VALUES
('Rajesh Kumar', '9876501234', 'AMB-101', 'AVAILABLE', 30.7431, 76.7790),
('Sonia Verma', '9876505678', 'AMB-102', 'AVAILABLE', 30.7390, 76.7590);

-- Agency Officers (Police & Fire)
INSERT INTO agency_officers (name, unitId, phone, agency, status) VALUES
('Inspector Singh', 'POL-17', '9123456789', 'POLICE', 'AVAILABLE'),
('Fire Chief Kaur', 'FS-23', '9123456790', 'FIRE', 'AVAILABLE');

-- Emergencies (initial mock entries)
INSERT INTO emergencies (reporterName, reporterPhone, emergencyType, priority, description, location, sector, status, reportedAt) VALUES
('John Doe', '+91 98765 43210', 'Road Accident', 'Critical', 'Multiple vehicles collided.', 'Sector 22 Main Rd', 'Sector 22', 'OPEN', NOW()),
('Jane Smith', '+91 91234 56789', 'Fire', 'High', 'Warehouse fire reported.', 'Sector 17 Industrial Area', 'Sector 17', 'OPEN', NOW());

-- Responses (empty for now)
-- No initial data
