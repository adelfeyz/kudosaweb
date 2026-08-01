const { generateJWT, verifyJWT, getAllowedOrigin } = require('../test-utils.js');

describe('Authentication Unit Tests', () => {
  describe('JWT Functions', () => {
    test('should generate valid JWT token', () => {
      const payload = { username: 'admin', role: 'admin' };
      const secret = 'test-secret';

      const token = generateJWT(payload, secret);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    test('should verify valid JWT token', () => {
      const payload = { username: 'admin', role: 'admin' };
      const secret = 'test-secret';

      const token = generateJWT(payload, secret);
      const verifiedPayload = verifyJWT(token, secret);

      expect(verifiedPayload).toEqual(payload);
    });

    test('should throw error for invalid token format', () => {
      const invalidToken = 'invalid.token';
      const secret = 'test-secret';

      expect(() => {
        verifyJWT(invalidToken, secret);
      }).toThrow('Invalid token format');
    });

    test('should throw error for invalid token', () => {
      const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature';
      const secret = 'test-secret';

      expect(() => {
        verifyJWT(invalidToken, secret);
      }).toThrow('Invalid token');
    });
  });

  describe('CORS Helper Function', () => {
    test('should return correct origin for allowed domains', () => {
      const allowedOrigins = [
        'https://aidra.care',
        'https://2bac37c9.aidra-website.pages.dev',
        'https://3f5af779.aidra-website.pages.dev',
        'http://localhost:3000'
      ];

      allowedOrigins.forEach(origin => {
        const request = new Request('https://api.example.com', {
          headers: { 'Origin': origin }
        });

        const allowedOrigin = getAllowedOrigin(request);
        expect(allowedOrigin).toBe(origin);
      });
    });

    test('should return default origin for disallowed domains', () => {
      const request = new Request('https://api.example.com', {
        headers: { 'Origin': 'https://malicious-site.com' }
      });

      const allowedOrigin = getAllowedOrigin(request);
      expect(allowedOrigin).toBe('https://aidra.care');
    });

    test('should handle missing origin header', () => {
      const request = new Request('https://api.example.com');

      const allowedOrigin = getAllowedOrigin(request);
      expect(allowedOrigin).toBe('https://aidra.care');
    });
  });
});
