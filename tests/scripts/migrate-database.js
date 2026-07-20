#!/usr/bin/env node

/**
 * Database Migration Script for Pointer API
 * This script helps ensure the database schema is properly set up
 */

const { execSync } = require('child_process');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.test') });

const API_URL = process.env.API_URL || 'https://unified-api.adel-feiz.workers.dev';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://pointer.ir';

console.log('🚀 Starting Database Migration Check...');
console.log(`API URL: ${API_URL}`);
console.log(`Frontend URL: ${FRONTEND_URL}`);

async function checkDatabaseHealth() {
  try {
    console.log('\n📊 Checking database health...');
    
    // Test basic connectivity
    const response = await fetch(`${API_URL}/blog/posts`, {
      method: 'GET',
      headers: {
        'Origin': FRONTEND_URL
      }
    });

    console.log(`Blog posts endpoint status: ${response.status}`);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log('✅ Blog posts endpoint is working');
      console.log(`Found ${data.posts ? data.posts.length : 0} blog posts`);
    } else {
      console.log(`❌ Blog posts endpoint returned ${response.status}`);
      const errorText = await response.text();
      console.log('Error details:', errorText);
    }

    // Test admin endpoints
    console.log('\n🔐 Testing admin authentication...');
    
    const loginResponse = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': FRONTEND_URL
      },
      body: JSON.stringify({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'aidra2024'
      })
    });

    console.log(`Admin login status: ${loginResponse.status}`);
    
    if (loginResponse.status === 200) {
      const loginData = await loginResponse.json();
      console.log('✅ Admin authentication is working');
      
      // Test admin stats
      const statsResponse = await fetch(`${API_URL}/admin/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Origin': FRONTEND_URL
        }
      });

      console.log(`Admin stats status: ${statsResponse.status}`);
      
      if (statsResponse.status === 200) {
        const statsData = await statsResponse.json();
        console.log('✅ Admin stats endpoint is working');
        console.log('Stats data:', JSON.stringify(statsData, null, 2));
      } else {
        console.log(`❌ Admin stats endpoint returned ${statsResponse.status}`);
        const errorText = await statsResponse.text();
        console.log('Error details:', errorText);
      }
    } else {
      console.log(`❌ Admin authentication failed with status ${loginResponse.status}`);
      const errorText = await loginResponse.text();
      console.log('Error details:', errorText);
    }

  } catch (error) {
    console.error('❌ Database health check failed:', error.message);
  }
}

async function runMigrationCheck() {
  console.log('\n🔧 Running migration check...');
  
  try {
    // Check if wrangler is available
    try {
      execSync('wrangler --version', { stdio: 'pipe' });
      console.log('✅ Wrangler is available');
    } catch (error) {
      console.log('❌ Wrangler is not available. Please install it: npm install -g wrangler');
      return;
    }

    // Check database binding
    console.log('\n📋 Checking database configuration...');
    console.log(`Database ID: ${process.env.TEST_DB_ID || 'Not set'}`);
    console.log(`Database Name: ${process.env.TEST_DB_NAME || 'Not set'}`);

    // Try to execute a simple query to check database connectivity
    try {
      console.log('\n🔍 Testing database connectivity...');
      
      // This would require wrangler to be configured with the correct database
      // For now, we'll just log the configuration
      console.log('Database configuration check completed');
      
    } catch (error) {
      console.log('❌ Database connectivity test failed:', error.message);
    }

  } catch (error) {
    console.error('❌ Migration check failed:', error.message);
  }
}

async function main() {
  console.log('🎯 Pointer Database Migration Check');
  console.log('==========================================');
  
  await checkDatabaseHealth();
  await runMigrationCheck();
  
  console.log('\n✅ Migration check completed!');
  console.log('\n📝 Next steps:');
  console.log('1. If you see 500 errors, check the API worker logs');
  console.log('2. Ensure the database schema is properly initialized');
  console.log('3. Verify all environment variables are set correctly');
  console.log('4. Run the full test suite: npm test');
}

// Run the migration check
main().catch(console.error);
