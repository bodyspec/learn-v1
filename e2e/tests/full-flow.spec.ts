import { test, expect } from '@playwright/test';

test.describe('Full Learning Flow', () => {
  test('homepage → track → module → section → quiz', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEXA Education');

    // Click Get Started (exact match for hero button, not CTA)
    await page.getByRole('link', { name: 'Get started', exact: true }).click();
    await expect(page).toHaveURL('/track/physician');

    // Click DEXA Fundamentals module
    await page.getByText('DEXA Fundamentals').click();
    await expect(page).toHaveURL('/module/core');

    // Click first section
    await page.getByRole('link', { name: /How DEXA Works/ }).click();
    await expect(page).toHaveURL('/module/core/01-how-dexa-works');

    // Verify content loaded
    await expect(page.locator('.prose')).toBeVisible();

    // Navigate through to next section
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL('/module/core/02-accuracy');

    // Go back to module
    await page.getByRole('link', { name: /Back to DEXA Fundamentals/i }).click();
    await expect(page).toHaveURL('/module/core');

    // Navigate to quiz
    await page.getByRole('button', { name: 'Take Quiz' }).click();
    await expect(page).toHaveURL('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible();
  });

  test('navigation between tracks', async ({ page }) => {
    await page.goto('/track/physician');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Clinical Applications');

    // Switch to chiropractor via nav
    await page.locator('nav').getByRole('link', { name: 'Chiropractors' }).click();
    await expect(page).toHaveURL('/track/chiropractor');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Body Composition in Practice');

    // Switch to trainer via nav
    await page.locator('nav').getByRole('link', { name: 'Trainers' }).click();
    await expect(page).toHaveURL('/track/trainer');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Programming with DEXA Data');
  });

  test('section images and assets load without errors', async ({ page }) => {
    const failedRequests: string[] = [];
    page.on('response', (response) => {
      if (response.status() >= 400 && response.url().includes('/content/assets')) {
        failedRequests.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto('/module/core/04-reading-reports');
    await page.waitForLoadState('networkidle');

    expect(failedRequests).toEqual([]);
  });
});
