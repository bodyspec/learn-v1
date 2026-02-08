import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.env.e2e') });

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:9000';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  ...(process.env.PLAYWRIGHT_BASE_URL
    ? {}
    : {
        webServer: {
          command: `VITE_BACKEND_PORT=${process.env.VITE_BACKEND_PORT || '8000'} npm run dev -- --port 9000`,
          url: 'http://localhost:9000',
          reuseExistingServer: !process.env.CI,
          timeout: 30000,
        },
      }),
});
