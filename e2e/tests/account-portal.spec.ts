import { test, expect } from '@playwright/test';

test.describe('Account Portal Navigation', () => {
  test('clicking Account navigates to portal with sidebar', async ({ page }) => {
    await page.goto('/');
    await page.locator('nav').getByRole('link', { name: 'Account' }).click();
    await expect(page).toHaveURL(/\/account\/dashboard/);

    // Sidebar links should be visible on desktop
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Certificates' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
  });

  test('sidebar navigation switches content', async ({ page }) => {
    await page.goto('/account/dashboard');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    // Click Certificates in sidebar
    await page.getByRole('link', { name: 'Certificates', exact: true }).click();
    await expect(page).toHaveURL(/\/account\/certificates/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });

    // Click Profile in sidebar
    await page.getByRole('link', { name: 'Profile' }).click();
    await expect(page).toHaveURL(/\/account\/profile/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });

    // Click Dashboard in sidebar
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/\/account\/dashboard/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });
  });

  test('old /dashboard route redirects to /account/dashboard when authenticated', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/account\/dashboard/, { timeout: 10000 });
  });

  test('old /certificates route redirects to /account/certificates when authenticated', async ({ page }) => {
    await page.goto('/certificates');
    await expect(page).toHaveURL(/\/account\/certificates/, { timeout: 10000 });
  });

  test('old /profile route redirects to /account/profile when authenticated', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL(/\/account\/profile/, { timeout: 10000 });
  });

  test('screenshots: desktop portal pages', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });
    await page.screenshot({ path: 'screenshots/account-dashboard-desktop.png', fullPage: true });

    await page.goto('/account/certificates');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });
    await page.screenshot({ path: 'screenshots/account-certificates-desktop.png', fullPage: true });

    await page.goto('/account/profile');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });
    await page.screenshot({ path: 'screenshots/account-profile-desktop.png', fullPage: true });
  });

  test('mobile sidebar toggle and navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/account/dashboard');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    // Desktop sidebar should be hidden on mobile
    const desktopSidebar = page.locator('aside.hidden.md\\:block');
    await expect(desktopSidebar).toBeHidden();

    // Hamburger button should be visible
    const hamburgerBar = page.locator('.md\\:hidden').filter({ hasText: 'Account' });
    await expect(hamburgerBar).toBeVisible();

    // Click hamburger to open sidebar
    await hamburgerBar.locator('button').click();

    // Mobile overlay sidebar should appear
    const mobileSidebar = page.locator('aside.fixed');
    await expect(mobileSidebar).toBeVisible();

    // Click a link in mobile sidebar
    await mobileSidebar.getByRole('link', { name: 'Profile' }).click();
    await expect(page).toHaveURL(/\/account\/profile/);

    // Sidebar should close after navigation
    await expect(mobileSidebar).toBeHidden();

    await page.screenshot({ path: 'screenshots/account-dashboard-mobile.png', fullPage: true });
  });
});
