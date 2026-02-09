import { defineConfig } from '@playwright/test';

/**
 * Authenticated tests share a single Keycloak user and mutate server state
 * (complete sections, reset progress, etc.), so they must run serially.
 */
const AUTHENTICATED_TESTS = [
  '**/account-features.spec.ts',
  '**/account-portal.spec.ts',
  '**/admin-protection.spec.ts',
  '**/admin.spec.ts',
  '**/api-dedup.spec.ts',
  '**/auth.spec.ts',
  '**/certificate-lifecycle.spec.ts',
  '**/certificates.spec.ts',
  '**/console-errors.spec.ts',
  '**/dashboard.spec.ts',
  '**/module-progress.spec.ts',
  '**/profile.spec.ts',
  '**/progress.spec.ts',
  '**/quiz-authenticated.spec.ts',
  '**/section-progress.spec.ts',
  '**/track-progress.spec.ts',
  '**/user-menu.spec.ts',
];

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],
  use: {
    baseURL: `http://localhost:${process.env.E2E_FRONTEND_PORT || 9000}`,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'parallel',
      use: { browserName: 'chromium' },
      testIgnore: AUTHENTICATED_TESTS,
      fullyParallel: true,
    },
    {
      name: 'serial',
      use: { browserName: 'chromium' },
      testMatch: AUTHENTICATED_TESTS,
    },
  ],
  outputDir: 'test-results',
});
