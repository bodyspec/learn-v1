---
target_file: content/modules/chiropractor/02-assessment-integration.md
target_section: "## Adding Composition to Your Assessment"
placement: Inline image immediately after the section heading, before the "### Initial Evaluation" subsection
output_path: content/assets/diagrams/assessment-workflow.svg
---

# Chiropractic Assessment Workflow Diagram

## Purpose

Present the four-step workflow for integrating DEXA body composition data into a chiropractic assessment as a clear, linear process. The viewer should understand the sequential flow from initial evaluation through DEXA data review, clinical correlation, and informed treatment planning. The correlation step should be visually emphasized since it represents the unique integration skill this module teaches. A small correlation example table beneath Step 3 reinforces the concept with concrete clinical examples.

## Visual Layout

**Canvas:** 800 x 400px, landscape orientation. Background: #F8F8F8.

### Overall Structure

A horizontal four-step workflow running left to right across the canvas. Each step is a rounded box connected by directional arrows. Below Step 3, a small example correlation table provides a concrete reference.

### Step Boxes (y: 95-215)

Four equally-sized rounded rectangles arranged horizontally. Each box is 155px wide x 120px tall, rx: 10. Positioned with 25px horizontal gaps between boxes.

**Step 1: Initial Evaluation (x: 35-190, y: 95-215)**
- Fill: #FFFFFF. Stroke: #DFE2E2, 2px.
- **Step number badge:** Small circle (r: 12px) at top-center of box, overlapping the top edge (y: 83). Fill: #1C3133. Text: "1" in 11px bold #FFFFFF, centered.
- **Icon area (y: 115-145):** Centered within the box. A simple clipboard icon rendered as a rectangle (22px x 28px) with a small tab at top, stroke: #7C8D90 2px, fill: none. Three short horizontal lines inside (10px wide, stroke: #7C8D90 1.5px) representing a checklist.
- **Title:** "Initial Evaluation" in 13px semibold #1C3133, centered at y: 165.
- **Description:** "Chief complaint,\nhistory, exam" in 10px #7C8D90, centered, multi-line starting at y: 182.

**Connector arrow 1 (x: 190-225):**
- Horizontal line from x: 190 to x: 220 at y: 155 (vertical center of boxes). Stroke: #1C3133 2px.
- Arrowhead: Filled #1C3133 triangle (6px wide, 8px tall) pointing right at x: 220.

**Step 2: DEXA Data Review (x: 225-380, y: 95-215)**
- Fill: #FFFFFF. Stroke: #46C9F7 (blue accent), 2px.
- **Step number badge:** Circle as above. Fill: #46C9F7. Text: "2" in 11px bold #FFFFFF.
- **Icon area (y: 115-145):** A simplified body composition icon: a small rounded rectangle (20px x 30px, rx: 3) divided horizontally into two portions -- top ~40% fill: #E87D7D (fat), bottom ~60% fill: #69D994 (lean). Stroke: #1C3133 1px.
- **Title:** "DEXA Data Review" in 13px semibold #1C3133, centered at y: 165.
- **Description:** "Body fat %, lean mass,\nregional, VAT" in 10px #7C8D90, centered, multi-line starting at y: 182.

**Connector arrow 2 (x: 380-415):**
- Same style as connector arrow 1.

**Step 3: Correlate Findings (x: 415-570, y: 95-215)**
- Fill: #E5F6EB (light green background to emphasize this key step). Stroke: #69D994, 2.5px (slightly thicker to draw attention).
- **Step number badge:** Circle as above. Fill: #69D994. Text: "3" in 11px bold #1C3133.
- **Icon area (y: 115-145):** Two overlapping circles (r: 12px each), offset horizontally by 10px, centered in the box. Left circle stroke: #46C9F7 2px, fill: none. Right circle stroke: #69D994 2px, fill: none. The overlap zone filled with #69D994 at 20% opacity. This represents the Venn diagram of DEXA data meeting clinical findings.
- **Title:** "Correlate Findings" in 13px semibold #1C3133, centered at y: 165.
- **Description:** "Connect DEXA to\nclinical exam" in 10px #7C8D90, centered, multi-line starting at y: 182.
- **"Key step" badge:** Small rounded rectangle (52px x 16px) at the bottom-right corner of the box (x: 512, y: 203). Fill: #69D994. rx: 4. Text: "KEY" in 9px bold #FFFFFF.

**Connector arrow 3 (x: 570-605):**
- Same style as connector arrows 1 and 2.

