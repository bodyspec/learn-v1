import { test, expect } from '@playwright/test';
import { completeQuizCorrectly } from './helpers';

test.describe('Certificate Lifecycle', () => {
  // This test flow involves passing two quizzes, claiming a certificate,
  // and verifying it — needs generous timeout
  test.setTimeout(180000);

  test('full lifecycle: pass quizzes, claim certificate, verify', async ({ page }) => {
    // Step 1: Pass the core quiz with correct answers
    await page.goto('/quiz/core');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 15000 });
    await page.waitForLoadState('networkidle');

    await completeQuizCorrectly(page, 'core');
    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Congratulations!')).toBeVisible();

    // Step 2: Pass the physician quiz with correct answers
    await page.goto('/quiz/physician');
    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 15000 });
    await page.waitForLoadState('networkidle');

    await completeQuizCorrectly(page, 'physician');
    await expect(page.getByText(/You scored/)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Congratulations!')).toBeVisible();

    // The physician quiz results should show certificate eligibility
    await expect(page.getByText("You're eligible for a certificate!")).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('link', { name: 'certificates page' })).toBeVisible();

    // Step 3: Navigate to certificates page
    await page.goto('/account/certificates');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });

    // Wait for progress data to load
    await page.waitForResponse(
      resp => resp.url().includes('/api/v1/progress') && resp.ok(),
      { timeout: 15000 }
    ).catch(() => null);

    // Step 4: Claim the physician track certificate
    const claimButton = page.getByRole('button', { name: /Claim Certificate/ });

    // If the certificate hasn't been claimed yet, claim it
    if (await claimButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      // Wait for the certificate creation API response
      const certResponse = page.waitForResponse(
        resp => resp.url().includes('/api/v1/certificates') && resp.request().method() === 'POST',
        { timeout: 15000 }
      );

      await claimButton.first().click();

      await certResponse;
      // Wait for the certificate ID to appear on the page
      await expect(page.getByText(/Certificate ID: BS-\d{4}-[A-Z0-9]{6}/)).toBeVisible({ timeout: 15000 });
    }

    // Step 5: Verify certificate card is displayed
    // The certificate should show "Clinical Applications" (physician track title)
    await expect(page.getByText('Clinical Applications').first()).toBeVisible({ timeout: 10000 });

    // Certificate ID format: BS-YYYY-XXXXXX
    await expect(page.getByText(/Certificate ID: BS-\d{4}-[A-Z0-9]{6}/)).toBeVisible();

    // Issued to: should show the user's name
    await expect(page.getByText(/Issued to:/)).toBeVisible();

    // Issued date should be visible
    await expect(page.getByText(/Issued:/)).toBeVisible();

    // Download PDF button (now a button, not a link — uses JS blob download with auth token)
    const downloadButton = page.getByRole('button', { name: 'Download PDF' });
    await expect(downloadButton).toBeVisible();

    // Copy Verify Link button
    const copyButton = page.getByRole('button', { name: 'Copy Verify Link' });
    await expect(copyButton).toBeVisible();

    // Step 6: Extract certificate UID and verify via the verification page
    const certIdText = await page.getByText(/Certificate ID: BS-\d{4}-[A-Z0-9]{6}/).textContent();
    const certUid = certIdText!.match(/BS-\d{4}-[A-Z0-9]{6}/)![0];

    await page.goto(`/verify/${certUid}`);
    await expect(page.getByText('Certificate Verification')).toBeVisible({ timeout: 10000 });

    // Verification page should show valid certificate details
    await expect(page.getByText('Valid Certificate')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Verified by BodySpec Learn')).toBeVisible();
  });
});
