---
target_file: content/modules/core/04-reading-reports.md
target_section: "## Report Overview"
placement: Inline image immediately after the section heading, before "A BodySpec report includes:"
output_path: content/assets/diagrams/report-anatomy.svg
---

# BodySpec Report Anatomy Diagram

## Purpose

Provide a visual overview of the six key sections of a BodySpec report so that learners can immediately orient themselves when viewing a real report. The diagram shows a stylized, simplified representation of the report page layout with labeled callout lines pointing to each section. The viewer should understand the report's structure and know where to look for specific types of information.

## Visual Layout

**Canvas:** 800 x 600px, landscape orientation. Background: #F8F8F8.

### Stylized Report Page (centered, x: 200-600, y: 80-560)

A rounded rectangle representing a simplified report page:

- **Outer frame:** 400px wide x 480px tall. Fill: #FFFFFF. Stroke: #DFE2E2 2px. rx: 10. Drop shadow: 2px 3px 8px rgba(28,49,51,0.08).
- Positioned centered horizontally (x: 200 to x: 600), starting at y: 80.

### Report Interior Zones

Inside the white report frame, six stacked zones separated by thin horizontal dividers (#DFE2E2, 1px). Each zone is a distinct colored rectangle representing a report section. All zones are inset 12px from the report frame edges (x: 212-588, width: 376px).

**Zone 1: Summary Dashboard (y: 92-162, height: 70px)**
- Fill: #E5F6EB (light green). rx: 4.
- Interior mock content:
  - Three small rounded rectangles side by side (100px x 18px each, fill: #69D994, rx: 3) representing metric cards, centered horizontally with 12px gaps, at y: 102.
  - Below the three cards: a thin horizontal line (300px wide, stroke: #69D994 1px, y: 130) representing a separator.
  - Two smaller rectangles (160px x 14px and 120px x 14px, fill: #DFE2E2, rx: 2) at y: 140 representing summary text lines.
- **Callout number:** Circled "1" positioned inside the zone at top-left (x: 220, y: 100). Circle: 18px diameter, fill: #69D994, stroke: none. Text: "1" in 11px bold #FFFFFF, centered.

**Zone 2: Body Composition Breakdown (y: 170-238, height: 68px)**
- Fill: #FFFFFF. No tinted background (white with a subtle left border: 3px solid #46C9F7 at x: 212).
- Interior mock content:
  - A small stacked horizontal bar (280px x 16px, rx: 3, y: 182) with three segments: #E87D7D (35% width), #69D994 (60% width), #1C3133 (5% width) representing fat/lean/bone.
  - Below: three lines of small rectangles (200px x 10px, 180px x 10px, 160px x 10px, fill: #DFE2E2, rx: 2) at y: 206, 218, 228 representing data rows.
- **Callout number:** Circled "2" at top-left (x: 220, y: 178). Circle: 18px, fill: #46C9F7. Text: "2" in 11px bold #FFFFFF.

**Zone 3: Regional Analysis (y: 246-326, height: 80px)**
- Fill: #FFFFFF. Left border: 3px solid #F5C842 at x: 212.
- Interior mock content:
  - A simplified body silhouette outline (60px wide x 55px tall, stroke: #1C3133 1.5px, no fill) centered at x: 300, y: 265. Minimal stick-figure style with head, torso, arms, legs.
  - Four small dashed lines (stroke: #F5C842 1px, dash 3,2) extending from the silhouette's left arm, right arm, left leg, and right leg to small text placeholders (40px x 8px rectangles, fill: #DFE2E2).
- **Callout number:** Circled "3" at top-left (x: 220, y: 254). Circle: 18px, fill: #F5C842. Text: "3" in 11px bold #1C3133.

**Zone 4: Visceral Fat Section (y: 334-398, height: 64px)**
- Fill: #FFF8E1 (light yellow). rx: 4.
- Interior mock content:
  - A small gauge arc (50px wide x 25px tall, stroke: #E87D7D 3px, fill: none) at left side (x: 240, y: 348) representing the VAT gauge.
  - A small needle line from the gauge center pointing to ~60 degrees.
  - To the right of the gauge: two placeholder text rectangles (140px x 10px, 100px x 10px, fill: #DFE2E2, rx: 2) at y: 352 and y: 368.
  - A small bar (120px x 12px) at y: 384 with gradient from #69D994 through #F5C842 to #E87D7D, representing risk scale.
- **Callout number:** Circled "4" at top-left (x: 220, y: 342). Circle: 18px, fill: #E87D7D. Text: "4" in 11px bold #FFFFFF.

**Zone 5: Trend Tracking (y: 406-470, height: 64px)**
- Fill: #FFFFFF. Left border: 3px solid #69D994 at x: 212.
- Interior mock content:
  - A simplified line chart: x-axis (200px, stroke: #DFE2E2 1px) and y-axis (40px, stroke: #DFE2E2 1px) at x: 250, y: 420.
  - A polyline representing a trend: 5 points descending then leveling off. Stroke: #69D994 2px, no fill. Points as small circles (4px diameter, fill: #69D994).
  - A second polyline (lean mass trend), similar shape but ascending slightly. Stroke: #46C9F7 1.5px. Points: 4px circles, fill: #46C9F7.
- **Callout number:** Circled "5" at top-left (x: 220, y: 414). Circle: 18px, fill: #69D994. Text: "5" in 11px bold #FFFFFF.

**Zone 6: Percentile Rankings (y: 478-548, height: 70px)**
- Fill: #FFFFFF. Left border: 3px solid #7C8D90 at x: 212.
- Interior mock content:
  - Three horizontal percentile bars stacked (260px max width x 10px each, rx: 3, spaced 14px apart, starting y: 492):
    - Bar 1: width 195px (75th percentile), fill: #69D994.
    - Bar 2: width 156px (60th percentile), fill: #46C9F7.
    - Bar 3: width 234px (90th percentile), fill: #69D994.
  - Small label rectangles (50px x 8px, fill: #DFE2E2) to the left of each bar.
- **Callout number:** Circled "6" at top-left (x: 220, y: 486). Circle: 18px, fill: #7C8D90. Text: "6" in 11px bold #FFFFFF.

### Callout Labels (positioned to the left and right of the report page)

Each callout has a horizontal connector line from the numbered circle inside the zone to a text label outside the report frame. Connector lines: stroke #DFE2E2 1.5px, with a small right-angle bend.

**Left-side callouts (x: 30-190):**

1. **"Summary Dashboard"** -- Connector from circle "1" bends left to x: 30.
   - "Summary Dashboard" in 13px semibold #1C3133.
   - "Key metrics at a glance" in 10px #7C8D90 below.

2. **"Body Composition"** -- Connector from circle "2" bends left to x: 30.
   - "Body Composition" in 13px semibold #1C3133.
   - "Fat, lean, bone breakdown" in 10px #7C8D90.

3. **"Regional Analysis"** -- Connector from circle "3" bends left to x: 30.
   - "Regional Analysis" in 13px semibold #1C3133.
   - "Arms, legs, trunk + symmetry" in 10px #7C8D90.

**Right-side callouts (x: 610-790):**

4. **"Visceral Fat"** -- Connector from circle "4" bends right to x: 610.
   - "Visceral Fat" in 13px semibold #1C3133.
   - "VAT area + risk category" in 10px #7C8D90.

5. **"Trend Tracking"** -- Connector from circle "5" bends right to x: 610.
   - "Trend Tracking" in 13px semibold #1C3133.
   - "Changes over multiple scans" in 10px #7C8D90.

6. **"Percentile Rankings"** -- Connector from circle "6" bends right to x: 610.
   - "Percentile Rankings" in 13px semibold #1C3133.
   - "vs. 450K+ scan dataset" in 10px #7C8D90.

## Title

"Anatomy of a BodySpec Report" -- centered at top (y: 35), Poppins 22px bold, #1C3133.

**Subtitle:** "Six key sections of your DEXA results" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Report page fill | White | #FFFFFF |
| Report page border, dividers, connectors | Border gray | #DFE2E2 |
| Primary text | BodySpec dark | #1C3133 |
| Muted text, descriptions | BodySpec dark55 | #7C8D90 |
| Summary Dashboard zone, lean indicators | Salad 60 / Salad 100 | #E5F6EB / #69D994 |
| Body Composition accent, trend line 2 | Blue | #46C9F7 |
| Regional Analysis accent | Amber | #F5C842 |
| Visceral Fat zone background | Light yellow | #FFF8E1 |
| Visceral Fat accent, fat segments | Coral/red | #E87D7D |
| Percentile Rankings accent | Muted gray | #7C8D90 |
| Bone segment, silhouette outline | BodySpec dark | #1C3133 |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Callout section names:** 13px, weight 600.
- **Callout descriptions:** 10px, weight 400.
- **Callout numbers (inside circles):** 11px, weight 700.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 600".
- The centered report-page layout scales naturally within wide containers.
- At narrow widths, the left and right callout labels may need to reduce font size or wrap, but the numbered circles inside the report and the color-coded zones remain identifiable.
- The report frame acts as a strong visual anchor at any scale.

## Accessibility

- **Alt text:** "Annotated diagram of a BodySpec DEXA report showing six labeled sections. Section 1, Summary Dashboard, displays key metrics at a glance with three metric cards. Section 2, Body Composition Breakdown, shows a horizontal bar divided into fat, lean, and bone segments. Section 3, Regional Analysis, includes a simplified body outline with limb annotations. Section 4, Visceral Fat, features a gauge and risk scale for VAT area. Section 5, Trend Tracking, shows a line chart with data points over multiple scans. Section 6, Percentile Rankings, displays three horizontal bars comparing to population norms from over 450,000 scans."
- **SVG title element:** "Anatomy of a BodySpec DEXA report with six annotated sections."
- **No color-only encoding:** Each section is numbered (1-6) with the number displayed inside a colored circle. Every section has a text label and description outside the report frame connected by a line. The numbered circles provide positional and textual identification independent of color.
- **Contrast:** White numbers on colored circles: #FFFFFF on #69D994 is ~2.7:1 (use bold weight at 11px to compensate), #FFFFFF on #46C9F7 is ~2.8:1 (use bold), #FFFFFF on #E87D7D is ~3.1:1, #FFFFFF on #7C8D90 is ~3.7:1. Dark number "3" on #F5C842 is ~12:1. All callout text in #1C3133 on #F8F8F8 exceeds 12:1.

## Design Notes

- The stylized report interior uses abstract shapes (rectangles, bars, lines) rather than real data to avoid implying specific values. The goal is to show structure, not content.
- The alternating left/right callout pattern (1-2-3 on left, 4-5-6 on right) creates visual balance and avoids crowding on one side.
- Each zone uses a unique accent color matching the callout circle, making it easy to visually connect labels to sections.
- The drop shadow on the report frame gives it a "floating card" appearance consistent with BodySpec's web dashboard aesthetic.
- The numbered circles (1-6) match the numbered list in the markdown content that follows immediately after the diagram, creating a direct visual-to-text mapping.
