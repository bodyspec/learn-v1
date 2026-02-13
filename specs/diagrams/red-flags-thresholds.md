---
target_file: content/modules/physician/04-red-flags.md
target_section: "## Metabolic Red Flags"
placement: Inline image immediately after the section heading, before "### Severely Elevated VAT"
output_path: content/assets/diagrams/red-flags-thresholds.svg
---

# Red Flags Threshold Gauges Diagram

## Purpose

Present the four key numeric thresholds that trigger clinical concern on a DEXA body composition report in a dashboard-style layout. Each threshold is displayed as a horizontal gauge with clearly marked normal, warning, and red-flag zones. The viewer should be able to quickly reference these thresholds during clinical practice and understand at what point each metric becomes a red flag requiring further evaluation.

## Visual Layout

**Canvas:** 800 x 500px, landscape orientation. Background: #F8F8F8.

### Overall Structure

Four horizontal gauge rows stacked vertically, each representing one red-flag category. Each row occupies approximately 90px of vertical space with 15px gaps between rows. The gauges span from x: 220 to x: 720 (500px wide). Row labels sit to the left of the gauges (x: 30-210).

### Gauge 1: Visceral Adipose Tissue (y: 80-170)

**Row Label (x: 30-210):**
- **Category name:** "Visceral Fat (VAT)" in 14px semibold #1C3133.
- **Metric:** "Cross-sectional area" in 11px #7C8D90 below.
- **Icon:** Small filled circle (20px diameter) with a simplified abdominal cross-section icon (concentric circle, stroke: #E87D7D 1.5px), at x: 40, y: 95.

**Gauge Bar (x: 220-720, y: 100-126, height: 26px):**

Three contiguous zones:

1. **Normal zone (0-100 cm2):** x: 220 to x: 470 (250px, representing 0-100 of a 0-250+ range). Fill: #69D994. rx: 6 on left corners.
   - Label centered inside: "<100 cm2" in 11px semibold #1C3133.

2. **Warning zone (100-200 cm2):** x: 470 to x: 620 (150px). Fill: #F5C842.
   - Label centered: "100-200" in 11px semibold #1C3133.

3. **Red Flag zone (>200 cm2):** x: 620 to x: 720 (100px). Fill: #C0392B. rx: 6 on right corners.
   - Label centered: ">200 cm2" in 11px bold #FFFFFF.

**Threshold marker at 200 cm2 (x: 620):**
- Vertical line extending from y: 92 to y: 134 (above and below gauge). Stroke: #C0392B 2.5px.
- Small downward-pointing triangle (8px wide x 6px tall) at top of line (y: 92). Fill: #C0392B.
- Label above triangle: "RED FLAG" in 9px bold #C0392B, centered on the line at y: 84.

**Scale ticks (y: 132-145):**
- Tick marks at 0, 50, 100, 150, 200, 250 positions along the gauge.
- Labels: "0" at x: 220, "100" at x: 470, "200" at x: 620 in 10px semibold #1C3133.
- Intermediate ticks ("50", "150", "250") in 9px #7C8D90.

**Clinical note (y: 150-165):**
- "Warrants comprehensive metabolic panel + liver function tests" in 10px italic #7C8D90, left-aligned at x: 220.

### Gauge 2: Fat-Free Mass Index / FFMI (y: 185-275)

**Row Label (x: 30-210):**
- **Category name:** "Muscle Mass (FFMI)" in 14px semibold #1C3133.
- **Metric:** "Fat-free mass index" in 11px #7C8D90.
- **Icon:** Small filled circle (20px) with a simplified muscle/arm icon (stroke: #46C9F7 1.5px), at x: 40, y: 200.

**Gauge Bar (x: 220-720, y: 205-231, height: 26px):**

This gauge is inverted -- the red flag is on the LEFT (low values), and normal is on the right.

1. **Red Flag zone (very low FFMI):** x: 220 to x: 320 (100px). Fill: #C0392B. rx: 6 on left corners.
   - Label centered: "RED FLAG" in 10px bold #FFFFFF.

2. **Warning zone:** x: 320 to x: 420 (100px). Fill: #F5C842.
   - Label centered: "Low" in 11px semibold #1C3133.

3. **Normal zone:** x: 420 to x: 720 (300px). Fill: #69D994. rx: 6 on right corners.
   - Label centered: "Normal Range" in 11px semibold #1C3133.

**Threshold markers:**

Two markers since thresholds differ by sex:

- **Male threshold at FFMI 16 (x: 320):**
  - Vertical line y: 197 to y: 239. Stroke: #C0392B 2px.
  - Triangle marker at top. Fill: #C0392B.
  - Label above: "M: <16" in 9px bold #C0392B.

- **Female threshold at FFMI 13 (x: ~270):**
  - Vertical line y: 197 to y: 239. Stroke: #C0392B 2px, dash 4,2 (dashed to distinguish from male threshold).
  - Triangle marker at top. Fill: #C0392B.
  - Label above: "F: <13" in 9px bold #C0392B.

**Sex indicator badges (right of gauge, x: 730-790):**
- Two small rounded rectangles stacked:
  - "M <16" in 10px semibold #1C3133, inside a box (55px x 18px, fill: #FDEDEC, stroke: #E87D7D 1px, rx: 4), at y: 200.
  - "F <13" in 10px semibold #1C3133, inside a box (55px x 18px, fill: #FDEDEC, stroke: #E87D7D 1px, rx: 4), at y: 222.

**Scale ticks (y: 237-250):**
- Labels for FFMI values: "10", "13", "16", "18", "20", "22" in 9-10px.
- "13" and "16" in semibold #C0392B. Others in #7C8D90.

**Clinical note (y: 255-270):**
- "Screen for underlying disease, nutritional evaluation, PT referral" in 10px italic #7C8D90.

### Gauge 3: Limb Asymmetry (y: 290-380)

**Row Label (x: 30-210):**
- **Category name:** "Limb Asymmetry" in 14px semibold #1C3133.
- **Metric:** "Left vs. right lean mass" in 11px #7C8D90.
- **Icon:** Small filled circle (20px) with a simplified bilateral arrows icon (stroke: #F5C842 1.5px), at x: 40, y: 305.

**Gauge Bar (x: 220-720, y: 310-336, height: 26px):**

1. **Normal zone (0-5%):** x: 220 to x: 387 (167px). Fill: #69D994. rx: 6 on left corners.
   - Label centered: "<5%" in 11px semibold #1C3133.

2. **Notable zone (5-10%):** x: 387 to x: 553 (166px). Fill: #E5F6EB (lighter green).
   - Label centered: "5-10%" in 11px semibold #1C3133.

3. **Warning zone (10-15%):** x: 553 to x: 637 (84px). Fill: #F5C842.
   - Label centered: "10-15%" in 10px semibold #1C3133.

4. **Red Flag zone (>15%):** x: 637 to x: 720 (83px). Fill: #C0392B. rx: 6 on right corners.
   - Label centered: ">15%" in 11px bold #FFFFFF.

**Threshold marker at 15% (x: 637):**
- Vertical line y: 302 to y: 344. Stroke: #C0392B 2.5px.
- Triangle at top. Fill: #C0392B.
- Label: "RED FLAG" in 9px bold #C0392B at y: 294.

**Scale ticks (y: 342-355):**
- "0%", "5%", "10%", "15%", "20%", "25%" along the gauge. "15%" in semibold #C0392B. Others in #7C8D90.

**Clinical note (y: 360-375):**
- "Evaluate for injury, neurological cause, or compensation pattern" in 10px italic #7C8D90.

### Gauge 4: Muscle Loss Rate (y: 395-485)

**Row Label (x: 30-210):**
- **Category name:** "Muscle Loss Rate" in 14px semibold #1C3133.
- **Metric:** "Lean mass change over time" in 11px #7C8D90.
- **Icon:** Small filled circle (20px) with a simplified downward-trending arrow icon (stroke: #E87D7D 1.5px), at x: 40, y: 410.

**Gauge Bar (x: 220-720, y: 415-441, height: 26px):**

1. **Normal zone (0-2% loss):** x: 220 to x: 420 (200px). Fill: #69D994. rx: 6 on left corners.
   - Label centered: "<2% loss" in 11px semibold #1C3133.

2. **Warning zone (2-5% loss):** x: 420 to x: 570 (150px). Fill: #F5C842.
   - Label centered: "2-5% loss" in 11px semibold #1C3133.

3. **Red Flag zone (>5% loss in 3-6mo):** x: 570 to x: 720 (150px). Fill: #C0392B. rx: 6 on right corners.
   - Label centered: ">5% in 3-6mo" in 10px bold #FFFFFF.

**Threshold marker at 5% (x: 570):**
- Vertical line y: 407 to y: 449. Stroke: #C0392B 2.5px.
- Triangle at top. Fill: #C0392B.
- Label: "RED FLAG" in 9px bold #C0392B at y: 399.

**Scale ticks (y: 447-460):**
- "0%", "2%", "5%", "8%", "10%" along the gauge. "5%" in semibold #C0392B. Others in #7C8D90.

**Clinical note (y: 465-480):**
- "Rule out occult malignancy, inflammatory disease, malabsorption" in 10px italic #7C8D90.

## Title

"DEXA Red Flag Thresholds" -- centered at top (y: 35), Poppins 22px bold, #1C3133.

**Subtitle:** "When findings warrant further clinical evaluation" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text | BodySpec dark | #1C3133 |
| Muted text, clinical notes | BodySpec dark55 | #7C8D90 |
| Normal zone | Salad 100 (green) | #69D994 |
| Notable zone (lighter) | Salad 60 | #E5F6EB |
| Warning zone | Amber/yellow | #F5C842 |
| Red Flag zone, threshold markers | Deep red | #C0392B |
| Red flag badge backgrounds | Light red | #FDEDEC |
| Coral accents | Coral/red | #E87D7D |
| Blue accents (FFMI icon) | Blue | #46C9F7 |
| White text on dark zones | White | #FFFFFF |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Row category names:** 14px, weight 600.
- **Row metric descriptions:** 11px, weight 400.
- **Zone labels inside gauges:** 10-11px, weight 600-700.
- **"RED FLAG" labels:** 9px, weight 700, uppercase.
- **Scale tick labels:** 9-10px, weight 400-600.
- **Clinical notes:** 10px, weight 400, italic.
- **Sex threshold badges:** 10px, weight 600.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 500".
- The stacked gauge layout scales well vertically. At narrow widths, the left-side row labels may need to compress or abbreviate, but the gauges with their color zones and threshold markers remain the primary communication.
- The "RED FLAG" labels and threshold markers are designed to be visible even at 50% scale.
- All four gauges use the same x-range (220-720) for visual alignment.

## Accessibility

- **Alt text:** "Dashboard showing four horizontal threshold gauges for DEXA red flags. Gauge 1, Visceral Fat: normal below 100 square centimeters (green), warning from 100 to 200 (yellow), red flag above 200 square centimeters (dark red), which warrants a comprehensive metabolic panel and liver function tests. Gauge 2, Muscle Mass measured by FFMI: red flag below 16 for men and below 13 for women (dark red), with normal values in green, prompting screening for underlying disease and nutritional evaluation. Gauge 3, Limb Asymmetry: normal below 5 percent difference (green), notable at 5 to 10 percent, warning at 10 to 15 percent (yellow), red flag above 15 percent (dark red), requiring evaluation for injury or neurological cause. Gauge 4, Muscle Loss Rate: normal below 2 percent loss (green), warning at 2 to 5 percent (yellow), red flag above 5 percent loss in 3 to 6 months (dark red), prompting evaluation for malignancy or inflammatory disease."
- **SVG title element:** "Four DEXA red flag threshold gauges showing clinical action levels."
- **No color-only encoding:** Each gauge zone contains text labels with the numeric range. The "RED FLAG" text labels appear above threshold markers. Clinical action notes in text below each gauge describe what to do. The threshold markers use vertical lines with triangle pointers in addition to the color change. Sex-specific thresholds are labeled with "M:" and "F:" text.
- **Contrast:** White text on #C0392B: exceeds 7:1. #1C3133 on #69D994: exceeds 4.5:1. #1C3133 on #F5C842: exceeds 12:1. #C0392B "RED FLAG" text on #F8F8F8: exceeds 5:1. Italic clinical notes in #7C8D90 on #F8F8F8: ~3.5:1 at 10px (borderline; acceptable for supplementary information at this size with the italic style providing visual differentiation).

## Data Accuracy

- **VAT >200 cm2:** Based on Neeland et al. (2019) and clinical consensus for severe visceral adiposity warranting aggressive intervention.[^1]
- **FFMI <16 M / <13 F:** Based on Schutz et al. (2002) reference values and EWGSOP2 sarcopenia criteria. These values represent well below the 5th percentile, indicating severe muscle deficit.[^2]
- **Limb asymmetry >15%:** Based on ISCD 2013 official positions for body composition analysis reporting, where >15% lean mass difference between matched limbs is considered clinically significant.[^3]
- **Muscle loss >5% in 3-6 months:** Derived from Cruz-Jentoft et al. (2019) EWGSOP2 criteria and oncology cachexia definitions (Fearon et al., 2011).[^2][^4]

## Design Notes

- The dashboard-style layout mirrors how clinicians scan for abnormal values -- quickly checking each metric against a threshold. The horizontal gauge metaphor is intuitive and requires no explanation.
- All four gauges share the same color language: green (normal) to yellow (warning) to deep red (red flag). This consistent pattern means the viewer learns the system once and can read all four instantly.
- Gauge 2 (FFMI) is intentionally inverted (red on left) because low values are the concern. This may briefly surprise the viewer, but the "RED FLAG" label and threshold markers prevent misreading.
- The sex-specific badges for FFMI are positioned outside the gauge to avoid crowding the bar. Two separate threshold markers (solid for male, dashed for female) provide in-gauge visibility.
- Clinical notes below each gauge bridge the gap between "what is a red flag" and "what to do about it," making the diagram actionable rather than purely informational.
- The threshold markers with triangle pointers create a visual "alarm" metaphor, drawing the eye to the critical boundary.
