-- Fix status constraint to match API values
-- First, drop the existing constraint
ALTER TABLE appointment_requests DROP CONSTRAINT IF EXISTS status;

-- Add the correct constraint with the right status values
ALTER TABLE appointment_requests ADD CONSTRAINT status_check 
CHECK (status IN ('new', 'pending', 'scheduled', 'no_show', 'canceled'));
