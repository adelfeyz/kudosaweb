# External Blog API Testing Guide

## Overview

This guide provides comprehensive testing scenarios for the External Blog API to ensure security, functionality, and reliability.

## Prerequisites

1. **Postman Collection**: Import the `External-Blog-API.postman_collection.json` file
2. **Valid API Key**: Obtain a test API key from the administrator
3. **Database Access**: Ensure the database has sample data for testing

## Test Environment Setup

### 1. Import Postman Collection

1. Open Postman
2. Click "Import" → "Upload Files"
3. Select `External-Blog-API.postman_collection.json`
4. Set environment variables:
   - `baseUrl`: `https://unified-api.adel-feiz.workers.dev/api/external/blog`
   - `apiKey`: Your test API key

### 2. Verify Database Setup

Ensure the following data exists in the database:
- Dr. Samaneh Daftarian author record
- Sample categories (General Dentistry, Cosmetic Dentistry, etc.)
- Sample tags (Teeth Whitening, Dental Crowns, etc.)

## Test Scenarios

### 1. Authentication Tests

#### Test 1.1: Valid API Key
- **Request**: GET `/posts?limit=1`
- **Headers**: `X-API-Key: your-valid-key`
- **Expected**: 200 OK with posts data
- **Validation**: Response contains posts array

#### Test 1.2: Missing API Key
- **Request**: GET `/posts`
- **Headers**: None
- **Expected**: 401 Unauthorized
- **Validation**: Error message "API key required"

#### Test 1.3: Invalid API Key
- **Request**: GET `/posts`
- **Headers**: `X-API-Key: invalid-key`
- **Expected**: 401 Unauthorized
- **Validation**: Error message "Invalid API key"

### 2. Posts Endpoint Tests

#### Test 2.1: List Draft Posts
- **Request**: GET `/posts?page=1&limit=10`
- **Expected**: 200 OK
- **Validation**:
  - Response contains `posts`, `total`, `page`, `limit`, `totalPages`
  - All posts have `status: "draft"`
  - All posts have `author_name: "Dr. Samaneh Daftarian"`

#### Test 2.2: Search Draft Posts
- **Request**: GET `/posts?search=dental&page=1&limit=5`
- **Expected**: 200 OK
- **Validation**: Only posts matching search criteria are returned

#### Test 2.3: Get Single Draft Post
- **Request**: GET `/posts/{valid-draft-id}`
- **Expected**: 200 OK
- **Validation**: Single post object with draft status

#### Test 2.4: Get Non-existent Post
- **Request**: GET `/posts/99999`
- **Expected**: 404 Not Found
- **Validation**: Error message "Post not found or not accessible"

### 3. Create Post Tests

#### Test 3.1: Create Valid Draft Post
- **Request**: POST `/posts`
- **Body**:
```json
{
  "title": "Test Dental Post",
  "slug": "test-dental-post",
  "excerpt": "Test excerpt for dental post",
  "content": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"Test content\"}]}]}",
  "seo_title": "Test Dental Post - iCreateSmiles",
  "seo_description": "Test SEO description",
  "meta_keywords": "test, dental, post",
  "category_ids": [1, 2],
  "tag_ids": [5, 8]
}
```
- **Expected**: 201 Created
- **Validation**:
  - Post created with `status: "draft"`
  - Author automatically set to Dr. Samaneh Daftarian
  - Categories and tags properly linked

#### Test 3.2: Create Post - Missing Required Fields
- **Request**: POST `/posts`
- **Body**: `{"title": "Test Post"}`
- **Expected**: 400 Bad Request
- **Validation**: Error message "Missing required fields: title, slug, content"

#### Test 3.3: Create Post - Invalid TipTap Content
- **Request**: POST `/posts`
- **Body**:
```json
{
  "title": "Test Post",
  "slug": "test-post",
  "content": "Invalid JSON content"
}
```
- **Expected**: 400 Bad Request
- **Validation**: Error message "Invalid content format. Must be valid TipTap JSON."

#### Test 3.4: Create Post - Duplicate Slug
- **Request**: POST `/posts` (with existing slug)
- **Expected**: 400 Bad Request or 409 Conflict
- **Validation**: Error message about duplicate slug

### 4. Update Post Tests

#### Test 4.1: Update Existing Draft Post
- **Request**: PUT `/posts/{draft-post-id}`
- **Body**:
```json
{
  "title": "Updated Test Post",
  "excerpt": "Updated excerpt"
}
```
- **Expected**: 200 OK
- **Validation**: Post updated but status remains "draft"

#### Test 4.2: Update Non-existent Post
- **Request**: PUT `/posts/99999`
- **Expected**: 404 Not Found
- **Validation**: Error message "Post not found or not editable"

#### Test 4.3: Update Published Post (Should Fail)
- **Request**: PUT `/posts/{published-post-id}`
- **Expected**: 404 Not Found
- **Validation**: Cannot update published posts

### 5. Reference Data Tests

#### Test 5.1: Get Categories
- **Request**: GET `/categories`
- **Expected**: 200 OK
- **Validation**:
  - Response contains categories array
  - Each category has `id`, `name`, `slug`, `description`, `color`, `icon`
  - No authentication required

