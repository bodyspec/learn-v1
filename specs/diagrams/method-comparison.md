---
target_file: content/modules/core/02-accuracy.md
target_section: "## Comparing Methods"
placement: Inline image immediately after the section heading, before the first paragraph
output_path: content/assets/diagrams/method-comparison.svg
---

# Body Composition Method Accuracy Comparison Diagram

## Purpose

Compare the accuracy (typical error range in body fat percentage points) of four common body composition measurement methods: DEXA, BIA scales, skinfold calipers, and visual estimation. The viewer should immediately grasp that DEXA is the most precise method, and that consumer-grade methods have substantially larger error margins.

## Visual Layout

**Canvas:** 800 x 500px, landscape orientation. Background: #F8F8F8.

**IMPORTANT — Row Order:** The rows MUST appear in exactly this order from top to bottom: 1. DEXA, 2. BIA Scales, 3. Skinfold Calipers, 4. Visual Estimation. This order is from most accurate to least accurate. Do NOT reorder them.

**IMPORTANT — Negative Constraints:** Do NOT add any labels like "Zero Axis", "true value", "center line", or "More Accurate" / "Less Accurate". Do NOT add directional arrows below the chart. Only show percentage values (−15%, −10%, −5%, 0%, +5%, +10%, +15%) as axis labels along the bottom.

**IMPORTANT — Bar Shape:** Bars should be clean, flat-edged rectangles with slightly rounded corners (rx: 6). They must NOT be pill shapes, ovals, or blob-like forms. Each bar should have crisp, straight edges.

### Horizontal Error Range Chart (y: 90-380)

A diverging bar chart centered on a zero-error axis. The chart shows the typical error range for each method as a horizontal bar centered on the zero line.

**Central axis (0% error):**
- Vertical line at x: 400. Stroke: #7C8D90, 1px solid. Extends from y: 100 to y: 370.

**Grid lines (dashed, background reference):**
- At −15%, −10%, −5%, +5%, +10%, +15% positions. Stroke: #DFE2E2, 1px, dash 4,4.
- Percentage labels at the bottom of each grid line in 11px #7C8D90.
- The center line gets a "0%" label at bottom in 11px semibold #1C3133.

**Rows (top to bottom, each ~70px tall):**

1. **DEXA (y: ~130-170):**
   - Left label: "DEXA" in 15px semibold #1C3133. Below: "Clinical gold standard" in 11px #7C8D90.
   - Bar: Centered on x=400, spanning ±1-2% (total width ~80px). Fill: #69D994 at 90% opacity. rx: 6.
   - Value label centered in bar: "±1-2%" in 13px bold #1C3133.

2. **BIA Scales (y: ~200-240):**
   - Left label: "BIA Scales" in 15px semibold #1C3133. Below: "Consumer devices" in 11px #7C8D90.
   - Bar: Centered on x=400, spanning ±4-8% (total width ~160px). Fill: #F5C842 at 80% opacity. rx: 6.
   - Value label: "±4-8%" in 13px bold #1C3133.

3. **Skinfold Calipers (y: ~270-310):**
   - Left label: "Skinfold Calipers" in 15px semibold #1C3133. Below: "Technician-dependent" in 11px #7C8D90.
   - Bar: Centered on x=400, spanning ±3-5% (total width ~120px). Fill: #E87D7D at 70% opacity. rx: 6.
   - Value label: "±3-5%" in 13px bold #1C3133.

4. **Visual Estimation (y: ~340-380):**
   - Left label: "Visual Estimation" in 15px semibold #1C3133. Below: "Mirror / comparison charts" in 11px #7C8D90.
   - Bar: Centered on x=400, spanning ±8-15% (total width ~320px). Fill: #C0392B at 60% opacity. rx: 6.
   - Value label: "±8-15%" in 13px bold #FFFFFF (white, because the bar is dark).

### Bottom Note (y: 430)

- "BIA scale readings can vary by 5%+ based on hydration, meal timing, and time of day" in 11px #7C8D90, centered.

## Title

"Body Composition Measurement Accuracy" -- centered at top (y: 40), Poppins 22px bold, #1C3133.

**Subtitle:** "Typical Error Range (body fat percentage points)" in 13px #7C8D90.

## Color Palette

| Method | Color | Hex |
|--------|-------|-----|
| DEXA | Salad 100 (green) | #69D994 |
| BIA Scales | Amber/yellow | #F5C842 |
| Skinfold Calipers | Coral/red | #E87D7D |
| Visual Estimation | Deep red | #C0392B |

The color gradient from green to red intuitively maps to accuracy level (best to worst).

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Method names:** 15px, weight 600.
- **Method descriptions:** 11px, weight 400.
- **Error values:** 13px, weight 700.
- **Axis labels:** 11px, weight 400-600.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 500".
- The chart is horizontally oriented, making it natural for wide displays. At narrow widths, the left-side method labels may need to truncate or reduce size, but the bars and values remain the primary communication.

## Accessibility

- **Alt text:** "Horizontal bar chart comparing body composition measurement accuracy. DEXA has the smallest error range at plus or minus 1 to 2 percentage points. BIA scales have plus or minus 4 to 8 points. Skinfold calipers have plus or minus 3 to 5 points. Visual estimation has the largest error at plus or minus 8 to 15 percentage points. A note states that BIA scale readings can vary by more than 5 percent based on hydration, meal timing, and time of day."
- **SVG title element:** "Comparison of body composition measurement method accuracy."
- **No color-only encoding:** Each method is labeled by name and its bar contains the numeric error range. The bars are also ordered from most to least accurate (top to bottom), providing positional encoding. The color serves as reinforcement only.
- **Contrast:** Text inside the green and yellow bars uses #1C3133 (dark), providing excellent contrast. Text inside the deep red bar uses #FFFFFF. All meet WCAG AA.

## Data Accuracy

- DEXA: ±1-2% body fat (Shepherd et al., 2017; Toombs et al., 2012).
- BIA: ±4-8% body fat, varying by device quality and conditions (Malavolti et al., 2003; Achamrah et al., 2018).
- Skinfold calipers: ±3-5% body fat, highly dependent on technician skill (Heyward & Wagner, 2004).
- Visual estimation: ±8-15% body fat (informal; based on studies comparing self-assessment to measured values).
- Note: These are approximate typical ranges for educational purposes. Individual device precision may vary.
