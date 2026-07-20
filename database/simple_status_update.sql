-- Simple status constraint update
-- First, let's check what columns exist and update the constraint

-- Step 1: Create a new table with the correct constraint and only existing columns
CREATE TABLE appointment_requests_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  service_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'pending', 'scheduled', 'completed', 'no_show', 'canceled')),
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Copy all data from the old table to the new table (only existing columns)
INSERT INTO appointment_requests_new 
SELECT id, first_name, last_name, email, phone, preferred_date, preferred_time, 
       service_type, message, status, ip_address, user_agent, created_at, updated_at
FROM appointment_requests;

-- Step 3: Drop the old table
DROP TABLE appointment_requests;

-- Step 4: Rename the new table to the original name
ALTER TABLE appointment_requests_new RENAME TO appointment_requests;

-- Step 5: Recreate indexes
CREATE INDEX idx_appointment_requests_email ON appointment_requests(email);
CREATE INDEX idx_appointment_requests_phone ON appointment_requests(phone);
CREATE INDEX idx_appointment_requests_status ON appointment_requests(status);
CREATE INDEX idx_appointment_requests_created_at ON appointment_requests(created_at);
CREATE INDEX idx_appointment_requests_preferred_date ON appointment_requests(preferred_date);
