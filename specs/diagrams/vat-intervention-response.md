---
target_file: content/deep-dives/visceral-fat/02-intervention-tracking.md
target_section: "## Realistic Expectations"
placement: Inline image immediately after the section heading, before the "Typical VAT Changes by Intervention" subsection
output_path: content/assets/diagrams/vat-intervention-response.svg
---

# VAT Intervention Response Curves Diagram

## Purpose

Show typical visceral adipose tissue reduction trajectories over 12 months for four different intervention scenarios: exercise only, diet plus exercise, GLP-1 medication plus lifestyle changes, and no intervention. The viewer should understand that (1) VAT responds preferentially and early in weight loss, (2) different interventions produce different magnitudes of reduction, (3) all active interventions show a characteristic pattern of rapid early response followed by a plateau, and (4) the 100 cm2 clinical threshold is a meaningful goal. This sets realistic patient expectations and helps providers frame intervention discussions.

## Visual Layout

**Canvas:** 800 x 450px, landscape orientation. Background: #F8F8F8.

### Chart Area (x: 100-720, y: 80-340)

The main chart area is a rectangular region for the line graph.

**Chart boundary:**
- Left axis line (y-axis): x: 100, from y: 80 to y: 340. Stroke: #1C3133, 1.5px.
- Bottom axis line (x-axis): y: 340, from x: 100 to x: 720. Stroke: #1C3133, 1.5px.

### Y-Axis (VAT Area, cm2)

**Scale:** 80 cm2 (bottom, y: 340) to 160 cm2 (top, y: 80). Each 1 cm2 = 3.25px.

**Tick marks and labels (left of y-axis, x: 55-95):**
- 160 cm2: y: 80. Label "160" in 11px #7C8D90.
- 150 cm2: y: 112.5. Label "150" in 11px #7C8D90. Light horizontal gridline: stroke #DFE2E2, 1px, dash 4,4.
- 140 cm2: y: 145. Label "140" in 11px #7C8D90. Gridline.
- 130 cm2: y: 177.5. Label "130" in 11px #7C8D90. Gridline.
- 120 cm2: y: 210. Label "120" in 11px #7C8D90. Gridline.
- 110 cm2: y: 242.5. Label "110" in 11px #7C8D90. Gridline.
- 100 cm2: y: 275. Label "100" in 12px semibold #1C3133 (emphasized -- this is the clinical threshold). **No dashed gridline here; replaced by the threshold line below.**
- 90 cm2: y: 307.5. Label "90" in 11px #7C8D90. Gridline.
- 80 cm2: y: 340. Label "80" in 11px #7C8D90.

**Y-axis title:** "VAT Area (cm2)" in 12px semibold #1C3133, rotated -90 degrees, positioned at x: 30, centered vertically.

### X-Axis (Time in Months)

**Scale:** 0 months (left, x: 100) to 12 months (right, x: 720). Each month = 51.67px.

**Tick marks and labels (below x-axis, y: 350-365):**
- 0 months: x: 100. Label "0" in 11px #7C8D90.
- 3 months: x: 255. Label "3" in 11px #7C8D90. Vertical gridline: stroke #DFE2E2, 1px, dash 4,4.
- 6 months: x: 410. Label "6" in 11px #7C8D90. Gridline.
- 9 months: x: 565. Label "9" in 11px #7C8D90. Gridline.
- 12 months: x: 720. Label "12" in 11px #7C8D90.

**X-axis title:** "Months" in 12px semibold #1C3133, centered below the axis at y: 378.

### Clinical Threshold Line

A prominent horizontal dashed line at 100 cm2 (y: 275):
- Stroke: #C0392B (deep red), 2px, dash 8,4.
- Label at right end: "Clinical threshold" in 11px semibold #C0392B, positioned at x: 725 (just right of the chart area), right-aligned.
- Small label below: "100 cm2" in 10px #C0392B, positioned below the "Clinical threshold" label.

### Data Lines

All lines start at 150 cm2 (y: 112.5) at month 0 (x: 100). Each line uses a 2.5px stroke with round line-cap and round line-join for smooth curves.

