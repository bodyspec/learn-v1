#!/usr/bin/env node
/**
 * Generate body fat percentage range chart PNGs using HTML + Playwright.
 *
 * Usage:
 *   node scripts/generate-body-fat-charts.mjs
 *   node scripts/generate-body-fat-charts.mjs --male-only
 *   node scripts/generate-body-fat-charts.mjs --female-only
 *
 * Requires: playwright (installed in e2e/)
 *
 * ── Data source ─────────────────────────────────────────────────────────────
 *
 * Chart ranges are derived from the BodySpec production MySQL database,
 * accessible via the "bodyspec-sql" MCP server (Claude Code tool:
 * mcp__bodyspec-sql__Query).
 *
 * Table: `dexa_percentiles`
 *   Fields: gender, region, age, metric, percentile, val, update_seconds
 *   - Pre-computed percentile values across the full scan database
 *   - Use region='total', age=0 (all ages), metric='fat_pct'
 *
 * Table: `dexa_patients` (for scan counts)
 *   Fields: filename, user_id, first_name, last_name, dob, height_cm,
 *           weight_kg, gender, ethnicity
 *
 * Query to get the percentile breakpoints used in this chart:
 *
 *   SELECT gender, percentile, val
 *   FROM dexa_percentiles
 *   WHERE region = 'total' AND age = 0 AND metric = 'fat_pct'
 *     AND percentile IN (1, 15, 40, 75, 90)
 *   ORDER BY gender, percentile;
 *
 * Results (as of Feb 2026):
 *
 *   gender  | percentile | val
 *   --------|------------|--------
 *   female  |          1 | 14.49  → rounds to 14% (Essential fat boundary)
 *   female  |         15 | 23.92  → rounds to 24% (Athletic/Fitness boundary)
 *   female  |         40 | 30.02  → rounds to 30% (Fitness/Average boundary)
 *   female  |         75 | 38.15  → rounds to 38% (Average/Above Avg boundary)
 *   female  |         90 | 43.48  → rounds to 43% (Above Avg/Obese boundary)
 *   male    |          1 |  9.01  → rounds to  9% (Essential fat boundary)
 *   male    |         15 | 15.61  → rounds to 16% (Athletic/Fitness boundary)
 *   male    |         40 | 21.42  → rounds to 21% (Fitness/Average boundary)
 *   male    |         75 | 28.87  → rounds to 29% (Average/Above Avg boundary)
 *   male    |         90 | 33.73  → rounds to 34% (Above Avg/Obese boundary)
 *
 * Scan counts query:
 *
 *   SELECT gender, COUNT(*) as scan_count
 *   FROM dexa_patients
 *   WHERE gender IN ('male', 'female')
 *   GROUP BY gender;
 *
 * Category-to-percentile mapping:
 *   Essential fat  = below 1st percentile
 *   Athletic       = 1st–15th percentile
 *   Fitness        = 15th–40th percentile
 *   Average        = 40th–75th percentile
 *   Above Average  = 75th–90th percentile
 *   Obese          = above 90th percentile
 *
 * To update: re-run the queries above via MCP, update the segment data
 * below, then re-run this script.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { chromium } from '../e2e/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, '../content/assets/diagrams');

// Render at 2x for crisp output matching original ~2752x1536 dimensions
const SCALE = 4;
const W = 800;
const H = 450;

// ── Chart data ──────────────────────────────────────────────────────────────

const male = {
  title: 'Male Body Fat Percentage Ranges',
  maxPct: 45,
  tickStep: 5,
  source: 'Based on BodySpec DEXA database (~347,000 male scans, as of Feb 2026)',
  note: null,
  healthyStart: 9,
  healthyEnd: 29,
  segments: [
    { label: 'Essential Fat', range: '<9%', start: 0, end: 9, fill: '#1C3133', text: '#FFFFFF', rangeColor: '#69D994' },
    { label: 'Athletic', range: '9–16%', start: 9, end: 16, fill: '#69D994', text: '#1C3133', rangeColor: null },
    { label: 'Fitness', range: '16–21%', start: 16, end: 21, fill: '#9DDEAD', text: '#1C3133', rangeColor: null },
    { label: 'Average', range: '21–29%', start: 21, end: 29, fill: '#CCEDD6', text: '#1C3133', rangeColor: null },
    { label: 'Above<br>Average', range: '29–34%', start: 29, end: 34, fill: '#F5D98C', text: '#1C3133', rangeColor: null },
    { label: 'Obese', range: '34%+', start: 34, end: 45, fill: '#E87D7D', text: '#FFFFFF', rangeColor: null },
  ],
};

const female = {
  title: 'Female Body Fat Percentage Ranges',
  maxPct: 55,
  tickStep: 5,
  source: 'Based on BodySpec DEXA database (~269,000 female scans, as of Feb 2026)',
  note: 'Women require more essential fat for reproductive function.',
  healthyStart: 14,
  healthyEnd: 38,
  segments: [
    { label: 'Essential Fat', range: '<14%', start: 0, end: 14, fill: '#1C3133', text: '#FFFFFF', rangeColor: '#69D994' },
    { label: 'Athletic', range: '14–24%', start: 14, end: 24, fill: '#69D994', text: '#1C3133', rangeColor: null },
    { label: 'Fitness', range: '24–30%', start: 24, end: 30, fill: '#9DDEAD', text: '#1C3133', rangeColor: null },
    { label: 'Average', range: '30–38%', start: 30, end: 38, fill: '#CCEDD6', text: '#1C3133', rangeColor: null },
    { label: 'Above<br>Average', range: '38–43%', start: 38, end: 43, fill: '#F5D98C', text: '#1C3133', rangeColor: null },
    { label: 'Obese', range: '43%+', start: 43, end: 55, fill: '#E87D7D', text: '#FFFFFF', rangeColor: null },
  ],
};

// ── HTML template ───────────────────────────────────────────────────────────

function buildHTML(chart) {
  const barLeft = 60;
  const barRight = 740;
  const barWidth = barRight - barLeft;
  const barHeight = 120;
  const barRadius = 14;

  const pxPerPct = barWidth / chart.maxPct;

  const ticks = [];
  for (let p = 0; p <= chart.maxPct; p += chart.tickStep) {
    ticks.push(p);
  }

  // Healthy range positions (relative to bar container)
  const healthyLeftPx = chart.healthyStart * pxPerPct;
  const healthyWidthPx = (chart.healthyEnd - chart.healthyStart) * pxPerPct;

  // Build segments as two layers: colored bars (clipped) + text labels (unclipped)
  const segmentBarsHTML = chart.segments.map((seg, i) => {
    const x = seg.start * pxPerPct;
    const w = (seg.end - seg.start) * pxPerPct;
    return `
      <div style="
        position: absolute;
        left: ${x}px;
        top: 0;
        width: ${w}px;
        height: ${barHeight}px;
        background: ${seg.fill};
      "></div>`;
  }).join('\n');

  // Table layout: row 1 = category names, row 2 = percentage ranges
  // Table is 75% of bar height, centered vertically
  const tableH = barHeight * 0.60;
  const tableTop = (barHeight - tableH) / 2;
  const rowH = tableH / 2;
  const segmentLabelsHTML = chart.segments.map((seg) => {
    const x = seg.start * pxPerPct;
    const w = (seg.end - seg.start) * pxPerPct;
    const rangeStyle = seg.rangeColor ? `color: ${seg.rangeColor};` : `color: ${seg.text};`;
    return `
      <div style="
        position: absolute; left: ${x}px; top: ${tableTop}px;
        width: ${w}px; height: ${rowH}px;
        display: flex; align-items: center; justify-content: center;
        color: ${seg.text}; overflow: visible;
      ">
        <div style="font-size: 11.5px; font-weight: 600; line-height: 1.15; text-align: center;">${seg.label}</div>
      </div>
      <div style="
        position: absolute; left: ${x}px; top: ${tableTop + rowH}px;
        width: ${w}px; height: ${rowH}px;
        display: flex; align-items: center; justify-content: center;
        color: ${seg.text}; overflow: visible;
      ">
        <div style="font-size: 14.5px; font-weight: 700; line-height: 1.15; text-align: center; white-space: nowrap; ${rangeStyle}">${seg.range}</div>
      </div>`;
  }).join('\n');

  const ticksHTML = ticks.map(p => {
    const x = barLeft + p * pxPerPct;
    return `
      <div style="position: absolute; left: ${x}px; top: 0; width: 1px; height: 10px; background: #CDD1D1;"></div>
      <div style="position: absolute; left: ${x}px; top: 16px; transform: translateX(-50%); font-size: 13px; color: #7C8D90; white-space: nowrap;">${p}%</div>`;
  }).join('\n');

  const noteHTML = chart.note ? `
    <div style="
      margin: 24px auto 0;
      width: 460px;
      height: 40px;
      background: #E5F6EB;
      border: 1px solid #69D994;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: #1C3133;
    ">${chart.note}</div>` : '';

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${W}px;
    height: ${H}px;
    background: #F8F8F8;
    font-family: 'Poppins', system-ui, -apple-system, sans-serif;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>
</head>
<body>
  <!-- Vertically centered content wrapper -->
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">

    <!-- Title -->
    <div style="text-align: center; font-size: 24px; font-weight: 700; color: #1C3133;">
      ${chart.title}
    </div>

    <!-- Healthy range indicator (points DOWN toward bar) -->
    <div style="position: relative; height: 40px; margin-top: 16px;">
      <!-- Label -->
      <div style="
        position: absolute;
        left: ${barLeft + healthyLeftPx}px;
        width: ${healthyWidthPx}px;
        top: 0;
        text-align: center;
        font-size: 13px;
        color: #69D994;
        font-weight: 600;
      ">Healthy range</div>
      <!-- Horizontal line -->
      <div style="
        position: absolute;
        left: ${barLeft + healthyLeftPx}px;
        top: 22px;
        width: ${healthyWidthPx}px;
        height: 0;
        border-top: 2px solid #69D994;
      "></div>
      <!-- Left cap (down) -->
      <div style="
        position: absolute;
        left: ${barLeft + healthyLeftPx}px;
        top: 22px;
        width: 0;
        height: 16px;
        border-left: 2px solid #69D994;
      "></div>
      <!-- Right cap (down) -->
      <div style="
        position: absolute;
        left: ${barLeft + healthyLeftPx + healthyWidthPx}px;
        top: 22px;
        width: 0;
        height: 16px;
        border-left: 2px solid #69D994;
      "></div>
    </div>

    <!-- Segmented bar with border and shadow -->
    <div style="position: relative; height: ${barHeight}px; margin: 0 ${W - barRight}px 0 ${barLeft}px;">
      <!-- Colored bars (clipped for rounded corners) -->
      <div style="
        position: absolute;
        inset: 0;
        border-radius: ${barRadius}px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        border: 1px solid rgba(0,0,0,0.06);
        overflow: hidden;
      ">
        ${segmentBarsHTML}
      </div>
      <!-- Text labels (not clipped, can overflow narrow segments) -->
      <div style="position: absolute; inset: 0; overflow: visible;">
        ${segmentLabelsHTML}
      </div>
    </div>

    <!-- Percentage axis -->
    <div style="position: relative; height: 40px; margin-top: 12px;">
      <!-- Baseline -->
      <div style="position: absolute; left: ${barLeft}px; top: 0; width: ${barWidth}px; height: 1px; background: #DFE2E2;"></div>
      ${ticksHTML}
    </div>

    ${noteHTML}

    <!-- Source citation -->
    <div style="
      text-align: center;
      margin-top: 16px;
      font-size: 12px;
      color: #7C8D90;
    ">${chart.source}</div>

  </div>
</body>
</html>`;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function generateChart(chart, filename) {
  const html = buildHTML(chart);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: W, height: H });

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const outPath = resolve(OUTPUT_DIR, filename);
  await page.screenshot({ path: outPath, type: 'png', scale: 'device' });
  await browser.close();

  console.log(`  Generated: ${outPath}`);
}

async function main() {
  const args = process.argv.slice(2);
  const maleOnly = args.includes('--male-only');
  const femaleOnly = args.includes('--female-only');

  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Use a shared browser with 2x device scale factor for crisp output
  const browser = await chromium.launch();

  if (!femaleOnly) {
    const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
    const page = await ctx.newPage();
    await page.setContent(buildHTML(male), { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const outPath = resolve(OUTPUT_DIR, 'body-fat-ranges-male.png');
    await page.screenshot({ path: outPath, type: 'png' });
    await ctx.close();
    console.log(`  Generated: ${outPath}`);
  }

  if (!maleOnly) {
    const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
    const page = await ctx.newPage();
    await page.setContent(buildHTML(female), { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const outPath = resolve(OUTPUT_DIR, 'body-fat-ranges-female.png');
    await page.screenshot({ path: outPath, type: 'png' });
    await ctx.close();
    console.log(`  Generated: ${outPath}`);
  }

  await browser.close();
  console.log('Done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
