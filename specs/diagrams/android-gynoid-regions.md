---
target_file: content/modules/core/03-key-metrics.md
target_section: "## Regional Metrics"
placement: Inline image immediately after the section heading, before the "Android Fat" subsection
output_path: content/assets/diagrams/android-gynoid-regions.svg
---

# Android and Gynoid Regions Diagram

## Purpose

Clearly illustrate the anatomical locations of the android (abdominal) and gynoid (hip/thigh) measurement regions on the body, and explain the A/G ratio. The viewer should understand exactly where these regions are measured, why they matter for metabolic risk, and how the ratio is calculated.

## Visual Layout

**Canvas:** 600 x 800px, portrait orientation. Background: #F8F8F8.

### Main Illustration (center-left, x: 100-420, y: 80-730)

A front-facing, full-body **gender-neutral human outline** in line-art style:

**Body outline:**
- Head: circle (r: ~35), stroke: #1C3133 2.5px.
- Neck: short rectangle connecting head to shoulders.
- Shoulders and torso: smooth path from shoulders through waist to hips. Stroke: #1C3133 2.5px, no fill.
- Arms: paths from shoulders to hands, hanging at sides. Stroke: #1C3133 2.5px.
- Hips to legs: paths continuing from hip line down to feet, with inner leg lines. Stroke: #1C3133 2-2.5px.

**Android Region overlay:**
- A semi-transparent rectangle with rounded corners (rx: 10) overlaying the torso from the rib line (~y: 230) to the iliac crest (~y: 340).
- Fill: #E87D7D at 35% opacity. Stroke: #E87D7D, 2.5px solid.
- Width spans the torso (~200px).

**Gynoid Region overlay:**
- A semi-transparent rectangle with rounded corners (rx: 10) overlaying the hip-to-mid-thigh region (~y: 380 to y: 510).
- Fill: #46C9F7 at 30% opacity. Stroke: #46C9F7, 2.5px solid.
- Width spans from outer hip to outer hip (~210px).

**Boundary markers (dashed horizontal lines):**
- **Rib line:** Dashed line across the body at the top of the android region. Stroke: #E87D7D, 1px, dash 4,3. Extends slightly beyond the body outline. Label at right end: "Ribs" in 10px #E87D7D.
- **Iliac crest line:** Dashed line at the bottom of the android region / overlap area. Stroke: #E87D7D, 1px, dash 4,3. Label: "Iliac crest" in 10px #E87D7D.

### Label Callouts (right side)

**Android Region label:**
- Leader line from the android overlay to the right side (x: ~470).
- "Android Region" in 16px semibold #E87D7D.
- "Abdominal / belly fat" in 12px #7C8D90.
- "Between ribs and top of pelvis" in 11px #7C8D90.

**Gynoid Region label:**
- Leader line from the gynoid overlay to the right side (x: ~470).
- "Gynoid Region" in 16px semibold #46C9F7.
- "Hip / thigh fat" in 12px #7C8D90.
- "Below pelvis to mid-thigh" in 11px #7C8D90.

### A/G Ratio Box (bottom, y: 730-785)

- Rounded rectangle, width ~400px, centered, fill: #E5F6EB, stroke: #69D994 1.5px, rx: 8.
- Title line: "A/G Ratio = Android Fat % / Gynoid Fat %" in 14px semibold #1C3133.
- Below that, two items on the same line:
  - "<1.0 = Lower risk" in 12px #69D994 (left side).
  - ">1.0 = Higher risk" in 12px #E87D7D (right side).

## Title

"Android & Gynoid Measurement Regions" -- centered at top (y: 40), Poppins 22px bold, #1C3133. Use `&amp;` for the ampersand in SVG.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Body outline, primary text | BodySpec dark | #1C3133 |
| Muted text | BodySpec dark55 | #7C8D90 |
| Android region | Coral/red | #E87D7D |
| Gynoid region | Blue accent | #46C9F7 |
| A/G ratio box | Salad 60 / Salad 100 | #E5F6EB / #69D994 |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Region labels:** 16px, weight 600.
- **Descriptions:** 11-12px, weight 400.
- **A/G formula:** 14px, weight 600.
- **Risk labels:** 12px, weight 400-500.

## Sizing and Responsiveness

- SVG viewBox: "0 0 600 800".
- Portrait orientation matches the full-body figure.
- All text legible at 50% scale.

## Accessibility

- **Alt text:** "Front-facing body outline showing the android measurement region highlighted in red over the abdominal area between the ribs and pelvis, and the gynoid measurement region highlighted in blue over the hips and upper thighs. The A/G ratio formula is shown: Android Fat Percentage divided by Gynoid Fat Percentage, where less than 1.0 indicates lower metabolic risk and greater than 1.0 indicates higher risk."
- **SVG title element:** "Android and gynoid body composition measurement regions."
- **No color-only encoding:** Both regions have text labels and leader lines. The boundary markers (ribs, iliac crest) provide anatomical reference points. The A/G ratio values include numeric thresholds alongside the color coding.
- **Contrast:** #E87D7D and #46C9F7 labels are used on #F8F8F8 background. Both colors at their full saturation against #F8F8F8 may have marginal contrast for small text; pair with the larger 16px font size to ensure readability, or use #1C3133 for the region names and color only the region shapes.

## Design Notes

- The body outline should be the **same style** as the regional-divisions diagram for visual consistency across the module.
- The android and gynoid regions should **not overlap** -- there should be a visible gap between them (the pelvic area) to clearly show they are measured independently.
- Use solid stroke borders on the region overlays (not dashed) to make them visually prominent, distinguishing them from the lighter boundary marker lines.
