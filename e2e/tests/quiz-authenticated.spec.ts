import { test, expect } from '@playwright/test';
import { completeQuizWithFirstOptions, completeQuizCorrectly } from './helpers';

test.describe('Authenticated Quiz Submission', () => {
  // Auth + quiz completion + API submission takes more time
  test.setTimeout(90000);

  test('signed-in user can submit quiz and see results', async ({ page }) => {
    await page.goto('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 15000 });
    await page.waitForLoadState('networkidle');

    await completeQuizWithFirstOptions(page);

    // Results should show score
    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Review Your Answers')).toBeVisible();
  });

  test('results do not show sign-in prompt for authenticated users', async ({ page }) => {
    await page.goto('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 15000 });
    await page.waitForLoadState('networkidle');

    await completeQuizWithFirstOptions(page);

    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 15000 });

    // Authenticated users should NOT see sign-in prompt
    await expect(page.getByText('Sign in to save your progress and earn certificates.')).not.toBeVisible();
  });

  test('quiz attempt is reflected on dashboard', async ({ page }) => {
    await page.goto('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 15000 });
    await page.waitForLoadState('networkidle');

    await completeQuizWithFirstOptions(page);

    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 15000 });

    // Navigate to dashboard to verify
    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 15000 });

    // Quizzes passed stat should be visible
    await expect(page.getByText('Quizzes passed')).toBeVisible();
  });

  test('first-option answers result in Try Again button (score < 80%)', async ({ page }) => {
    await page.goto('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // First options yield a failing score
    await completeQuizWithFirstOptions(page);

    // First options for core quiz yield a failing score (only 2/8 correct)
    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: 'Try Again' })).toBeVisible();
  });

  test('correct answers result in Congratulations message (score >= 80%)', async ({ page }) => {
    await page.goto('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Answer all correctly for a passing score
    await completeQuizCorrectly(page, 'core');

    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Congratulations!')).toBeVisible();
  });
});
