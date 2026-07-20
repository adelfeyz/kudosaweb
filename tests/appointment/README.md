# Appointment System Tests

This directory contains comprehensive tests for the appointment scheduling system.

## Test Files

### 1. `appointment-api.test.js`
Tests the API endpoints for appointment functionality:
- POST `/appointment` - Submit appointment requests
- GET `/admin/appointments` - Admin retrieval of appointments
- DELETE `/admin/appointments` - Admin deletion of appointments
- Error handling and validation
- Authentication and authorization

### 2. `appointment-frontend.test.js`
Tests the frontend appointment form and user experience:
- Form rendering and validation
- User interaction flows
- Responsive design
- Error handling
- Navigation from homepage

### 3. `appointment-database.test.js`
Tests database operations and data integrity:
- Schema validation
- Data persistence
- Performance and indexing
- Data type validation
- Cleanup operations

## Running the Tests

### Prerequisites
1. Set up environment variables:
   ```bash
   export API_BASE_URL="https://unified-api.adel-feiz.workers.dev"
   export ADMIN_TOKEN="your-admin-token-here"
   ```

2. Install dependencies:
   ```bash
   npm install @playwright/test
   ```

### Run All Tests
```bash
npx playwright test tests/appointment/
```

### Run Specific Test Files
```bash
# API tests only
npx playwright test tests/appointment/appointment-api.test.js

# Frontend tests only
npx playwright test tests/appointment/appointment-frontend.test.js

# Database tests only
npx playwright test tests/appointment/appointment-database.test.js
```

### Run with Specific Browser
```bash
npx playwright test tests/appointment/ --project=chromium
npx playwright test tests/appointment/ --project=firefox
npx playwright test tests/appointment/ --project=webkit
```

## Test Configuration

### Environment Variables
- `API_BASE_URL`: Base URL for the API (default: https://unified-api.adel-feiz.workers.dev)
- `ADMIN_TOKEN`: JWT token for admin authentication (required for admin tests)

### Test Data
Tests use realistic but safe test data:
- Email addresses: `*.test@example.com`
- Phone numbers: `555-*-****`
- Names: Test-specific names to avoid conflicts

## Test Coverage

### API Endpoints
- ✅ POST `/appointment` - Create appointment
- ✅ GET `/admin/appointments` - List appointments (admin)
- ✅ DELETE `/admin/appointments` - Delete appointment (admin)
- ✅ Error handling and validation
- ✅ Authentication and authorization

### Frontend Components
- ✅ Appointment form rendering
- ✅ Form validation (client-side)
- ✅ User interaction flows
- ✅ Success/error message handling
- ✅ Responsive design
- ✅ Navigation integration

### Database Operations
- ✅ Data persistence
- ✅ Schema validation
- ✅ Data type checking
- ✅ Performance testing
- ✅ Cleanup operations

## Expected Test Results

### Successful Test Run
```
Running 15 tests using 1 worker

✓ tests/appointment/appointment-api.test.js:3:1 › Appointment API Tests › POST /appointment - Submit valid appointment request (2.1s)
✓ tests/appointment/appointment-api.test.js:3:1 › Appointment API Tests › POST /appointment - Submit appointment with minimal required fields (1.8s)
✓ tests/appointment/appointment-api.test.js:3:1 › Appointment API Tests › POST /appointment - Reject request with missing required fields (1.2s)
✓ tests/appointment/appointment-frontend.test.js:3:1 › Appointment Frontend Tests › Appointment page loads correctly (3.4s)
✓ tests/appointment/appointment-frontend.test.js:3:1 › Appointment Frontend Tests › Form validation - required fields (2.1s)
✓ tests/appointment/appointment-frontend.test.js:3:1 › Appointment Frontend Tests › Form submission with valid data (4.2s)
✓ tests/appointment/appointment-database.test.js:3:1 › Appointment Database Tests › Database schema migration (1.9s)
✓ tests/appointment/appointment-database.test.js:3:1 › Appointment Database Tests › Database constraints and validation (2.3s)

15 passed (25.1s)
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Ensure `ADMIN_TOKEN` is set correctly
   - Check token expiration
   - Verify API endpoint accessibility

2. **Network Timeouts**
   - Check API_BASE_URL is correct
   - Verify network connectivity
   - Consider increasing timeout values

3. **Test Data Conflicts**
   - Tests use unique identifiers to avoid conflicts
   - Clean up test data if needed
   - Check for existing test appointments

### Debug Mode
Run tests with debug output:
```bash
npx playwright test tests/appointment/ --debug
```

### Test Reports
Generate detailed test reports:
```bash
npx playwright test tests/appointment/ --reporter=html
```

## Maintenance

### Adding New Tests
1. Follow the existing test structure
2. Use descriptive test names
3. Include both positive and negative test cases
4. Add appropriate assertions
5. Update this README if needed

### Test Data Management
- Use realistic but safe test data
- Avoid hardcoded values when possible
- Clean up test data after tests
- Use unique identifiers to prevent conflicts

### Performance Monitoring
- Monitor test execution times
- Identify slow tests
- Optimize database queries if needed
- Update timeout values as necessary
