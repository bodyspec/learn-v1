---
target_file: content/modules/core/03-key-metrics.md
target_section: "### Body Fat Percentage"
placement: Inline image after the male body fat ranges diagram, before the classification table
output_path: content/assets/diagrams/body-fat-ranges-female.svg
---

# Female Body Fat Percentage Ranges Diagram

## Purpose

Provide a visual reference for female body fat percentage classification ranges based on ACSM and ACE guidelines. This diagram should visually mirror the male version in structure and style, but with the different percentage ranges appropriate for females. It should be clear that women naturally carry more essential fat due to reproductive functions.

## Visual Layout

**Canvas:** 800 x 300px, landscape orientation. Background: #F8F8F8.

### Horizontal Segmented Bar (y: 90-170)

A single horizontal bar divided into five contiguous segments, spanning from x: 60 to x: 740. The x-axis represents body fat percentage from 0% to 45%.

**Scale mapping:** 0% at x=60, 45% at x=740. Each 1% = (740-60)/45 = 15.11px.

**Segments (left to right):**

1. **Essential Fat (10-13%):**
   - Width: ~45px (3% range). Fill: #1C3133 (bs-dark). Rounded left corners (rx: 4).
   - Internal labels in white (#FFFFFF):
     - "Essential Fat" in 10px semibold (two lines).
     - "10-13%" in 12px bold #69D994.
   - Note: This segment is narrower than the male version but starts further right on the axis.

2. **Athletes (14-20%):**
   - Width: ~91px (6% range). Fill: #69D994 (salad-100).
   - Internal labels in #1C3133:
     - "Athletes" in 13px semibold.
     - "14-20%" in 13px bold.

3. **Fitness (21-24%):**
   - Width: ~45px (3% range). Fill: #9DDEAD (salad-90).
   - Internal labels in #1C3133:
     - "Fitness" in 12px semibold.
     - "21-24%" in 12px bold.

4. **Average (25-31%):**
   - Width: ~91px (6% range). Fill: #CCEDD6 (salad-70).
   - Internal labels in #1C3133:
     - "Average" in 13px semibold.
     - "25-31%" in 13px bold.

5. **Obese (32%+):**
   - Width: ~196px (extends from 32% to edge at 45%). Fill: #E87D7D. Rounded right corners (rx: 4).
   - Internal labels in white (#FFFFFF):
     - "Obese" in 14px semibold.
     - "32%+" in 14px bold.

All segments have height 80px and sit flush against each other.

### Healthy Range Indicator (above the bar, y: ~70-85)

- Horizontal line spanning from the start of "Athletes" (14%) to the end of "Fitness" (24%). Stroke: #69D994, 2px.
- Label: "Healthy range" in 11px #69D994.

### Percentage Axis (below the bar, y: 180-200)

- Thin horizontal baseline at y: 180. Stroke: #DFE2E2, 1px.
- Tick marks every 5%: 0%, 5%, 10%, 15%, 20%, 25%, 30%, 35%, 40%, 45%.
- Small vertical tick lines (15px). Stroke: #DFE2E2, 1px.
- Tick labels in 11px #7C8D90.

### Reproductive Note (y: 220-248)

- Rounded rectangle (400px x 28px), centered, fill: #E5F6EB, stroke: #69D994 1px, rx: 6.
- Text inside: "Women require more essential fat for reproductive function" in 11px #1C3133.

### Source Citation (y: 268)

- "Adapted from ACSM Guidelines for Exercise Testing and Prescription & ACE body fat classification ranges" in 11px #7C8D90, centered.

## Title

"Female Body Fat Percentage Ranges" -- centered at top (y: 35), Poppins 20px bold, #1C3133.

## Color Palette

Same as the male version to maintain visual consistency:

| Segment | Color | Hex |
|---------|-------|-----|
| Essential Fat | BodySpec dark | #1C3133 |
| Athletes | Salad 100 | #69D994 |
| Fitness | Salad 90 | #9DDEAD |
| Average | Salad 70 | #CCEDD6 |
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

- **Alt text:** "Horizontal bar chart showing female body fat percentage ranges: essential fat 10 to 13 percent, athletes 14 to 20 percent, fitness 21 to 24 percent, average 25 to 31 percent, and obese 32 percent and above. The healthy range spans the athletes and fitness categories. A note indicates women require more essential fat for reproductive function."
- **SVG title element:** "Female body fat percentage classification ranges."
- **No color-only encoding:** Each segment contains text labels for category and range. Position along the axis provides additional context.
- **Contrast:** Same considerations as the male version. White on #1C3133 and #E87D7D both meet requirements. Dark text on green segments meets 4.5:1.

## Data Accuracy

- Ranges based on ACSM's Guidelines for Exercise Testing and Prescription (11th ed., 2022) and ACE body fat classification.
- Essential fat for females: 10-13% (higher than males due to sex-specific fat storage for reproductive function).
- The 45% upper axis limit accommodates the full obese range visualization.

## Design Notes

- This diagram should be **visually identical in structure** to the male version, allowing direct comparison when viewed in sequence. The only differences are the data ranges, the axis scale (0-45% vs. 0-35%), and the added reproductive note.
- The wider axis range means segments occupy proportionally different positions, which inherently communicates that female ranges are shifted higher.
