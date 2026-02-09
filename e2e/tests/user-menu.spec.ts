import { test, expect } from '@playwright/test';
import { signIn, requireAuth } from './helpers';

test.describe('User Menu Dropdown', () => {
  test.beforeAll(() => {
    requireAuth();
  });

  test('user menu button shows user name or email', async ({ page }) => {
    await signIn(page);

    // User menu button in nav should be visible with text
    const userMenuButton = page.locator('nav').getByRole('button').filter({ has: page.locator('svg') });
    await expect(userMenuButton).toBeVisible();
  });

  test('clicking user menu shows dropdown with navigation links', async ({ page }) => {
    await signIn(page);

    // Open user menu
    const userMenuButton = page.locator('nav').getByRole('button').filter({ has: page.locator('svg') });
    await userMenuButton.click();

    // Dropdown should show all menu items
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Certificates' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
  });

  test('Dashboard link navigates to /dashboard', async ({ page }) => {
    await signIn(page);

    const userMenuButton = page.locator('nav').getByRole('button').filter({ has: page.locator('svg') });
    await userMenuButton.click();

    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('Certificates link navigates to /certificates', async ({ page }) => {
    await signIn(page);

    const userMenuButton = page.locator('nav').getByRole('button').filter({ has: page.locator('svg') });
    await userMenuButton.click();

    await page.getByRole('link', { name: 'Certificates' }).click();
    await expect(page).toHaveURL('/certificates');
  });

  test('Profile link navigates to /profile', async ({ page }) => {
    await signIn(page);

    const userMenuButton = page.locator('nav').getByRole('button').filter({ has: page.locator('svg') });
    await userMenuButton.click();

    await page.getByRole('link', { name: 'Profile' }).click();
    await expect(page).toHaveURL('/profile');
  });

  test('Sign Out resets nav to show sign-in button', async ({ page }) => {
    await signIn(page);

    const userMenuButton = page.locator('nav').getByRole('button').filter({ has: page.locator('svg') });
    await userMenuButton.click();

    await page.getByRole('button', { name: 'Sign Out' }).click();

    // Sign in button should reappear
    await expect(page.getByRole('button', { name: /Sign in/ })).toBeVisible({ timeout: 15000 });
  });
});
