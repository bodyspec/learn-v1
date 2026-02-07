import { test, expect } from '@playwright/test';

test.describe('Track Pages', () => {
  const tracks = [
    { slug: 'physician', title: 'Clinical Applications' },
    { slug: 'chiropractor', title: 'Body Composition in Practice' },
    { slug: 'trainer', title: 'Programming with DEXA Data' },
  ];

  for (const track of tracks) {
    test(`${track.slug} track page loads with correct title`, async ({ page }) => {
      await page.goto(`/track/${track.slug}`);

      await expect(page.getByRole('heading', { level: 1 })).toContainText(track.title);
    });

    test(`${track.slug} track shows Core Fundamentals section`, async ({ page }) => {
      await page.goto(`/track/${track.slug}`);

      await expect(page.getByRole('heading', { name: 'Core Fundamentals' })).toBeVisible();
    });
  }

  test('track page has back link to home', async ({ page }) => {
    await page.goto('/track/physician');

    const backLink = page.getByRole('link', { name: /Back to Home/i });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL('/');
  });

  test('track page shows DEXA Fundamentals module card', async ({ page }) => {
    await page.goto('/track/physician');

    await expect(page.getByText('DEXA Fundamentals')).toBeVisible();
  });

  test('clicking a module card navigates to module view', async ({ page }) => {
    await page.goto('/track/physician');

    await page.getByText('DEXA Fundamentals').click();
    await expect(page).toHaveURL('/module/core');
  });

  test('invalid track shows not found', async ({ page }) => {
    await page.goto('/track/invalid');

    await expect(page.getByText(/Not Found/i)).toBeVisible();
  });
});
