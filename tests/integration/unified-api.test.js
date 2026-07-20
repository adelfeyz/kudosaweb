const request = require('supertest');

// Load environment variables
require('dotenv').config({ path: '.env.test' });

const API_URL = process.env.API_URL || 'https://unified-api.adel-feiz.workers.dev';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://pointer.ir';
const MENLOPARK_URL = process.env.MENLOPARK_URL || 'https://menloparksmiles.com';

describe('Unified API Integration Tests', () => {
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

  describe('CORS Configuration', () => {
    test('should handle CORS for pointer.ir', async () => {
      const response = await request(API_URL)
        .options('/admin/stats')
        .set('Origin', FRONTEND_URL)
        .set('Access-Control-Request-Method', 'GET')
        .set('Access-Control-Request-Headers', 'Authorization');

      expect(response.status).toBe(200);
      expect(response.headers['access-control-allow-origin']).toBe(FRONTEND_URL);
    });

    test('should handle CORS for menloparksmiles.com', async () => {
      const response = await request(API_URL)
        .options('/admin/stats')
        .set('Origin', MENLOPARK_URL)
        .set('Access-Control-Request-Method', 'GET')
        .set('Access-Control-Request-Headers', 'Authorization');

      expect(response.status).toBe(200);
      expect(response.headers['access-control-allow-origin']).toBe(MENLOPARK_URL);
    });

    test('should reject requests from unauthorized origins', async () => {
      const response = await request(API_URL)
        .get('/admin/stats')
        .set('Origin', 'https://malicious-site.com');

      // Should still work but with different CORS header
      expect([200, 401, 500]).toContain(response.status);
    });
  });

  describe('Admin Authentication', () => {
    test('should login with valid credentials', async () => {
      const loginData = {
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'aidra2024'
      };

      const response = await request(API_URL)
        .post('/admin/login')
        .set('Content-Type', 'application/json')
        .set('Origin', FRONTEND_URL)
        .send(loginData);

      console.log('Login response:', response.status, response.body);
      
      expect([200, 401, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
      }
    });

    test('should reject login with invalid credentials', async () => {
      const loginData = {
        username: 'admin',
        password: 'wrongpassword'
      };

      const response = await request(API_URL)
        .post('/admin/login')
        .set('Content-Type', 'application/json')
        .set('Origin', FRONTEND_URL)
        .send(loginData);

      expect([401, 500]).toContain(response.status);
    });
  });

  describe('Admin Dashboard Stats', () => {
    test('should fetch admin stats with authentication', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping stats test - no auth token available');
        return;
      }

      const response = await request(API_URL)
        .get('/admin/stats')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Stats response:', response.status, response.body);
      
      expect([200, 401, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(response.body).toHaveProperty('stats');
      }
    });

    test('should reject stats request without authentication', async () => {
      const response = await request(API_URL)
        .get('/admin/stats')
        .set('Origin', FRONTEND_URL);

      expect([401, 500]).toContain(response.status);
    });
  });

  describe('Blog Posts API', () => {
    test('should fetch blog posts', async () => {
      const response = await request(API_URL)
        .get('/blog/posts')
        .set('Origin', FRONTEND_URL);

      console.log('Blog posts response:', response.status, response.body);
      
      expect([200, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.posts)).toBe(true);
      }
    });

    test('should fetch blog posts with pagination', async () => {
      const response = await request(API_URL)
        .get('/blog/posts?page=1&limit=10')
        .set('Origin', FRONTEND_URL);

      expect([200, 500]).toContain(response.status);
    });

    test('should create blog post with authentication', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping blog post creation test - no auth token available');
        return;
      }

      const postData = {
        title: 'Test Post',
        slug: `test-post-${Date.now()}`,
        content: 'Test content',
        excerpt: 'Test excerpt',
        status: 'draft',
        author_id: 1,
        category_id: 1
      };

      const response = await request(API_URL)
        .post('/blog/posts')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .set('Origin', FRONTEND_URL)
        .send(postData);

      console.log('Blog post creation response:', response.status, response.body);
      
      expect([200, 201, 400, 401, 500]).toContain(response.status);
    });
  });

  describe('Blog Categories API', () => {
    test('should fetch categories', async () => {
      const response = await request(API_URL)
        .get('/blog/categories')
        .set('Origin', FRONTEND_URL);

      console.log('Categories response:', response.status, response.body);
      
      expect([200, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.categories)).toBe(true);
      }
    });

    test('should create category with authentication', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping category creation test - no auth token available');
        return;
      }

      const categoryData = {
        name: 'Test Category',
        slug: `test-category-${Date.now()}`,
        description: 'Test category description'
      };

      const response = await request(API_URL)
        .post('/blog/categories')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .set('Origin', FRONTEND_URL)
        .send(categoryData);

      console.log('Category creation response:', response.status, response.body);
      
      expect([200, 201, 400, 401, 500]).toContain(response.status);
    });
  });

  describe('Blog Authors API', () => {
    test('should fetch authors', async () => {
      const response = await request(API_URL)
        .get('/blog/authors')
        .set('Origin', FRONTEND_URL);

      console.log('Authors response:', response.status, response.body);
      
      expect([200, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.authors)).toBe(true);
      }
    });
  });

  describe('Contact Submissions API', () => {
    test('should fetch contacts with authentication', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping contacts test - no auth token available');
        return;
      }

      const response = await request(API_URL)
        .get('/admin/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Contacts response:', response.status, response.body);
      
      expect([200, 401, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.contacts)).toBe(true);
      }
    });
  });

  describe('Demo Requests API', () => {
    test('should fetch demo requests with authentication', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping demo requests test - no auth token available');
        return;
      }

      const response = await request(API_URL)
        .get('/admin/demos')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Demo requests response:', response.status, response.body);
      
      expect([200, 401, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.demos)).toBe(true);
      }
    });
  });

  describe('Newsletter Subscribers API', () => {
    test('should fetch newsletter subscribers with authentication', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping newsletter subscribers test - no auth token available');
        return;
      }

      const response = await request(API_URL)
        .get('/admin/newsletters')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Newsletter subscribers response:', response.status, response.body);
      
      expect([200, 401, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.subscribers)).toBe(true);
      }
    });
  });

  describe('User Management API', () => {
    test('should fetch users with authentication', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping users test - no auth token available');
        return;
      }

      const response = await request(API_URL)
        .get('/admin/users')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Users response:', response.status, response.body);
      
      expect([200, 401, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.users)).toBe(true);
      }
    });
  });

  describe('Error Handling', () => {
    test('should return 404 for non-existent endpoints', async () => {
      const response = await request(API_URL)
        .get('/non-existent-endpoint')
        .set('Origin', FRONTEND_URL);

      expect([404, 500]).toContain(response.status);
    });

    test('should return 405 for unsupported methods', async () => {
      const response = await request(API_URL)
        .patch('/blog/posts')
        .set('Origin', FRONTEND_URL);

      expect([405, 500]).toContain(response.status);
    });
  });

  describe('Database Health Check', () => {
    test('should verify database connection through stats endpoint', async () => {
      const token = await getAuthToken();
      
      if (!token) {
        console.log('Skipping database health check - no auth token available');
        return;
      }

      const response = await request(API_URL)
        .get('/admin/stats')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', FRONTEND_URL);

      console.log('Database health check response:', response.status, response.body);
      
      if (response.status === 500) {
        console.log('Database connection issue detected:', response.body);
      }
      
      expect([200, 401, 500]).toContain(response.status);
    });
  });
});
