// Jest setup file
require('dotenv').config({ path: '.env.test' });

// Global test timeout
jest.setTimeout(30000);

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-2024';
process.env.BREVO_API_KEY = 'test-brevo-api-key';
process.env.TURNSTILE_SECRET_KEY = 'test-turnstile-secret';
process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
process.env.CLOUDFLARE_IMAGES_TOKEN = 'test-images-token';
process.env.CLOUDFLARE_ACCOUNT_HASH = 'test-account-hash';

// Global test utilities
global.testUtils = {
  // Generate test JWT token
  generateTestToken: (payload = { username: 'admin', role: 'admin' }) => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = Buffer.from(JSON.stringify({ secret: process.env.JWT_SECRET })).toString('base64');
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  },

  // Create test request
  createTestRequest: (url, options = {}) => {
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://3f5af779.aidra-website.pages.dev'
      }
    };
    return new Request(url, { ...defaultOptions, ...options });
  },

  // Mock database responses
  mockDbResponses: {
    posts: [
      {
        id: 1,
        title: 'Test Post',
        slug: 'test-post',
        content: 'Test content',
        status: 'published',
        author_id: 1,
        created_at: new Date().toISOString()
      }
    ],
    categories: [
      {
        id: 1,
        name: 'Test Category',
        slug: 'test-category',
        description: 'Test category description'
      }
    ],
    authors: [
      {
        id: 1,
        name: 'Test Author',
        email: 'test@example.com',
        bio: 'Test author bio'
      }
    ]
  }
};

// Console error suppression for tests
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: ReactDOM.render is deprecated')
  ) {
    return;
  }
  originalError.call(console, ...args);
};
