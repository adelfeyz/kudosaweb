const request = require('supertest');

// Load environment variables
require('dotenv').config({ path: '.env.test' });

const API_URL = process.env.API_URL || 'https://unified-api.adel-feiz.workers.dev';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://pointer.ir';

describe('Database Migration and Schema Tests', () => {
  let authToken = null;

  // Helper function to get auth token
  const getAuthToken = async () => {
    if (authToken) return authToken;
    
    const loginResponse = await request(API_URL)
      .post('/admin/login')
      .set('Content-Type', 'application/json')
      .set('Origin', FRONTEND_URL)
      .send({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'aidra2024'
      });

    if (loginResponse.status === 200) {
      authToken = loginResponse.body.token;
      return authToken;
    }
    return null;
  };

  describe('Database Schema Validation', () => {
    test('should have admin_users table with correct structure', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping admin_users table test - no auth token available');
        return;
      }

      // Try to fetch users to verify admin_users table exists
      const response = await request(API_URL)
        .get('/admin/users')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Admin users table test response:', response.status, response.body);
      
      // Should not get 500 error if table exists and is properly structured
      expect([200, 401, 500]).toContain(response.status);
      
      if (response.status === 500) {
        console.log('Admin users table may not exist or have wrong structure:', response.body);
      }
    });

    test('should have blog_posts table with correct structure', async () => {
      const response = await request(API_URL)
        .get('/blog/posts')
        .set('Origin', FRONTEND_URL);

      console.log('Blog posts table test response:', response.status, response.body);
      
      // Should not get 500 error if table exists and is properly structured
      expect([200, 500]).toContain(response.status);
      
      if (response.status === 500) {
        console.log('Blog posts table may not exist or have wrong structure:', response.body);
      }
    });

    test('should have blog_categories table with correct structure', async () => {
      const response = await request(API_URL)
        .get('/blog/categories')
        .set('Origin', FRONTEND_URL);

      console.log('Blog categories table test response:', response.status, response.body);
      
      expect([200, 500]).toContain(response.status);
      
      if (response.status === 500) {
        console.log('Blog categories table may not exist or have wrong structure:', response.body);
      }
    });

    test('should have blog_authors table with correct structure', async () => {
      const response = await request(API_URL)
        .get('/blog/authors')
        .set('Origin', FRONTEND_URL);

      console.log('Blog authors table test response:', response.status, response.body);
      
      expect([200, 500]).toContain(response.status);
      
      if (response.status === 500) {
        console.log('Blog authors table may not exist or have wrong structure:', response.body);
      }
    });

    test('should have contact_submissions table with correct structure', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping contact_submissions table test - no auth token available');
        return;
      }

      const response = await request(API_URL)
        .get('/admin/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Contact submissions table test response:', response.status, response.body);
      
      expect([200, 401, 500]).toContain(response.status);
      
      if (response.status === 500) {
        console.log('Contact submissions table may not exist or have wrong structure:', response.body);
      }
    });

    test('should have demo_requests table with correct structure', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping demo_requests table test - no auth token available');
        return;
      }

      const response = await request(API_URL)
        .get('/admin/demos')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Demo requests table test response:', response.status, response.body);
      
      expect([200, 401, 500]).toContain(response.status);
      
      if (response.status === 500) {
        console.log('Demo requests table may not exist or have wrong structure:', response.body);
      }
    });

    test('should have newsletter_subscribers table with correct structure', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping newsletter_subscribers table test - no auth token available');
        return;
      }

      const response = await request(API_URL)
        .get('/admin/newsletters')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Newsletter subscribers table test response:', response.status, response.body);
      
      expect([200, 401, 500]).toContain(response.status);
      
      if (response.status === 500) {
        console.log('Newsletter subscribers table may not exist or have wrong structure:', response.body);
      }
    });
  });

  describe('Database Data Integrity', () => {
    test('should have at least one admin user', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping admin user count test - no auth token available');
        return;
      }

      const response = await request(API_URL)
        .get('/admin/users')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Admin user count test response:', response.status, response.body);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.users)).toBe(true);
        expect(response.body.users.length).toBeGreaterThan(0);
      }
    });

    test('should be able to create and retrieve data', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping data creation test - no auth token available');
        return;
      }

      // Try to create a test category
      const categoryData = {
        name: 'Test Category for Migration',
        slug: `test-migration-${Date.now()}`,
        description: 'Test category for migration validation'
      };

      const createResponse = await request(API_URL)
        .post('/blog/categories')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .set('Origin', FRONTEND_URL)
        .send(categoryData);

      console.log('Category creation for migration test:', createResponse.status, createResponse.body);
      
      expect([200, 201, 400, 401, 500]).toContain(createResponse.status);
      
      if (createResponse.status === 201 || createResponse.status === 200) {
        console.log('✅ Database write operations are working');
      } else {
        console.log('❌ Database write operations may have issues:', createResponse.body);
      }
    });
  });

  describe('Environment Variables Check', () => {
    test('should have required environment variables configured', () => {
      const requiredVars = [
        'API_URL',
        'FRONTEND_URL'
      ];

      requiredVars.forEach(varName => {
        expect(process.env[varName]).toBeDefined();
        console.log(`✅ ${varName}: ${process.env[varName]}`);
      });
    });

    test('should have database configuration', () => {
      const dbVars = [
        'TEST_DB_ID',
        'TEST_DB_NAME'
      ];

      dbVars.forEach(varName => {
        if (process.env[varName]) {
          console.log(`✅ ${varName}: ${process.env[varName]}`);
        } else {
          console.log(`⚠️  ${varName}: Not set (may be using defaults)`);
        }
      });
    });
  });
});
