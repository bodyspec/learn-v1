import { test, expect } from '@playwright/test';

/** Track API calls and assert no duplicates */
function setupApiTracker(page: import('@playwright/test').Page) {
  const apiCalls: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.pathname.startsWith('/api/v1/')) {
      apiCalls.push(`${request.method()} ${url.pathname}`);
    }
  });
  return {
    clear: () => { apiCalls.length = 0; },
    assertNoDuplicates: () => {
      const callCounts = new Map<string, number>();
      for (const call of apiCalls) {
        callCounts.set(call, (callCounts.get(call) || 0) + 1);
      }
      const duplicates = [...callCounts.entries()].filter(([, count]) => count > 1);
      expect(duplicates, `Duplicate API calls detected: ${duplicates.map(([ep, n]) => `${ep} (${n}x)`).join(', ')}`).toEqual([]);
    },
  };
}

test.describe('API request deduplication', () => {
  test('authenticated dashboard fires each API endpoint exactly once', async ({ page }) => {
    const tracker = setupApiTracker(page);
    tracker.clear();

    await page.goto('/account/dashboard');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    tracker.assertNoDuplicates();
  });

  test('certificates page fires each API endpoint exactly once', async ({ page }) => {
    const tracker = setupApiTracker(page);
    tracker.clear();

    await page.goto('/account/certificates');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Certificates', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    tracker.assertNoDuplicates();
  });

  test('profile page fires each API endpoint exactly once', async ({ page }) => {
    const tracker = setupApiTracker(page);
    tracker.clear();

    await page.goto('/account/profile');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profile Settings', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    tracker.assertNoDuplicates();
  });
});
