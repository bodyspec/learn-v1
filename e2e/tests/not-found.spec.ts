import { test, expect } from '@playwright/test';

test.describe('404 Pages', () => {
  test('/track/invalid shows Not Found', async ({ page }) => {
    await page.goto('/track/invalid');

    await expect(page.getByText(/Not Found/i)).toBeVisible({ timeout: 10000 });
  });

  test('/module/invalid shows Not Found', async ({ page }) => {
    await page.goto('/module/invalid');

    await expect(page.getByText(/Not Found/i)).toBeVisible({ timeout: 10000 });
  });

  test('/module/core/invalid-section shows Not Found', async ({ page }) => {
    await page.goto('/module/core/invalid-section');

    await expect(page.getByText(/Not Found/i)).toBeVisible({ timeout: 10000 });
  });

  test('/quiz/invalid shows Not Found', async ({ page }) => {
    await page.goto('/quiz/invalid');

    await expect(page.getByText(/Not Found/i)).toBeVisible({ timeout: 10000 });
  });
});
