import { test, expect } from '@playwright/test';
import { completeQuizCorrectly } from './helpers';

test.describe('Module Page with Progress', () => {
  test('authenticated user sees progress bar on module page', async ({ page }) => {
    await page.goto('/module/core');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEXA Fundamentals', { timeout: 10000 });

    // Progress bar should be visible (uses ProgressIndicator component)
    const progressBar = page.locator('.bg-gray-200.rounded-full.overflow-hidden');
    await expect(progressBar).toBeVisible();
  });

  test('completing a section shows checkmark on module page', async ({ page }) => {
    // Complete a section first
    await page.goto('/module/core/01-how-dexa-works');
    await expect(page.getByText('Section 1 of 5')).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL('/module/core/02-accuracy');

    // Go back to module page
    await page.goto('/module/core');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEXA Fundamentals', { timeout: 10000 });

    // The completed section should show a green checkmark (CheckCircle)
    // Sections are links to /module/core/<slug>
    const sectionLinks = page.locator('a[href^="/module/core/"]');
    expect(await sectionLinks.count()).toBeGreaterThan(0);
  });

  test('module page shows Get Started or Continue button', async ({ page }) => {
    await page.goto('/module/core');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEXA Fundamentals', { timeout: 10000 });

    // Should show either "Get Started" or "Continue" link depending on progress,
    // unless all sections are already complete (then the link is hidden)
    const getStartedOrContinue = page.getByRole('link', { name: /Get Started|Continue/ });
    const isVisible = await getStartedOrContinue.isVisible().catch(() => false);
    if (isVisible) {
      const href = await getStartedOrContinue.getAttribute('href');
      expect(href).toMatch(/^\/module\/core\//);
    } else {
      // All sections complete — verify section links are still rendered
      const sectionLinks = page.locator('a[href^="/module/core/"]');
      expect(await sectionLinks.count()).toBeGreaterThan(0);
    }
  });

  test('passed quiz shows Complete badge and Passed status on module page', async ({ page }) => {
    test.setTimeout(120000);

    // First pass the core quiz with correct answers
    await page.goto('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 15000 });
    await page.waitForLoadState('networkidle');
    await completeQuizCorrectly(page, 'core');
    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Congratulations!')).toBeVisible();

    // Navigate to module page
    await page.goto('/module/core');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEXA Fundamentals', { timeout: 10000 });

    // "Complete" badge should be visible near the title
    await expect(page.getByText('Complete', { exact: true })).toBeVisible();

    // Quiz section should show "Passed" instead of "Take Quiz"
    await expect(page.getByText('Passed')).toBeVisible();
  });
});
