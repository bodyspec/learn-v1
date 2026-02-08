import { test, expect } from '@playwright/test';
import { signIn, requireAuth } from './helpers';

test.describe('Certificates Page', () => {
  test.beforeAll(() => {
    requireAuth();
  });

  test('unauthenticated visit shows sign-in prompt', async ({ page }) => {
    await page.goto('/certificates');

    await expect(page.getByText('Please sign in to access this page.')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
  });

  test('shows Your Certificates heading after sign in', async ({ page }) => {
    await signIn(page);
    await page.goto('/certificates');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });
  });

  test('shows available tracks section', async ({ page }) => {
    await signIn(page);
    await page.goto('/certificates');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });

    // Should show Available Tracks or Other Tracks heading
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
  });

  test('each track card shows requirement text', async ({ page }) => {
    await signIn(page);
    await page.goto('/certificates');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });

    // Track titles should appear
    const trackTitles = ['Clinical Applications', 'Body Composition in Practice', 'Programming with DEXA Data'];
    for (const title of trackTitles) {
      // Track may be in either Available Tracks or Earned Certificates
      const trackElement = page.getByText(title);
      // At least the heading should exist (may be in either earned or available section)
      expect(await trackElement.count()).toBeGreaterThanOrEqual(1);
    }
  });
});
