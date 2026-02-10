import { defineConfig } from '@playwright/test';

/**
 * Read-only authenticated tests: these use storageState but never mutate
 * server-side data (no POST/PUT/DELETE). Safe to run in parallel.
 */
const PARALLEL_AUTH_TESTS = [
  '**/account-portal.spec.ts',
  '**/admin-protection.spec.ts',
  '**/admin.spec.ts',
  '**/api-dedup.spec.ts',
  '**/certificates.spec.ts',
  '**/user-menu.spec.ts',
];

/**
 * Serial authenticated tests: these mutate server state (complete sections,
 * submit quizzes, reset progress, etc.) and share a single Keycloak user,
 * so they must run one at a time.
 */
const SERIAL_AUTH_TESTS = [
  '**/account-features.spec.ts',
  '**/certificate-lifecycle.spec.ts',
  '**/console-errors.spec.ts',
  '**/dashboard.spec.ts',
  '**/module-progress.spec.ts',
  '**/profile.spec.ts',
  '**/progress.spec.ts',
  '**/quiz-authenticated.spec.ts',
  '**/section-progress.spec.ts',
  '**/track-progress.spec.ts',
];

const ALL_AUTHENTICATED_TESTS = [...PARALLEL_AUTH_TESTS, ...SERIAL_AUTH_TESTS];

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
      name: 'setup',
      testMatch: '**/auth.setup.ts',
    },
    {
      name: 'parallel',
      use: { browserName: 'chromium' },
      testIgnore: [...ALL_AUTHENTICATED_TESTS, '**/auth.setup.ts', '**/auth.spec.ts'],
      fullyParallel: true,
    },
    {
      name: 'parallel-auth',
      use: {
        browserName: 'chromium',
        storageState: 'tests/.auth/user.json',
      },
      testMatch: PARALLEL_AUTH_TESTS,
      fullyParallel: true,
      dependencies: ['setup'],
    },
    {
      name: 'serial',
      use: {
        browserName: 'chromium',
        storageState: 'tests/.auth/user.json',
      },
      testMatch: SERIAL_AUTH_TESTS,
      dependencies: ['setup'],
    },
    {
      name: 'auth',
      use: { browserName: 'chromium' },
      testMatch: '**/auth.spec.ts',
      dependencies: ['setup'],
    },
  ],
  outputDir: 'test-results',
});
