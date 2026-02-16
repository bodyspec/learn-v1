---
target_file: content/modules/core/03-key-metrics.md
target_section: "### Body Fat Percentage"
placement: Inline image after the male body fat ranges diagram, before the classification table
output_path: content/assets/diagrams/body-fat-ranges-female.svg
generator: scripts/generate-body-fat-charts.mjs
---

> **Note:** This spec is reference documentation only. The actual PNG is generated
> from an HTML template via `node scripts/generate-body-fat-charts.mjs`, not PaperBanana.
> Edit the script to change the diagram.

# Female Body Fat Percentage Ranges Diagram

## Purpose

Provide a visual reference for female body fat percentage ranges derived from BodySpec's DEXA scan database of ~269,000 female scans as of February 2026. This diagram should visually mirror the male version in structure and style, but with the different percentage ranges appropriate for females. It should be clear that women naturally carry more essential fat due to reproductive functions.

## Visual Layout

**Canvas:** 800 x 300px, landscape orientation. Background: #F8F8F8.

### Horizontal Segmented Bar (y: 90-170)

A single horizontal bar divided into six contiguous segments, spanning from x: 60 to x: 740. The x-axis represents body fat percentage from 0% to 55%.

**Scale mapping:** 0% at x=60, 55% at x=740. Each 1% = (740-60)/55 = 12.36px.

**Segments (left to right):**

1. **Essential Fat (<14%):**
   - Width: ~173px (14% range). Fill: #1C3133 (bs-dark). Rounded left corners (rx: 4).
   - Internal labels in white (#FFFFFF):
     - "Essential Fat" in 11px semibold.
     - "<14%" in 13px bold #69D994.

2. **Athletic (14–24%):**
   - Width: ~111px (9% range). Fill: #69D994 (salad-100).
   - Internal labels in #1C3133:
     - "Athletic" in 13px semibold.
     - "14–24%" in 13px bold.

3. **Fitness (24–30%):**
   - Width: ~74px (6% range). Fill: #9DDEAD (salad-90).
   - Internal labels in #1C3133:
     - "Fitness" in 12px semibold.
     - "24–30%" in 12px bold.

4. **Average (30–38%):**
   - Width: ~99px (8% range). Fill: #CCEDD6 (salad-70).
   - Internal labels in #1C3133:
     - "Average" in 13px semibold.
     - "30–38%" in 13px bold.

5. **Above Average (38–43%):**
   - Width: ~74px (6% range). Fill: #F5D98C (warm yellow).
   - Internal labels in #1C3133:
     - "Above Avg" in 12px semibold.
     - "38–43%" in 12px bold.

6. **Obese (43%+):**
   - Width: ~136px (extends from 44% to edge at 55%). Fill: #E87D7D. Rounded right corners (rx: 4).
   - Internal labels in white (#FFFFFF):
     - "Obese" in 14px semibold.
     - "43%+" in 14px bold.

All segments have height 80px and sit flush against each other.

### Healthy Range Indicator (above the bar, y: ~70-85)

- Horizontal line spanning from the start of "Athletic" (14%) to the end of "Average" (38%). Stroke: #69D994, 2px.
- Label: "Healthy range" in 11px #69D994.

### Percentage Axis (below the bar, y: 180-200)

- Thin horizontal baseline at y: 180. Stroke: #DFE2E2, 1px.
- Tick marks every 5%: 0%, 5%, 10%, 15%, 20%, 25%, 30%, 35%, 40%, 45%, 50%, 55%.
- Small vertical tick lines (15px). Stroke: #DFE2E2, 1px.
- Tick labels in 11px #7C8D90.

### Reproductive Note (y: 220-248)

- Rounded rectangle (400px x 28px), centered, fill: #E5F6EB, stroke: #69D994 1px, rx: 6.
- Text inside: "Women require more essential fat for reproductive function" in 11px #1C3133.

### Source Citation (y: 268)

- "Based on BodySpec DEXA database (~269,000 female scans, as of Feb 2026)" in 11px #7C8D90, centered.

## Title

"Female Body Fat Percentage Ranges" -- centered at top (y: 35), Poppins 20px bold, #1C3133.

## Color Palette

Same as the male version to maintain visual consistency:

| Segment | Color | Hex |
|---------|-------|-----|
| Essential Fat | BodySpec dark | #1C3133 |
| Athletic | Salad 100 | #69D994 |
| Fitness | Salad 90 | #9DDEAD |
| Average | Salad 70 | #CCEDD6 |
| Above Average | Warm yellow | #F5D98C |
| Obese | Coral/red | #E87D7D |
| Note background | Salad 60 | #E5F6EB |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 20px, weight 700.
- **Segment labels (category):** 10-14px, weight 600.
- **Segment labels (range):** 12-14px, weight 700.
- **Tick labels:** 11px, weight 400.
- **Note text:** 11px, weight 400.
- **Source:** 11px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 300".
- Same dimensions as the male version so they stack cleanly in the content.
- Scales fluidly. Text legible at 50%.

## Accessibility

- **Alt text:** "Horizontal bar chart showing female body fat percentage ranges from BodySpec DEXA data: essential fat below 14 percent, athletic 14 to 24 percent, fitness 24 to 30 percent, average 30 to 38 percent, above average 38 to 43 percent, and obese 43 percent and above. The healthy range spans the athletic, fitness, and average categories. A note indicates women require more essential fat for reproductive function."
- **SVG title element:** "Female body fat percentage classification ranges based on BodySpec DEXA data."
- **No color-only encoding:** Each segment contains text labels for category and range. Position along the axis provides additional context.
- **Contrast:** Same considerations as the male version. White on #1C3133 and #E87D7D both meet requirements. Dark text on green and yellow segments meets 4.5:1.

## Data Accuracy

- Ranges derived from BodySpec's DEXA scan database of ~269,000 female body composition scans as of February 2026, ages 20–75.
- Percentile distributions computed from Hologic DEXA scanner results.
- Categories map descriptive labels to percentile bands: Essential (<1st), Athletic (1st–15th), Fitness (15th–40th), Average (40th–75th), Above Average (75th–90th), Obese (>90th).
- Essential fat for females starts at a higher percentage than males due to sex-specific fat storage for reproductive function.
- The 55% upper axis limit accommodates the full obese range visualization.

## Design Notes

- This diagram should be **visually identical in structure** to the male version, allowing direct comparison when viewed in sequence. The only differences are the data ranges, the axis scale (0-55% vs. 0-45%), and the added reproductive note.
- The wider axis range means segments occupy proportionally different positions, which inherently communicates that female ranges are shifted higher.
