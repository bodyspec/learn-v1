---
target_file: content/modules/core/03-key-metrics.md
target_section: "### Body Fat Percentage"
placement: Inline image after the "Healthy ranges:" line, before the female body fat ranges diagram
output_path: content/assets/diagrams/body-fat-ranges-male.svg
---

# Male Body Fat Percentage Ranges Diagram

## Purpose

Provide a visual reference for male body fat percentage classification ranges based on ACSM and ACE guidelines. The viewer should be able to quickly identify which category a given body fat percentage falls into, from essential fat through obese. The diagram should feel clinical but approachable, not judgmental.

## Visual Layout

**Canvas:** 800 x 300px, landscape orientation. Background: #F8F8F8.

### Horizontal Segmented Bar (y: 90-170)

A single horizontal bar divided into five contiguous segments, spanning from x: 60 to x: 740. The x-axis represents body fat percentage from 0% to 35%.

**Scale mapping:** 0% at x=60, 35% at x=740. Each 1% = (740-60)/35 = 19.43px.

**Segments (left to right):**

1. **Essential Fat (2-5%):**
   - Width: ~58px (3% range). Fill: #1C3133 (bs-dark). Rounded left corners (rx: 4).
   - Internal labels in white (#FFFFFF):
     - "Essential Fat" in 11px semibold (two lines if needed).
     - "2-5%" in 13px bold, colored #69D994 for emphasis.

2. **Athletes (6-13%):**
   - Width: ~136px (7% range). Fill: #69D994 (salad-100).
   - Internal labels in #1C3133:
     - "Athletes" in 14px semibold.
     - "6-13%" in 14px bold.

3. **Fitness (14-17%):**
   - Width: ~58px (3% range). Fill: #9DDEAD (salad-90).
   - Internal labels in #1C3133:
     - "Fitness" in 13px semibold.
     - "14-17%" in 13px bold.

4. **Average (18-24%):**
   - Width: ~117px (6% range). Fill: #CCEDD6 (salad-70).
   - Internal labels in #1C3133:
     - "Average" in 14px semibold.
     - "18-24%" in 14px bold.

5. **Obese (25%+):**
   - Width: ~194px (extends from 25% to edge at 35%). Fill: #E87D7D (coral/red). Rounded right corners (rx: 4).
   - Internal labels in white (#FFFFFF):
     - "Obese" in 14px semibold.
     - "25%+" in 14px bold.

All segments have height 80px and sit flush against each other (no gaps).

### Healthy Range Indicator (above the bar, y: ~70-85)

- A horizontal line spanning from the start of "Athletes" (6%) to the end of "Fitness" (17%). Stroke: #69D994, 2px.
- Label above the line: "Healthy range" in 11px #69D994.

### Percentage Axis (below the bar, y: 180-200)

- A thin horizontal line at y: 180 spanning the full bar width. Stroke: #DFE2E2, 1px.
- Tick marks every 5%: small vertical lines (15px tall) at y: 170. Stroke: #DFE2E2, 1px.
- Tick labels at: 0%, 5%, 10%, 15%, 20%, 25%, 30%, 35%. Font: 11px #7C8D90. Centered below each tick.

### Source Citation (y: 240)

- "Adapted from ACSM Guidelines for Exercise Testing and Prescription & ACE body fat classification ranges" in 11px #7C8D90, centered.

## Title

"Male Body Fat Percentage Ranges" -- centered at top (y: 35), Poppins 20px bold, #1C3133.

## Color Palette

| Segment | Color | Hex |
|---------|-------|-----|
| Essential Fat | BodySpec dark | #1C3133 |
| Athletes | Salad 100 | #69D994 |
| Fitness | Salad 90 | #9DDEAD |
| Average | Salad 70 | #CCEDD6 |
| Obese | Coral/red | #E87D7D |

The color progression from dark green through lighter greens to red creates an intuitive visual gradient. The darkest color (essential fat) anchors the left, greens represent healthy-to-average, and red signals the obese threshold.

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 20px, weight 700.
- **Segment labels (category):** 11-14px, weight 600.
- **Segment labels (range):** 13-14px, weight 700.
- **Tick labels:** 11px, weight 400.
- **Source:** 11px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 300".
- Compact height allows it to pair well with the female version immediately below.
- Scales fluidly. Segment labels remain legible at 50% scale.

## Accessibility

- **Alt text:** "Horizontal bar chart showing male body fat percentage ranges: essential fat 2 to 5 percent, athletes 6 to 13 percent, fitness 14 to 17 percent, average 18 to 24 percent, and obese 25 percent and above. The healthy range spans the athletes and fitness categories."
- **SVG title element:** "Male body fat percentage classification ranges."
- **No color-only encoding:** Each segment contains text labels for both the category name and the percentage range. The segments are also separated by their position along the percentage axis.
- **Contrast:** White text on #1C3133 exceeds 12:1. #1C3133 text on #69D994, #9DDEAD, and #CCEDD6 all exceed 4.5:1. White text on #E87D7D exceeds 3:1 (acceptable for bold text; consider using #1C3133 on #E87D7D if higher contrast is needed).

## Data Accuracy

- Ranges based on ACSM's Guidelines for Exercise Testing and Prescription (11th ed., 2022) and ACE body fat classification.
- Essential fat for males: 2-5% (required for physiological function).
- These are general population guidelines; individual assessment should consider age, ethnicity, and activity level.
