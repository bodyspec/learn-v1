import { test, expect } from '@playwright/test';

test.describe('Admin User Management', () => {
  test.setTimeout(90000);

  test('admin sidebar link is visible when user is admin', async ({ page }) => {
    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    const adminLink = page.getByRole('link', { name: 'Admin' });
    await expect(adminLink).toBeVisible();
    const href = await adminLink.getAttribute('href');
    expect(href).toBe('/account/admin');
  });

  test('admin page shows User Management with search and user table', async ({ page }) => {
    await page.goto('/account/admin');
    await expect(page.getByText('User Management')).toBeVisible({ timeout: 10000 });

    // Search input and button
    await expect(page.getByPlaceholder('Search by name or email...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();

    // Wait for user data to load
    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/admin/users') && resp.ok(),
      { timeout: 15000 },
    ).catch(() => null);

    // Table headers
    await expect(page.getByText('Name', { exact: true })).toBeVisible();
    await expect(page.getByText('Email', { exact: true })).toBeVisible();
  });

  test('admin can search for users', async ({ page }) => {
    await page.goto('/account/admin');
    await expect(page.getByText('User Management')).toBeVisible({ timeout: 10000 });

    // Wait for initial data
    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/admin/users') && resp.ok(),
      { timeout: 15000 },
    ).catch(() => null);

    // Search for the test user
    const searchInput = page.getByPlaceholder('Search by name or email...');
    await searchInput.fill('bodyspec');

    const searchPromise = page.waitForResponse(
      resp => resp.url().includes('/api/v1/admin/users') && resp.url().includes('search=') && resp.ok(),
      { timeout: 15000 },
    );
    await page.getByRole('button', { name: 'Search' }).click();
    await searchPromise;

    // Results should be filtered
    await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 5000 });
  });

  test('clicking a user navigates to detail page', async ({ page }) => {
    await page.goto('/account/admin');
    await expect(page.getByText('User Management')).toBeVisible({ timeout: 10000 });

    // Wait for user data
    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/admin/users') && resp.ok(),
      { timeout: 15000 },
    ).catch(() => null);

    // Click first user link in the table
    const firstUserLink = page.locator('table tbody tr a').first();
    await expect(firstUserLink).toBeVisible({ timeout: 5000 });

    await firstUserLink.click();
    await expect(page).toHaveURL(/\/account\/admin\/users\//);

    // User detail page should show back link and user info
    await expect(page.getByText('Back to users')).toBeVisible({ timeout: 10000 });
  });

  test('user detail page shows stats and progress', async ({ page }) => {
    await page.goto('/account/admin');
    await expect(page.getByText('User Management')).toBeVisible({ timeout: 10000 });

    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/admin/users') && resp.ok(),
      { timeout: 15000 },
    ).catch(() => null);

    const firstUserLink = page.locator('table tbody tr a').first();
    await expect(firstUserLink).toBeVisible({ timeout: 5000 });

    await firstUserLink.click();
    await expect(page.getByText('Back to users')).toBeVisible({ timeout: 10000 });

    // Stats grid (waits for detail API data to render)
    await expect(page.getByText('Sections completed')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Quizzes passed')).toBeVisible();
    // "Certificates" appears both in stats and as h2 heading — check the heading
    await expect(page.getByRole('heading', { name: 'Certificates' })).toBeVisible();
  });
});
