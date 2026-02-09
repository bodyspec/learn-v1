import { test, expect } from '@playwright/test';

test.describe('Content Completeness', () => {
  const tracks = [
    { id: 'physician', title: 'Clinical Applications' },
    { id: 'chiropractor', title: 'Body Composition in Practice' },
    { id: 'trainer', title: 'Programming with DEXA Data' },
  ];

  for (const track of tracks) {
    test(`${track.id} track page loads with correct heading`, async ({ page }) => {
      await page.goto(`/track/${track.id}`);

      await expect(page.getByRole('heading', { level: 1 })).toContainText(track.title, { timeout: 10000 });
    });

    test(`${track.id} track has clickable module cards`, async ({ page }) => {
      await page.goto(`/track/${track.id}`);

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 });

      // Should have at least one module card linking to /module/
      const moduleLinks = page.locator('a[href^="/module/"]');
      expect(await moduleLinks.count()).toBeGreaterThan(0);
    });
  }

  test('core module page loads with sections listed', async ({ page }) => {
    await page.goto('/module/core');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEXA Fundamentals', { timeout: 10000 });
    await expect(page.getByText('How DEXA Works')).toBeVisible();
    await expect(page.getByText('Accuracy & Validity')).toBeVisible();
    await expect(page.getByText('Key Metrics Explained')).toBeVisible();
  });

  test('first section of core module renders markdown content', async ({ page }) => {
    await page.goto('/module/core/01-how-dexa-works');

    const contentArea = page.locator('.prose');
    await expect(contentArea).toBeVisible({ timeout: 10000 });
    const textContent = await contentArea.textContent();
    expect(textContent!.length).toBeGreaterThan(100);
  });

  const quizModules = ['core', 'physician', 'chiropractor', 'trainer'];

  for (const moduleId of quizModules) {
    test(`${moduleId} quiz page loads with question count and passing score`, async ({ page }) => {
      await page.goto(`/quiz/${moduleId}`);

      await expect(page.getByRole('heading', { level: 1 })).toContainText('Quiz', { timeout: 10000 });
      await expect(page.getByText(/\d+ questions/)).toBeVisible();
      await expect(page.getByText(/80% to pass/)).toBeVisible();
    });
  }
});
