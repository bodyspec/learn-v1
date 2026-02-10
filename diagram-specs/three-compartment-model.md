---
target_file: content/modules/core/01-how-dexa-works.md
target_section: "## Three-Compartment Model"
placement: Inline image immediately after the section heading, before the first paragraph
output_path: content/assets/diagrams/three-compartment-model.svg
---

# Three-Compartment Model Diagram

## Purpose

Illustrate the DEXA three-compartment model (fat mass, lean soft tissue, bone mineral) and contrast it with the simpler two-compartment model (fat mass, fat-free mass) used by BIA scales and similar consumer devices. The viewer should understand why separating bone from lean tissue provides more clinical value.

## Visual Layout

**Canvas:** 800 x 500px, landscape orientation. Background: #F8F8F8.

### Left Side (x: 60-320) -- Three-Compartment Model (DEXA)

A tall stacked bar chart representing a single body, with three visually distinct compartments stacked vertically:

- **Fat Mass (top):** Fill #E87D7D. Height proportional to ~25% of total bar. Rounded top corners (rx: 8).
  - Internal labels: "Fat Mass" in 16px semibold #1C3133, "Adipose tissue" in 12px #1C3133, "~25%" in 13px #7C8D90.
- **Lean Soft Tissue (middle):** Fill #69D994. Height proportional to ~70% of total bar. No rounded corners (flush with neighbors).
  - Internal labels: "Lean Soft Tissue" in 16px semibold #1C3133, "Muscle, organs, water" in 12px #1C3133, "~70%" in 13px #1C3133.
- **Bone Mineral (bottom):** Fill #1C3133. Height proportional to ~5% of total bar. Rounded bottom corners (rx: 8).
  - Internal label: "Bone (~5%)" in 12px semibold #FFFFFF.

Total stacked bar: width 180px, height ~320px, positioned with the top at y: 80.

**Left bracket:** A vertical bracket (line with top/bottom tick marks) along the left edge of the stacked bar, spanning all three compartments. Color: #69D994, 2px stroke. Rotated text alongside: "3-Compartment (DEXA)" in 12px #69D994.

**Right bracket:** A dashed vertical bracket along the right edge, spanning only the lean + bone compartments (bottom two). Color: #7C8D90, 2px stroke, dash pattern 6,3. Label to the right: "Fat-Free Mass" in 13px italic #7C8D90, with a sub-note: "(Lean + Bone combined in 2-compartment models)" in 11px #7C8D90.

### Center Divider (x: ~400-430)

- "vs." text in 18px bold #7C8D90, vertically centered between the two models.

### Right Side (x: 460-680) -- Two-Compartment Model (BIA / Scales)

A simplified two-block stacked bar:

- **Fat Mass (top):** Fill #E87D7D, 140px wide, 80px tall, rounded top corners, dashed border (#7C8D90, 1.5px stroke, dash 6,3).
  - Label: "Fat Mass" in 14px medium #1C3133.
- **Fat-Free Mass (bottom):** Fill #CCEDD6 (salad-70), 140px wide, 170px tall, rounded bottom corners, dashed border.
  - Label: "Fat-Free Mass" in 14px medium #1C3133, sub-label: "(Lean + Bone not separated)" in 11px #7C8D90.

Above the two-compartment bar:
- "2-Compartment Model" in 16px semibold #1C3133.
- "(BIA / Scales)" in 13px #7C8D90.

### Bottom Note

A centered text line at the bottom: "DEXA separates lean tissue from bone, providing more precise measurement than BIA or scales" in 13px #7C8D90.

## Title

"DEXA Three-Compartment Model" -- centered at top (y: 40), Poppins 22px bold, #1C3133.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text, bone | BodySpec dark | #1C3133 |
| Muted text | BodySpec dark55 | #7C8D90 |
| Lean tissue, accents | Salad 100 | #69D994 |
| Light lean fill (2-comp) | Salad 70 | #CCEDD6 |
| Fat tissue | Coral/red | #E87D7D |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Compartment labels:** 14-16px, weight 500-600.
- **Annotations:** 11-13px, weight 400-500.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 500".
- Scales fluidly. All text legible at 50% reduction.

## Accessibility

- **Alt text:** "Diagram comparing DEXA's three-compartment model (fat mass at 25%, lean soft tissue at 70%, bone mineral at 5%) with the two-compartment model used by BIA scales (fat mass and fat-free mass only, with lean and bone combined). DEXA provides greater measurement precision by separating bone from lean tissue."
- **SVG title element:** "DEXA three-compartment model versus two-compartment model comparison."
- **No color-only encoding:** Each compartment has text labels identifying it. The 2-compartment model uses dashed borders to visually distinguish it from the DEXA model's solid borders.
- **Contrast:** All critical labels are in #1C3133 on #F8F8F8 or on their respective fill colors with sufficient contrast. White text on #1C3133 bone section exceeds 12:1 ratio.

## Data Accuracy

- Typical adult body composition: ~20-30% fat, ~65-75% lean soft tissue, ~4-6% bone mineral content. The diagram uses representative values (~25%, ~70%, ~5%) and should note these are approximate.
- The 2-compartment model groups lean + bone as "fat-free mass" -- this is standard terminology in BIA literature.
