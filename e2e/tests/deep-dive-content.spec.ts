import { test, expect } from '@playwright/test';

const deepDiveModules = [
  { id: 'bone-health', title: 'Bone Health & DEXA', track: 'physician', firstSection: '01-bone-density-basics' },
  { id: 'glp1-monitoring', title: 'GLP-1 Medications & Body Composition', track: 'physician', firstSection: '01-tracking-weight-loss' },
  { id: 'sarcopenia', title: 'Sarcopenia & Aging', track: 'core', firstSection: '01-sarcopenia-aging' },
  { id: 'visceral-fat', title: 'Understanding Visceral Fat', track: 'physician', firstSection: '01-understanding-vat' },
];

test.describe('Deep Dive Content', () => {
  for (const mod of deepDiveModules) {
    test(`deep-dive module "${mod.id}" loads with title and description`, async ({ page }) => {
      await page.goto(`/module/${mod.id}`);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(mod.title, { timeout: 10000 });

      // Should show "Deep Dive" badge
      await expect(page.getByText('Deep Dive', { exact: true })).toBeVisible();
    });

    test(`deep-dive module "${mod.id}" has section with rendered markdown content`, async ({ page }) => {
      await page.goto(`/module/${mod.id}/${mod.firstSection}`);

      // Section should show title and content (first h1 is the page title, markdown may add another)
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 10000 });

      // Markdown content should render (check for substantial text, not just a shell)
      const contentArea = page.locator('.prose, .card');
      await expect(contentArea.first()).toBeVisible();
      const textContent = await contentArea.first().textContent();
      expect(textContent!.length).toBeGreaterThan(100);
    });
  }
});
