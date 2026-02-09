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

  // Wait for auth to complete (Account link visible in nav)
  // On mobile the "Account" text is hidden, so fall back to checking for the link by href
  await expect(
    page.locator('nav a[href="/account/dashboard"]')
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
 * Correct answer texts for each quiz module, in question order.
 * These match the `correct: true` options in content/quizzes/*.yaml.
 */
const CORRECT_ANSWERS: Record<string, string[]> = {
  core: [
    'Three-compartment model',
    'BIA is highly sensitive to hydration status and uses a less accurate two-compartment model',
    'Muscle fiber composition',
    '1-2%',
    'It is metabolically active and associated with increased disease risk',
    'Body recomposition',
    'More fat is stored in the abdominal region, indicating higher metabolic risk',
    'Clothing color',
  ],
  physician: [
    '100 cm²',
    'TOFI (Thin Outside, Fat Inside)',
    '<7.0 kg/m²',
    '40% lean loss - concerning, as ideal is <25% lean loss',
    '>5% lean mass loss in 3-6 months without intentional restriction',
    'To differentiate fat loss from concerning muscle loss',
    'Sarcopenic obesity',
    'No, osteoporosis diagnosis requires site-specific (hip/spine) DEXA protocols',
  ],
  chiropractor: [
    'Approximately 4 pounds',
    '>10%',
    'Core weakness and anterior weight shift contribute to LBP; leg asymmetry suggests guarding',
    'Core weakness that may contribute to spinal instability',
    'It reveals muscle imbalances and regions needing strengthening',
    'The asymmetry indicates incomplete rehabilitation; recommend additional strengthening',
    '3-4 months',
  ],
  trainer: [
    '1-2 lbs',
    'Body recomposition is achievable for beginners with higher body fat',
    '2.0-2.4 g/kg lean mass',
    "This is excellent body recomposition; they're getting leaner and stronger",
    '12 weeks',
    'Normal weight with high body fat percentage and low lean mass',
    'Increase protein intake and add resistance training to preserve muscle',
    'Scale weight trends, body measurements, strength performance, and progress photos',
  ],
};

/**
 * Answers all quiz questions correctly using known correct answers,
 * then submits the quiz. Returns the total number of questions.
 */
export async function completeQuizCorrectly(page: Page, moduleId: string): Promise<number> {
  const correctAnswers = CORRECT_ANSWERS[moduleId];
  if (!correctAnswers) {
    throw new Error(`No correct answers defined for module: ${moduleId}`);
  }

  await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 10000 });
  const totalText = await page.getByText(/Question 1 of/).textContent();
  const total = parseInt(totalText!.match(/of (\d+)/)![1]);

  for (let i = 0; i < total; i++) {
    await expect(page.getByText(`Question ${i + 1} of ${total}`)).toBeVisible({ timeout: 10000 });

    // Click the correct answer option by its text content
    const optionButtons = page.locator('.card button.w-full');
    await expect(optionButtons.first()).toBeVisible({ timeout: 5000 });
    await optionButtons.filter({ hasText: correctAnswers[i] }).click();

    if (i < total - 1) {
      await page.getByRole('button', { name: 'Next' }).click();
    }
  }

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
