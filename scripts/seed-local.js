/**
 * Initialize local SQLite database and ensure default admin user exists.
 * Uses better-sqlite3 from @adelfeyz/api (no sqlite3 CLI required).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DB_PATH = path.join(ROOT, 'data', 'database.db');
const DATABASE_DIR = path.join(ROOT, 'database');

const SQL_FILES = [
  'schema.sql',
  'admin_users_schema.sql',
  'api_keys_metadata.sql',
];

const FULL_PERMISSIONS = JSON.stringify({
  blog: ['create', 'read', 'update', 'delete'],
  users: ['create', 'read', 'update', 'delete'],
  analytics: ['read'],
  contacts: ['read', 'delete'],
  demos: ['read', 'delete'],
  newsletters: ['read', 'delete'],
});

function loadEnvLocal() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const env = {};
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

function resolveBetterSqlite3() {
  const candidates = [
    path.join(ROOT, 'node_modules', '@pointer', 'crm-api', 'node_modules', 'better-sqlite3'),
    path.join(ROOT, 'node_modules', 'better-sqlite3'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function main() {
  const betterSqlitePath = resolveBetterSqlite3();
  if (!betterSqlitePath) {
    console.error('Run "npm install" first (@adelfeyz/api / better-sqlite3 required).');
    process.exit(1);
  }

  const Database = require(betterSqlitePath);

  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const dbExists = fs.existsSync(DB_PATH);
  const db = new Database(DB_PATH);

  const filesToApply = dbExists ? [] : SQL_FILES;

  if (dbExists) {
    console.log('Database exists — updating admin permissions only.');
  }

  for (const file of filesToApply) {
    const sqlPath = path.join(DATABASE_DIR, file);
    if (!fs.existsSync(sqlPath)) {
      console.warn(`Skipping missing file: ${file}`);
      continue;
    }
    db.exec(fs.readFileSync(sqlPath, 'utf-8'));
    console.log(`Applied ${file}`);
  }

  db.prepare(`
    UPDATE admin_users
    SET permissions = ?, role = 'super_admin', is_active = 1
    WHERE id = 1 OR cf_user_id = 'legacy-admin'
  `).run(FULL_PERMISSIONS);

  const admin = db.prepare('SELECT email FROM admin_users WHERE cf_user_id = ?').get('legacy-admin');
  db.close();

  const env = loadEnvLocal();
  const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3030';
  const adminPassword = env.ADMIN_PASSWORD || 'admin';

  console.log('');
  console.log('Database ready:', DB_PATH);
  console.log('');
  console.log('CRM login:', `${siteUrl}/login`);
  console.log('Username:  admin');
  console.log(`Password:  ${adminPassword}  (from ADMIN_PASSWORD in .env.local)`);
  console.log('');
  console.log('Or use the Magic Link tab — link is printed in the API server console.');
}

main();
