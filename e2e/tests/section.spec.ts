import { test, expect } from '@playwright/test';

test.describe('Section View', () => {
  test('first section loads with content', async ({ page }) => {
    await page.goto('/module/core/01-how-dexa-works');

    // Section title is in the card header (not the markdown h1)
    await expect(page.getByText('Section 1 of 5')).toBeVisible();
    await expect(page.getByText('How DEXA Works').first()).toBeVisible();
  });

  test('shows back link to module', async ({ page }) => {
    await page.goto('/module/core/01-how-dexa-works');

    const backLink = page.getByRole('link', { name: /Back to DEXA Fundamentals/i });
    await expect(backLink).toBeVisible();
  });

  test('renders markdown content', async ({ page }) => {
    await page.goto('/module/core/01-how-dexa-works');

    // Content area should have substantial text (markdown rendered)
    const contentArea = page.locator('.prose');
    await expect(contentArea).toBeVisible();
    const textContent = await contentArea.textContent();
    expect(textContent!.length).toBeGreaterThan(100);
  });

  test('first section has no Previous link', async ({ page }) => {
    await page.goto('/module/core/01-how-dexa-works');

    // On the first section, Previous link doesn't exist (renders empty span)
    await expect(page.getByRole('link', { name: 'Previous' })).not.toBeVisible();
  });

  test('first section has Continue button', async ({ page }) => {
    await page.goto('/module/core/01-how-dexa-works');

    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  });

  test('Continue navigates to next section', async ({ page }) => {
    await page.goto('/module/core/01-how-dexa-works');

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL('/module/core/02-accuracy');
    await expect(page.getByText('Section 2 of 5')).toBeVisible();
  });

  test('last section shows Finish & View Module button', async ({ page }) => {
    await page.goto('/module/core/05-misconceptions');

    await expect(page.getByRole('button', { name: 'Finish & View Module' })).toBeVisible();
  });

  test('Finish & View Module navigates back to module', async ({ page }) => {
    await page.goto('/module/core/05-misconceptions');

    await page.getByRole('button', { name: 'Finish & View Module' }).click();
    await expect(page).toHaveURL('/module/core');
  });

  test('middle section has both Previous link and Continue button', async ({ page }) => {
    await page.goto('/module/core/03-key-metrics');

    // Previous is a Link element, not a button
    await expect(page.getByRole('link', { name: 'Previous' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  });

  test('Previous navigates to previous section', async ({ page }) => {
    await page.goto('/module/core/02-accuracy');

    await page.getByRole('link', { name: 'Previous' }).click();
    await expect(page).toHaveURL('/module/core/01-how-dexa-works');
  });

  test('shows sign in prompt for unauthenticated users', async ({ page }) => {
    await page.goto('/module/core/01-how-dexa-works');

    // SignInPrompt has a "Sign In" button with specific text
    await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
  });

  test('invalid section shows not found', async ({ page }) => {
    await page.goto('/module/core/nonexistent-section');

    await expect(page.getByText(/Not Found/i)).toBeVisible();
  });
});
