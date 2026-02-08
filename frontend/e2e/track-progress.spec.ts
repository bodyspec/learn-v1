import { test, expect } from '@playwright/test';
import { signIn, requireAuth } from './helpers';

test.describe('Track Page with Progress', () => {
  test.setTimeout(60000);

  test.beforeAll(() => {
    requireAuth();
  });

  test('authenticated user sees module cards on track page', async ({ page }) => {
    await signIn(page);
    await page.goto('/track/physician');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Clinical Applications', { timeout: 15000 });

    // Should have module cards
    const moduleLinks = page.locator('a[href^="/module/"]');
    expect(await moduleLinks.count()).toBeGreaterThan(0);
  });

  test('module cards show progress text when sections are partially complete', async ({ page }) => {
    await signIn(page);

    // Complete a section - wait for auth to be fully established first
    await page.goto('/module/core/01-how-dexa-works');
    await expect(page.getByText('Section 1 of 5')).toBeVisible({ timeout: 15000 });

    // Wait for auth to complete (progress GET fires only when authenticated)
    await page.waitForResponse(
      resp => resp.url().match(/\/api\/v1\/progress$/) !== null && resp.ok(),
      { timeout: 15000 }
    );

    // Now click Continue - auth token available, section completion API will fire
    await Promise.all([
      page.waitForResponse(
        resp => resp.url().includes('/api/v1/progress/section') && resp.ok(),
        { timeout: 15000 }
      ),
      page.getByRole('button', { name: 'Continue' }).click(),
    ]);
    await expect(page).toHaveURL(/02-accuracy/);

    // Go to track page - wait for SSO redirect + page load
    await page.goto('/track/physician');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Clinical Applications', { timeout: 15000 });

    // Should show progress text like "X of Y sections complete" on core module card
    await expect(page.getByText(/\d+ of \d+ sections complete/)).toBeVisible({ timeout: 20000 });
  });
});
