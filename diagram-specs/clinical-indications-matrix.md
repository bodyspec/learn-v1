---
target_file: content/modules/physician/01-clinical-indications.md
target_section: "## Primary Clinical Indications"
placement: Inline image immediately after the section heading, before "### Metabolic Assessment"
output_path: content/assets/diagrams/clinical-indications-matrix.svg
---

# Clinical Indications Matrix Diagram

## Purpose

Map the four primary clinical indication categories for DEXA body composition (Metabolic Assessment, Sarcopenia Screening, Weight Management, Endocrine Disorders) against the five key DEXA metrics (Body Fat %, VAT, Lean Mass/FFMI, Regional Analysis, BMC). The viewer should quickly identify which metrics are most relevant for each clinical indication, helping clinicians focus their report interpretation on the data that matters most for their patient's condition.

## Visual Layout

**Canvas:** 800 x 450px, landscape orientation. Background: #F8F8F8.

### Matrix Grid (x: 200-760, y: 90-390)

A table-style grid with clinical indications as rows and DEXA metrics as columns.

**Column Headers (y: 90-130, height: 40px):**

Five columns evenly spaced across x: 200-760 (each column ~112px wide). Headers sit inside rounded-top rectangles with light tinted backgrounds.

1. **"Body Fat %"** (x: 200-312)
   - Header box: Fill: #E5F6EB, rx: 6 on top corners only. Height: 40px.
   - Text: "Body Fat %" in 12px semibold #1C3133, centered.
   - Icon above text: small circle-with-percent glyph (simplified: a 14px circle, stroke: #69D994 1.5px, with "%" text in 8px #69D994 inside), centered at y: 98.

2. **"VAT"** (x: 312-424)
   - Header box: Fill: #FFF8E1, rx: 6 top corners.
   - Text: "VAT" in 12px semibold #1C3133.
   - Icon: small abdominal area glyph (simplified: a 14px rounded square, stroke: #F5C842 1.5px), centered at y: 98.

3. **"Lean Mass / FFMI"** (x: 424-536)
   - Header box: Fill: #E5F6EB, rx: 6 top corners.
   - Text: "Lean Mass" in 12px semibold #1C3133. Below: "/ FFMI" in 10px #7C8D90.
   - Icon: small flexed arm glyph (simplified: a 14px circle, stroke: #69D994 1.5px), centered at y: 98.

4. **"Regional"** (x: 536-648)
   - Header box: Fill: #F0F8FF (very light blue tint), rx: 6 top corners.
   - Text: "Regional" in 12px semibold #1C3133.
   - Icon: small body-outline glyph (simplified: 14px figure, stroke: #46C9F7 1.5px), centered at y: 98.

5. **"BMC"** (x: 648-760)
   - Header box: Fill: #F5F5F5 (neutral light gray), rx: 6 top corners.
   - Text: "BMC" in 12px semibold #1C3133.
   - Icon: small bone glyph (simplified: 14px elongated shape, stroke: #7C8D90 1.5px), centered at y: 98.

**Row Headers (x: 30-195, y: 138-390):**

Four rows, each 63px tall, with a 1px #DFE2E2 horizontal divider between rows.

1. **"Metabolic Assessment"** (y: 138-201)
   - Rounded rectangle (165px x 50px) at x: 30, vertically centered in row. Fill: #FFFFFF, stroke: #1C3133 1.5px, rx: 6.
   - Text: "Metabolic" in 13px semibold #1C3133 (line 1). "Assessment" in 13px semibold #1C3133 (line 2).
   - Left accent bar: 4px wide x 50px, fill: #E87D7D, at x: 30 (integrated into the left edge of the rectangle, rx: 6 on left corners).

2. **"Sarcopenia Screening"** (y: 201-264)
   - Same rectangle style. Text: "Sarcopenia" / "Screening".
   - Left accent bar: fill: #F5C842.

3. **"Weight Management"** (y: 264-327)
   - Same rectangle style. Text: "Weight" / "Management".
   - Left accent bar: fill: #69D994.

4. **"Endocrine Disorders"** (y: 327-390)
   - Same rectangle style. Text: "Endocrine" / "Disorders".
   - Left accent bar: fill: #46C9F7.

### Matrix Cells (intersection of rows and columns)

Each cell is ~112px x 63px. Cells contain either a filled circle (primary relevance), a half-filled circle (secondary relevance), or an empty circle (minimal relevance).

**Cell markers:**

- **Primary relevance (filled circle):** 22px diameter circle, fill: #69D994, stroke: none. A small checkmark path in #FFFFFF (2px stroke) inside the circle.
- **Secondary relevance (half circle):** 22px diameter circle, fill: #E5F6EB, stroke: #69D994 1.5px. No checkmark.
- **Minimal/not applicable (empty circle):** 22px diameter circle, fill: none, stroke: #DFE2E2 1.5px, dash 3,2.

All markers centered both horizontally and vertically within their cell.

**Matrix Data (row x column):**

| | Body Fat % | VAT | Lean Mass/FFMI | Regional | BMC |
|---|---|---|---|---|---|
| **Metabolic Assessment** | Primary | Primary | Secondary | Secondary | Minimal |
| **Sarcopenia Screening** | Secondary | Secondary | Primary | Primary | Secondary |
| **Weight Management** | Primary | Primary | Primary | Secondary | Minimal |
| **Endocrine Disorders** | Primary | Secondary | Primary | Secondary | Secondary |

### Grid Lines

- Horizontal dividers between rows: 1px solid #DFE2E2, spanning x: 200 to x: 760.
- Vertical dividers between columns: 1px solid #DFE2E2, spanning y: 130 to y: 390.
- Outer border of the grid area (x: 200-760, y: 130-390): 1.5px solid #DFE2E2, rx: 0.

### Legend (y: 405-440)

Centered horizontally (x: ~200-600). Three items in a horizontal row with 30px gaps:

1. Filled green circle (14px) + checkmark + "Primary metric" in 11px medium #1C3133.
2. Half-filled circle (14px, #E5F6EB fill, #69D994 stroke) + "Supporting metric" in 11px medium #1C3133.
3. Dashed empty circle (14px, #DFE2E2 dashed stroke) + "Minimal relevance" in 11px medium #7C8D90.

## Title

"When to Use Which DEXA Metrics" -- centered at top (y: 35), Poppins 22px bold, #1C3133.

**Subtitle:** "Primary clinical indications mapped to key measurements" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text | BodySpec dark | #1C3133 |
| Muted text | BodySpec dark55 | #7C8D90 |
| Grid lines, borders, empty markers | Border gray | #DFE2E2 |
| Primary marker fill, green accents | Salad 100 | #69D994 |
| Supporting marker fill, green backgrounds | Salad 60 | #E5F6EB |
| Checkmark inside markers | White | #FFFFFF |
| Metabolic row accent | Coral/red | #E87D7D |
| Sarcopenia row accent | Amber | #F5C842 |
| Weight Management row accent | Salad 100 | #69D994 |
| Endocrine row accent | Blue | #46C9F7 |
| VAT column header | Light yellow | #FFF8E1 |
| Regional column header | Light blue tint | #F0F8FF |
| BMC column header | Neutral gray | #F5F5F5 |
| Row header backgrounds | White | #FFFFFF |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Column headers:** 12px, weight 600 (primary text); 10px, weight 400 (secondary text).
- **Row headers:** 13px, weight 600.
- **Legend text:** 11px, weight 500.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 450".
- The matrix layout is inherently compact and scales well. At narrow widths, the column headers may need to abbreviate ("BF%", "VAT", "Lean", "Reg", "BMC") but the filled/empty circle pattern remains readable.
- The grid structure maintains alignment at any scale.

## Accessibility

- **Alt text:** "Matrix diagram mapping four clinical indications to five DEXA metrics. Metabolic Assessment primarily uses Body Fat Percent and VAT, with Lean Mass and Regional as supporting metrics. Sarcopenia Screening primarily uses Lean Mass/FFMI and Regional Analysis, with Body Fat Percent, VAT, and BMC as supporting metrics. Weight Management primarily uses Body Fat Percent, VAT, and Lean Mass/FFMI, with Regional as a supporting metric. Endocrine Disorders primarily use Body Fat Percent and Lean Mass/FFMI, with VAT, Regional, and BMC as supporting metrics. A legend shows filled green circles for primary metrics, outlined green circles for supporting metrics, and dashed gray circles for minimal relevance."
- **SVG title element:** "Clinical indications matrix showing which DEXA metrics apply to each condition."
- **No color-only encoding:** Each relevance level uses a distinct shape treatment (filled circle with checkmark, outlined circle, dashed circle) in addition to color. Row headers have text labels. Column headers have text labels. The legend provides explicit text descriptions for each marker type.
- **Contrast:** #1C3133 text on #F8F8F8 background exceeds 12:1. #1C3133 on white cell backgrounds exceeds 15:1. White checkmark on #69D994 is ~2.7:1 (compensated by bold stroke weight and small decorative role -- the circle fill itself is the primary indicator). All row accent colors against white exceed 3:1.

## Design Notes

- The matrix format is chosen over a list or Venn diagram because clinicians are accustomed to reading tables and grids. It enables quick cross-referencing.
- The left accent bars on row headers use distinct colors to help the eye track across the row, especially when scanning quickly.
- The three-level relevance system (primary, supporting, minimal) avoids a simple binary that would lose nuance. For example, VAT is secondary for sarcopenia screening -- not the primary metric, but still useful for context.
- Column header icons are intentionally minimal (abstract shapes, not detailed illustrations) to maintain the clean grid aesthetic.
- The data in the matrix is derived from the content in the target file, where each indication subsection describes "What DEXA adds" with specific metrics.
