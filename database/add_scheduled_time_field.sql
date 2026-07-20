-- Add scheduled_time field to appointment_requests table
ALTER TABLE appointment_requests ADD COLUMN scheduled_time DATETIME;

-- Create index for scheduled_time for better performance
CREATE INDEX idx_appointment_requests_scheduled_time ON appointment_requests(scheduled_time);
