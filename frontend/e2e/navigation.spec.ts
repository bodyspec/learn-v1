import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('shows BodySpec Learn branding', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav');
    await expect(nav.getByText('BodySpec')).toBeVisible();
    await expect(nav.getByText('Learn')).toBeVisible();
  });

  test('shows track links in navbar', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav');
    await expect(nav.getByRole('link', { name: 'Physicians' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Chiropractors' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Trainers' })).toBeVisible();
  });

  test('shows sign in button when not authenticated', async ({ page }) => {
    await page.goto('/');

    // Scope to nav to avoid matching "sign in" text in page content
    const nav = page.locator('nav');
    await expect(nav.getByText('Sign in')).toBeVisible();
  });

  test('clicking logo navigates to homepage', async ({ page }) => {
    await page.goto('/track/physician');
    await page.locator('nav').getByRole('link', { name: /BodySpec/ }).click();
    await expect(page).toHaveURL('/');
  });

  test('clicking track link navigates to track page', async ({ page }) => {
    await page.goto('/');

    await page.locator('nav').getByRole('link', { name: 'Physicians' }).click();
    await expect(page).toHaveURL('/track/physician');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Clinical Applications');
  });

  test('clicking logo from deep page navigates to homepage', async ({ page }) => {
    // Start on a deep section page
    await page.goto('/module/core/03-key-metrics');
    await expect(page.getByText('Section 3 of 5')).toBeVisible({ timeout: 10000 });

    // Click logo to go home
    await page.locator('nav').getByRole('link', { name: /BodySpec/ }).click();
    await expect(page).toHaveURL('/');
  });
});
