import { test, expect } from '@playwright/test';

test.describe('Scroll to Top on Section Navigation', () => {
  test('navigating to next section scrolls to top', async ({ page }) => {
    await page.goto('/module/core/01-how-dexa-works');

    // Wait for content to load
    await expect(page.getByText('Section 1 of 5')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.prose')).toBeVisible();

    // Scroll down to the Continue button area
    await page.getByRole('button', { name: 'Continue' }).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const scrollBefore = await page.evaluate(() => window.scrollY);
    if (scrollBefore > 0) {
      // Click Continue to go to next section
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.getByText('Section 2 of 5')).toBeVisible();

      // Wait for scroll-to-top useEffect to fire
      await page.waitForFunction(() => window.scrollY === 0, null, { timeout: 5000 });
      const scrollAfter = await page.evaluate(() => window.scrollY);
      expect(scrollAfter).toBe(0);
    } else {
      // Page wasn't tall enough to scroll - still verify navigation works
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.getByText('Section 2 of 5')).toBeVisible();
    }
  });
});
