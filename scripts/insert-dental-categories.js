#!/usr/bin/env node

/**
 * Script to insert dental clinic blog categories and tags into Cloudflare D1 database
 * 
 * Usage:
 *   node scripts/insert-dental-categories.js
 * 
 * Make sure to set your Cloudflare credentials in your environment or wrangler.toml
 */

const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlFilePath = path.join(__dirname, '..', 'database', 'insert_dental_categories.sql');
const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

// Split the SQL content into individual statements
const statements = sqlContent
  .split(';')
  .map(stmt => stmt.trim())
  .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

console.log('🚀 Starting dental categories insertion...');
console.log(`📄 Found ${statements.length} SQL statements to execute`);

// This script is designed to be run with Wrangler
// You can execute it using: wrangler d1 execute <database-name> --file=database/insert_dental_categories.sql

console.log('\n📋 To execute this script, run one of the following commands:');
console.log('\n1. Using Wrangler CLI:');
console.log('   wrangler d1 execute <your-database-name> --file=database/insert_dental_categories.sql');
console.log('\n2. Or copy and paste the SQL content into your Cloudflare D1 dashboard');
console.log('\n3. Or use the API worker endpoint if you have one set up');

console.log('\n📊 Categories to be inserted:');
console.log('   • General Dentistry');
console.log('   • Cosmetic Dentistry');
console.log('   • Dental Implants');
console.log('   • Orthodontics');
console.log('   • Oral Health & Prevention');
console.log('   • Periodontal Care');
console.log('   • Dental Technology');
console.log('   • Patient Stories');

console.log('\n🏷️  Tags to be inserted:');
console.log('   • Treatment-specific tags (17 tags)');
console.log('   • Age-specific tags (6 tags)');
console.log('   • Condition-specific tags (10 tags)');
console.log('   • Preventive care tags (9 tags)');
console.log('   • Technology tags (7 tags)');
console.log('   • Lifestyle tags (6 tags)');
console.log('   • Emergency tags (6 tags)');
console.log('   • Insurance & finance tags (4 tags)');
console.log('   • Seasonal/event tags (5 tags)');

console.log('\n✅ Total: 8 categories and 70 tags will be inserted');
console.log('\n💡 Note: If you want to clear existing categories first, uncomment the DELETE statement in the SQL file');
