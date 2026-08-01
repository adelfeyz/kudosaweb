-- Admin Users Management Schema
-- This schema supports Cloudflare Access integration with local user management

-- Admin users table - stores user information from Cloudflare Access
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cf_user_id TEXT UNIQUE, -- Cloudflare Access user ID
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  permissions JSON, -- JSON object storing specific permissions
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

-- Admin sessions table - tracks active sessions
CREATE TABLE IF NOT EXISTS admin_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  session_token TEXT UNIQUE NOT NULL,
  cf_access_token TEXT, -- Store Cloudflare Access JWT for verification
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- Admin audit log - tracks all admin actions
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  resource TEXT,
  resource_id TEXT,
  details JSON,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_cf_user_id ON admin_users(cf_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_user_id ON admin_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created_at ON admin_audit_log(created_at);

-- Insert default admin user (for backward compatibility during transition)
INSERT OR IGNORE INTO admin_users (id, email, name, role, permissions, cf_user_id) 
VALUES (1, 'admin@aidra.care', 'System Admin', 'super_admin', 
        '{"blog": ["create", "read", "update", "delete"], "users": ["create", "read", "update", "delete"], "analytics": ["read"], "contacts": ["read", "delete"], "demos": ["read", "delete"], "newsletters": ["read", "delete"]}', 
        'legacy-admin');

-- Sample permissions structure:
-- {
--   "blog": ["create", "read", "update", "delete"],
--   "users": ["create", "read", "update", "delete"], 
--   "analytics": ["read"],
--   "contacts": ["read", "delete"],
--   "demos": ["read", "delete"],
--   "newsletters": ["read", "delete"]
-- }
