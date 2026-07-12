-- AssetFlow Database Schema
-- Enterprise Asset Management System

-- Create Database
CREATE DATABASE IF NOT EXISTS assetflow_db;
USE assetflow_db;

-- ============================================
-- 1. DEPARTMENTS TABLE
-- ============================================
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_department_name (name),
    INDEX idx_department_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. USERS TABLE
-- ============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'employee') NOT NULL DEFAULT 'employee',
    department_id INT,
    phone VARCHAR(20),
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    INDEX idx_user_employee_id (employee_id),
    INDEX idx_user_email (email),
    INDEX idx_user_role (role),
    INDEX idx_user_department (department_id),
    INDEX idx_user_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. ASSET CATEGORIES TABLE
-- ============================================
CREATE TABLE asset_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    INDEX idx_category_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. ASSETS TABLE
-- ============================================
CREATE TABLE assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_tag VARCHAR(50) NOT NULL UNIQUE,
    asset_name VARCHAR(100) NOT NULL,
    serial_number VARCHAR(100),
    category_id INT NOT NULL,
    department_id INT,
    purchase_date DATE,
    purchase_cost DECIMAL(12, 2),
    current_condition ENUM('new', 'good', 'fair', 'poor', 'damaged') DEFAULT 'good',
    status ENUM('available', 'allocated', 'maintenance', 'retired', 'lost') DEFAULT 'available',
    location VARCHAR(100),
    is_shared BOOLEAN DEFAULT FALSE,
    image VARCHAR(255),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES asset_categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    INDEX idx_asset_tag (asset_tag),
    INDEX idx_asset_name (asset_name),
    INDEX idx_asset_category (category_id),
    INDEX idx_asset_department (department_id),
    INDEX idx_asset_status (status),
    INDEX idx_asset_condition (current_condition)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. ASSET ALLOCATIONS TABLE
-- ============================================
CREATE TABLE asset_allocations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    user_id INT NOT NULL,
    allocated_date DATE NOT NULL,
    expected_return DATE,
    returned_date DATE,
    status ENUM('active', 'returned', 'overdue') DEFAULT 'active',
    remarks TEXT,
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_allocation_asset (asset_id),
    INDEX idx_allocation_user (user_id),
    INDEX idx_allocation_status (status),
    INDEX idx_allocation_date (allocated_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. TRANSFER REQUESTS TABLE
-- ============================================
CREATE TABLE transfer_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    from_user INT NOT NULL,
    to_user INT NOT NULL,
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    approved_by INT,
    approved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    FOREIGN KEY (from_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (to_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_transfer_asset (asset_id),
    INDEX idx_transfer_from (from_user),
    INDEX idx_transfer_to (to_user),
    INDEX idx_transfer_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 7. RESOURCE BOOKINGS TABLE
-- ============================================
CREATE TABLE resource_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resource_name VARCHAR(100) NOT NULL,
    booked_by INT NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    purpose TEXT,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booked_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_booking_resource (resource_name),
    INDEX idx_booking_user (booked_by),
    INDEX idx_booking_date (booking_date),
    INDEX idx_booking_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 8. MAINTENANCE REQUESTS TABLE
-- ============================================
CREATE TABLE maintenance_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT NOT NULL,
    requested_by INT NOT NULL,
    issue TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    status ENUM('pending', 'in_progress', 'resolved', 'cancelled') DEFAULT 'pending',
    assigned_to INT,
    resolved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    FOREIGN KEY (requested_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_maintenance_asset (asset_id),
    INDEX idx_maintenance_requested_by (requested_by),
    INDEX idx_maintenance_assigned (assigned_to),
    INDEX idx_maintenance_status (status),
    INDEX idx_maintenance_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 9. AUDITS TABLE
-- ============================================
CREATE TABLE audits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    audit_name VARCHAR(100) NOT NULL,
    department_id INT,
    auditor VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status ENUM('scheduled', 'in_progress', 'completed', 'cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    INDEX idx_audit_department (department_id),
    INDEX idx_audit_status (status),
    INDEX idx_audit_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 10. AUDIT ITEMS TABLE
-- ============================================
CREATE TABLE audit_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    audit_id INT NOT NULL,
    asset_id INT NOT NULL,
    verification_status ENUM('verified', 'missing', 'damaged', 'discrepancy') DEFAULT 'verified',
    remarks TEXT,
    FOREIGN KEY (audit_id) REFERENCES audits(id) ON DELETE CASCADE,
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    INDEX idx_audit_item_audit (audit_id),
    INDEX idx_audit_item_asset (asset_id),
    INDEX idx_audit_item_status (verification_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 11. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('allocation', 'return', 'transfer', 'maintenance', 'audit', 'system') DEFAULT 'system',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notification_user (user_id),
    INDEX idx_notification_read (is_read),
    INDEX idx_notification_type (type),
    INDEX idx_notification_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- ============================================

-- Insert sample departments
INSERT INTO departments (name, description, status) VALUES
('IT Department', 'Information Technology Department', 'active'),
('HR Department', 'Human Resources Department', 'active'),
('Finance Department', 'Finance and Accounting Department', 'active'),
('Operations Department', 'Operations and Logistics Department', 'active');

-- Insert sample asset categories
INSERT INTO asset_categories (name, description) VALUES
('Laptops', 'Portable computing devices'),
('Desktops', 'Desktop computer systems'),
('Monitors', 'Display monitors'),
('Printers', 'Printing devices'),
('Furniture', 'Office furniture'),
('Mobile Devices', 'Smartphones and tablets'),
('Network Equipment', 'Routers, switches, and networking gear'),
('Peripherals', 'Keyboards, mice, and other accessories');

-- Insert sample users (passwords should be hashed in production)
INSERT INTO users (employee_id, full_name, email, password, role, department_id, phone, status) VALUES
('EMP001', 'Admin User', 'admin@assetflow.com', '$2b$10$placeholder_hash', 'admin', 1, '1234567890', 'active'),
('EMP002', 'John Manager', 'john.manager@assetflow.com', '$2b$10$placeholder_hash', 'manager', 1, '1234567891', 'active'),
('EMP003', 'Jane Employee', 'jane.employee@assetflow.com', '$2b$10$placeholder_hash', 'employee', 1, '1234567892', 'active');
