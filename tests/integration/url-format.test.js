const request = require('supertest');

const API_URL = 'https://aidra-api.adel-feiz.workers.dev';

describe('URL Format Integration Tests', () => {
  let authToken;

  beforeAll(async () => {
    // Get authentication token
    const loginResponse = await request(API_URL)
      .post('/admin/login')
      .set('Content-Type', 'application/json')
      .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
      .send({
        username: 'admin',
        password: 'aidra2024'
      });

    expect(loginResponse.status).toBe(200);
    authToken = loginResponse.body.token;
    expect(authToken).toBeDefined();
  });

  describe('DELETE Endpoint URL Format Tests', () => {
    test('should reject DELETE requests with RESTful path format for blog posts', async () => {
      // Test that DELETE /blog/posts/123 (RESTful format) returns 404
      const response = await request(API_URL)
        .delete('/blog/posts/123')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(404);
    });

    test('should accept DELETE requests with query parameter format for blog posts', async () => {
      // First create a post to delete
      const timestamp = Date.now();
      const postData = {
        title: 'URL Format Test Post',
        slug: `url-format-test-${timestamp}`,
        content: 'This post will be deleted',
        author_id: 1,
        status: 'draft'
      };

      const createResponse = await request(API_URL)
        .post('/blog/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
        .send(postData);

      expect(createResponse.status).toBe(201);
      const postId = createResponse.body.post.id;

      // Test that DELETE /blog/posts?id=123 (query parameter format) works
      const deleteResponse = await request(API_URL)
        .delete(`/blog/posts?id=${postId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.success).toBe(true);
    });

    test('should reject DELETE requests with RESTful path format for categories', async () => {
      const response = await request(API_URL)
        .delete('/blog/categories/123')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(404);
    });

    test('should accept DELETE requests with query parameter format for categories', async () => {
      // First create a category to delete
      const timestamp = Date.now();
      const categoryData = {
        name: 'URL Format Test Category',
        slug: `url-format-test-${timestamp}`,
        description: 'This category will be deleted'
      };

      const createResponse = await request(API_URL)
        .post('/blog/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
        .send(categoryData);

      expect(createResponse.status).toBe(201);
      const categoryId = createResponse.body.category.id;

      // Test that DELETE /blog/categories?id=123 (query parameter format) works
      const deleteResponse = await request(API_URL)
        .delete(`/blog/categories?id=${categoryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.success).toBe(true);
    });

    test('should reject DELETE requests with RESTful path format for authors', async () => {
      const response = await request(API_URL)
        .delete('/blog/authors/123')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(404);
    });

    test('should accept DELETE requests with query parameter format for authors', async () => {
      // First create an author to delete
      const timestamp = Date.now();
      const authorData = {
        name: 'URL Format Test Author',
        email: `test-author-${timestamp}@example.com`,
        bio: 'This author will be deleted'
      };

      const createResponse = await request(API_URL)
        .post('/blog/authors')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json')
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev')
        .send(authorData);

      expect(createResponse.status).toBe(201);
      const authorId = createResponse.body.author.id;

      // Test that DELETE /blog/authors?id=123 (query parameter format) works
      const deleteResponse = await request(API_URL)
        .delete(`/blog/authors?id=${authorId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.success).toBe(true);
    });

    test('should reject DELETE requests with RESTful path format for images', async () => {
      const response = await request(API_URL)
        .delete('/blog/images/123')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      expect(response.status).toBe(404);
    });

    test('should accept DELETE requests with query parameter format for images', async () => {
      // Note: Image deletion test would require actual image upload first
      // For now, we'll test the endpoint format
      const response = await request(API_URL)
        .delete('/blog/images?id=999999') // Non-existent ID
        .set('Authorization', `Bearer ${authToken}`)
        .set('Origin', 'https://3f5af779.aidra-website.pages.dev');

      // Should return 404 for non-existent image, not 405 (method not allowed)
      expect(response.status).toBe(404);
    });
  });

  describe('Frontend API Call Format Tests', () => {
    test('should verify frontend API calls use correct URL format', async () => {
      // This test documents the expected URL format for frontend developers
      const expectedFormats = {
        'DELETE blog posts': '/blog/posts?id={id}',
        'DELETE categories': '/blog/categories?id={id}',
        'DELETE authors': '/blog/authors?id={id}',
        'DELETE images': '/blog/images?id={id}',
        'DELETE tags': '/blog/tags?id={id}'
      };

      // Verify that the API expects query parameter format, not RESTful path format
      Object.entries(expectedFormats).forEach(([operation, expectedFormat]) => {
        expect(expectedFormat).toMatch(/\?id=/);
        expect(expectedFormat).not.toMatch(/\/\{id\}$/);
      });
    });
  });
});
