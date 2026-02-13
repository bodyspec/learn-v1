---
target_file: content/modules/core/01-how-dexa-works.md
target_section: "## The Technology"
placement: Inline image immediately after the section heading, before the first paragraph
output_path: content/assets/diagrams/dexa-dual-energy.svg
---

# DEXA Dual-Energy X-Ray Beam Diagram

## Purpose

Illustrate how dual-energy X-ray absorptiometry works at the physics level. The viewer should understand that two X-ray beams at different energy levels pass through the body, and each tissue type (bone, lean, fat) attenuates them differently. The difference in attenuation between the two beam energies is what allows DEXA to distinguish tissue types.

## Visual Layout

**Canvas:** 800 x 600px, landscape orientation. Background: #F8F8F8 (bs-dark3).

**Overall flow:** Left-to-right, reading like a sentence: X-ray source emits two beams, beams pass through a body cross-section, attenuated beams reach the detector.

### Left Zone (x: 40-160) -- X-Ray Source

- Rounded rectangle (rx: 12) in #1C3133 (bs-dark), representing the X-ray tube housing.
- White text inside: "X-Ray Source" in two lines, Poppins 13px semibold.
- Small radiation symbol icon below the text: circle with crosshairs in #69D994 (salad-100).
- Two beam lines emerge from the right edge of the source:
  - **High-energy beam**: Solid line, 3px stroke, #1C3133 (bs-dark).
  - **Low-energy beam**: Dashed line (8,4 pattern), 3px stroke, #69D994 (salad-100).
- Labels above/below each beam: "High Energy (~70 keV)" and "Low Energy (~40 keV)" in 11px semibold, color-matched to each beam.

### Center Zone (x: 260-540) -- Body Cross-Section

- Three concentric ellipses representing a simplified body cross-section (viewed from above or as a transverse slice):
  - **Outer ellipse (subcutaneous fat):** rx~100, ry~120. Fill: #E87D7D at 30% opacity, stroke: #1C3133 2px. Label: "Subcutaneous Fat" in #7C8D90 (bs-dark55) 12px, positioned above the ellipse.
  - **Middle ellipse (lean tissue / muscle):** rx~70, ry~90. Fill: #69D994 at 40% opacity, stroke: #1C3133 1.5px. Label: "Lean Tissue" in #1C3133 12px, with a thin leader line from label to the ellipse edge.
  - **Inner ellipse (bone):** rx~25, ry~30. Fill: solid #1C3133. Label: "Bone" in white (#FFFFFF) 11px semibold, centered inside.
- Both beam lines should enter from the left, pass through all three layers, and exit on the right. The beams should visually thin or fade (reduced stroke-width and/or opacity) as they pass through denser layers to convey attenuation.

### Right Zone (x: 620-760) -- Detector

- Rounded rectangle (rx: 12) in #1C3133 at 80% opacity.
- White text: "Detector" in Poppins 14px semibold.
- Below that, in #9DDEAD (salad-90), two lines of 11px text: "Measures" / "absorption".
- Attenuated beam lines arrive from the body cross-section at reduced opacity (~50%) and thinner stroke-width (1.5px).
- A small annotation near the attenuated beams: "Attenuated beams" in #7C8D90 10px.

### Bottom Zone (y: 400-580) -- Absorption Comparison Bar Chart

- Section title: "X-Ray Absorption by Tissue Type" in #1C3133, 16px semibold, centered.
- Three horizontal bars, stacked vertically with 10px gaps:
  - **Bone:** Longest bar (250px wide), fill #1C3133. Label left: "Bone" in 13px medium #1C3133. Label right: "Highest absorption" in 12px #7C8D90.
  - **Lean:** Medium bar (160px wide), fill #69D994. Label left: "Lean" in 13px medium #1C3133. Label right: "Moderate absorption" in 12px #7C8D90.
  - **Fat:** Shortest bar (80px wide), fill #E87D7D. Label left: "Fat" in 13px medium #1C3133. Label right: "Lowest absorption" in 12px #7C8D90.
- All bars start at the same x-coordinate, have height 30px, and rounded corners (rx: 4).

## Title

"How Dual-Energy X-Ray Absorptiometry Works" -- centered at top (y: 40), Poppins 22px bold, #1C3133.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text, bone, source/detector | BodySpec dark | #1C3133 |
| Muted text, annotations | BodySpec dark55 | #7C8D90 |
| Borders, dividers | BodySpec dark15 | #DFE2E2 |
| Lean tissue, low-energy beam, accents | Salad 100 | #69D994 |
| Light accent text | Salad 90 | #9DDEAD |
| Fat tissue, warning indicators | Coral/red | #E87D7D |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif (matching the site).
- **Title:** 22px, weight 700.
- **Section labels:** 16px, weight 600.
- **Body labels:** 12-14px, weight 500-600.
- **Annotations:** 10-11px, weight 400-500.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 600" with no fixed width/height attributes, allowing the SVG to scale responsively.
- All text should remain legible at 50% scale (minimum effective font size ~5-6px rendered).
- Touch target areas are not applicable (static diagram).

## Accessibility

- **Alt text (for the img tag in markdown):** "Diagram showing how DEXA dual-energy X-ray beams at high and low energy levels pass through layers of fat, lean tissue, and bone, with each tissue type absorbing different amounts of energy. A horizontal bar chart below compares absorption levels: bone absorbs the most, lean tissue moderate, and fat the least."
- **Contrast ratios:** All text on #F8F8F8 background meets WCAG AA. #1C3133 on #F8F8F8 = ~12:1. #7C8D90 on #F8F8F8 = ~3.5:1 (meets AA for large text; consider bumping to #6B7B7E for small text). #69D994 on #F8F8F8 = ~2.5:1 (used for accent elements only, not critical text; pair with #1C3133 labels).
- **Title element:** Include `<title>` inside the SVG root for screen readers: "DEXA dual-energy X-ray beam diagram showing tissue attenuation."
- **aria-labelledby:** Reference the title element ID from the SVG tag.
- **No color-only encoding:** Each tissue type is labeled with text in addition to color. The beam types are distinguished by line style (solid vs. dashed) in addition to color.

## Data Accuracy

- High-energy beam: approximately 70 keV (some systems use 100-140 kVp).
- Low-energy beam: approximately 40 keV (some systems use 40-70 kVp).
- Attenuation order: bone > lean > fat (by mass attenuation coefficient at diagnostic energies).
- Radiation dose: ~1-10 microsieverts per body composition scan (referenced in the markdown text, not necessarily in the diagram itself).
