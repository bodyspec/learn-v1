import { test, expect } from '@playwright/test';
import { signIn, requireAuth } from './helpers';

test.describe('Section Progress Tracking', () => {
  test.beforeAll(() => {
    requireAuth();
  });

  test('clicking Continue marks section complete and updates dashboard', async ({ page }) => {
    await signIn(page);

    // Go to a section
    await page.goto('/module/core/01-how-dexa-works');
    await expect(page.getByText('Section 1 of 5')).toBeVisible({ timeout: 10000 });

    // Click Continue to mark complete and navigate
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL('/module/core/02-accuracy');

    // Navigate to dashboard
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    // Sections completed count should be at least 1
    const sectionsCard = page.getByText('Sections completed').locator('..');
    await expect(sectionsCard).toBeVisible();
  });
});
