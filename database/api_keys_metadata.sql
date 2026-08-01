-- API Keys Metadata and Audit Schema for External Blog API
-- Uses Cloudflare Workers KV for fast validation + D1 for metadata and audit logs

-- API Keys metadata table (for management and audit)
CREATE TABLE api_keys_metadata (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_key_hash TEXT UNIQUE NOT NULL, -- SHA-256 hash for lookup
  name TEXT NOT NULL, -- Human-readable name for the API key
  description TEXT, -- Optional description of the key's purpose
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER NOT NULL, -- Admin user who created the key
  is_active BOOLEAN DEFAULT 1, -- Can be revoked without deletion
  last_used_at DATETIME, -- Last time this key was used
  usage_count INTEGER DEFAULT 0, -- Total number of requests made
  rate_limit_per_hour INTEGER DEFAULT 100, -- Custom rate limit per key
  permissions TEXT DEFAULT '{"blog": ["create", "read", "update"]}', -- JSON permissions
  FOREIGN KEY (created_by) REFERENCES admin_users(id)
);

-- API Keys audit log table (for security and monitoring)
CREATE TABLE api_keys_audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_key_id INTEGER NOT NULL,
  endpoint TEXT NOT NULL, -- The API endpoint accessed
  method TEXT NOT NULL, -- HTTP method (GET, POST, PUT, etc.)
  status_code INTEGER NOT NULL, -- HTTP response status code
  ip_address TEXT, -- Client IP address
  user_agent TEXT, -- Client user agent
  request_size INTEGER, -- Request body size in bytes
  response_size INTEGER, -- Response body size in bytes
  response_time_ms INTEGER, -- Response time in milliseconds
  error_message TEXT, -- Error message if request failed
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (api_key_id) REFERENCES api_keys_metadata(id)
);

-- Indexes for better performance
CREATE INDEX idx_api_keys_metadata_hash ON api_keys_metadata(api_key_hash);
CREATE INDEX idx_api_keys_metadata_active ON api_keys_metadata(is_active);
CREATE INDEX idx_api_keys_metadata_created_by ON api_keys_metadata(created_by);
CREATE INDEX idx_api_keys_audit_log_key_id ON api_keys_audit_log(api_key_id);
CREATE INDEX idx_api_keys_audit_log_timestamp ON api_keys_audit_log(timestamp);
CREATE INDEX idx_api_keys_audit_log_endpoint ON api_keys_audit_log(endpoint);

-- Sample API key for testing (will be replaced with real generation)
-- Note: This is just for reference - actual keys are generated dynamically
INSERT INTO api_keys_metadata (
  api_key_hash, 
  name, 
  description, 
  created_by, 
  permissions
) VALUES (
  'test_hash_placeholder', 
  'Test API Key', 
  'Sample API key for testing external blog API', 
  1, 
  '{"blog": ["create", "read", "update"]}'
);
