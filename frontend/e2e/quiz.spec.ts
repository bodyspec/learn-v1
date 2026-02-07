import { test, expect } from '@playwright/test';

test.describe('Quiz Flow (Unauthenticated)', () => {
  test('quiz page loads with module title and info', async ({ page }) => {
    await page.goto('/quiz/core');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEXA Fundamentals Quiz');
    await expect(page.getByText(/\d+ questions/)).toBeVisible();
    await expect(page.getByText(/80% to pass/)).toBeVisible();
  });

  test('shows back link to module', async ({ page }) => {
    await page.goto('/quiz/core');

    const backLink = page.getByRole('link', { name: /Back to DEXA Fundamentals/i });
    await expect(backLink).toBeVisible();
  });

  test('shows first question with progress bar', async ({ page }) => {
    await page.goto('/quiz/core');

    await expect(page.getByText(/Question 1 of/)).toBeVisible();
    await expect(page.getByText(/0 of \d+ answered/)).toBeVisible();
  });

  test('can select an answer option', async ({ page }) => {
    await page.goto('/quiz/core');

    // Click the first option in the quiz card
    const quizCard = page.locator('.card');
    const optionButtons = quizCard.locator('button').filter({ hasNotText: /Previous|Next|Submit/ });
    await optionButtons.first().click();

    await expect(page.getByText(/1 of \d+ answered/)).toBeVisible();
  });

  test('Next button advances to next question', async ({ page }) => {
    await page.goto('/quiz/core');

    // Answer first question
    const quizCard = page.locator('.card');
    const optionButtons = quizCard.locator('button').filter({ hasNotText: /Previous|Next|Submit/ });
    await optionButtons.first().click();

    // Click Next
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText(/Question 2 of/)).toBeVisible();
  });

  test('Previous button goes back', async ({ page }) => {
    await page.goto('/quiz/core');

    // Answer and go to question 2
    const quizCard = page.locator('.card');
    const optionButtons = quizCard.locator('button').filter({ hasNotText: /Previous|Next|Submit/ });
    await optionButtons.first().click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Go back
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText(/Question 1 of/)).toBeVisible();
  });

  test('completing quiz shows results with score', async ({ page }) => {
    await page.goto('/quiz/core');

    // Get total number of questions
    const totalText = await page.getByText(/Question 1 of/).textContent();
    const total = parseInt(totalText!.match(/of (\d+)/)![1]);

    // Answer all questions (just pick first option each time)
    for (let i = 0; i < total; i++) {
      const quizCard = page.locator('.card');
      const optionButtons = quizCard.locator('button').filter({ hasNotText: /Previous|Next|Submit/ });
      await optionButtons.first().click();

      if (i < total - 1) {
        await page.getByRole('button', { name: 'Next' }).click();
      }
    }

    // Submit
    await page.getByRole('button', { name: 'Submit Quiz' }).click();

    // Should show results - look for the score text "You scored X%"
    await expect(page.getByText(/You scored/)).toBeVisible();
    // Should show Try Again button (since picking all first options likely fails)
    await expect(page.getByRole('button', { name: 'Try Again' })).toBeVisible();
    // Should show review section
    await expect(page.getByText('Review Your Answers')).toBeVisible();
  });

  test('invalid quiz module shows not found', async ({ page }) => {
    await page.goto('/quiz/nonexistent');

    await expect(page.getByText(/Not Found/i)).toBeVisible();
  });
});
