import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  const TEST_EMAIL = process.env.E2E_TEST_EMAIL!;
  const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD!;

  test.beforeAll(() => {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
      throw new Error('E2E_TEST_EMAIL and E2E_TEST_PASSWORD must be set (see frontend/.env.e2e.example)');
    }
  });

  test('sign in via Keycloak and verify account info in nav', async ({ page }) => {
    // Go to homepage
    await page.goto('/');

    // Click "Sign in" in the nav
    await page.getByRole('button', { name: /Sign in/ }).click();

    // Should redirect to Keycloak login page
    await page.waitForURL(/auth\.bodyspec\.com/, { timeout: 15000 });

    // Fill in credentials on Keycloak form
    await page.getByLabel(/email|username/i).fill(TEST_EMAIL);
    await page.locator('#password').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: /sign in|log in|submit/i }).click();

    // Should redirect back to the app
    await page.waitForURL(/localhost/, { timeout: 15000 });

    // "Sign in" button should no longer be visible
    await expect(page.getByRole('button', { name: /Sign in/ })).not.toBeVisible({ timeout: 15000 });

    // Verify account info appears in the nav (user menu button with icon)
    await expect(page.locator('nav').getByRole('button').filter({ has: page.locator('svg') })).toBeVisible({ timeout: 10000 });
  });

  test('sign out and verify nav resets', async ({ page }) => {
    // Sign in first
    await page.goto('/');
    await page.getByRole('button', { name: /Sign in/ }).click();
    await page.waitForURL(/auth\.bodyspec\.com/, { timeout: 15000 });
    await page.getByLabel(/email|username/i).fill(TEST_EMAIL);
    await page.locator('#password').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: /sign in|log in|submit/i }).click();
    await page.waitForURL(/localhost/, { timeout: 15000 });

    // Wait for user to be fully loaded
    await expect(page.getByRole('button', { name: /Sign in/ })).not.toBeVisible({ timeout: 15000 });

    // Open user dropdown menu
    await page.locator('nav').getByRole('button').filter({ has: page.locator('svg') }).click();

    // Click "Sign Out"
    await page.getByRole('button', { name: /Sign Out/ }).click();

    // Should be logged out - "Sign in" button reappears
    await expect(page.getByRole('button', { name: /Sign in/ })).toBeVisible({ timeout: 15000 });
  });
});
