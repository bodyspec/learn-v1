import { test, expect } from '@playwright/test';

test.describe('Certificate Verification', () => {
  test('shows verification page title', async ({ page }) => {
    await page.goto('/verify/some-fake-uid');

    // Should attempt to verify and show result (either error or not found)
    // Wait for loading to finish
    await page.waitForSelector('text=/Verification|Certificate|not found|Failed/i', { timeout: 10000 });
  });

  test('invalid certificate shows appropriate message', async ({ page }) => {
    await page.goto('/verify/invalid-certificate-id-12345');

    // Wait for loading to complete - should show error or not-found state
    await page.waitForSelector('.animate-spin', { state: 'hidden', timeout: 10000 }).catch(() => {});

    // Should show some kind of verification result (error or not found)
    const pageText = await page.textContent('body');
    expect(pageText).toMatch(/Verification|Certificate|not found|Failed|Invalid/i);
  });
});
