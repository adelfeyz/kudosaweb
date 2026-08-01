// Test utilities for API worker testing
const crypto = require('crypto');

// Mock Cloudflare Workers environment
class MockEnv {
  constructor() {
    this.DB = {
      prepare: jest.fn().mockReturnThis(),
      bind: jest.fn().mockReturnThis(),
      all: jest.fn().mockResolvedValue({ results: [] }),
      first: jest.fn().mockResolvedValue(null),
      run: jest.fn().mockResolvedValue({ meta: { last_row_id: 1 } })
    };
    this.JWT_SECRET = 'test-jwt-secret-key-2024';
    this.BREVO_API_KEY = 'test-brevo-api-key';
    this.TURNSTILE_SECRET_KEY = 'test-turnstile-secret';
    this.CLOUDFLARE_ACCOUNT_ID = 'test-account-id';
    this.CLOUDFLARE_IMAGES_TOKEN = 'test-images-token';
    this.CLOUDFLARE_ACCOUNT_HASH = 'test-account-hash';
  }
}

// JWT functions (copied from API worker)
function generateJWT(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = Buffer.from(JSON.stringify({ secret })).toString('base64');
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token format');
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    return payload;
  } catch (error) {
    if (error.message === 'Invalid token format') {
      throw error;
    }
    throw new Error('Invalid token');
  }
}

// CORS helper function
function getAllowedOrigin(request) {
  const origin = request.headers.get('Origin');
  const allowedOrigins = [
    'https://aidra.care',
    'https://2bac37c9.aidra-website.pages.dev',
    'https://3f5af779.aidra-website.pages.dev',
    'http://localhost:3000'
  ];
  
  return allowedOrigins.includes(origin || '') ? (origin || 'https://aidra.care') : 'https://aidra.care';
}

// Create test request
function createTestRequest(url, options = {}) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://3f5af779.aidra-website.pages.dev'
    }
  };
  return new Request(url, { ...defaultOptions, ...options });
}

// Mock database responses
const mockDbResponses = {
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
};

module.exports = {
  MockEnv,
  generateJWT,
  verifyJWT,
  getAllowedOrigin,
  createTestRequest,
  mockDbResponses
};
