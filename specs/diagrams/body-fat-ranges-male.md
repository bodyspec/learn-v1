---
target_file: content/modules/core/03-key-metrics.md
target_section: "### Body Fat Percentage"
placement: Inline image after the introductory paragraph, before the female body fat ranges diagram
output_path: content/assets/diagrams/body-fat-ranges-male.svg
generator: scripts/generate-body-fat-charts.mjs
---

> **Note:** This spec is reference documentation only. The actual PNG is generated
> from an HTML template via `node scripts/generate-body-fat-charts.mjs`, not PaperBanana.
> Edit the script to change the diagram.

# Male Body Fat Percentage Ranges Diagram

## Purpose

Provide a visual reference for male body fat percentage ranges derived from BodySpec's DEXA scan database of ~347,000 male scans as of February 2026. The viewer should be able to quickly identify which percentile-based category a given body fat percentage falls into, from essential fat through obese. The diagram should feel clinical but approachable, not judgmental.

## Visual Layout

**Canvas:** 800 x 300px, landscape orientation. Background: #F8F8F8.

### Horizontal Segmented Bar (y: 90-170)

A single horizontal bar divided into six contiguous segments, spanning from x: 60 to x: 740. The x-axis represents body fat percentage from 0% to 45%.

**Scale mapping:** 0% at x=60, 45% at x=740. Each 1% = (740-60)/45 = 15.11px.

**Segments (left to right):**

1. **Essential Fat (<9%):**
   - Width: ~136px (9% range). Fill: #1C3133 (bs-dark). Rounded left corners (rx: 4).
   - Internal labels in white (#FFFFFF):
     - "Essential Fat" in 11px semibold.
     - "<9%" in 13px bold, colored #69D994 for emphasis.

2. **Athletic (9–16%):**
   - Width: ~106px (7% range). Fill: #69D994 (salad-100).
   - Internal labels in #1C3133:
     - "Athletic" in 14px semibold.
     - "9–16%" in 14px bold.

3. **Fitness (16–21%):**
   - Width: ~76px (5% range). Fill: #9DDEAD (salad-90).
   - Internal labels in #1C3133:
     - "Fitness" in 13px semibold.
     - "16–21%" in 13px bold.

4. **Average (21–29%):**
   - Width: ~121px (8% range). Fill: #CCEDD6 (salad-70).
   - Internal labels in #1C3133:
     - "Average" in 14px semibold.
     - "21–29%" in 14px bold.

5. **Above Average (29–34%):**
   - Width: ~76px (5% range). Fill: #F5D98C (warm yellow).
   - Internal labels in #1C3133:
     - "Above Avg" in 12px semibold.
     - "29–34%" in 12px bold.

6. **Obese (34%+):**
   - Width: ~166px (extends from 34% to edge at 45%). Fill: #E87D7D (coral/red). Rounded right corners (rx: 4).
   - Internal labels in white (#FFFFFF):
     - "Obese" in 14px semibold.
     - "34%+" in 14px bold.

All segments have height 80px and sit flush against each other (no gaps).

### Healthy Range Indicator (above the bar, y: ~70-85)

- A horizontal line spanning from the start of "Athletic" (9%) to the end of "Average" (29%). Stroke: #69D994, 2px.
- Label above the line: "Healthy range" in 11px #69D994.

### Percentage Axis (below the bar, y: 180-200)

- A thin horizontal line at y: 180 spanning the full bar width. Stroke: #DFE2E2, 1px.
- Tick marks every 5%: small vertical lines (15px tall) at y: 170. Stroke: #DFE2E2, 1px.
- Tick labels at: 0%, 5%, 10%, 15%, 20%, 25%, 30%, 35%, 40%, 45%. Font: 11px #7C8D90. Centered below each tick.

### Source Citation (y: 240)

- "Based on BodySpec DEXA database (~347,000 male scans, as of Feb 2026)" in 11px #7C8D90, centered.

## Title

"Male Body Fat Percentage Ranges" -- centered at top (y: 35), Poppins 20px bold, #1C3133.

## Color Palette

| Segment | Color | Hex |
|---------|-------|-----|
| Essential Fat | BodySpec dark | #1C3133 |
| Athletic | Salad 100 | #69D994 |
| Fitness | Salad 90 | #9DDEAD |
| Average | Salad 70 | #CCEDD6 |
| Above Average | Warm yellow | #F5D98C |
| Obese | Coral/red | #E87D7D |

The color progression from dark green through lighter greens to yellow to red creates an intuitive visual gradient. The darkest color (essential fat) anchors the left, greens represent healthy-to-average, yellow signals above average, and red signals the obese threshold.

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 20px, weight 700.
- **Segment labels (category):** 11-14px, weight 600.
- **Segment labels (range):** 12-14px, weight 700.
- **Tick labels:** 11px, weight 400.
- **Source:** 11px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 300".
- Compact height allows it to pair well with the female version immediately below.
- Scales fluidly. Segment labels remain legible at 50% scale.

## Accessibility

- **Alt text:** "Horizontal bar chart showing male body fat percentage ranges from BodySpec DEXA data: essential fat below 9 percent, athletic 9 to 16 percent, fitness 16 to 21 percent, average 21 to 29 percent, above average 29 to 34 percent, and obese 34 percent and above. The healthy range spans the athletic, fitness, and average categories."
- **SVG title element:** "Male body fat percentage classification ranges based on BodySpec DEXA data."
- **No color-only encoding:** Each segment contains text labels for both the category name and the percentage range. The segments are also separated by their position along the percentage axis.
- **Contrast:** White text on #1C3133 exceeds 12:1. #1C3133 text on #69D994, #9DDEAD, #CCEDD6, and #F5D98C all exceed 4.5:1. White text on #E87D7D exceeds 3:1 (acceptable for bold text).

## Data Accuracy

- Ranges derived from BodySpec's DEXA scan database of ~347,000 male body composition scans as of February 2026, ages 20–75.
- Percentile distributions computed from Hologic DEXA scanner results.
- Categories map descriptive labels to percentile bands: Essential (<1st), Athletic (1st–15th), Fitness (15th–40th), Average (40th–75th), Above Average (75th–90th), Obese (>90th).
- These are population-level percentile ranges; individual assessment should consider age, ethnicity, and activity level.
