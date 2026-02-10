import { test, expect, Page } from '@playwright/test';

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  return errors;
}

test.describe('No Console Errors (Authenticated)', () => {
  test('dashboard has no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome', { timeout: 10000 });
    expect(errors).toEqual([]);
  });

  test('certificates page has no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/account/certificates');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });
    expect(errors).toEqual([]);
  });

  test('profile page has no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/account/profile');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });
    expect(errors).toEqual([]);
  });
});
