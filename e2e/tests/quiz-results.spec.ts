import { test, expect } from '@playwright/test';
import { completeQuizWithFirstOptions } from './helpers';

test.describe('Quiz Results Details', () => {
  test('results show pass/fail card with score', async ({ page }) => {
    await page.goto('/quiz/core');
    await completeQuizWithFirstOptions(page);

    // Should show score with a percentage
    await expect(page.getByText(/You scored \d+%/)).toBeVisible({ timeout: 10000 });
  });

  test('failed quiz shows Try Again button and passing score requirement', async ({ page }) => {
    await page.goto('/quiz/core');
    await completeQuizWithFirstOptions(page);

    // First options for core quiz yield a failing score (only 2/8 correct)
    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 10000 });

    // Should show Try Again button and passing score requirement
    await expect(page.getByRole('button', { name: 'Try Again' })).toBeVisible();
    await expect(page.getByText(/80% required to pass/)).toBeVisible();
  });

  test('results show Review Your Answers section', async ({ page }) => {
    await page.goto('/quiz/core');
    await completeQuizWithFirstOptions(page);

    await expect(page.getByText('Review Your Answers')).toBeVisible({ timeout: 10000 });
  });

  test('each question shows explanation text', async ({ page }) => {
    await page.goto('/quiz/core');
    await completeQuizWithFirstOptions(page);

    await expect(page.getByText('Review Your Answers')).toBeVisible({ timeout: 10000 });

    // Explanations are in blue boxes
    const explanations = page.locator('.bg-blue-50');
    expect(await explanations.count()).toBeGreaterThan(0);
    await expect(explanations.first().getByText('Explanation:')).toBeVisible();
  });

  test('correct answers are highlighted in green', async ({ page }) => {
    await page.goto('/quiz/core');
    await completeQuizWithFirstOptions(page);

    await expect(page.getByText('Review Your Answers')).toBeVisible({ timeout: 10000 });

    // Green highlighted correct answers
    const greenOptions = page.locator('.bg-green-50.border.border-green-200');
    expect(await greenOptions.count()).toBeGreaterThan(0);
  });

  test('selected answers show "(your answer)" label', async ({ page }) => {
    await page.goto('/quiz/core');
    await completeQuizWithFirstOptions(page);

    await expect(page.getByText('Review Your Answers')).toBeVisible({ timeout: 10000 });

    // Should show "(your answer)" labels
    const yourAnswerLabels = page.getByText('(your answer)');
    expect(await yourAnswerLabels.count()).toBeGreaterThan(0);
  });

  test('Try Again resets quiz to question 1', async ({ page }) => {
    await page.goto('/quiz/core');
    await completeQuizWithFirstOptions(page);

    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 10000 });

    // First options for core quiz yield a fail, so Try Again is always visible
    const tryAgainButton = page.getByRole('button', { name: 'Try Again' });
    await expect(tryAgainButton).toBeVisible();

    await tryAgainButton.click();
    await expect(page.getByText(/Question 1 of/)).toBeVisible();
    await expect(page.getByText(/0 of \d+ answered/)).toBeVisible();
  });

  test('unauthenticated quiz results show sign-in prompt', async ({ page }) => {
    await page.goto('/quiz/core');
    await completeQuizWithFirstOptions(page);

    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 10000 });

    // Unauthenticated users see sign-in prompt
    await expect(page.getByText('Sign in to save your progress and earn certificates.')).toBeVisible();
  });
});