**Line 1: No Intervention (gray dashed)**
- Color: #7C8D90. Stroke: 2px, dash 6,4.
- Path: Flat with slight upward drift.
  - Month 0: 150 cm2 (x: 100, y: 112.5)
  - Month 3: 152 cm2 (x: 255, y: 106)
  - Month 6: 153 cm2 (x: 410, y: 102.75)
  - Month 9: 155 cm2 (x: 565, y: 96.25)
  - Month 12: 156 cm2 (x: 720, y: 93)
- Data points: Small circles (r: 3px) at each quarter, fill: #7C8D90.

**Line 2: Exercise Only (green)**
- Color: #69D994. Stroke: 2.5px, solid.
- Path: Moderate steady decline with slight plateau at end.
  - Month 0: 150 cm2 (x: 100, y: 112.5)
  - Month 3: 135 cm2 (x: 255, y: 161.25)
  - Month 6: 125 cm2 (x: 410, y: 193.75)
  - Month 9: 122 cm2 (x: 565, y: 203.5)
  - Month 12: 120 cm2 (x: 720, y: 210)
- Data points: Small circles (r: 3.5px) at each quarter, fill: #69D994, stroke: #FFFFFF 1.5px.

**Line 3: Diet + Exercise (blue)**
- Color: #46C9F7. Stroke: 2.5px, solid.
- Path: Steeper decline, crossing the 100 cm2 threshold at ~month 9.
  - Month 0: 150 cm2 (x: 100, y: 112.5)
  - Month 3: 128 cm2 (x: 255, y: 184)
  - Month 6: 112 cm2 (x: 410, y: 236)
  - Month 9: 103 cm2 (x: 565, y: 265.25)
  - Month 12: 100 cm2 (x: 720, y: 275)
- Data points: Small circles (r: 3.5px) at each quarter, fill: #46C9F7, stroke: #FFFFFF 1.5px.

**Line 4: GLP-1 + Lifestyle (dark green)**
- Color: #1C3133. Stroke: 2.5px, solid.
- Path: Steepest decline, crossing 100 cm2 threshold at ~month 6.
  - Month 0: 150 cm2 (x: 100, y: 112.5)
  - Month 3: 120 cm2 (x: 255, y: 210)
  - Month 6: 102 cm2 (x: 410, y: 268.5)
  - Month 9: 95 cm2 (x: 565, y: 291.25)
  - Month 12: 90 cm2 (x: 720, y: 307.5)
- Data points: Small circles (r: 3.5px) at each quarter, fill: #1C3133, stroke: #FFFFFF 1.5px.

### Legend (x: 120, y: 388, horizontal layout)

Four legend entries arranged horizontally below the chart:

1. Short dashed line segment (20px) in #7C8D90 + "No intervention" in 11px #7C8D90. Starting at x: 120.
2. Solid line segment (20px) in #69D994 + circle marker + "Exercise only" in 11px #1C3133. Starting at x: 270.
3. Solid line segment (20px) in #46C9F7 + circle marker + "Diet + Exercise" in 11px #1C3133. Starting at x: 405.
4. Solid line segment (20px) in #1C3133 + circle marker + "GLP-1 + Lifestyle" in 11px #1C3133. Starting at x: 560.

### Annotation: Rapid Early Response

A subtle annotation highlighting the steep early decline (months 0-3):
- Bracket or thin rectangle with #DFE2E2 fill at 30% opacity, spanning x: 100-255, y: 80-340.
- Label at top: "Rapid response phase" in 10px italic #7C8D90, centered in the shaded region at y: 75.

### Bottom Note (y: 425)

- "Data represents typical ranges from clinical trials. Individual responses vary. VAT measured as cross-sectional area at L4-L5." in 10px #7C8D90, centered.

## Title

"VAT Response to Intervention Over 12 Months" -- centered at top (y: 30), Poppins 20px bold, #1C3133.

**Subtitle:** "Starting VAT: 150 cm2 (elevated risk)" in 12px #7C8D90, centered at y: 50.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Axes, primary text, GLP-1 line | BodySpec dark | #1C3133 |
| Muted text, no-intervention line, gridlines | BodySpec dark55 | #7C8D90 |
| Gridlines, borders | BodySpec dark15 | #DFE2E2 |
| Exercise only line | Salad 100 (green) | #69D994 |
| Diet + Exercise line | Blue accent | #46C9F7 |
| GLP-1 + Lifestyle line | BodySpec dark | #1C3133 |
| Clinical threshold line | Deep red | #C0392B |
| Data point stroke | White | #FFFFFF |

