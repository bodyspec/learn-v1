import { test, expect } from '@playwright/test';

test.describe('Account Navigation', () => {
  test('Account link is visible for authenticated users', async ({ page }) => {
    await page.goto('/');

    // Account link in nav should be visible
    const accountLink = page.locator('nav').getByRole('link', { name: 'Account' });
    await expect(accountLink).toBeVisible();
  });

  test('Account link navigates to account portal with sidebar', async ({ page }) => {
    await page.goto('/');

    await page.locator('nav').getByRole('link', { name: 'Account' }).click();
    await expect(page).toHaveURL(/\/account\/dashboard/);

    // Sidebar should show navigation links (on desktop)
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Certificates' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
  });

  test('sidebar Sign Out resets nav to show sign-in button', async ({ page }) => {
    await page.goto('/');

    await page.locator('nav').getByRole('link', { name: 'Account' }).click();
    await expect(page).toHaveURL(/\/account\/dashboard/);

    // Click Sign Out in sidebar
    await page.getByRole('button', { name: 'Sign Out' }).click();

    // Sign in button should reappear
    await expect(page.getByRole('button', { name: /Sign in/ })).toBeVisible({ timeout: 15000 });
  });
});
