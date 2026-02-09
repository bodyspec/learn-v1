import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('desktop track links are hidden on mobile', async ({ page }) => {
    await page.goto('/');

    // Desktop nav links use hidden sm:flex - they should not be visible at mobile width
    const desktopNav = page.locator('.hidden.sm\\:ml-10');
    await expect(desktopNav).not.toBeVisible();
  });

  test('hamburger button is visible on mobile', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.locator('nav button.sm\\:hidden');
    await expect(hamburger).toBeVisible();
  });

  test('clicking hamburger opens mobile menu with track links', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.locator('nav button.sm\\:hidden');
    await hamburger.click();

    // Mobile menu should show track links
    const mobileMenu = page.locator('nav .sm\\:hidden.border-t');
    await expect(mobileMenu).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Physicians' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Chiropractors' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Trainers' })).toBeVisible();
  });

  test('clicking track link in mobile menu navigates and closes menu', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.locator('nav button.sm\\:hidden');
    await hamburger.click();

    const mobileMenu = page.locator('nav .sm\\:hidden.border-t');
    await expect(mobileMenu).toBeVisible();

    await mobileMenu.getByRole('link', { name: 'Physicians' }).click();
    await expect(page).toHaveURL('/track/physician');

    // Mobile menu should be closed after navigation
    const mobileMenuAfterNav = page.locator('nav .sm\\:hidden.border-t');
    await expect(mobileMenuAfterNav).not.toBeVisible();
  });

  test('clicking hamburger again closes the menu', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.locator('nav button.sm\\:hidden');

    // Open
    await hamburger.click();
    const mobileMenu = page.locator('nav .sm\\:hidden.border-t');
    await expect(mobileMenu).toBeVisible();

    // Close
    await hamburger.click();
    await expect(mobileMenu).not.toBeVisible();
  });
});
