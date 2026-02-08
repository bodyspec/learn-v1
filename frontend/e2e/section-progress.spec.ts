import { test, expect } from '@playwright/test';
import { signIn, requireAuth } from './helpers';

test.describe('Section View with Completion State', () => {
  test.setTimeout(60000);

  test.beforeAll(() => {
    requireAuth();
  });

  test('completed section shows Complete badge on revisit', async ({ page }) => {
    await signIn(page);

    // Set up response listener BEFORE navigating
    const progressResponsePromise = page.waitForResponse(
      resp => resp.url().includes('/api/v1/auth/me') && resp.ok(),
      { timeout: 20000 }
    );

    // Navigate to section
    await page.goto('/module/core/02-accuracy');
    await expect(page.getByText('Section 2 of 5')).toBeVisible({ timeout: 15000 });

    // Wait for auth/me to confirm auth is fully established
    await progressResponsePromise;
    // Small buffer for React to process the auth state update
    await page.waitForTimeout(500);

    // Click Continue to mark section as complete and navigate to next section
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/03-/, { timeout: 15000 });

    // Navigate back to the completed section
    await page.goto('/module/core/02-accuracy');
    await expect(page.getByText('Section 2 of 5')).toBeVisible({ timeout: 15000 });

    // Should show "Complete" badge (progress data loads after auth + API response)
    await expect(page.getByText('Complete', { exact: true })).toBeVisible({ timeout: 20000 });
  });

  test('authenticated section view does not show SignInPrompt', async ({ page }) => {
    await signIn(page);

    await page.goto('/module/core/01-how-dexa-works');
    await expect(page.getByText('Section 1 of 5')).toBeVisible({ timeout: 10000 });

    // The SignInPrompt "Sign In" button (exact match) should NOT be visible
    await expect(page.getByRole('button', { name: 'Sign In', exact: true })).not.toBeVisible();
  });
});
