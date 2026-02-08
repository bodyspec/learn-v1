import { test, expect } from '@playwright/test';

test.describe('Homepage Bottom CTA', () => {
  test('bottom CTA shows correct text', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('All content is free and publicly accessible')).toBeVisible({ timeout: 10000 });
  });

  test('bottom Get Started button navigates to physician track', async ({ page }) => {
    await page.goto('/');

    // The bottom CTA "Get Started" button (not the hero one which is "Get started")
    const bottomCTA = page.getByRole('link', { name: 'Get Started', exact: true });
    await expect(bottomCTA).toBeVisible();
    await bottomCTA.click();

    await expect(page).toHaveURL('/track/physician');
  });
});
