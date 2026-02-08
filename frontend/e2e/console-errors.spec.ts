import { test, expect, Page } from '@playwright/test';
import { signIn, requireAuth, completeQuizWithFirstOptions } from './helpers';

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

  test('quiz submission has no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 10000 });
    await completeQuizWithFirstOptions(page);
    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 10000 });
    expect(errors).toEqual([]);
  });
});

test.describe('No Console Errors (Authenticated)', () => {
  test.beforeAll(() => {
    requireAuth();
  });

  test('dashboard has no JS errors', async ({ page }) => {
    await signIn(page);
    const errors = collectErrors(page);
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome', { timeout: 10000 });
    expect(errors).toEqual([]);
  });

  test('certificates page has no JS errors', async ({ page }) => {
    await signIn(page);
    const errors = collectErrors(page);
    await page.goto('/certificates');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });
    expect(errors).toEqual([]);
  });

  test('profile page has no JS errors', async ({ page }) => {
    await signIn(page);
    const errors = collectErrors(page);
    await page.goto('/profile');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });
    expect(errors).toEqual([]);
  });
});
