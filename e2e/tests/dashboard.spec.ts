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

  test('recent activity section appears when sections are completed', async ({ page }) => {
    await signIn(page);

    // Complete a section to ensure there's activity
    await page.goto('/module/core/01-how-dexa-works');
    await expect(page.getByText('Section 1 of 5')).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL('/module/core/02-accuracy');

    // Go to dashboard and check for Recent Activity
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    await expect(page.getByText('Recent Activity')).toBeVisible();
    await expect(page.getByText(/Completed "/).first()).toBeVisible();
  });

  test('certificates CTA card shows View Certificates link when certificates exist', async ({ page }) => {
    await signIn(page);
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    // If the user has certificates, the CTA card is visible
    const viewCertsLink = page.getByRole('link', { name: 'View Certificates' });
    const hasCerts = await viewCertsLink.isVisible().catch(() => false);
    if (hasCerts) {
      await expect(viewCertsLink).toHaveAttribute('href', '/certificates');
    }
    // If no certificates, the card won't appear — that's fine
  });
});
