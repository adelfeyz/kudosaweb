const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://3f5af779.aidra-website.pages.dev';
const API_URL = 'https://aidra-api-test.adel-feiz.workers.dev';

test.describe('Frontend E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test.describe('Public Pages', () => {
    test('should load home page successfully', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check page title
      await expect(page).toHaveTitle(/Aidra Care/);
      
      // Check main navigation
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('a[href="/"]')).toBeVisible();
      await expect(page.locator('a[href="/blog"]')).toBeVisible();
      await expect(page.locator('a[href="/about"]')).toBeVisible();
      await expect(page.locator('a[href="/contact"]')).toBeVisible();
      
      // Check hero section
      await expect(page.locator('h1')).toContainText(/Aidra Care/);
      
      // Check footer
      await expect(page.locator('footer')).toBeVisible();
    });

    test('should load blog page successfully', async ({ page }) => {
      await page.goto(`${BASE_URL}/blog`);
      
      // Check page title
      await expect(page).toHaveTitle(/Blog/);
      
      // Check blog content
      await expect(page.locator('h1')).toContainText(/Blog/);
      
      // Check for blog posts or loading state
      const hasPosts = await page.locator('[data-testid="blog-post"]').count() > 0;
      const hasLoading = await page.locator('[data-testid="loading"]').isVisible();
      
      expect(hasPosts || hasLoading).toBe(true);
    });

    test('should load individual blog post page', async ({ page }) => {
      // First get a list of blog posts
      await page.goto(`${BASE_URL}/blog`);
      
      // Wait for posts to load
      await page.waitForTimeout(2000);
      
      // Try to find a blog post link
      const postLink = page.locator('a[href^="/blog/"]').first();
      
      if (await postLink.isVisible()) {
        const postUrl = await postLink.getAttribute('href');
        await page.goto(`${BASE_URL}${postUrl}`);
        
        // Check post content
        await expect(page.locator('article')).toBeVisible();
        await expect(page.locator('h1')).toBeVisible();
      } else {
        // If no posts, test the 404 behavior
        await page.goto(`${BASE_URL}/blog/non-existent-post`);
        await expect(page.locator('h1')).toContainText(/404/);
      }
    });

    test('should search blog posts', async ({ page }) => {
      await page.goto(`${BASE_URL}/blog`);
      
      // Find search input
      const searchInput = page.locator('input[placeholder*="search" i], input[type="search"]').first();
      
      if (await searchInput.isVisible()) {
        await searchInput.fill('test');
        await searchInput.press('Enter');
        
        // Check if search results page loads
        await expect(page).toHaveURL(/search/);
      }
    });

    test('should navigate to about page', async ({ page }) => {
      await page.goto(`${BASE_URL}/about`);
      
      await expect(page).toHaveTitle(/About/);
      await expect(page.locator('h1')).toContainText(/About/);
    });

    test('should navigate to contact page', async ({ page }) => {
      await page.goto(`${BASE_URL}/contact`);
      
      await expect(page).toHaveTitle(/Contact/);
      await expect(page.locator('h1')).toContainText(/Contact/);
      
      // Check contact form
      await expect(page.locator('form')).toBeVisible();
    });
  });

  test.describe('Admin Panel', () => {
    test('should access admin login page', async ({ page }) => {
      await page.goto(`${BASE_URL}/crm`);
      
      // Check login form
      await expect(page.locator('form')).toBeVisible();
      await expect(page.locator('input[name="username"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('should login with valid credentials', async ({ page }) => {
      await page.goto(`${BASE_URL}/crm`);
      
      // Fill login form
      await page.fill('input[name="username"]', 'admin');
      await page.fill('input[name="password"]', 'aidra2024');
      await page.click('button[type="submit"]');
      
      // Wait for redirect to dashboard
      await page.waitForURL(/\/crm\/dashboard/);
      
      // Check dashboard content
      await expect(page.locator('h1')).toContainText(/Dashboard/);
    });

    test('should access blog management', async ({ page }) => {
      // Login first
      await page.goto(`${BASE_URL}/crm`);
      await page.fill('input[name="username"]', 'admin');
      await page.fill('input[name="password"]', 'aidra2024');
      await page.click('button[type="submit"]');
      
      // Navigate to blog posts
      await page.goto(`${BASE_URL}/crm/blog/posts`);
      
      // Check blog management interface
      await expect(page.locator('h1')).toContainText(/Blog Posts/);
      await expect(page.locator('a[href*="/new"]')).toBeVisible(); // New post button
    });

    test('should create new blog post', async ({ page }) => {
      // Login first
      await page.goto(`${BASE_URL}/crm`);
      await page.fill('input[name="username"]', 'admin');
      await page.fill('input[name="password"]', 'aidra2024');
      await page.click('button[type="submit"]');
      
      // Navigate to new post page
      await page.goto(`${BASE_URL}/crm/blog/posts/new`);
      
      // Check post editor
      await expect(page.locator('input[name="title"]')).toBeVisible();
      await expect(page.locator('input[name="slug"]')).toBeVisible();
      await expect(page.locator('textarea[name="content"], [contenteditable="true"]')).toBeVisible();
    });
  });

  test.describe('API Integration', () => {
    test('should fetch blog posts from API', async ({ page }) => {
      // Mock API response
      await page.route(`${API_URL}/blog/posts`, async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            posts: [
              {
                id: 1,
                title: 'Test Post',
                slug: 'test-post',
                excerpt: 'Test excerpt',
                content: 'Test content',
                status: 'published',
                created_at: new Date().toISOString()
              }
            ],
            total: 1,
            totalPages: 1,
            currentPage: 1
          })
        });
      });

      await page.goto(`${BASE_URL}/blog`);
      
      // Check if posts are displayed
      await expect(page.locator('text=Test Post')).toBeVisible();
    });

    test('should handle API errors gracefully', async ({ page }) => {
      // Mock API error
      await page.route(`${API_URL}/blog/posts`, async route => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            error: 'Internal Server Error'
          })
        });
      });

      await page.goto(`${BASE_URL}/blog`);
      
      // Check for error handling
      await expect(page.locator('text=error, text=Error, text=Something went wrong')).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(BASE_URL);
      
      // Check mobile navigation
      const mobileMenu = page.locator('button[aria-label*="menu"], .mobile-menu, .hamburger');
      if (await mobileMenu.isVisible()) {
        await mobileMenu.click();
        await expect(page.locator('nav')).toBeVisible();
      }
    });

    test('should be responsive on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(BASE_URL);
      
      // Check layout adapts
      await expect(page.locator('main')).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load page within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(BASE_URL);
      const loadTime = Date.now() - startTime;
      
      // Page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should have proper meta tags', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check essential meta tags
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading structure', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check for main heading
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      // Check for proper heading hierarchy
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      expect(headings.length).toBeGreaterThan(0);
    });

    test('should have proper alt text for images', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check images have alt text
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });
  });
});
