---
target_file: content/modules/core/03-key-metrics.md
target_section: "### VAT Thresholds"
placement: Inline image immediately after the section heading, before the threshold table
output_path: content/assets/diagrams/vat-risk-zones.svg
---

# VAT Risk Zones Diagram

## Purpose

Visualize the clinical risk thresholds for visceral adipose tissue (VAT) cross-sectional area in a simple, immediately understandable format. The viewer should see at a glance that VAT below 100 cm2 is low risk, 100-160 cm2 is moderate risk, and above 160 cm2 is high risk. The diagram should also suggest recommended clinical actions for each zone.

## Visual Layout

**Canvas:** 800 x 400px, landscape orientation. Background: #F8F8F8.

### Main Gauge Bar (y: 100-180)

A single long horizontal bar divided into four contiguous risk zones. Spans x: 60 to x: 740.

**Scale mapping:** 0 cm2 at x=60, 300 cm2 at x=740. Each 1 cm2 = 2.27px. (Alternatively, use proportional zones for visual clarity rather than strict linear mapping.)

**Zones (left to right):**

1. **Low Risk (0-100 cm2):**
   - Width: ~240px. Fill: #69D994 (salad-100). Rounded left corners (rx: 6).
   - Label above bar: "Low Risk" in 15px semibold #1C3133.
   - Label inside bar: "<100 cm2" in 16px bold #1C3133.

2. **Moderate Risk (100-160 cm2):**
   - Width: ~144px. Fill: #F5C842 (amber/yellow).
   - Label above bar: "Moderate" in 14px semibold #1C3133.
   - Label inside bar: "100-160" in 14px bold #1C3133.

3. **High Risk (160-200 cm2):**
   - Width: ~96px. Fill: #E87D7D (coral/red).
   - Label above bar: "High" in 14px semibold #1C3133.
   - Label inside bar: "160-200" in 14px bold #FFFFFF.

4. **Very High Risk (200+ cm2):**
   - Width: ~200px. Fill: #C0392B (deep red). Rounded right corners (rx: 6).
   - Label above bar: "Very High" in 14px semibold #FFFFFF (note: this label is above the bar against the #F8F8F8 background, so use #1C3133 instead).
   - Label inside bar: ">200 cm2" in 14px bold #FFFFFF.

All zones have height 60px.

### Threshold Lines

Bold vertical lines at each zone boundary, extending slightly above and below the bar:

- **100 cm2 mark:** 3px stroke #1C3133.
- **160 cm2 mark:** 2px stroke #1C3133.
- **200 cm2 mark:** 2px stroke #1C3133.

### Tick Marks (below the bar, y: 190-225)

Numeric labels at key positions: 0, 50, 100, 150, 160, 200, 250.
- 100, 160, and 200 labels in 12px semibold #1C3133 (threshold values).
- Others in 11px #7C8D90.

### Action Recommendation Boxes (y: 250-300)

Four boxes aligned below their respective zones:

1. **Low Risk box:** Fill: #E5F6EB, stroke: #69D994 1px, rx: 6.
   - "Maintain current habits" in 12px medium #1C3133.
   - "Regular exercise, healthy diet" in 11px #7C8D90.

2. **Moderate Risk box:** Fill: #FFF8E1, stroke: #F5C842 1px, rx: 6.
   - "Lifestyle modification" in 11px medium #1C3133.
   - "Diet + exercise changes" in 10px #7C8D90.

3. **High Risk box:** Fill: #FDEDEC, stroke: #E87D7D 1px, rx: 6.
   - "Structured intervention" in 11px medium #1C3133.

4. **Very High Risk box:** Fill: #F9DEDE, stroke: #C0392B 1px, rx: 6.
   - "Medical evaluation" in 11px medium #1C3133.
   - "Comprehensive assessment" in 10px #7C8D90.

### Clinical Threshold Note (y: 330-360)

A centered box with white fill and #DFE2E2 border (1.5px, rx: 6):
- "The **100 cm2** threshold is widely used in clinical research for elevated metabolic risk" in 12px #1C3133, with "100 cm2" in bold.

## Title

"Visceral Fat Risk Zones" -- centered at top (y: 40), Poppins 22px bold, #1C3133.

**Subtitle:** "VAT Cross-Sectional Area (cm2)" in 13px #7C8D90.

## Color Palette

| Zone | Color | Hex |
|------|-------|-----|
| Low Risk | Salad 100 (green) | #69D994 |
| Moderate Risk | Amber/yellow | #F5C842 |
| High Risk | Coral/red | #E87D7D |
| Very High Risk | Deep red | #C0392B |
| Action box backgrounds | Tinted versions of zone colors | #E5F6EB, #FFF8E1, #FDEDEC, #F9DEDE |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Zone labels (above bar):** 14-15px, weight 600.
- **Zone values (inside bar):** 14-16px, weight 700.
- **Tick labels:** 11-12px, weight 400-600.
- **Action text:** 10-12px, weight 400-500.
- **Threshold note:** 12px, weight 400, with bold for the threshold value.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 400".
- Compact height for inline display. Scales fluidly.
- The gauge bar metaphor communicates risk immediately, even at smaller sizes where the action boxes might be harder to read.

## Accessibility

- **Alt text:** "Horizontal gauge showing visceral fat risk zones by cross-sectional area: low risk below 100 square centimeters (green), moderate risk from 100 to 160 square centimeters (yellow), high risk from 160 to 200 square centimeters (red), and very high risk above 200 square centimeters (dark red). Recommended actions range from maintaining current habits at low risk to medical evaluation at very high risk. The 100 square centimeter threshold is widely used in clinical research."
- **SVG title element:** "Visceral adipose tissue risk zone thresholds."
- **No color-only encoding:** Each zone has a text label for both the risk level name and the numeric range. The action boxes provide additional textual context. Color is supplementary, not the sole indicator.
- **Contrast:** Text inside the green (#69D994) and yellow (#F5C842) bars should be #1C3133 (dark) for good contrast. Text inside #E87D7D and #C0392B bars should be #FFFFFF (white). All exceed WCAG AA for their respective font sizes.

## Data Accuracy

- The 100 cm2 threshold is based on extensive clinical research correlating VAT area with metabolic syndrome components (Kaul et al., 2012; Neeland et al., 2019).
- The 160 cm2 high-risk threshold aligns with studies showing significantly elevated cardiovascular and metabolic risk.
- The 200 cm2 very-high-risk zone represents extreme visceral adiposity.
- Action recommendations are general clinical guidance, not prescriptive treatment plans.
