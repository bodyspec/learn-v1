import { test, expect } from '@playwright/test';

test.describe('Direct URL Access', () => {
  test('track page loads directly via URL', async ({ page }) => {
    await page.goto('/track/physician');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Clinical Applications', { timeout: 10000 });
  });

  test('module page loads directly via URL', async ({ page }) => {
    await page.goto('/module/core');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEXA Fundamentals', { timeout: 10000 });
  });

  test('middle section loads directly via URL', async ({ page }) => {
    await page.goto('/module/core/03-key-metrics');

    await expect(page.getByText('Section 3 of 5')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Key Metrics Explained').first()).toBeVisible();
  });

  test('quiz loads directly via URL', async ({ page }) => {
    await page.goto('/quiz/core');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Quiz', { timeout: 10000 });
    await expect(page.getByText(/Question 1 of/)).toBeVisible();
  });

  test('verify page loads directly via URL', async ({ page }) => {
    await page.goto('/verify/some-uid');

    // Should show verification page (may show error for invalid UID)
    await expect(page.getByText(/Certificate Verification|Verification Failed/i)).toBeVisible({ timeout: 10000 });
  });

  test('dashboard shows sign-in prompt when accessed directly', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByText('Please sign in to access this page.')).toBeVisible({ timeout: 10000 });
  });

  test('certificates shows sign-in prompt when accessed directly', async ({ page }) => {
    await page.goto('/certificates');

    await expect(page.getByText('Please sign in to access this page.')).toBeVisible({ timeout: 10000 });
  });
});
