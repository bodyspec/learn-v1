---
target_file: content/modules/core/03-key-metrics.md
target_section: "## Visceral Adipose Tissue (VAT)"
placement: Inline image immediately after the section heading, before the "What is VAT?" subsection
output_path: content/assets/diagrams/vat-sat-location.svg
---

# Visceral vs. Subcutaneous Fat Location Diagram

## Purpose

Show the anatomical difference between visceral adipose tissue (VAT) and subcutaneous adipose tissue (SAT) using an abdominal cross-section. The viewer should understand that VAT is deep fat surrounding the internal organs inside the abdominal cavity, while SAT is the fat layer between the skin and the abdominal muscle wall. This distinction is critical for understanding metabolic risk.

## Visual Layout

**Canvas:** 800 x 600px, landscape orientation. Background: #F8F8F8.

### Main Cross-Section (left-center, x: 100-500, y: 80-500)

An anatomical **transverse cross-section of the abdomen** at approximately the L4 vertebral level:

**Skin/body outline:**
- Large ellipse (cx: 300, cy: 300, rx: ~180, ry: ~160). Stroke: #1C3133 3px, no fill initially.

**Subcutaneous fat layer:**
- The space between the outer skin ellipse and an inner ellipse (rx: ~145, ry: ~128).
- Fill the outer ellipse with #CCEDD6 (salad-70) at 50% opacity, then place a #F8F8F8 filled inner ellipse on top to create the "ring" effect.
- This creates a visible green-tinted band representing SAT -- "the fat you can pinch."

**Abdominal muscle wall:**
- The inner ellipse border serves as the muscle wall. Stroke: #69D994, 4px (thicker to emphasize the muscle layer).

**Visceral fat (inside the cavity):**
- Fill the area inside the muscle wall with #E87D7D at 25% opacity (a slightly larger ellipse, rx: ~140, ry: ~123, inside the muscle wall).
- This represents the visceral fat surrounding the organs.

**Simplified internal organs (overlaid on the visceral fat area):**
- **Liver** (upper-right quadrant in the patient, left side of the viewer): Ellipse (rx: ~45, ry: ~30). Fill: #7C8D90 at 60% opacity, stroke: #7C8D90 1.5px. Internal label: "Liver" in 11px white.
- **Intestines** (center): Ellipse (rx: ~55, ry: ~45). Fill: #7C8D90 at 40% opacity, stroke: #7C8D90 1.5px. Internal label: "Intestines" in 11px #1C3133.
- **Kidneys** (lateral positions): Two small ellipses (rx: ~15, ry: ~25). Fill: #7C8D90 at 50% opacity, stroke: #7C8D90 1px.
- **Spine** (posterior/bottom): Circle (r: ~18). Fill: #1C3133 solid. Label: "Spine" in 9px white.

### Label Callouts (right side, x: 500-780)

**SAT label:**
- Leader line from the subcutaneous fat layer to the right.
- "Subcutaneous Fat (SAT)" in 15px semibold #69D994.
- "Under the skin" in 12px #7C8D90.
- "The fat you can pinch" in 12px #7C8D90.

**VAT label:**
- Leader line from the visceral fat area to the right.
- "Visceral Fat (VAT)" in 15px semibold #E87D7D.
- "Around organs" in 12px #7C8D90.
- "Metabolically active" in 12px #7C8D90.

**Muscle wall label (left side):**
- Leader line from the muscle wall boundary.
- "Abdominal muscle wall" in 12px medium #69D994.

### Comparison Table (bottom-right, x: 510-780, y: 320-515)

A small table in a rounded rectangle with white fill and #DFE2E2 border:

**Header row:** Dark background (#1C3133), with columns: "Property", "VAT" (in #E87D7D), "SAT" (in #69D994). 11px semibold.

**Data rows** (11px, with #DFE2E2 separator lines between rows):

| Property | VAT | SAT |
|----------|-----|-----|
| Location | Around organs | Under skin |
| Metabolic impact | **High** (#E87D7D bold) | Low (#69D994) |
| Portal drainage | **Yes** (#E87D7D bold) | No |
| Exercise response | Fast (#69D994) | Slow |
| Inflammation | **High** (#E87D7D bold) | Low (#69D994) |

## Title

"Visceral vs. Subcutaneous Fat" -- centered at top (y: 40), Poppins 22px bold, #1C3133.

**Subtitle:** "Abdominal cross-section at L4 vertebral level" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Body outline, bone, primary text | BodySpec dark | #1C3133 |
| Muted text | BodySpec dark55 | #7C8D90 |
| Borders | BodySpec dark15 | #DFE2E2 |
| SAT, muscle wall, positive indicators | Salad 100 | #69D994 |
| SAT fill | Salad 70 | #CCEDD6 |
| VAT, risk indicators | Coral/red | #E87D7D |
| Organs | BodySpec dark55 | #7C8D90 |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Callout headings:** 15px, weight 600.
- **Callout details:** 12px, weight 400.
- **Table text:** 11px, weight 400-600.
- **Organ labels:** 9-11px, weight 500.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 600".
- The cross-section illustration is the primary element; the comparison table is secondary. At very narrow widths, the table may become hard to read, but the cross-section and its labels should remain clear.

## Accessibility

- **Alt text:** "Abdominal cross-section diagram showing two types of fat: subcutaneous fat (SAT) as a green-tinted layer under the skin that you can pinch, and visceral fat (VAT) as a red-tinted area surrounding internal organs including the liver, intestines, and kidneys. A comparison table shows that VAT has high metabolic impact, portal drainage to the liver, high inflammation, but responds quickly to exercise, while SAT has lower metabolic impact and inflammation."
- **SVG title element:** "Cross-section of abdomen showing visceral versus subcutaneous fat locations."
- **No color-only encoding:** Both fat types have text labels, leader lines, and are described in the comparison table. The table uses text labels ("High", "Low", "Yes", "No") alongside color emphasis.
- **Contrast:** Labels on the semi-transparent fills maintain readability through sufficient font weight and size. The comparison table uses high-contrast dark header row with white text.

## Design Notes

- The cross-section should feel **clinical but not graphic** -- simplified shapes for organs, not anatomically detailed renderings.
- The visceral fat "glow" effect (red tint around organs) should be subtle enough not to alarm but clear enough to convey that fat surrounds the organs.
- The subcutaneous fat "ring" should be obviously between the skin line and the muscle wall, making the concept of "fat you can pinch" intuitive.
- Consider adding a small directional label "Anterior" at top and "Posterior" at bottom of the cross-section for anatomical orientation.
