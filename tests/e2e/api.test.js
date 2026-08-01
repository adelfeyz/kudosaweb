const { test, expect } = require('@playwright/test');

const API_URL = 'https://aidra-api-test.adel-feiz.workers.dev';

test.describe('API E2E Tests', () => {
  let authToken;

  test.beforeAll(async ({ request }) => {
    // Login to get auth token
    const loginResponse = await request.post(`${API_URL}/admin/login`, {
      data: {
        username: 'admin',
        password: 'aidra2024'
      },
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://3f5af779.aidra-website.pages.dev'
      }
    });

    expect(loginResponse.status()).toBe(200);
    const loginData = await loginResponse.json();
    expect(loginData.success).toBe(true);
    authToken = loginData.token;
    expect(authToken).toBeDefined();
  });

  test.describe('Public Endpoints', () => {
    test('should fetch blog posts', async ({ request }) => {
      const response = await request.get(`${API_URL}/blog/posts`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(Array.isArray(data.posts)).toBe(true);
    });

    test('should fetch blog posts with pagination', async ({ request }) => {
      const response = await request.get(`${API_URL}/blog/posts?page=1&limit=5`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data).toHaveProperty('total');
      expect(data).toHaveProperty('totalPages');
      expect(data).toHaveProperty('currentPage');
      expect(data.currentPage).toBe(1);
    });

    test('should fetch blog categories', async ({ request }) => {
      const response = await request.get(`${API_URL}/blog/categories`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(Array.isArray(data.categories)).toBe(true);
    });

    test('should fetch blog authors', async ({ request }) => {
      const response = await request.get(`${API_URL}/blog/authors`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(Array.isArray(data.authors)).toBe(true);
    });

    test('should fetch blog tags', async ({ request }) => {
      const response = await request.get(`${API_URL}/blog/tags`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(Array.isArray(data.tags)).toBe(true);
    });
  });

  test.describe('CORS Integration', () => {
    test('should handle CORS preflight requests', async ({ request }) => {
      const response = await request.fetch(`${API_URL}/blog/posts`, {
        method: 'OPTIONS',
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev',
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      });

      expect(response.status()).toBe(200);
      expect(response.headers()['access-control-allow-origin']).toBe('https://3f5af779.aidra-website.pages.dev');
      expect(response.headers()['access-control-allow-methods']).toContain('GET');
    });

    test('should reject requests from unauthorized origins', async ({ request }) => {
      const response = await request.get(`${API_URL}/blog/posts`, {
        headers: {
          'Origin': 'https://malicious-site.com'
        }
      });

      expect(response.headers()['access-control-allow-origin']).toBe('https://aidra.care');
    });
  });

  test.describe('Protected Endpoints', () => {
    test('should create blog post with authentication', async ({ request }) => {
      const timestamp = Date.now();
      const postData = {
        title: 'E2E Test Post',
        slug: `e2e-test-post-${timestamp}`,
        content: 'This is a test post created during E2E testing',
        author_id: 1,
        status: 'draft',
        excerpt: 'Test excerpt for E2E testing'
      };

      const response = await request.post(`${API_URL}/blog/posts`, {
        data: postData,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(201);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.message).toBe('Blog post created successfully');
    });

    test('should create blog category with authentication', async ({ request }) => {
      const timestamp = Date.now();
      const categoryData = {
        name: 'E2E Test Category',
        slug: `e2e-test-category-${timestamp}`,
        description: 'Test category created during E2E testing'
      };

      const response = await request.post(`${API_URL}/blog/categories`, {
        data: categoryData,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(201);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.message).toBe('Category created successfully');
    });

    test('should create blog author with authentication', async ({ request }) => {
      const timestamp = Date.now();
      const authorData = {
        name: 'E2E Test Author',
        email: `e2e-test-${timestamp}@example.com`,
        bio: 'Test author created during E2E testing',
        title: 'Test Author'
      };

      const response = await request.post(`${API_URL}/blog/authors`, {
        data: authorData,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(201);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.message).toBe('Author created successfully');
    });

    test('should reject requests without authentication', async ({ request }) => {
      const postData = {
        title: 'Unauthorized Post',
        slug: 'unauthorized-post',
        content: 'This should fail'
      };

      const response = await request.post(`${API_URL}/blog/posts`, {
        data: postData,
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(401);
      const data = await response.json();
      expect(data.error).toBe('Unauthorized');
    });
  });

  test.describe('Blog Post Management', () => {
    let createdPostId;

    test('should create and then update a blog post', async ({ request }) => {
      // Create post
      const timestamp = Date.now();
      const postData = {
        title: 'Update Test Post',
        slug: `update-test-post-${timestamp}`,
        content: 'Original content',
        author_id: 1,
        status: 'draft'
      };

      const createResponse = await request.post(`${API_URL}/blog/posts`, {
        data: postData,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(createResponse.status()).toBe(201);
      const createData = await createResponse.json();
      createdPostId = createData.post.id;

      // Update post
      const updateData = {
        id: createdPostId,
        title: 'Updated Test Post',
        content: 'Updated content',
        status: 'published'
      };

      const updateResponse = await request.put(`${API_URL}/blog/posts`, {
        data: updateData,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(updateResponse.status()).toBe(200);
      const updateResponseData = await updateResponse.json();
      expect(updateResponseData.success).toBe(true);
      expect(updateResponseData.message).toBe('Blog post updated successfully');
    });

    test('should delete a blog post', async ({ request }) => {
      // First create a post to delete
      const timestamp = Date.now();
      const postData = {
        title: 'Delete Test Post',
        slug: `delete-test-post-${timestamp}`,
        content: 'This post will be deleted',
        author_id: 1,
        status: 'draft'
      };

      const createResponse = await request.post(`${API_URL}/blog/posts`, {
        data: postData,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      const createData = await createResponse.json();
      const postId = createData.post.id;

      // Delete the post
      const deleteResponse = await request.delete(`${API_URL}/blog/posts?id=${postId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(deleteResponse.status()).toBe(200);
      const deleteData = await deleteResponse.json();
      expect(deleteData.success).toBe(true);
      expect(deleteData.message).toBe('Blog post deleted successfully');
    });
  });

  test.describe('Category Management', () => {
    test('should delete a category', async ({ request }) => {
      // First create a category to delete
      const timestamp = Date.now();
      const categoryData = {
        name: 'Delete Test Category',
        slug: `delete-test-category-${timestamp}`,
        description: 'This category will be deleted'
      };

      const createResponse = await request.post(`${API_URL}/blog/categories`, {
        data: categoryData,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      const createData = await createResponse.json();
      const categoryId = createData.category.id;

      // Delete the category
      const deleteResponse = await request.delete(`${API_URL}/blog/categories?id=${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(deleteResponse.status()).toBe(200);
      const deleteData = await deleteResponse.json();
      expect(deleteData.success).toBe(true);
      expect(deleteData.message).toBe('Category deleted successfully');
    });
  });

  test.describe('Search and Filtering', () => {
    test('should search blog posts', async ({ request }) => {
      const response = await request.get(`${API_URL}/blog/posts?search=test`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    test('should filter posts by status', async ({ request }) => {
      const response = await request.get(`${API_URL}/blog/posts?status=published`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    test('should filter posts by category', async ({ request }) => {
      const response = await request.get(`${API_URL}/blog/posts?category=test-category`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });
  });

  test.describe('Error Handling', () => {
    test('should return 404 for non-existent endpoints', async ({ request }) => {
      const response = await request.get(`${API_URL}/non-existent-endpoint`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(404);
      const data = await response.json();
      expect(data.error).toBe('Endpoint not found');
    });

    test('should return 405 for unsupported methods', async ({ request }) => {
      const response = await request.patch(`${API_URL}/blog/posts`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(405);
      const data = await response.json();
      expect(data.error).toBe('Method not allowed');
    });

    test('should handle invalid JSON gracefully', async ({ request }) => {
      const response = await request.post(`${API_URL}/blog/posts`, {
        data: 'invalid json',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      expect(response.status()).toBe(400);
    });
  });

  test.describe('Performance', () => {
    test('should respond within acceptable time', async ({ request }) => {
      const startTime = Date.now();
      
      const response = await request.get(`${API_URL}/blog/posts`, {
        headers: {
          'Origin': 'https://3f5af779.aidra-website.pages.dev'
        }
      });

      const responseTime = Date.now() - startTime;
      
      expect(response.status()).toBe(200);
      expect(responseTime).toBeLessThan(3000); // Should respond within 3 seconds
    });

    test('should handle concurrent requests', async ({ request }) => {
      const promises = Array(5).fill().map(() => 
        request.get(`${API_URL}/blog/posts`, {
          headers: {
            'Origin': 'https://3f5af779.aidra-website.pages.dev'
          }
        })
      );

      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        expect(response.status()).toBe(200);
      });
    });
  });
});
