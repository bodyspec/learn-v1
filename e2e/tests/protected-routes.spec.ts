import { test, expect } from '@playwright/test';

test.describe('Protected Route Guards', () => {
  const routes = ['/account/dashboard', '/account/certificates', '/account/profile'];

  for (const route of routes) {
    test(`${route} redirects to home when not authenticated`, async ({ page }) => {
      await page.goto(route);

      // AccountLayout redirects unauthenticated users to home
      await expect(page).toHaveURL('/', { timeout: 10000 });
    });
  }

  test('old route /dashboard redirects unauthenticated users to home', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveURL('/', { timeout: 10000 });
  });
});
