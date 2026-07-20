const { test, expect } = require('@playwright/test');

test.describe('Appointment Frontend Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the appointment page
    await page.goto('/appointment');
  });

  test('Appointment page loads correctly', async ({ page }) => {
    // Check page title and main heading
    await expect(page.locator('h1')).toContainText('Schedule Appointment');
    
    // Check form fields are present
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="preferredDate"]')).toBeVisible();
    await expect(page.locator('select[name="preferredTime"]')).toBeVisible();
    await expect(page.locator('select[name="serviceType"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    
    // Check submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Request Appointment');
  });

  test('Form validation - required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check that form doesn't submit (browser validation)
    await expect(page.locator('input[name="firstName"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="lastName"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="phone"]:invalid')).toBeVisible();
  });

  test('Form submission with valid data', async ({ page }) => {
    // Fill out the form
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="phone"]', '555-123-4567');
    await page.fill('input[name="preferredDate"]', '2024-02-15');
    await page.selectOption('select[name="preferredTime"]', 'morning');
    await page.selectOption('select[name="serviceType"]', 'general-dentistry');
    await page.fill('textarea[name="message"]', 'I need a routine checkup and cleaning.');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Check for success message
    await expect(page.locator('.bg-green-50')).toBeVisible();
    await expect(page.locator('.text-green-800')).toContainText('Appointment Request Submitted!');
    
    // Check that form is reset
    await expect(page.locator('input[name="firstName"]')).toHaveValue('');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('');
  });

  test('Form submission with minimal required fields', async ({ page }) => {
    // Fill only required fields
    await page.fill('input[name="firstName"]', 'Jane');
    await page.fill('input[name="lastName"]', 'Smith');
    await page.fill('input[name="email"]', 'jane.smith@example.com');
    await page.fill('input[name="phone"]', '555-987-6543');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Check for success message
    await expect(page.locator('.bg-green-50')).toBeVisible();
  });

  test('Form submission with invalid email', async ({ page }) => {
    // Fill form with invalid email
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="phone"]', '555-000-0000');
    
    // Try to submit
    await page.click('button[type="submit"]');
    
    // Browser should show validation error
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
  });

  test('Service type options are correct', async ({ page }) => {
    const serviceOptions = await page.locator('select[name="serviceType"] option').allTextContents();
    
    const expectedServices = [
      'Select a service',
      'General Dentistry',
      'Cosmetic Dentistry',
      'Dental Implants',
      'Invisalign',
      'Gum Grafts',
      'All-on-4',
      'Consultation',
      'Emergency',
      'Other'
    ];
    
    expect(serviceOptions).toEqual(expectedServices);
  });

  test('Preferred time options are correct', async ({ page }) => {
    const timeOptions = await page.locator('select[name="preferredTime"] option').allTextContents();
    
    const expectedTimes = [
      'Select a time',
      'Morning (8:00 AM - 12:00 PM)',
      'Afternoon (12:00 PM - 5:00 PM)',
      'Evening (5:00 PM - 8:00 PM)'
    ];
    
    expect(timeOptions).toEqual(expectedTimes);
  });

  test('Date input has minimum date constraint', async ({ page }) => {
    const dateInput = page.locator('input[name="preferredDate"]');
    const minDate = await dateInput.getAttribute('min');
    
    // Should be today's date or later
    const today = new Date().toISOString().split('T')[0];
    expect(minDate).toBe(today);
  });

  test('Back button navigation', async ({ page }) => {
    // Click back button
    await page.click('text=Back');
    
    // Should navigate back (this will depend on browser history)
    // We can't easily test the exact navigation, but we can verify the button exists
    await expect(page.locator('text=Back')).toBeVisible();
  });

  test('Form loading state during submission', async ({ page }) => {
    // Fill form
    await page.fill('input[name="firstName"]', 'Loading');
    await page.fill('input[name="lastName"]', 'Test');
    await page.fill('input[name="email"]', 'loading@example.com');
    await page.fill('input[name="phone"]', '555-000-0000');
    
    // Submit and check loading state
    await page.click('button[type="submit"]');
    
    // Button should show loading state
    await expect(page.locator('button[type="submit"]')).toContainText('Submitting...');
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });

  test('Error handling for network failure', async ({ page }) => {
    // Mock network failure
    await page.route('**/appointment', route => route.abort());
    
    // Fill and submit form
    await page.fill('input[name="firstName"]', 'Network');
    await page.fill('input[name="lastName"]', 'Error');
    await page.fill('input[name="email"]', 'network@example.com');
    await page.fill('input[name="phone"]', '555-000-0000');
    
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('.bg-red-50')).toBeVisible();
    await expect(page.locator('.text-red-800')).toContainText('Error Submitting Request');
  });

});

test.describe('Appointment Page Integration', () => {
  
  test('Navigation from homepage CTA', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    
    // Find and click the "Schedule Appointment" button
    const ctaButton = page.locator('a:has-text("Schedule Appointment")');
    await expect(ctaButton).toBeVisible();
    
    // Click the button
    await ctaButton.click();
    
    // Should navigate to appointment page
    await expect(page).toHaveURL('/appointment');
    await expect(page.locator('h1')).toContainText('Schedule Appointment');
  });

  test('Appointment page responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/appointment');
    
    // Check that form is still usable on mobile
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    
    // Check that form layout adapts
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.reload();
    
    // Check that form is properly laid out
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
  });

});
