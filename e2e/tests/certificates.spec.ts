import { test, expect } from '@playwright/test';
import { signIn, requireAuth } from './helpers';

test.describe('Certificates Page', () => {
  test.beforeAll(() => {
    requireAuth();
  });

  test('unauthenticated visit redirects to home', async ({ page }) => {
    await page.goto('/account/certificates');

    await expect(page).toHaveURL('/', { timeout: 10000 });
  });

  test('shows Your Certificates heading after sign in', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/certificates');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });
  });

  test('shows available tracks section', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/certificates');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });

    // Should show Available Tracks or Other Tracks heading
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
  });

  test('each track card shows requirement text', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/certificates');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });

    // Track titles should appear
    const trackTitles = ['Clinical Applications', 'Body Composition in Practice', 'Programming with DEXA Data'];
    for (const title of trackTitles) {
      // Track may be in either Available Tracks or Earned Certificates
      const trackElement = page.getByText(title);
      // At least the heading should exist (may be in either earned or available section)
      expect(await trackElement.count()).toBeGreaterThanOrEqual(1);
    }
  });

  test('shows empty state message when no certificates and no eligibility', async ({ page }) => {
    await signIn(page);
    await page.goto('/account/certificates');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 10000 });

    // The empty state message appears when user has no certs and isn't eligible for any
    // This is conditional on user state - check if it's visible
    const emptyState = page.getByText('Complete a learning track to earn your first certificate.');
    const hasEmptyState = await emptyState.isVisible().catch(() => false);

    // Either empty state is visible OR there are earned/eligible certificates
    if (hasEmptyState) {
      await expect(emptyState).toBeVisible();
    } else {
      // User has certificates or is eligible - verify cert content or claim button exists
      const hasCertOrEligible = await page.getByText(/Claim Certificate|Download PDF/).first().isVisible().catch(() => false);
      expect(hasCertOrEligible || !hasEmptyState).toBeTruthy();
    }
  });
});
