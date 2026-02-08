import { Page, expect } from '@playwright/test';

const TEST_EMAIL = process.env.E2E_TEST_EMAIL!;
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD!;

/**
 * Signs in via Keycloak and waits for the app to be fully authenticated.
 * Requires E2E_TEST_EMAIL and E2E_TEST_PASSWORD env vars.
 */
export async function signIn(page: Page, email?: string, password?: string) {
  const useEmail = email || TEST_EMAIL;
  const usePassword = password || TEST_PASSWORD;

  await page.goto('/');
  await page.getByRole('button', { name: /Sign in/ }).click();
  await page.waitForURL(/auth\.bodyspec\.com/, { timeout: 15000 });
  await page.getByLabel(/email|username/i).fill(useEmail);
  await page.locator('#password').fill(usePassword);
  await page.getByRole('button', { name: /sign in|log in|submit/i }).click();
  await page.waitForURL(/localhost/, { timeout: 15000 });

  // Wait for auth to complete (user menu button visible)
  await expect(
    page.locator('nav').getByRole('button').filter({ has: page.locator('svg') })
  ).toBeVisible({ timeout: 15000 });
}

/**
 * Answers all quiz questions by clicking the first option for each,
 * then submits the quiz. Returns the total number of questions.
 */
export async function completeQuizWithFirstOptions(page: Page): Promise<number> {
  await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 10000 });
  const totalText = await page.getByText(/Question 1 of/).textContent();
  const total = parseInt(totalText!.match(/of (\d+)/)![1]);

  for (let i = 0; i < total; i++) {
    // Wait for question counter to update
    await expect(page.getByText(`Question ${i + 1} of ${total}`)).toBeVisible({ timeout: 10000 });

    // Click the first answer option (skip nav buttons)
    const optionButtons = page.locator('.card button.w-full');
    await expect(optionButtons.first()).toBeVisible({ timeout: 5000 });
    await optionButtons.first().click();

    if (i < total - 1) {
      await page.getByRole('button', { name: 'Next' }).click();
    }
  }

  // On the last question, Submit Quiz button should be visible
  await expect(page.getByRole('button', { name: 'Submit Quiz' })).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: 'Submit Quiz' }).click();
  return total;
}

/**
 * Validates that the test credentials environment variables are set.
 * Call this in test.beforeAll().
 */
export function requireAuth() {
  if (!TEST_EMAIL || !TEST_PASSWORD) {
    throw new Error('E2E_TEST_EMAIL and E2E_TEST_PASSWORD must be set (see .env.e2e.example)');
  }
}
