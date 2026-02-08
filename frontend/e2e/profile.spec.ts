import { test, expect } from '@playwright/test';
import { signIn, requireAuth } from './helpers';

test.describe('Profile Page', () => {
  test.beforeAll(() => {
    requireAuth();
  });

  test('unauthenticated visit shows sign-in prompt', async ({ page }) => {
    await page.goto('/profile');

    await expect(page.getByText('Please sign in to access this page.')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
  });

  test('shows Profile Settings heading after sign in', async ({ page }) => {
    await signIn(page);
    await page.goto('/profile');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });
  });

  test('email field is visible, disabled, and pre-filled', async ({ page }) => {
    await signIn(page);
    await page.goto('/profile');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });

    const emailField = page.locator('#email');
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeDisabled();
    await expect(emailField).not.toHaveValue('');
  });

  test('email has helper text about identity provider', async ({ page }) => {
    await signIn(page);
    await page.goto('/profile');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });
    await expect(page.getByText('Email is managed by your identity provider')).toBeVisible();
  });

  test('name field is editable', async ({ page }) => {
    await signIn(page);
    await page.goto('/profile');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });

    const nameField = page.locator('#name');
    await expect(nameField).toBeVisible();
    await expect(nameField).toBeEnabled();
  });

  test('role dropdown has correct options', async ({ page }) => {
    await signIn(page);
    await page.goto('/profile');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });

    const roleSelect = page.locator('#roleType');
    await expect(roleSelect).toBeVisible();

    // Check options exist by counting (select options are in DOM but not "visible" to Playwright)
    const options = roleSelect.locator('option');
    expect(await options.count()).toBe(5); // blank + 4 roles

    // Verify we can select each role value
    await roleSelect.selectOption('physician');
    await expect(roleSelect).toHaveValue('physician');
    await roleSelect.selectOption('other');
    await expect(roleSelect).toHaveValue('other');
  });

  test('organization field is editable', async ({ page }) => {
    await signIn(page);
    await page.goto('/profile');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });

    const orgField = page.locator('#organization');
    await expect(orgField).toBeVisible();
    await expect(orgField).toBeEnabled();
  });

  test('save changes button submits form and shows success', async ({ page }) => {
    await signIn(page);
    await page.goto('/profile');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });

    // Fill in name and submit
    const nameField = page.locator('#name');
    await nameField.fill('E2E Test User');

    await page.getByRole('button', { name: 'Save Changes' }).click();

    await expect(page.getByText('Profile updated successfully!')).toBeVisible({ timeout: 10000 });
  });
});
