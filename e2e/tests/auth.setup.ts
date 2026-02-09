import { test as setup, expect } from '@playwright/test';

const authFile = 'tests/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Sign in/ }).click();
  await page.waitForURL(/auth\.bodyspec\.com/, { timeout: 15000 });
  await page.getByLabel(/email|username/i).fill(process.env.E2E_TEST_EMAIL!);
  await page.locator('#password').fill(process.env.E2E_TEST_PASSWORD!);
  await page.getByRole('button', { name: /sign in|log in|submit/i }).click();
  await page.waitForURL(/localhost/, { timeout: 15000 });
  await expect(page.locator('nav a[href="/account/dashboard"]')).toBeVisible({ timeout: 15000 });
  await page.context().storageState({ path: authFile });
});
