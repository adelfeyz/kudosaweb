-- Appointment requests table for dental practice
CREATE TABLE appointment_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  service_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'pending', 'scheduled', 'no_show', 'canceled')),
  scheduled_date DATE,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_appointment_requests_email ON appointment_requests(email);
CREATE INDEX idx_appointment_requests_phone ON appointment_requests(phone);
CREATE INDEX idx_appointment_requests_status ON appointment_requests(status);
CREATE INDEX idx_appointment_requests_created_at ON appointment_requests(created_at);
CREATE INDEX idx_appointment_requests_preferred_date ON appointment_requests(preferred_date);
CREATE INDEX idx_appointment_requests_scheduled_date ON appointment_requests(scheduled_date);
