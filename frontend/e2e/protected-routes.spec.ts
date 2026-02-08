import { test, expect } from '@playwright/test';

test.describe('Protected Route Guards', () => {
  const routes = ['/dashboard', '/certificates', '/profile'];

  for (const route of routes) {
    test(`${route} shows sign-in prompt when not authenticated`, async ({ page }) => {
      await page.goto(route);

      await expect(page.getByText('Please sign in to access this page.')).toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
    });
  }

  test('sign-in button on protected route triggers Keycloak redirect', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByText('Please sign in to access this page.')).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();

    // Should redirect to Keycloak
    await page.waitForURL(/auth\.bodyspec\.com/, { timeout: 15000 });
  });
});
