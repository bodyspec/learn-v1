import { test, expect } from '@playwright/test';
import { signIn, requireAuth } from './helpers';

test.describe('Admin User Management', () => {
  test.setTimeout(90000);

  test.beforeAll(() => {
    requireAuth();
  });

  test('admin sidebar link is visible when user is admin', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    // Check if user has admin access
    const adminLink = page.getByRole('link', { name: 'Admin' });
    const hasAdmin = await adminLink.isVisible().catch(() => false);
    if (!hasAdmin) {
      test.skip(true, 'Test user is not an admin — skip admin UI tests');
      return;
    }

    await expect(adminLink).toBeVisible();
    const href = await adminLink.getAttribute('href');
    expect(href).toBe('/account/admin');
  });

  test('admin page shows User Management with search and user table', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    const adminLink = page.getByRole('link', { name: 'Admin' });
    const hasAdmin = await adminLink.isVisible().catch(() => false);
    if (!hasAdmin) {
      test.skip(true, 'Test user is not an admin');
      return;
    }

    await adminLink.click();
    await expect(page).toHaveURL(/\/account\/admin/);
    await expect(page.getByText('User Management')).toBeVisible({ timeout: 10000 });

    // Search input and button
    await expect(page.getByPlaceholder('Search by name or email...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();

    // Wait for user data to load
    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/admin/users') && resp.ok(),
      { timeout: 15000 },
    ).catch(() => null);
    await page.waitForTimeout(500);

    // Table headers
    await expect(page.getByText('Name', { exact: true })).toBeVisible();
    await expect(page.getByText('Email', { exact: true })).toBeVisible();
  });

  test('admin can search for users', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    const adminLink = page.getByRole('link', { name: 'Admin' });
    const hasAdmin = await adminLink.isVisible().catch(() => false);
    if (!hasAdmin) {
      test.skip(true, 'Test user is not an admin');
      return;
    }

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
    await signIn(page);
    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    const adminLink = page.getByRole('link', { name: 'Admin' });
    const hasAdmin = await adminLink.isVisible().catch(() => false);
    if (!hasAdmin) {
      test.skip(true, 'Test user is not an admin');
      return;
    }

    await page.goto('/account/admin');
    await expect(page.getByText('User Management')).toBeVisible({ timeout: 10000 });

    // Wait for user data
    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/admin/users') && resp.ok(),
      { timeout: 15000 },
    ).catch(() => null);
    await page.waitForTimeout(500);

    // Click first user link in the table
    const firstUserLink = page.locator('table tbody tr a').first();
    const hasUsers = await firstUserLink.isVisible().catch(() => false);
    if (!hasUsers) {
      test.skip(true, 'No users in the table');
      return;
    }

    await firstUserLink.click();
    await expect(page).toHaveURL(/\/account\/admin\/users\//);

    // User detail page should show back link and user info
    await expect(page.getByText('Back to users')).toBeVisible({ timeout: 10000 });
  });

  test('user detail page shows stats and progress', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    const adminLink = page.getByRole('link', { name: 'Admin' });
    const hasAdmin = await adminLink.isVisible().catch(() => false);
    if (!hasAdmin) {
      test.skip(true, 'Test user is not an admin');
      return;
    }

    await page.goto('/account/admin');
    await expect(page.getByText('User Management')).toBeVisible({ timeout: 10000 });

    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/admin/users') && resp.ok(),
      { timeout: 15000 },
    ).catch(() => null);
    await page.waitForTimeout(500);

    const firstUserLink = page.locator('table tbody tr a').first();
    const hasUsers = await firstUserLink.isVisible().catch(() => false);
    if (!hasUsers) {
      test.skip(true, 'No users in the table');
      return;
    }

    await firstUserLink.click();
    await expect(page.getByText('Back to users')).toBeVisible({ timeout: 10000 });

    // Wait for detail API
    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/admin/users/') && resp.ok(),
      { timeout: 15000 },
    ).catch(() => null);
    await page.waitForTimeout(500);

    // Stats grid
    await expect(page.getByText('Sections completed')).toBeVisible();
    await expect(page.getByText('Quizzes passed')).toBeVisible();
    await expect(page.getByText('Certificates')).toBeVisible();
  });
});
