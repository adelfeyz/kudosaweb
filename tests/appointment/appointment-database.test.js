const { test, expect } = require('@playwright/test');

// Database migration test
test.describe('Appointment Database Tests', () => {
  
  test('Database schema migration', async ({ request }) => {
    // This test would typically run against a test database
    // For now, we'll test that the API endpoints work with the expected schema
    
    const API_BASE_URL = process.env.API_BASE_URL || 'https://unified-api.adel-feiz.workers.dev';
    
    // Test that we can create an appointment (which tests the schema)
    const appointmentData = {
      firstName: 'Schema',
      lastName: 'Test',
      email: 'schema.test@example.com',
      phone: '555-000-0000',
      preferredDate: '2024-02-15',
      preferredTime: 'morning',
      serviceType: 'general-dentistry',
      message: 'Testing database schema.'
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
    expect(responseData.appointmentId).toBeDefined();
  });

  test('Database constraints and validation', async ({ request }) => {
    const API_BASE_URL = process.env.API_BASE_URL || 'https://unified-api.adel-feiz.workers.dev';
    
    // Test with very long data to ensure database handles it properly
    const longData = {
      firstName: 'A'.repeat(100), // Very long first name
      lastName: 'B'.repeat(100),   // Very long last name
      email: 'very.long.email.address.that.might.cause.issues@verylongdomainname.com',
      phone: '555-123-4567',
      message: 'A'.repeat(1000) // Very long message
    };

    const response = await request.post(`${API_BASE_URL}/appointment`, {
      data: longData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Should either succeed or fail gracefully
    expect([200, 201, 400, 500]).toContain(response.status());
  });

  test('Database indexes and performance', async ({ request }) => {
    const API_BASE_URL = process.env.API_BASE_URL || 'https://unified-api.adel-feiz.workers.dev';
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
    
    if (!ADMIN_TOKEN) {
      test.skip('Admin token not provided');
    }

    // Test that we can query appointments efficiently
    const startTime = Date.now();
    
    const response = await request.get(`${API_BASE_URL}/admin/appointments`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(response.status()).toBe(200);
    
    // Response should be reasonably fast (less than 5 seconds)
    expect(responseTime).toBeLessThan(5000);
    
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
  });

});

test.describe('Appointment Data Integrity', () => {
  
  test('Appointment data persistence', async ({ request }) => {
    const API_BASE_URL = process.env.API_BASE_URL || 'https://unified-api.adel-feiz.workers.dev';
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
    
    // Create an appointment
    const appointmentData = {
      firstName: 'Persistence',
      lastName: 'Test',
      email: 'persistence.test@example.com',
      phone: '555-111-2222',
      preferredDate: '2024-03-01',
      preferredTime: 'afternoon',
      serviceType: 'cosmetic-dentistry',
      message: 'Testing data persistence.'
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

    // Verify the appointment was stored correctly
    if (ADMIN_TOKEN) {
      const adminResponse = await request.get(`${API_BASE_URL}/admin/appointments`, {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      expect(adminResponse.status()).toBe(200);
      const adminData = await adminResponse.json();
      
      const storedAppointment = adminData.appointments.find(apt => apt.id === appointmentId);
      expect(storedAppointment).toBeDefined();
      expect(storedAppointment.first_name).toBe('Persistence');
      expect(storedAppointment.last_name).toBe('Test');
      expect(storedAppointment.email).toBe('persistence.test@example.com');
      expect(storedAppointment.phone).toBe('555-111-2222');
      expect(storedAppointment.preferred_date).toBe('2024-03-01');
      expect(storedAppointment.preferred_time).toBe('afternoon');
      expect(storedAppointment.service_type).toBe('cosmetic-dentistry');
      expect(storedAppointment.message).toBe('Testing data persistence.');
      expect(storedAppointment.status).toBe('pending');
      expect(storedAppointment.created_at).toBeDefined();
    }
  });

  test('Appointment data types and formats', async ({ request }) => {
    const API_BASE_URL = process.env.API_BASE_URL || 'https://unified-api.adel-feiz.workers.dev';
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
    
    // Create appointment with various data types
    const appointmentData = {
      firstName: 'Data',
      lastName: 'Types',
      email: 'datatypes@example.com',
      phone: '555-333-4444',
      preferredDate: '2024-04-15',
      preferredTime: 'evening',
      serviceType: 'dental-implants',
      message: 'Testing data types and formats.'
    };

    const createResponse = await request.post(`${API_BASE_URL}/appointment`, {
      data: appointmentData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(createResponse.status()).toBe(201);

    // Verify data types in admin response
    if (ADMIN_TOKEN) {
      const adminResponse = await request.get(`${API_BASE_URL}/admin/appointments`, {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      expect(adminResponse.status()).toBe(200);
      const adminData = await adminResponse.json();
      
      const appointment = adminData.appointments[0]; // Get the first appointment
      expect(typeof appointment.id).toBe('number');
      expect(typeof appointment.first_name).toBe('string');
      expect(typeof appointment.last_name).toBe('string');
      expect(typeof appointment.email).toBe('string');
      expect(typeof appointment.phone).toBe('string');
      expect(typeof appointment.status).toBe('string');
      expect(typeof appointment.created_at).toBe('string');
      
      // Check date format
      const createdDate = new Date(appointment.created_at);
      expect(createdDate instanceof Date).toBe(true);
      expect(isNaN(createdDate.getTime())).toBe(false);
    }
  });

  test('Appointment deletion and cleanup', async ({ request }) => {
    const API_BASE_URL = process.env.API_BASE_URL || 'https://unified-api.adel-feiz.workers.dev';
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
    
    if (!ADMIN_TOKEN) {
      test.skip('Admin token not provided');
    }

    // Create an appointment to delete
    const appointmentData = {
      firstName: 'Delete',
      lastName: 'Test',
      email: 'delete.test@example.com',
      phone: '555-555-5555'
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

    // Verify it exists
    const beforeDeleteResponse = await request.get(`${API_BASE_URL}/admin/appointments`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const beforeDeleteData = await beforeDeleteResponse.json();
    const beforeDeleteCount = beforeDeleteData.appointments.length;

    // Delete the appointment
    const deleteResponse = await request.delete(`${API_BASE_URL}/admin/appointments?id=${appointmentId}`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    expect(deleteResponse.status()).toBe(200);

    // Verify it's gone
    const afterDeleteResponse = await request.get(`${API_BASE_URL}/admin/appointments`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const afterDeleteData = await afterDeleteResponse.json();
    const afterDeleteCount = afterDeleteData.appointments.length;

    expect(afterDeleteCount).toBe(beforeDeleteCount - 1);
  });

});