**Step 4: Treatment Plan (x: 605-760, y: 95-215)**
- Fill: #FFFFFF. Stroke: #DFE2E2, 2px.
- **Step number badge:** Circle as above. Fill: #1C3133. Text: "4" in 11px bold #FFFFFF.
- **Icon area (y: 115-145):** A simplified document with checkmark icon: rectangle (20px x 26px, stroke: #7C8D90 2px, fill: none) with a checkmark inside (stroke: #69D994 2.5px, no fill).
- **Title:** "Treatment Plan" in 13px semibold #1C3133, centered at y: 165.
- **Description:** "Informed by\ncomposition data" in 10px #7C8D90, centered, multi-line starting at y: 182.

### Correlation Example Table (below Step 3, y: 240-360)

A small table positioned below Step 3, horizontally centered beneath it (x: 335-660, y: 240-360). Connected to Step 3 by a short dashed vertical line (stroke: #69D994 1.5px, dash 4,3) from the bottom center of Step 3 (x: 492, y: 215) to the top of the table (x: 492, y: 240).

**Table container:** Rounded rectangle (325px x 120px), fill: #FFFFFF, stroke: #69D994 1.5px, rx: 8.

**Table header row (y: 244-264):**
- Background fill: #E5F6EB. Rounded top corners rx: 8.
- Two columns separated by a vertical line at x: 497 (stroke: #DFE2E2, 1px).
- Left column header: "DEXA Finding" in 11px semibold #1C3133, centered at x: 416, y: 257.
- Right column header: "Clinical Correlation" in 11px semibold #1C3133, centered at x: 578, y: 257.

**Table rows (y: 268-356):** Three data rows, each ~28px tall, separated by horizontal lines (stroke: #DFE2E2, 1px).

Row 1 (y: 268-296):
- Left: "Low trunk lean mass" in 10px #1C3133, x: 345, y: 285.
- Right: "Core instability" in 10px #7C8D90, x: 508, y: 285.
- A small bidirectional arrow icon (text: "<->") in 10px #69D994 at the column divider.

Row 2 (y: 296-324):
- Left: "Leg asymmetry >10%" in 10px #1C3133, x: 345, y: 313.
- Right: "Gait abnormality" in 10px #7C8D90, x: 508, y: 313.

Row 3 (y: 324-356):
- Left: "High VAT + central fat" in 10px #1C3133, x: 345, y: 343.
- Right: "Increased lumbar lordosis" in 10px #7C8D90, x: 508, y: 343.

### Bottom Process Note (y: 375-395)

Centered text at y: 388:
- "Each step builds on the previous -- DEXA data enhances, not replaces, clinical judgment" in 11px italic #7C8D90.

## Title

"Integrating DEXA into Chiropractic Assessment" -- centered at top (y: 35), Poppins 22px bold, #1C3133.

**Subtitle:** "A four-step workflow for composition-informed care" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text, arrows, Step 1/4 badges | BodySpec dark | #1C3133 |
| Muted text, descriptions | BodySpec dark55 | #7C8D90 |
| Borders, table dividers | BodySpec dark15 | #DFE2E2 |
| Step 2 border, DEXA icon accent | Blue accent | #46C9F7 |
| Step 3 highlight, correlation | Salad 100 (green) | #69D994 |
| Step 3 background, table header | Salad 60 (light green) | #E5F6EB |
| Fat portion of body comp icon | Coral/red | #E87D7D |
| Step box fill, table fill | White | #FFFFFF |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Step number badges:** 11px, weight 700.
- **Step titles:** 13px, weight 600.
- **Step descriptions:** 10px, weight 400.
- **Table headers:** 11px, weight 600.
- **Table data:** 10px, weight 400-500.
- **Bottom note:** 11px, weight 400, italic.
- **"KEY" badge:** 9px, weight 700.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 400".
- The horizontal layout suits wide containers typical of content pages. At narrow widths, the step boxes compress but remain readable due to their text-centric design.
- The correlation table is positioned to overlap the lower area of the canvas without crowding; it can extend slightly below the main workflow line.
- All text legible at 50% scale (minimum font size: 9px at full scale, which renders as ~5px at 50% -- the "KEY" badge is supplemental and the word is recognizable even at small sizes).

## Accessibility

- **Alt text:** "Four-step horizontal workflow for integrating DEXA into chiropractic assessment. Step 1: Initial Evaluation covering chief complaint, history, and exam. Step 2: DEXA Data Review including body fat percentage, lean mass, regional data, and VAT. Step 3: Correlate Findings, highlighted as the key step, connecting DEXA data to clinical exam. Step 4: Treatment Plan informed by composition data. Below Step 3, an example correlation table shows three mappings: low trunk lean mass correlates to core instability, leg asymmetry greater than 10 percent correlates to gait abnormality, and high VAT plus central fat correlates to increased lumbar lordosis."
- **SVG title element:** "Chiropractic assessment workflow integrating DEXA body composition data."
- **No color-only encoding:** Each step is numbered (1-4) with text titles and descriptions. The correlation table contains full text labels. Step 3 has both a green highlight background and a "KEY" text badge. Arrows provide directional flow. Color is supplementary throughout.
- **Contrast:** #1C3133 text on #FFFFFF boxes: exceeds 15:1. #1C3133 text on #E5F6EB (Step 3): exceeds 12:1. #7C8D90 text on #FFFFFF: ~5.5:1 (meets AA). White text on #1C3133 badges: exceeds 12:1. White text on #46C9F7: ~3:1 (use bold weight to compensate). White text on #69D994: ~2.8:1 (used only for "KEY" badge at 9px bold, supplementary label).

## Design Notes

- Step 3 is intentionally highlighted with a different background fill and thicker border because clinical correlation is the unique skill being taught -- it is where DEXA data meets chiropractic expertise.
- The Venn diagram icon in Step 3 visually reinforces the concept of overlapping two data sources (DEXA + clinical exam).
- The correlation table provides concrete examples that directly mirror the table in the source content, creating consistency between the diagram and the text.
- The workflow reads naturally left-to-right, matching the temporal sequence of a clinical encounter.
- Icons are kept schematic and simple to match the BodySpec brand style, avoiding photorealistic or overly detailed medical illustrations.
