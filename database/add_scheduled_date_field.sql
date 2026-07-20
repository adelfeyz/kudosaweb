-- Add scheduled_date field to appointment_requests table
ALTER TABLE appointment_requests ADD COLUMN scheduled_date DATE;

-- Create index for scheduled_date for better performance
CREATE INDEX idx_appointment_requests_scheduled_date ON appointment_requests(scheduled_date);
