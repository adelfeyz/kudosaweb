# Aidra API Test Suite

This directory contains a comprehensive test suite for the Aidra API and frontend, including unit tests, integration tests, and end-to-end tests.

## 📁 Test Structure

```
tests/
├── unit/                 # Unit tests for individual functions
│   ├── auth.test.js     # Authentication tests
│   └── blog.test.js     # Blog functionality tests
├── integration/          # Integration tests for API endpoints
│   └── api.test.js      # API integration tests
├── e2e/                 # End-to-end tests
│   ├── frontend.test.js # Frontend E2E tests
│   └── api.test.js      # API E2E tests
├── package.json         # Test dependencies
├── setup.js            # Jest setup configuration
├── playwright.config.js # Playwright configuration
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git

### Installation

1. Navigate to the tests directory:
```bash
cd tests
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.test
# Edit .env.test with your test configuration
```

## 🧪 Running Tests

### Unit Tests (Jest)

```bash
# Run all unit tests
npm run test:unit

# Run specific test file
npm test unit/auth.test.js

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Integration Tests (Jest + Supertest)

```bash
# Run all integration tests
npm run test:integration

# Run specific integration test
npm test integration/api.test.js
```

### End-to-End Tests (Playwright)

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run specific E2E test
npx playwright test e2e/frontend.test.js

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests with UI
npx playwright test --ui

# Run tests in headed mode
npx playwright test --headed
```

### All Tests

```bash
# Run all tests
npm test

# Run all tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

## 📊 Test Coverage

The test suite provides comprehensive coverage for:

### Unit Tests
- ✅ JWT token generation and verification
- ✅ CORS origin validation
- ✅ Blog post CRUD operations
- ✅ Category management
- ✅ Author management
- ✅ Error handling

### Integration Tests
- ✅ API endpoint functionality
- ✅ Authentication flows
- ✅ CORS handling
- ✅ Request/response validation
- ✅ Database operations
- ✅ Error scenarios

### E2E Tests
- ✅ Frontend page navigation
- ✅ User interactions
- ✅ Admin panel functionality
- ✅ Blog management workflows
- ✅ Responsive design
- ✅ Performance metrics
- ✅ Accessibility compliance

## 🔧 Configuration

### Jest Configuration

Jest is configured in `package.json` with:
- Node.js test environment
- Coverage reporting
- Test file patterns
- Setup file integration

### Playwright Configuration

Playwright is configured in `playwright.config.js` with:
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile device testing
- Screenshot and video capture on failure
- Parallel test execution
- CI/CD integration

### Environment Variables

Create a `.env.test` file with:

```env
NODE_ENV=test
JWT_SECRET=test-jwt-secret-key-2024
BREVO_API_KEY=test-brevo-api-key
TURNSTILE_SECRET_KEY=test-turnstile-secret
CLOUDFLARE_ACCOUNT_ID=test-account-id
CLOUDFLARE_IMAGES_TOKEN=test-images-token
CLOUDFLARE_ACCOUNT_HASH=test-account-hash
```

## 🎯 Test Categories

### 1. Unit Tests (`unit/`)

**Purpose**: Test individual functions in isolation

**Coverage**:
- Authentication functions (JWT, CORS)
- Blog post operations
- Category and author management
- Error handling utilities

**Example**:
```javascript
test('should generate valid JWT token', () => {
  const payload = { username: 'admin', role: 'admin' };
  const token = generateJWT(payload, secret);
  expect(token.split('.')).toHaveLength(3);
});
```

### 2. Integration Tests (`integration/`)

**Purpose**: Test API endpoints with mocked dependencies

**Coverage**:
- HTTP request/response handling
- Authentication flows
- CORS preflight requests
- Error status codes
- Response format validation

**Example**:
```javascript
test('should fetch blog posts', async () => {
  const response = await request(baseURL)
    .get('/blog/posts')
    .set('Origin', 'https://3f5af779.aidra-website.pages.dev');
  
  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
});
```

### 3. E2E Tests (`e2e/`)

**Purpose**: Test complete user workflows

**Coverage**:
- Frontend page navigation
- User interactions
- Admin panel workflows
- Cross-browser compatibility
- Mobile responsiveness
- Performance metrics

**Example**:
```javascript
test('should login and access admin panel', async ({ page }) => {
  await page.goto('/crm');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'aidra2024');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/crm\/dashboard/);
});
```

## 🚨 CI/CD Integration

### GitHub Actions

Add this to your `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd tests && npm ci
      - run: cd tests && npm run test:ci
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: tests/playwright-report/
```

### Local Development

```bash
# Pre-commit hook (add to package.json scripts)
"precommit": "cd tests && npm run test:unit && npm run test:integration"

# Development workflow
npm run test:watch  # Run tests in watch mode
npm run test:coverage  # Generate coverage report
```

## 📈 Monitoring and Reporting

### Coverage Reports

Jest generates coverage reports in:
- `tests/coverage/` - HTML coverage report
- `tests/coverage/lcov.info` - LCOV format for CI

### Test Results

Playwright generates:
- `tests/playwright-report/` - HTML test report
- `tests/test-results/` - Screenshots and videos
- `tests/test-results/results.json` - JSON results
- `tests/test-results/results.xml` - JUnit XML for CI

### Performance Metrics

E2E tests include performance monitoring:
- Page load times
- API response times
- Memory usage
- Network requests

## 🐛 Debugging

### Unit/Integration Tests

```bash
# Debug with Node.js inspector
node --inspect-brk node_modules/.bin/jest --runInBand

# Debug specific test
npm test -- --testNamePattern="should generate valid JWT token"
```

### E2E Tests

```bash
# Debug with Playwright Inspector
npx playwright test --debug

# Debug specific test
npx playwright test --debug e2e/frontend.test.js

# Run in headed mode
npx playwright test --headed
```

### Common Issues

1. **CORS Errors**: Ensure test environment has correct origins
2. **Authentication Failures**: Check JWT secret in test environment
3. **Database Connection**: Verify test database configuration
4. **Timeout Issues**: Increase Jest timeout for slow operations

## 🔄 Maintenance

### Adding New Tests

1. **Unit Tests**: Add to appropriate `unit/` file
2. **Integration Tests**: Add to `integration/api.test.js`
3. **E2E Tests**: Add to appropriate `e2e/` file

### Updating Test Data

- Mock data is in `setup.js`
- Test fixtures can be added to `fixtures/` directory
- Environment variables in `.env.test`

### Test Maintenance

```bash
# Update dependencies
npm update

# Update Playwright browsers
npx playwright install

# Regenerate test reports
npm run test:coverage
npx playwright show-report
```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testing-library.com/docs/guiding-principles)

## 🤝 Contributing

When adding new tests:

1. Follow existing naming conventions
2. Include both positive and negative test cases
3. Add appropriate error handling tests
4. Update this README if adding new test categories
5. Ensure tests are deterministic and repeatable

## 📞 Support

For test-related issues:
1. Check the troubleshooting section above
2. Review test logs and error messages
3. Verify environment configuration
4. Check for recent changes in API endpoints
