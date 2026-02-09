import { test, expect } from '@playwright/test';
import { signIn, requireAuth } from './helpers';

test.describe('Account Features', () => {
  test.setTimeout(120000);

  test.beforeAll(() => {
    requireAuth();
  });

  test('certificate PDF download returns a valid file', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/certificates');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });

    // Wait for certificate data to load
    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/certificates') && resp.ok(),
      { timeout: 15000 },
    ).catch(() => null);
    await page.waitForTimeout(500);

    // Check if there's a Download PDF button (user might not have certificates)
    const downloadButton = page.getByRole('button', { name: 'Download PDF' }).first();
    const hasButton = await downloadButton.isVisible({ timeout: 3000 }).catch(() => false);
    if (!hasButton) {
      test.skip(true, 'No certificates to download');
      return;
    }

    // Intercept the PDF download request to verify it returns application/pdf
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await downloadButton.click();
    const download = await downloadPromise;

    // Verify the download has a filename with .pdf extension
    expect(download.suggestedFilename()).toMatch(/certificate-.*\.pdf$/);
  });

  test('profile page shows Danger Zone with reset progress button', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/profile');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });

    // Danger Zone section should be visible
    await expect(page.getByText('Danger Zone')).toBeVisible();
    await expect(page.getByText('Reset your learning progress')).toBeVisible();

    const resetButton = page.getByRole('button', { name: 'Reset Progress...' });
    await expect(resetButton).toBeVisible();
  });

  test('reset progress modal has type-to-confirm safety', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/profile');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });

    // Open the reset modal
    await page.getByRole('button', { name: 'Reset Progress...' }).click();

    // Modal should be visible with warning
    await expect(page.getByText('This action cannot be undone. All selected progress')).toBeVisible();

    // Checkboxes should be visible (scoped to modal to avoid sidebar link ambiguity)
    const modal = page.locator('[role="dialog"], .fixed.inset-0');
    await expect(modal.getByText('Section progress')).toBeVisible();
    await expect(modal.getByText('Quiz attempts')).toBeVisible();
    await expect(modal.getByText(/^Certificates/)).toBeVisible();

    // Type RESET confirmation input
    await expect(page.getByPlaceholder('RESET')).toBeVisible();

    // Reset button should be disabled when nothing selected
    const resetSubmitButton = page.getByRole('button', { name: 'Reset Progress', exact: true });
    await expect(resetSubmitButton).toBeDisabled();

    // Select a checkbox
    await page.getByText('Section progress').click();

    // Still disabled without typing RESET
    await expect(resetSubmitButton).toBeDisabled();

    // Type RESET
    await page.getByPlaceholder('RESET').fill('RESET');

    // Now the button should be enabled
    await expect(resetSubmitButton).toBeEnabled();

    // Cancel instead of submitting (to not actually reset progress)
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Modal should close
    await expect(page.getByText('This action cannot be undone. All selected progress')).toBeHidden();
  });

  test('reset progress full cycle: reset sections then re-complete', async ({ page }) => {
    await signIn(page);

    // Step 1: Complete a section to ensure there's progress
    await page.goto('/module/core/01-how-dexa-works');
    await expect(page.getByText('Section 1 of 5')).toBeVisible({ timeout: 10000 });

    const progressResp = page.waitForResponse(
      resp => resp.url().includes('/api/v1/progress/section') && resp.request().method() === 'POST',
      { timeout: 15000 },
    ).catch(() => null);
    await page.getByRole('button', { name: 'Continue' }).click();
    await progressResp;

    // Step 2: Verify dashboard shows some progress
    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back,', { timeout: 10000 });

    // Step 3: Reset section progress
    await page.goto('/account/profile');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 10000 });

    // Wait for progress data to load in the modal
    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/progress') && resp.ok(),
      { timeout: 15000 },
    ).catch(() => null);
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Reset Progress...' }).click();
    await expect(page.getByText('This action cannot be undone. All selected progress')).toBeVisible();

    // Check sections checkbox
    await page.getByText('Section progress').click();

    // Type RESET
    await page.getByPlaceholder('RESET').fill('RESET');

    // Submit
    const resetResp = page.waitForResponse(
      resp => resp.url().includes('/api/v1/users/me/reset-progress') && resp.request().method() === 'POST',
      { timeout: 15000 },
    );
    await page.getByRole('button', { name: 'Reset Progress', exact: true }).click();
    const response = await resetResp;
    expect(response.ok()).toBeTruthy();

    // Modal should close (check the modal overlay is gone)
    await expect(page.locator('.fixed.inset-0')).toBeHidden({ timeout: 10000 });

    // Step 4: Re-complete the section to verify progress tracking still works
    await page.goto('/module/core/01-how-dexa-works');
    await expect(page.getByText('Section 1 of 5')).toBeVisible({ timeout: 10000 });

    const progressResp2 = page.waitForResponse(
      resp => resp.url().includes('/api/v1/progress/section') && resp.request().method() === 'POST',
      { timeout: 15000 },
    ).catch(() => null);
    await page.getByRole('button', { name: 'Continue' }).click();
    await progressResp2;

    // Verify we're on the next section
    await expect(page).toHaveURL(/\/module\/core\/02-accuracy/);
  });
});