#### Test 5.2: Get Tags
- **Request**: GET `/tags`
- **Expected**: 200 OK
- **Validation**:
  - Response contains tags array
  - Each tag has `id`, `name`, `slug`
  - No authentication required

#### Test 5.3: Get Default Author
- **Request**: GET `/authors`
- **Expected**: 200 OK
- **Validation**:
  - Response contains author object
  - Author name contains "Samaneh Daftarian"
  - No authentication required

### 6. Security Tests

#### Test 6.1: Author Override Verification
- **Request**: POST `/posts`
- **Body**: Include `author_id` field
- **Expected**: Author should be overridden to Dr. Samaneh Daftarian
- **Validation**: Response shows correct author regardless of input

#### Test 6.2: Status Override Verification
- **Request**: POST `/posts`
- **Body**: Include `status: "published"`
- **Expected**: Status should be forced to "draft"
- **Validation**: Response shows `status: "draft"`

#### Test 6.3: Cannot Access Published Posts
- **Request**: GET `/posts/{published-post-id}`
- **Expected**: 404 Not Found
- **Validation**: Published posts are not accessible

### 7. Rate Limiting Tests

#### Test 7.1: Normal Request
- **Request**: GET `/posts?limit=1`
- **Expected**: 200 OK
- **Validation**: Rate limit headers present

#### Test 7.2: Rate Limit Exceeded
- **Process**: Make 101 requests within 1 hour
- **Expected**: 429 Too Many Requests
- **Validation**: Error message "Rate limit exceeded"

### 8. Error Handling Tests

#### Test 8.1: Invalid JSON
- **Request**: POST `/posts`
- **Body**: Invalid JSON string
- **Expected**: 400 Bad Request
- **Validation**: Proper error message

#### Test 8.2: Server Error Simulation
- **Request**: GET `/posts` (with malformed query)
- **Expected**: 500 Internal Server Error
- **Validation**: Generic error message returned

## Automated Testing Script

### Postman Test Script

Add this to the "Tests" tab of each request:

```javascript
// Basic response validation
pm.test('Response time is less than 5000ms', function () {
    pm.expect(pm.response.responseTime).to.be.below(5000);
});

pm.test('Response has valid JSON', function () {
    pm.response.to.be.json;
});

// Check for rate limiting headers
if (pm.response.headers.get('X-RateLimit-Limit')) {
    pm.test('Rate limit headers present', function () {
        pm.expect(pm.response.headers.get('X-RateLimit-Limit')).to.exist;
        pm.expect(pm.response.headers.get('X-RateLimit-Remaining')).to.exist;
    });
}

// Log response for debugging
console.log('Response Status:', pm.response.status);
console.log('Response Time:', pm.response.responseTime + 'ms');
```

### Newman CLI Testing

Run tests from command line:

```bash
# Install Newman
npm install -g newman

# Run collection
newman run External-Blog-API.postman_collection.json \
  --environment postman-environment.json \
  --reporters cli,html \
  --reporter-html-export test-results.html
```

## Performance Testing

### Load Testing with Artillery

Create `artillery-config.yml`:

```yaml
config:
  target: 'https://unified-api.adel-feiz.workers.dev'
  phases:
    - duration: 60
      arrivalRate: 10
  headers:
    X-API-Key: 'your-api-key-here'

scenarios:
  - name: "Test API endpoints"
    weight: 100
    flow:
      - get:
          url: "/api/external/blog/posts?limit=10"
      - think: 1
      - get:
          url: "/api/external/blog/categories"
      - think: 1
      - get:
          url: "/api/external/blog/tags"
```

Run load test:

```bash
artillery run artillery-config.yml
```

## Security Testing Checklist

- [ ] API key authentication works
- [ ] Invalid API keys are rejected
- [ ] Missing API keys are rejected
- [ ] Only draft posts are accessible
- [ ] Published posts are not accessible
- [ ] Author is always overridden to Dr. Samaneh Daftarian
- [ ] Status is always forced to "draft"
- [ ] Rate limiting is enforced
- [ ] Audit logging is working
- [ ] CORS headers are properly set
- [ ] Input validation works
- [ ] SQL injection protection
- [ ] XSS protection in responses

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check API key format and validity
2. **404 Not Found**: Verify post ID exists and is draft status
3. **400 Bad Request**: Check required fields and content format
4. **429 Too Many Requests**: Wait for rate limit reset
5. **500 Internal Server Error**: Check server logs and database connection

### Debug Steps

1. Check API key in headers
2. Verify request format and content
3. Check rate limit headers
4. Review server logs
5. Test with minimal request
6. Verify database connectivity

## Test Data Cleanup

After testing, clean up test data:

```sql
-- Remove test posts
DELETE FROM blog_posts WHERE title LIKE 'Test%';

-- Remove test API keys
DELETE FROM api_keys_metadata WHERE name LIKE 'Test%';
```

## Reporting

Generate test reports:

1. **Postman**: Use built-in reporting
2. **Newman**: HTML/JSON reports
3. **Artillery**: Performance metrics
4. **Custom**: Log analysis and monitoring

## Continuous Integration

Add to CI/CD pipeline:

```yaml
# .github/workflows/api-test.yml
name: API Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run API Tests
        run: |
          npm install -g newman
          newman run postman/External-Blog-API.postman_collection.json
```
