---
target_file: content/modules/core/01-how-dexa-works.md
target_section: "## Regional Analysis"
placement: Inline image immediately after the section heading, before the first paragraph
output_path: content/assets/diagrams/regional-divisions.svg
---

# Regional Divisions Diagram

## Purpose

Show how a DEXA scan divides the body into distinct anatomical regions for separate analysis. The viewer should see a front-facing body outline with clearly labeled regions for each arm, each leg, the trunk, and the head. The android and gynoid sub-regions within the trunk should be highlighted. This helps explain one of DEXA's unique advantages: regional and asymmetry analysis.

## Visual Layout

**Canvas:** 600 x 800px, portrait orientation. Background: #F8F8F8.

### Main Illustration (center-left, x: 80-380, y: 80-700)

A front-facing, full-body **gender-neutral human outline** drawn with clean line art:

**Head:**
- Circle (r: ~35), positioned at top-center of the figure.
- Fill: #DFE2E2 at 50% opacity (indicating it is measured but typically not a primary region of interest).
- Stroke: #1C3133, 2px.
- Label: "Head" in 11px #7C8D90, centered inside.

**Trunk:**
- A path covering the torso from shoulders to hips.
- Fill: #1C3133 at 15% opacity.
- Stroke: #1C3133, 2px.
- Label: "Trunk" in 14px medium #1C3133, centered inside the torso area.

**Left Arm:**
- Path from left shoulder to hand.
- Fill: #69D994 at 40% opacity.
- Stroke: #1C3133, 2px.
- Label: "L. Arm" in 11px medium #1C3133, rotated to follow the arm angle.

**Right Arm:**
- Path from right shoulder to hand.
- Fill: #9DDEAD at 40% opacity.
- Stroke: #1C3133, 2px.
- Label: "R. Arm" in 11px medium #1C3133, rotated to follow the arm angle.

**Left Leg:**
- Path from left hip to foot.
- Fill: #46C9F7 at 35% opacity.
- Stroke: #1C3133, 2px.
- Label: "L. Leg" in 12px medium #1C3133.

**Right Leg:**
- Path from right hip to foot.
- Fill: #46C9F7 at 25% opacity.
- Stroke: #1C3133, 2px.
- Label: "R. Leg" in 12px medium #1C3133.

**Android Zone (optional overlay):**
- A semi-transparent rectangle or zone overlaying the trunk between the rib line and the iliac crest line.
- Fill: #E87D7D at 15% opacity, stroke: #E87D7D 1px dashed.
- Small label or leader line: "Android" in 10px #E87D7D.

**Gynoid Zone (optional overlay):**
- A semi-transparent rectangle overlaying the hips and upper thighs.
- Fill: #46C9F7 at 15% opacity, stroke: #46C9F7 1px dashed.
- Small label or leader line: "Gynoid" in 10px #46C9F7.

### Legend Panel (right side, x: 390-590, y: 120-400)

A rounded rectangle with white fill and #DFE2E2 border containing:

**Title:** "Each region reports:" in 14px semibold #1C3133.

**Legend items** (each with a small colored square 12x12px):
- Red square (#E87D7D): "Fat mass (g)" in 13px #1C3133.
- Green square (#69D994): "Lean mass (g)" in 13px #1C3133.
- Gray square (#7C8D90): "Body fat %" in 13px #1C3133.

**Divider line** (#DFE2E2, 1px).

**Asymmetry Detection section:**
- "Asymmetry Detection" in 12px medium #1C3133.
- "Left vs. right comparison identifies imbalances" in 11px #7C8D90.
- Color-coded thresholds:
  - "<5% normal" in 11px #69D994.
  - "5-10% monitor" in 11px #F5C842 (amber/yellow).
  - ">10% investigate" in 11px #E87D7D.

### Bottom Info Box (y: 710-765)

- Rounded rectangle, fill: #E5F6EB, stroke: #69D994 1.5px, rx: 8.
- "DEXA uniquely provides left/right and regional breakdown" in 13px medium #1C3133.
- "Valuable for injury recovery, training assessment, and clinical screening" in 12px #7C8D90.

## Title

"DEXA Regional Analysis" -- centered at top (y: 40), Poppins 22px bold, #1C3133.

## Color Palette

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Background | Light gray | #F8F8F8 | Canvas |
| Primary text, outline | BodySpec dark | #1C3133 | Figure outline, main labels |
| Muted text | BodySpec dark55 | #7C8D90 | Secondary labels, head |
| Borders | BodySpec dark15 | #DFE2E2 | Legend border, head fill |
| Left arm | Salad 100 | #69D994 | Region fill |
| Right arm | Salad 90 | #9DDEAD | Region fill (slightly lighter for differentiation) |
| Legs | Blue accent | #46C9F7 | Region fill |
| Android zone, fat | Coral/red | #E87D7D | Zone overlay |
| Warning threshold | Amber | #F5C842 | Asymmetry monitor range |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Legend title:** 14px, weight 600.
- **Region labels:** 11-14px, weight 500.
- **Annotations:** 11-12px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 600 800".
- Portrait orientation suits the body figure. On wider screens this may appear as a column within a larger container.
- All text legible at 50% scale.

## Accessibility

- **Alt text:** "Front-facing body outline showing DEXA regional analysis divisions: head, left arm, right arm, trunk, left leg, and right leg, each color-coded. A legend indicates each region reports fat mass, lean mass, and body fat percentage. Asymmetry thresholds are listed: less than 5% is normal, 5 to 10% should be monitored, and greater than 10% should be investigated."
- **SVG title element:** "DEXA body composition regional analysis divisions."
- **No color-only encoding:** Every region has a text label in addition to its color fill. The legend uses both color swatches and text labels. Asymmetry thresholds include numeric values alongside color coding.
- **Contrast:** Region labels are in #1C3133 which maintains readability against the semi-transparent fills.

## Design Notes

- The body outline should be **anatomically neutral** -- avoid gendered features. Use a simplified, clean line-art style consistent with medical diagrams.
- Use slight opacity differences between left and right sides (e.g., left arm at 40%, right arm at 40% but different hue) to visually distinguish them while keeping the overall aesthetic cohesive.
- The android/gynoid overlays within the trunk are secondary -- they should be visible but not dominant, since there is a separate dedicated diagram for those regions.
