import { test, expect, Page } from '@playwright/test';

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  return errors;
}

test.describe('No Console Errors', () => {
  test('homepage has no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 });
    expect(errors).toEqual([]);
  });

  test('track page has no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/track/physician');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 });
    expect(errors).toEqual([]);
  });

  test('module page has no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/module/core');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 });
    expect(errors).toEqual([]);
  });

  test('section page has no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/module/core/01-how-dexa-works');
    await expect(page.getByText('Section 1 of 5')).toBeVisible({ timeout: 10000 });
    expect(errors).toEqual([]);
  });

  test('quiz page has no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 10000 });
    expect(errors).toEqual([]);
  });
});