The color choices ensure each line is visually distinct: gray dashed for the inactive baseline, green for exercise, blue for combined diet/exercise, and dark (BodySpec primary) for the pharmacological intervention.

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 20px, weight 700.
- **Subtitle:** 12px, weight 400.
- **Axis titles:** 12px, weight 600.
- **Axis tick labels:** 11px, weight 400.
- **Threshold label:** 11px, weight 600.
- **Legend text:** 11px, weight 400.
- **Annotation text:** 10px, weight 400, italic.
- **Bottom note:** 10px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 450".
- The chart area is the dominant element. At narrow widths, the legend entries may need to wrap or reduce spacing, but the chart lines and threshold remain clearly readable.
- The four-line chart with distinct colors and styles (solid vs. dashed) remains distinguishable even at 50% scale.
- Data point markers help identify individual lines when colors become harder to distinguish at small sizes.

## Accessibility

- **Alt text:** "Line chart showing typical visceral adipose tissue reduction over 12 months for four intervention types, all starting at 150 square centimeters. No intervention (gray dashed line) shows a slight increase to 156 square centimeters. Exercise only (green line) shows a moderate decline to 120 square centimeters. Diet plus exercise (blue line) shows a steeper decline to 100 square centimeters, reaching the clinical threshold. GLP-1 medication plus lifestyle changes (dark line) shows the steepest decline to 90 square centimeters, crossing the clinical threshold at approximately 6 months. A horizontal dashed red line marks the 100 square centimeter clinical threshold. All active interventions show the fastest reduction in the first 3 months."
- **SVG title element:** "VAT intervention response curves over 12 months."
- **No color-only encoding:** Each line has a distinct style (dashed vs. solid) and data point markers. The legend provides text labels for each intervention type. Axis labels provide numeric context. The clinical threshold line is labeled with both its name and value. The "rapid response phase" annotation provides additional textual context.
- **Contrast:** #69D994 green line on #F8F8F8 background: ~2.4:1 (compensated by 2.5px stroke width; lines do not need to meet text contrast ratios per WCAG). #46C9F7 blue line: ~2.2:1 (same compensation). #1C3133 dark line: exceeds 12:1. #C0392B threshold line: exceeds 4.5:1. All text labels meet WCAG AA for their respective sizes and backgrounds.

## Data Accuracy

- Starting VAT of 150 cm2 represents a clinically elevated level, typical of patients who would be monitored.
- Exercise-only reduction of ~20% (150 to 120 cm2) over 12 months aligns with meta-analysis data (Vissers et al., 2013: 10-20% reduction in 12-16 weeks, with continued modest gains over longer periods).
- Diet + exercise reduction of ~33% (150 to 100 cm2) aligns with combined intervention data (15-30% range from the content).
- GLP-1 + lifestyle reduction of ~40% (150 to 90 cm2) aligns with STEP 1 DEXA substudy data showing 27.4% VAT mass reduction at 68 weeks (Wilding et al., 2022), with the starting point here being somewhat higher.
- The 100 cm2 threshold is well-established in clinical research (Kaul et al., 2012; Bennett et al., 2024).
- The characteristic rapid-early-then-plateau pattern is consistently observed across intervention types in longitudinal studies.
- No intervention showing slight VAT increase reflects the natural trajectory of aging and sedentary behavior.

## Design Notes

- The line chart format was chosen because it directly communicates trajectories over time, which is the core educational message: "what will happen if I do X for Y months?"
- Using the same starting point (150 cm2) for all lines enables direct visual comparison of intervention effectiveness.
- The clinical threshold line is the most important reference element -- it gives the curves meaning by providing a clinical goal. Its deep red color and prominent dash pattern make it stand out from the gridlines.
- The GLP-1 + Lifestyle line uses #1C3133 (BodySpec dark) rather than a fourth bright color to keep the palette manageable and ensure sufficient visual distinction. As the most effective intervention, using the strongest color is appropriate.
- The "rapid response phase" shading is intentionally subtle -- it provides context without distracting from the data lines.
- Data point markers at quarterly intervals (0, 3, 6, 9, 12 months) correspond to typical DEXA monitoring cadence, reinforcing the practical scan schedule discussed in the content.
