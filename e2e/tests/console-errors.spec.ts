import { test, expect, Page } from '@playwright/test';
import { completeQuizWithFirstOptions } from './helpers';

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  return errors;
}

test.describe('No Console Errors (Mutating)', () => {
  test('quiz submission has no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 10000 });
    await completeQuizWithFirstOptions(page);
    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 10000 });
    expect(errors).toEqual([]);
  });
});
