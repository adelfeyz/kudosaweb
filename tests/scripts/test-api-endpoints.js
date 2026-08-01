#!/usr/bin/env node

/**
 * Comprehensive API Endpoint Test Script
 * Tests all endpoints of the unified API to identify 500 errors
 */

const https = require('https');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.test') });

const API_URL = process.env.API_URL || 'https://unified-api.adel-feiz.workers.dev';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://pointer.ir';
const MENLOPARK_URL = process.env.MENLOPARK_URL || 'https://menloparksmiles.com';

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Origin': options.origin || FRONTEND_URL,
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: jsonData,
            rawBody: data
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: { error: 'Invalid JSON response' },
            rawBody: data
          });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

function logResult(testName, status, details = '') {
  const statusIcon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${statusIcon} ${testName}: ${status}${details ? ` - ${details}` : ''}`);
  
  if (status === 'PASS') {
    testResults.passed++;
  } else {
    testResults.failed++;
    testResults.errors.push({ test: testName, status, details });
  }
}

async function testEndpoint(name, url, options = {}) {
  try {
    const response = await makeRequest(url, options);
    
    if (response.status === 500) {
      logResult(name, 'FAIL', `500 Internal Server Error: ${response.body.error || response.rawBody}`);
    } else if (response.status >= 200 && response.status < 300) {
      logResult(name, 'PASS', `Status: ${response.status}`);
    } else {
      logResult(name, 'WARN', `Status: ${response.status} - ${response.body.error || 'Unexpected status'}`);
    }
    
    return response;
  } catch (error) {
    logResult(name, 'FAIL', `Request failed: ${error.message}`);
    return null;
  }
}

async function testAuthentication() {
  console.log('\n🔐 Testing Authentication...');
  
  // Test login
  const loginResponse = await testEndpoint(
    'Admin Login',
    `${API_URL}/admin/login`,
    {
      method: 'POST',
      body: {
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'aidra2024'
      }
    }
  );
  
  let authToken = null;
  if (loginResponse && loginResponse.status === 200) {
    authToken = loginResponse.body.token;
    console.log('✅ Authentication successful, token obtained');
  } else {
    console.log('❌ Authentication failed, some tests will be skipped');
  }
  
  return authToken;
}

async function testPublicEndpoints() {
  console.log('\n🌐 Testing Public Endpoints...');
  
  // Blog endpoints
  await testEndpoint('Blog Posts', `${API_URL}/blog/posts`);
  await testEndpoint('Blog Categories', `${API_URL}/blog/categories`);
  await testEndpoint('Blog Authors', `${API_URL}/blog/authors`);
  await testEndpoint('Blog Tags', `${API_URL}/blog/tags`);
  
  // Test with different origins
  await testEndpoint('Blog Posts (MenloPark Origin)', `${API_URL}/blog/posts`, { origin: MENLOPARK_URL });
}

async function testAdminEndpoints(authToken) {
  if (!authToken) {
    console.log('\n🔒 Skipping Admin Endpoints (No Auth Token)');
    return;
  }
  
  console.log('\n🔒 Testing Admin Endpoints...');
  
  const authHeaders = { 'Authorization': `Bearer ${authToken}` };
  
  // Dashboard stats
  await testEndpoint('Admin Stats', `${API_URL}/admin/stats`, { headers: authHeaders });
  
  // User management
  await testEndpoint('Admin Users', `${API_URL}/admin/users`, { headers: authHeaders });
  
  // Contact management
  await testEndpoint('Admin Contacts', `${API_URL}/admin/contacts`, { headers: authHeaders });
  await testEndpoint('Admin Demos', `${API_URL}/admin/demos`, { headers: authHeaders });
  await testEndpoint('Admin Newsletters', `${API_URL}/admin/newsletters`, { headers: authHeaders });
  
  // Blog management
  await testEndpoint('Admin Blog Posts', `${API_URL}/admin/blog/posts`, { headers: authHeaders });
  await testEndpoint('Admin Blog Categories', `${API_URL}/admin/blog/categories`, { headers: authHeaders });
  await testEndpoint('Admin Blog Authors', `${API_URL}/admin/blog/authors`, { headers: authHeaders });
  await testEndpoint('Admin Blog Tags', `${API_URL}/admin/blog/tags`, { headers: authHeaders });
  await testEndpoint('Admin Blog Images', `${API_URL}/admin/blog/images`, { headers: authHeaders });
}

async function testCORSConfiguration() {
  console.log('\n🌐 Testing CORS Configuration...');
  
  // Test CORS preflight requests
  await testEndpoint('CORS Preflight (Pointer)', `${API_URL}/admin/stats`, {
    method: 'OPTIONS',
    headers: {
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'Authorization'
    }
  });
  
  await testEndpoint('CORS Preflight (MenloPark)', `${API_URL}/admin/stats`, {
    method: 'OPTIONS',
    origin: MENLOPARK_URL,
    headers: {
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'Authorization'
    }
  });
}

async function testErrorHandling() {
  console.log('\n🚨 Testing Error Handling...');
  
  // Test non-existent endpoints
  await testEndpoint('Non-existent Endpoint', `${API_URL}/non-existent-endpoint`);
  
  // Test unsupported methods
  await testEndpoint('Unsupported Method', `${API_URL}/blog/posts`, { method: 'PATCH' });
  
  // Test unauthorized access
  await testEndpoint('Unauthorized Admin Access', `${API_URL}/admin/stats`);
}

async function runComprehensiveTest() {
  console.log('🧪 Pointer API Comprehensive Test');
  console.log('========================================');
  console.log(`API URL: ${API_URL}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
  console.log(`MenloPark URL: ${MENLOPARK_URL}`);
  
  // Test authentication first
  const authToken = await testAuthentication();
  
  // Test public endpoints
  await testPublicEndpoints();
  
  // Test admin endpoints
  await testAdminEndpoints(authToken);
  
  // Test CORS configuration
  await testCORSConfiguration();
  
  // Test error handling
  await testErrorHandling();
  
  // Print summary
  console.log('\n📊 Test Summary');
  console.log('================');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  if (testResults.errors.length > 0) {
    console.log('\n🚨 Failed Tests:');
    testResults.errors.forEach(error => {
      console.log(`  - ${error.test}: ${error.details}`);
    });
  }
  
  console.log('\n💡 Recommendations:');
  if (testResults.failed > 0) {
    console.log('1. Check API worker logs for 500 errors');
    console.log('2. Verify database schema is properly initialized');
    console.log('3. Ensure all environment variables are set correctly');
    console.log('4. Check CORS configuration in the API worker');
  } else {
    console.log('🎉 All tests passed! Your API is working correctly.');
  }
}

// Run the comprehensive test
runComprehensiveTest().catch(console.error);
