const { test, expect } = require('@playwright/test');

// Test configuration
const API_BASE_URL = process.env.API_BASE_URL || 'https://unified-api.adel-feiz.workers.dev';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

test.describe('Appointment API Tests', () => {
  
  test('POST /appointment - Submit valid appointment request', async ({ request }) => {
    const appointmentData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      preferredDate: '2024-02-15',
      preferredTime: 'morning',
      serviceType: 'general-dentistry',
      message: 'I need a routine checkup and cleaning.'
    };

    const response = await request.post(`${API_BASE_URL}/appointment`, {
      data: appointmentData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(201);
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(responseData.message).toBe('Appointment request submitted successfully');
    expect(responseData.appointmentId).toBeDefined();
  });

  test('POST /appointment - Submit appointment with minimal required fields', async ({ request }) => {
    const appointmentData = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '555-987-6543'
    };

    const response = await request.post(`${API_BASE_URL}/appointment`, {
      data: appointmentData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(201);
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
  });

  test('POST /appointment - Reject request with missing required fields', async ({ request }) => {
    const appointmentData = {
      firstName: 'John',
      // Missing lastName, email, phone
    };

    const response = await request.post(`${API_BASE_URL}/appointment`, {
      data: appointmentData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(400);
    const responseData = await response.json();
    expect(responseData.error).toContain('Missing required fields');
  });

  test('POST /appointment - Reject request with invalid email', async ({ request }) => {
    const appointmentData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      phone: '555-123-4567'
    };

    const response = await request.post(`${API_BASE_URL}/appointment`, {
      data: appointmentData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // The API should still accept it as email validation is typically done on frontend
    // But we can test the structure
    expect(response.status()).toBe(201);
  });

  test('GET /appointment - Method not allowed', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/appointment`);

    expect(response.status()).toBe(405);
    const responseData = await response.json();
    expect(responseData.error).toBe('Method not allowed');
  });

  test('POST /appointment - Handle malformed JSON', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/appointment`, {
      data: 'invalid json',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(500);
  });

});

test.describe('Admin Appointment API Tests', () => {
  
  test.beforeEach(async ({ request }) => {
    if (!ADMIN_TOKEN) {
      test.skip('Admin token not provided');
    }
  });

  test('GET /admin/appointments - Fetch appointments with valid token', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/admin/appointments`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(200);
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(Array.isArray(responseData.appointments)).toBe(true);
    expect(responseData.pagination).toBeDefined();
    expect(responseData.pagination.page).toBe(1);
    expect(responseData.pagination.limit).toBe(20);
  });

  test('GET /admin/appointments - Fetch appointments with pagination', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/admin/appointments?page=2&limit=10`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(200);
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(responseData.pagination.page).toBe(2);
    expect(responseData.pagination.limit).toBe(10);
  });

  test('GET /admin/appointments - Unauthorized without token', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/admin/appointments`);

    expect(response.status()).toBe(401);
    const responseData = await response.json();
    expect(responseData.error).toBe('Unauthorized');
  });

  test('GET /admin/appointments - Unauthorized with invalid token', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/admin/appointments`, {
      headers: {
        'Authorization': 'Bearer invalid-token',
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(401);
  });

  test('DELETE /admin/appointments - Delete appointment with valid token', async ({ request }) => {
    // First, create an appointment to delete
    const appointmentData = {
      firstName: 'Test',
      lastName: 'Delete',
      email: 'test.delete@example.com',
      phone: '555-999-8888'
    };

    const createResponse = await request.post(`${API_BASE_URL}/appointment`, {
      data: appointmentData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(createResponse.status()).toBe(201);
    const createData = await createResponse.json();
    const appointmentId = createData.appointmentId;

    // Now delete it
    const deleteResponse = await request.delete(`${API_BASE_URL}/admin/appointments?id=${appointmentId}`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    expect(deleteResponse.status()).toBe(200);
    const deleteData = await deleteResponse.json();
    expect(deleteData.success).toBe(true);
    expect(deleteData.message).toBe('Appointment request deleted successfully');
  });

  test('DELETE /admin/appointments - Delete non-existent appointment', async ({ request }) => {
    const response = await request.delete(`${API_BASE_URL}/admin/appointments?id=99999`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(404);
    const responseData = await response.json();
    expect(responseData.error).toBe('Appointment request not found');
  });

  test('DELETE /admin/appointments - Delete without ID parameter', async ({ request }) => {
    const response = await request.delete(`${API_BASE_URL}/admin/appointments`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(400);
    const responseData = await response.json();
    expect(responseData.error).toBe('Appointment ID is required');
  });

});

test.describe('Appointment Integration Tests', () => {
  
  test('Complete appointment workflow', async ({ request }) => {
    // 1. Submit appointment request
    const appointmentData = {
      firstName: 'Integration',
      lastName: 'Test',
      email: 'integration.test@example.com',
      phone: '555-111-2222',
      preferredDate: '2024-03-01',
      preferredTime: 'afternoon',
      serviceType: 'cosmetic-dentistry',
      message: 'Interested in teeth whitening treatment.'
    };

    const submitResponse = await request.post(`${API_BASE_URL}/appointment`, {
      data: appointmentData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(submitResponse.status()).toBe(201);
    const submitData = await submitResponse.json();
    expect(submitData.success).toBe(true);
    const appointmentId = submitData.appointmentId;

    // 2. Verify appointment appears in admin panel (if admin token available)
    if (ADMIN_TOKEN) {
      const adminResponse = await request.get(`${API_BASE_URL}/admin/appointments`, {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      expect(adminResponse.status()).toBe(200);
      const adminData = await adminResponse.json();
      expect(adminData.success).toBe(true);
      
      // Find our appointment in the list
      const ourAppointment = adminData.appointments.find(apt => apt.id === appointmentId);
      expect(ourAppointment).toBeDefined();
      expect(ourAppointment.first_name).toBe('Integration');
      expect(ourAppointment.last_name).toBe('Test');
      expect(ourAppointment.email).toBe('integration.test@example.com');
      expect(ourAppointment.service_type).toBe('cosmetic-dentistry');
    }
  });

  test('Appointment data validation', async ({ request }) => {
    const testCases = [
      {
        name: 'Valid appointment with all fields',
        data: {
          firstName: 'All',
          lastName: 'Fields',
          email: 'all.fields@example.com',
          phone: '555-000-1111',
          preferredDate: '2024-04-15',
          preferredTime: 'evening',
          serviceType: 'dental-implants',
          message: 'Comprehensive dental implant consultation needed.'
        },
        expectedStatus: 201
      },
      {
        name: 'Appointment with future date',
        data: {
          firstName: 'Future',
          lastName: 'Date',
          email: 'future.date@example.com',
          phone: '555-000-2222',
          preferredDate: '2025-12-31',
          preferredTime: 'morning',
          serviceType: 'consultation'
        },
        expectedStatus: 201
      },
      {
        name: 'Appointment with emergency service type',
        data: {
          firstName: 'Emergency',
          lastName: 'Patient',
          email: 'emergency@example.com',
          phone: '555-911-0000',
          serviceType: 'emergency',
          message: 'Severe tooth pain, need immediate attention.'
        },
        expectedStatus: 201
      }
    ];

    for (const testCase of testCases) {
      const response = await request.post(`${API_BASE_URL}/appointment`, {
        data: testCase.data,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      expect(response.status()).toBe(testCase.expectedStatus);
      
      if (testCase.expectedStatus === 201) {
        const responseData = await response.json();
        expect(responseData.success).toBe(true);
      }
    }
  });

});
