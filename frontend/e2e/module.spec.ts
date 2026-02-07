import { test, expect } from '@playwright/test';

test.describe('Module View', () => {
  test('core module page loads with title and description', async ({ page }) => {
    await page.goto('/module/core');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEXA Fundamentals');
    await expect(page.getByText('how DEXA technology works')).toBeVisible();
  });

  test('shows estimated time and section count', async ({ page }) => {
    await page.goto('/module/core');

    await expect(page.getByText('20 minutes')).toBeVisible();
    await expect(page.getByText('5 sections')).toBeVisible();
  });

  test('lists all sections with correct titles', async ({ page }) => {
    await page.goto('/module/core');

    await expect(page.getByText('How DEXA Works')).toBeVisible();
    await expect(page.getByText('Accuracy & Validity')).toBeVisible();
    await expect(page.getByText('Key Metrics Explained')).toBeVisible();
    await expect(page.getByText('Reading a BodySpec Report')).toBeVisible();
    await expect(page.getByText('Misconceptions & FAQs')).toBeVisible();
  });

  test('clicking a section navigates to section view', async ({ page }) => {
    await page.goto('/module/core');

    await page.getByRole('link', { name: /How DEXA Works/ }).click();
    await expect(page).toHaveURL('/module/core/01-how-dexa-works');
  });

  test('shows quiz section with Take Quiz button', async ({ page }) => {
    await page.goto('/module/core');

    await expect(page.getByText('Module Quiz')).toBeVisible();
    await expect(page.getByText(/questions/)).toBeVisible();
    await expect(page.getByText(/to pass/)).toBeVisible();

    const quizButton = page.getByRole('button', { name: 'Take Quiz' });
    await expect(quizButton).toBeVisible();
  });

  test('Take Quiz button navigates to quiz page', async ({ page }) => {
    await page.goto('/module/core');

    await page.getByRole('button', { name: 'Take Quiz' }).click();
    await expect(page).toHaveURL('/quiz/core');
  });

  test('shows sign in prompt for unauthenticated users', async ({ page }) => {
    await page.goto('/module/core');

    // SignInPrompt renders a "Sign In" button
    const signInButton = page.locator('.card').getByRole('button', { name: 'Sign In', exact: true });
    await expect(signInButton).toBeVisible();
  });

  test('has back link to track page', async ({ page }) => {
    await page.goto('/module/core');

    const backLink = page.getByRole('link', { name: /Back to/i });
    await expect(backLink).toBeVisible();
  });

  test('invalid module shows not found', async ({ page }) => {
    await page.goto('/module/nonexistent');

    await expect(page.getByText(/Not Found/i)).toBeVisible();
  });
});
