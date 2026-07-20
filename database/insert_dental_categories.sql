-- Insert dental clinic blog categories
-- This script adds dental-specific categories to replace the generic healthcare ones

-- Clear existing categories (optional - remove this if you want to keep existing ones)
-- DELETE FROM blog_categories;

-- Insert dental clinic categories
INSERT INTO blog_categories (name, slug, description, color, icon) VALUES
('General Dentistry', 'general-dentistry', 'Preventive care, cleanings, fillings, and routine dental treatments', '#3B82F6', 'fa-tooth'),
('Cosmetic Dentistry', 'cosmetic-dentistry', 'Teeth whitening, veneers, crowns, and smile makeovers', '#F59E0B', 'fa-smile'),
('Dental Implants', 'dental-implants', 'Tooth replacement solutions including All-on-4 and single implants', '#10B981', 'fa-implant'),
('Orthodontics', 'orthodontics', 'Invisalign, braces, and teeth straightening treatments', '#8B5CF6', 'fa-braces'),
('Oral Health & Prevention', 'oral-health-prevention', 'Dental hygiene tips, preventive care, and oral health education', '#EF4444', 'fa-shield-alt'),
('Periodontal Care', 'periodontal-care', 'Gum disease treatment, gum grafts, and periodontal health', '#06B6D4', 'fa-heart'),
('Dental Technology', 'dental-technology', 'Advanced dental technology, digital dentistry, and innovations', '#6366F1', 'fa-microchip'),
('Patient Stories', 'patient-stories', 'Success stories, testimonials, and transformation journeys', '#EC4899', 'fa-user-friends');

-- Insert dental clinic tags
INSERT INTO blog_tags (name, slug) VALUES
-- Treatment-Specific Tags
('Teeth Whitening', 'teeth-whitening'),
('Dental Crowns', 'dental-crowns'),
('Dental Veneers', 'dental-veneers'),
('Root Canal', 'root-canal'),
('Tooth Extraction', 'tooth-extraction'),
('Wisdom Teeth', 'wisdom-teeth'),
('Gum Grafting', 'gum-grafting'),
('Bone Grafting', 'bone-grafting'),
('Sinus Lift', 'sinus-lift'),
('Dental Bridges', 'dental-bridges'),
('Dentures', 'dentures'),
('All-on-4', 'all-on-4'),
('Invisalign', 'invisalign'),
('Braces', 'braces'),
('Orthodontics', 'orthodontics'),
('Dental Sealants', 'dental-sealants'),
('Oral Cancer Screening', 'oral-cancer-screening'),

-- Age-Specific Tags
('Pediatric Dentistry', 'pediatric-dentistry'),
('Children Dental Care', 'children-dental-care'),
('Teen Dentistry', 'teen-dentistry'),
('Adult Dentistry', 'adult-dentistry'),
('Senior Dental Care', 'senior-dental-care'),
('Geriatric Dentistry', 'geriatric-dentistry'),

-- Condition-Specific Tags
('Cavities', 'cavities'),
('Gum Disease', 'gum-disease'),
('Periodontal Disease', 'periodontal-disease'),
('Tooth Decay', 'tooth-decay'),
('Dental Anxiety', 'dental-anxiety'),
('TMJ Disorder', 'tmj-disorder'),
('Bruxism', 'bruxism'),
('Dry Mouth', 'dry-mouth'),
('Bad Breath', 'bad-breath'),
('Tooth Sensitivity', 'tooth-sensitivity'),

-- Preventive Care Tags
('Dental Hygiene', 'dental-hygiene'),
('Oral Hygiene', 'oral-hygiene'),
('Flossing', 'flossing'),
('Brushing', 'brushing'),
('Mouthwash', 'mouthwash'),
('Dental Checkup', 'dental-checkup'),
('Preventive Care', 'preventive-care'),
('Dental Cleaning', 'dental-cleaning'),
('Fluoride Treatment', 'fluoride-treatment'),

-- Technology Tags
('Digital Dentistry', 'digital-dentistry'),
('3D Printing', '3d-printing'),
('Laser Dentistry', 'laser-dentistry'),
('Digital Impressions', 'digital-impressions'),
('Cone Beam CT', 'cone-beam-ct'),
('Intraoral Camera', 'intraoral-camera'),
('Teledentistry', 'teledentistry'),

-- Lifestyle Tags
('Diet and Dental Health', 'diet-and-dental-health'),
('Sports Dentistry', 'sports-dentistry'),
('Pregnancy Dental Care', 'pregnancy-dental-care'),
('Diabetes and Dental Health', 'diabetes-and-dental-health'),
('Smoking and Dental Health', 'smoking-and-dental-health'),
('Dental Tourism', 'dental-tourism'),

-- Emergency Tags
('Dental Emergency', 'dental-emergency'),
('Tooth Pain', 'tooth-pain'),
('Dental Trauma', 'dental-trauma'),
('Broken Tooth', 'broken-tooth'),
('Knocked Out Tooth', 'knocked-out-tooth'),
('Dental Abscess', 'dental-abscess'),

-- Insurance & Finance Tags
('Dental Insurance', 'dental-insurance'),
('Payment Plans', 'payment-plans'),
('Dental Financing', 'dental-financing'),
('Insurance Coverage', 'insurance-coverage'),

-- Seasonal/Event Tags
('New Year Dental Resolutions', 'new-year-dental-resolutions'),
('Summer Dental Care', 'summer-dental-care'),
('Back to School Dental', 'back-to-school-dental'),
('Holiday Dental Tips', 'holiday-dental-tips'),
('Wedding Dental Prep', 'wedding-dental-prep');
