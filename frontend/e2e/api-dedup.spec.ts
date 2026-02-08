import { test, expect } from '@playwright/test';

test.describe('API request deduplication', () => {
  const TEST_EMAIL = process.env.E2E_TEST_EMAIL!;
  const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD!;

  test.beforeAll(() => {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
      throw new Error('E2E_TEST_EMAIL and E2E_TEST_PASSWORD must be set (see .env.e2e.example)');
    }
  });

  test('authenticated dashboard fires each API endpoint exactly once', async ({ page }) => {
    // Track all /api/v1/ requests
    const apiCalls: string[] = [];
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (url.pathname.startsWith('/api/v1/')) {
        apiCalls.push(`${request.method()} ${url.pathname}`);
      }
    });

    // Sign in via Keycloak
    await page.goto('/');
    await page.getByRole('button', { name: /Sign in/ }).click();
    await page.waitForURL(/auth\.bodyspec\.com/, { timeout: 15000 });
    await page.getByLabel(/email|username/i).fill(TEST_EMAIL);
    await page.locator('#password').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: /sign in|log in|submit/i }).click();
    await page.waitForURL(/localhost/, { timeout: 15000 });

    // Wait for dashboard to fully load (user menu visible = auth complete)
    await expect(
      page.locator('nav').getByRole('button').filter({ has: page.locator('svg') })
    ).toBeVisible({ timeout: 15000 });

    // Navigate to dashboard and wait for data to render
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Count calls per endpoint
    const callCounts = new Map<string, number>();
    for (const call of apiCalls) {
      callCounts.set(call, (callCounts.get(call) || 0) + 1);
    }

    // Assert no endpoint was called more than once
    const duplicates = [...callCounts.entries()].filter(([, count]) => count > 1);
    expect(duplicates, `Duplicate API calls detected: ${duplicates.map(([ep, n]) => `${ep} (${n}x)`).join(', ')}`).toEqual([]);
  });
});
