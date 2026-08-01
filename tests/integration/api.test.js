const request = require('supertest');

const API_URL = 'https://aidra-api.adel-feiz.workers.dev';

describe('API Integration Tests', () => {
  describe('CORS Integration', () => {
    test('should handle CORS preflight requests', async () => {
      const response = await request(API_URL)
        .options('/blog/posts')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
        .set('Access-Control-Request-Method', 'GET')
        .set('Access-Control-Request-Headers', 'Content-Type');

      expect(response.status).toBe(200);
      expect(response.headers['access-control-allow-origin']).toBe('https://3f5af779.aidra-website.pages.dev');
      expect(response.headers['access-control-allow-methods']).toContain('GET');
    });

    test('should reject requests from unauthorized origins', async () => {
      const response = await request(API_URL)
        .get('/blog/posts')
        .set('Origin', 'https://malicious-site.com');

      expect(response.headers['access-control-allow-origin']).toBe('https://aidra.care');
    });
  });

  describe('Blog Posts API Integration', () => {
    test('should fetch blog posts', async () => {
      const response = await request(API_URL)
        .get('/blog/posts')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.posts)).toBe(true);
    });

    test('should fetch blog posts with pagination', async () => {
      const response = await request(API_URL)
        .get('/blog/posts?page=1&limit=10')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('totalPages');
      expect(response.body).toHaveProperty('currentPage');
    });

    test('should fetch blog posts with filters', async () => {
      const response = await request(API_URL)
        .get('/blog/posts?status=published&category=test-category')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test('should search blog posts', async () => {
      const response = await request(API_URL)
        .get('/blog/posts?search=test')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe('Blog Categories API Integration', () => {
    test('should fetch categories', async () => {
      const response = await request(API_URL)
        .get('/blog/categories')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.categories)).toBe(true);
    });

    test('should create category with authentication', async () => {
      // First login to get token
      const loginResponse = await request(API_URL)
        .post('/admin/login')
        .set('Content-Type', 'application/json')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
        .send({
          username: 'admin',
          password: 'aidra2024'
        });

      expect(loginResponse.status).toBe(200);
      const token = loginResponse.body.token;

      const timestamp = Date.now();
      const categoryData = {
        name: 'Test Category',
        slug: `test-category-${timestamp}`,
        description: 'Test category description'
      };

      const response = await request(API_URL)
        .post('/blog/categories')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
        .send(categoryData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Category created successfully');
    });

    test('should reject category creation without authentication', async () => {
      const categoryData = {
        name: 'Test Category',
        slug: 'test-category'
      };

      const response = await request(API_URL)
        .post('/blog/categories')
        .set('Content-Type', 'application/json')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
        .send(categoryData);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
    });
  });

  describe('Blog Authors API Integration', () => {
    test('should fetch authors', async () => {
      const response = await request(API_URL)
        .get('/blog/authors')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.authors)).toBe(true);
    });
  });

  describe('Blog Post by Slug Integration', () => {
    test('should fetch post by slug', async () => {
      const response = await request(API_URL)
        .get('/blog/posts/test-post')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      // This might return 404 if the post doesn't exist, which is expected
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('Admin Authentication Integration', () => {
    test('should login with valid credentials', async () => {
      const loginData = {
        username: 'admin',
        password: 'aidra2024'
      };

      const response = await request(API_URL)
        .post('/admin/login')
        .set('Content-Type', 'application/json')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    test('should reject login with invalid credentials', async () => {
      const loginData = {
        username: 'admin',
        password: 'wrongpassword'
      };

      const response = await request(API_URL)
        .post('/admin/login')
        .set('Content-Type', 'application/json')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid credentials');
    });

    test('should verify valid token', async () => {
      // First login to get token
      const loginResponse = await request(API_URL)
        .post('/admin/login')
        .set('Content-Type', 'application/json')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
        .send({
          username: 'admin',
          password: 'aidra2024'
        });

      const token = loginResponse.body.token;

      const response = await request(API_URL)
        .get('/admin/verify')
        .set('Authorization', `Bearer ${token}`)
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('user');
    });

    test('should reject invalid token', async () => {
      const response = await request(API_URL)
        .get('/admin/verify')
        .set('Authorization', 'Bearer invalid-token')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid token');
    });
  });

  describe('Error Handling Integration', () => {
    test('should return 404 for non-existent endpoints', async () => {
      const response = await request(API_URL)
        .get('/non-existent-endpoint')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Endpoint not found');
    });

    test('should return 405 for unsupported methods', async () => {
      const response = await request(API_URL)
        .patch('/blog/posts')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(405);
      expect(response.body.error).toBe('Method not allowed');
    });
  });
});
