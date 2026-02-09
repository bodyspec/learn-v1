import { test, expect } from '@playwright/test';

/**
 * BFS link crawler — starts from the home page, follows every internal link
 * up to MAX_DEPTH clicks deep, and checks each page for error markers.
 *
 * Catches: broken back links, missing content, invalid routes, dead ends.
 */

const MAX_DEPTH = 3;

// Text that should never appear on a healthy page
const ERROR_MARKERS = [
  'Track Not Found',
  'Module Not Found',
  'Section Not Found',
  'Content not available yet',
];

// Routes that require authentication — skip in unauthenticated crawl
const SKIP_PREFIXES = ['/account'];

function normalizePath(href: string, baseURL: string): string | null {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
    return null;
  }

  try {
    const url = new URL(href, baseURL);
    const base = new URL(baseURL);
    if (url.origin !== base.origin) return null;
    return url.pathname;
  } catch {
    return null;
  }
}

test.describe('Link Crawler', () => {
  test(`no error pages reachable within ${MAX_DEPTH} clicks of home`, async ({ page, baseURL }) => {
    test.setTimeout(120_000);

    const visited = new Set<string>();
    const errors: { url: string; from: string; marker: string }[] = [];

    // Seed with home page + pages only reachable via JS navigation (buttons).
    // Quiz seeds go at MAX_DEPTH so they get checked for errors but don't
    // interfere with the natural BFS expansion from home.
    const queue: { url: string; depth: number; from: string }[] = [
      { url: '/', depth: 0, from: '(start)' },
      { url: '/quiz/core', depth: MAX_DEPTH, from: '(seed)' },
      { url: '/quiz/physician', depth: MAX_DEPTH, from: '(seed)' },
      { url: '/quiz/chiropractor', depth: MAX_DEPTH, from: '(seed)' },
      { url: '/quiz/trainer', depth: MAX_DEPTH, from: '(seed)' },
    ];

    while (queue.length > 0) {
      const { url, depth, from } = queue.shift()!;

      const path = normalizePath(url, baseURL!);
      if (!path) continue;
      if (visited.has(path)) continue;
      if (SKIP_PREFIXES.some(p => path.startsWith(p))) continue;

      visited.add(path);

      const response = await page.goto(path, { waitUntil: 'load' });

      // Check HTTP status
      if (response && response.status() >= 400) {
        errors.push({ url: path, from, marker: `HTTP ${response.status()}` });
      }

      // Wait for React to render content
      await page.waitForLoadState('networkidle');

      // Check for error markers
      for (const marker of ERROR_MARKERS) {
        const visible = await page.getByText(marker, { exact: true }).first()
          .isVisible({ timeout: 500 })
          .catch(() => false);

        if (visible) {
          errors.push({ url: path, from, marker });
        }
      }

      // Collect links for next depth level
      if (depth < MAX_DEPTH) {
        const hrefs = await page.locator('a[href]').evaluateAll(
          els => els.map(el => el.getAttribute('href')).filter(Boolean) as string[]
        );

        for (const href of hrefs) {
          const linkPath = normalizePath(href, baseURL!);
          if (linkPath && !visited.has(linkPath) && !SKIP_PREFIXES.some(p => linkPath.startsWith(p))) {
            queue.push({ url: linkPath, depth: depth + 1, from: path });
          }
        }
      }
    }

    // Summary
    console.log(`\nCrawled ${visited.size} pages (max depth ${MAX_DEPTH})`);
    console.log(`Pages visited:\n${[...visited].sort().map(p => `  ${p}`).join('\n')}`);

    if (errors.length > 0) {
      const report = errors.map(e => `  ${e.url} (linked from ${e.from}): "${e.marker}"`).join('\n');
      throw new Error(`Found ${errors.length} broken page(s):\n${report}`);
    }
  });
});
