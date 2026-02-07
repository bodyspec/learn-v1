import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders hero section with title and CTA', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEXA Education');
    await expect(page.getByText('Free, comprehensive training')).toBeVisible();

    // Two "Get started" links on page (hero + CTA), check the first one in the hero
    const getStarted = page.getByRole('link', { name: 'Get started', exact: true });
    await expect(getStarted).toBeVisible();
    await expect(getStarted).toHaveAttribute('href', '/track/physician');
  });

  test('shows all three track cards', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Choose Your Track' })).toBeVisible();

    // Track cards have h3 headings
    await expect(page.getByRole('heading', { name: 'Physicians', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Chiropractors', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Trainers', level: 3 })).toBeVisible();
  });

  test('track cards link to correct track pages', async ({ page }) => {
    await page.goto('/');

    // Scope to the track cards section (not the nav links)
    const trackSection = page.locator('.grid.md\\:grid-cols-3');
    await expect(trackSection.getByRole('link').filter({ hasText: 'Physicians' })).toHaveAttribute('href', '/track/physician');
    await expect(trackSection.getByRole('link').filter({ hasText: 'Chiropractors' })).toHaveAttribute('href', '/track/chiropractor');
    await expect(trackSection.getByRole('link').filter({ hasText: 'Trainers' })).toHaveAttribute('href', '/track/trainer');
  });

  test('shows What You\'ll Learn section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: "What You'll Learn" })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'DEXA Technology' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Key Metrics' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Report Reading' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Patient Communication' })).toBeVisible();
  });
});
