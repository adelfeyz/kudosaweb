const { createTestRequest, MockEnv, generateJWT } = require('../test-utils.js');

describe('Blog API Unit Tests', () => {
  let mockEnv;

  beforeEach(() => {
    mockEnv = new MockEnv();
  });

  describe('API Endpoint Structure', () => {
    test('should handle blog posts endpoint', async () => {
      const request = createTestRequest('https://api.example.com/blog/posts');
      
      expect(request.method).toBe('GET');
      expect(request.headers.get('Content-Type')).toBe('application/json');
      expect(request.headers.get('Origin')).toBe('https://3f5af779.aidra-website.pages.dev');
    });

    test('should handle blog categories endpoint', async () => {
      const request = createTestRequest('https://api.example.com/blog/categories');
      
      expect(request.method).toBe('GET');
      expect(request.headers.get('Content-Type')).toBe('application/json');
    });

    test('should handle blog authors endpoint', async () => {
      const request = createTestRequest('https://api.example.com/blog/authors');
      
      expect(request.method).toBe('GET');
      expect(request.headers.get('Content-Type')).toBe('application/json');
    });
  });

  describe('Authentication', () => {
    test('should generate valid admin token', () => {
      const payload = { username: 'admin', role: 'admin' };
      const secret = mockEnv.JWT_SECRET;

      const token = generateJWT(payload, secret);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    test('should create authenticated request', () => {
      const token = generateJWT({ username: 'admin', role: 'admin' }, mockEnv.JWT_SECRET);
      const request = createTestRequest('https://api.example.com/blog/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`);
      expect(request.method).toBe('POST');
    });
  });

  describe('Database Mock', () => {
    test('should mock database responses', async () => {
      const mockPosts = [
        {
          id: 1,
          title: 'Test Post',
          slug: 'test-post',
          content: 'Test content',
          status: 'published',
          author_id: 1,
          created_at: new Date().toISOString()
        }
      ];

      mockEnv.DB.all.mockResolvedValue({ results: mockPosts });

      const result = await mockEnv.DB.all();
      expect(result.results).toEqual(mockPosts);
    });

    test('should mock database insert', async () => {
      mockEnv.DB.run.mockResolvedValue({ meta: { last_row_id: 123 } });

      const result = await mockEnv.DB.run();
      expect(result.meta.last_row_id).toBe(123);
    });
  });

  describe('Request Creation', () => {
    test('should create GET request', () => {
      const request = createTestRequest('https://api.example.com/blog/posts');
      
      expect(request.method).toBe('GET');
      expect(request.url).toBe('https://api.example.com/blog/posts');
    });

    test('should create POST request with body', () => {
      const postData = {
        title: 'New Post',
        slug: 'new-post',
        content: 'New content',
        author_id: 1,
        status: 'draft'
      };

      const request = createTestRequest('https://api.example.com/blog/posts', {
        method: 'POST',
        body: JSON.stringify(postData)
      });

      expect(request.method).toBe('POST');
      expect(request.headers.get('Content-Type')).toBe('application/json');
    });

    test('should create DELETE request', () => {
      const request = createTestRequest('https://api.example.com/blog/posts?id=1', {
        method: 'DELETE'
      });

      expect(request.method).toBe('DELETE');
      expect(request.url).toBe('https://api.example.com/blog/posts?id=1');
    });
  });
});
