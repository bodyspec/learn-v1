import { test, expect } from '@playwright/test';
import { signIn, requireAuth } from './helpers';

test.describe('Dashboard', () => {
  test.beforeAll(() => {
    requireAuth();
  });

  test('unauthenticated visit shows sign-in prompt', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByText('Please sign in to access this page.')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
  });

  test('authenticated dashboard shows welcome heading', async ({ page }) => {
    await signIn(page);
    await page.goto('/dashboard');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });
  });

  test('shows three quick-stat cards', async ({ page }) => {
    await signIn(page);
    await page.goto('/dashboard');

    await expect(page.getByText('Sections completed')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Quizzes passed')).toBeVisible();
    await expect(page.getByText('Certificates earned')).toBeVisible();
  });

  test('shows track progress section with all three tracks', async ({ page }) => {
    await signIn(page);
    await page.goto('/dashboard');

    await expect(page.getByText('Track Progress')).toBeVisible({ timeout: 10000 });

    // Each track has a "Continue →" link
    const continueLinks = page.getByRole('link', { name: 'Continue →' });
    await expect(continueLinks).toHaveCount(3);

    // Verify track links point to correct paths
    await expect(continueLinks.nth(0)).toHaveAttribute('href', '/track/physician');
    await expect(continueLinks.nth(1)).toHaveAttribute('href', '/track/chiropractor');
    await expect(continueLinks.nth(2)).toHaveAttribute('href', '/track/trainer');
  });

  test('progress bars are visible in track progress', async ({ page }) => {
    await signIn(page);
    await page.goto('/dashboard');

    await expect(page.getByText('Track Progress')).toBeVisible({ timeout: 10000 });
    // Progress bars use bg-gray-200 background
    const progressBars = page.locator('.bg-gray-200.rounded-full');
    expect(await progressBars.count()).toBeGreaterThanOrEqual(3);
  });
});
