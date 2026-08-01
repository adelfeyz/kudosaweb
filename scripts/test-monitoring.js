#!/usr/bin/env node

/**
 * API Monitoring Test Script
 * Tests the External Blog API endpoints and generates monitoring data
 */

const https = require('https');

const API_BASE_URL = 'https://unified-api.adel-feiz.workers.dev/api/external/blog';
const PRODUCTION_API_KEY = 'ics_live_b86eab45c1cd307258036910ad08f6cbc5ae03ae31e316f3f1b00d54c80c56a5';

// Test endpoints
const tests = [
  {
    name: 'Health Check',
    url: 'https://unified-api.adel-feiz.workers.dev/api/health',
    method: 'GET',
    headers: {},
    expectedStatus: 200
  },
  {
    name: 'List Posts',
    url: `${API_BASE_URL}/posts`,
    method: 'GET',
    headers: { 'X-API-Key': PRODUCTION_API_KEY },
    expectedStatus: 200
  },
  {
    name: 'Get Categories',
    url: `${API_BASE_URL}/categories`,
    method: 'GET',
    headers: {},
    expectedStatus: 200
  },
  {
    name: 'Get Tags',
    url: `${API_BASE_URL}/tags`,
    method: 'GET',
    headers: {},
    expectedStatus: 200
  },
  {
    name: 'Get Authors',
    url: `${API_BASE_URL}/authors`,
    method: 'GET',
    headers: {},
    expectedStatus: 200
  }
];

async function makeRequest(test) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const url = new URL(test.url);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: test.method,
      headers: test.headers
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const responseTime = Date.now() - startTime;
        resolve({
          name: test.name,
          status: res.statusCode,
          responseTime,
          success: res.statusCode === test.expectedStatus,
          data: data.substring(0, 200) + (data.length > 200 ? '...' : '')
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        name: test.name,
        status: 0,
        responseTime: Date.now() - startTime,
        success: false,
        error: error.message
      });
    });

    req.end();
  });
}

async function runMonitoringTests() {
  console.log('🔍 API Monitoring Test Suite');
  console.log('============================\n');

  const results = [];
  
  for (const test of tests) {
    console.log(`Testing: ${test.name}...`);
    const result = await makeRequest(test);
    results.push(result);
    
    const status = result.success ? '✅' : '❌';
    console.log(`  ${status} ${result.name}: ${result.status} (${result.responseTime}ms)`);
    
    if (!result.success && result.error) {
      console.log(`  Error: ${result.error}`);
    }
    
    console.log('');
  }

  // Summary
  console.log('📊 Test Summary');
  console.log('================');
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / total;
  
  console.log(`✅ Successful: ${successful}/${total}`);
  console.log(`⏱️  Average Response Time: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`📈 Success Rate: ${((successful/total) * 100).toFixed(1)}%`);
  
  // Failed tests
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    console.log('\n❌ Failed Tests:');
    failed.forEach(test => {
      console.log(`  - ${test.name}: ${test.status} ${test.error || ''}`);
    });
  }

  // Performance analysis
  const slowTests = results.filter(r => r.responseTime > 1000);
  if (slowTests.length > 0) {
    console.log('\n🐌 Slow Tests (>1s):');
    slowTests.forEach(test => {
      console.log(`  - ${test.name}: ${test.responseTime}ms`);
    });
  }

  console.log('\n🎯 Monitoring Complete!');
}

// Run the tests
runMonitoringTests().catch(console.error);
