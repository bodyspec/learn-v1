---
target_file: content/deep-dives/bone-health/01-bone-density-basics.md
target_section: "## Two Types of DEXA Scans"
placement: Inline image immediately after the section heading, before the "### Body Composition DEXA (What BodySpec Provides)" subsection
output_path: content/assets/diagrams/bmd-vs-body-comp-dexa.svg
---

# Body Composition DEXA vs. Clinical BMD DEXA Diagram

## Purpose

Clearly distinguish between the two types of DEXA scans that use the same underlying technology but serve fundamentally different purposes. The viewer should immediately grasp that body composition DEXA (what BodySpec provides) measures fat, lean, and bone mass across the whole body, while clinical BMD DEXA focuses on specific skeletal sites (hip and spine) for osteoporosis diagnosis. The bottom banner reinforces that one does not replace the other.

## Visual Layout

**Canvas:** 800 x 500px, landscape orientation. Background: #F8F8F8.

### Title Area (y: 0-60)

- Title centered at top.
- Subtitle below.

### Center Divider (x: 400, y: 80-410)

Vertical dashed line. Stroke: #DFE2E2, 2px, dash 6,4. Extends from y: 80 to y: 410.

A small "vs" badge centered on the divider at y: 230:
- Circle (28px diameter). Fill: #FFFFFF. Stroke: #DFE2E2, 2px.
- Text: "vs" in 13px bold #7C8D90, centered.

### Left Panel -- Body Composition DEXA (x: 30-385)

**Panel header (y: 80-115):**
- Rounded rectangle spanning x: 30 to x: 385 (355px x 35px). Fill: #E5F6EB (salad-60). Stroke: #69D994 1.5px. rx: 8.
- Text centered: "Body Composition DEXA" in 16px semibold #1C3133.

**Body outline illustration (y: 130-290, centered at x: ~130):**
- Simplified full-body human silhouette (standing, front-facing), approximately 70px wide x 160px tall. Fill: #69D994 at 25% opacity. Stroke: #69D994, 2px, rx: 8 on corners.
- The silhouette should be a simple rounded rectangle with a circular head to suggest a full-body scan -- stylized, not anatomically detailed.
- A dashed rectangular scan boundary around the entire silhouette (90px x 180px). Stroke: #69D994, 1.5px, dash 5,3.
- Label below silhouette: "Whole Body Scan" in 11px semibold #69D994.

**Measurements list (y: 135-300, x: 210-380):**
- Section label: "What It Measures" in 13px semibold #1C3133, underlined with a 1px #69D994 line.
- Six items, each with a small filled circle bullet (4px, fill: #69D994) followed by text in 11px #1C3133:
  - "Fat mass & body fat %"
  - "Lean mass (total & regional)"
  - "Bone mineral content (BMC)"
  - "Visceral fat (VAT)"
  - "Regional body composition"
  - "Android/gynoid ratios"
- Spacing: 24px between items vertically.

**"Provided by" badge (y: 310-340, centered in left panel):**
- Rounded rectangle (160px x 26px). Fill: #69D994. rx: 12.
- Text: "What BodySpec Provides" in 11px bold #FFFFFF, centered.

**Limitations note (y: 350-395, centered in left panel):**
- Rounded rectangle (320px x 40px). Fill: #FFF8E1. Stroke: #F5C842, 1px. rx: 6.
- Line 1: "Reports total body BMC (grams)" in 10px medium #1C3133.
- Line 2: "Does NOT produce diagnostic T-scores" in 10px semibold #C0392B.

### Right Panel -- Clinical BMD DEXA (x: 415-770)

**Panel header (y: 80-115):**
- Rounded rectangle spanning x: 415 to x: 770 (355px x 35px). Fill: #E8F4FD (light blue tint, ~#46C9F7 at 12% opacity). Stroke: #46C9F7 1.5px. rx: 8.
- Text centered: "Clinical BMD DEXA" in 16px semibold #1C3133.

**Scan site illustrations (y: 130-290, centered at x: ~510):**
Two focused scan area illustrations stacked vertically:

*Spine scan site (y: 130-200):*
- Simplified lumbar spine icon: 4 rounded rectangles stacked vertically (each 30px wide x 14px tall, 3px gap), representing L1-L4 vertebrae. Fill: #46C9F7 at 35% opacity. Stroke: #46C9F7 1.5px. rx: 3.
- Dashed rectangular scan boundary around the spine stack (50px x 80px). Stroke: #46C9F7, 1.5px, dash 5,3.
- Label right of icon: "Lumbar Spine (L1-L4)" in 11px medium #1C3133.

*Hip scan site (y: 215-285):*
- Simplified proximal femur icon: An angled shape suggesting the femoral neck and head -- a circle (18px diameter) connected to a short angled line (30px), representing the femoral head and neck. Fill: #46C9F7 at 35% opacity. Stroke: #46C9F7 1.5px.
- Dashed rectangular scan boundary (55px x 55px). Stroke: #46C9F7, 1.5px, dash 5,3.
- Label right of icon: "Proximal Femur" in 11px medium #1C3133.

Overall label below both sites: "Site-Specific Scans" in 11px semibold #46C9F7.

**Measurements list (y: 135-300, x: 590-765):**
- Section label: "What It Measures" in 13px semibold #1C3133, underlined with a 1px #46C9F7 line.
- Five items, each with a small filled circle bullet (4px, fill: #46C9F7) followed by text in 11px #1C3133:
  - "T-score (vs. young adult)"
  - "Z-score (vs. age-matched)"
  - "Site-specific BMD (g/cm2)"
  - "Fracture risk (FRAX)"
  - "Osteoporosis diagnosis"
- Spacing: 24px between items vertically.

**"Requires" badge (y: 310-340, centered in right panel):**
- Rounded rectangle (180px x 26px). Fill: #46C9F7. rx: 12.
- Text: "Requires Physician Order" in 11px bold #FFFFFF, centered.

**Clinical use note (y: 350-395, centered in right panel):**
- Rounded rectangle (320px x 40px). Fill: #E8F4FD. Stroke: #46C9F7, 1px. rx: 6.
- Line 1: "WHO diagnostic criteria for osteoporosis" in 10px medium #1C3133.
- Line 2: "T-score of -2.5 or below at hip or spine" in 10px semibold #1C3133.

### Bottom Banner (y: 425-480)

A full-width rounded rectangle spanning x: 30 to x: 770 (740px x 50px). Fill: #FDEDEC (light red background). Stroke: #E87D7D, 2px. rx: 8.

**Warning icon:** Small triangle with exclamation mark (12px, stroke: #C0392B, 2px) at x: 55, centered vertically in the banner.

**Text (centered in the banner, x: 80-750):**
- Line 1: "Different scans, different purposes" in 15px bold #1C3133.
- Line 2: "Body composition DEXA does NOT replace clinical BMD assessment for osteoporosis" in 12px medium #C0392B.

## Title

"Two Types of DEXA Scans" -- centered at top (y: 35), Poppins 22px bold, #1C3133.

**Subtitle:** "Same technology, different applications" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text | BodySpec dark | #1C3133 |
| Muted text, divider labels | BodySpec dark55 | #7C8D90 |
| Center divider | BodySpec dark15 | #DFE2E2 |
| Body comp panel accent, silhouette | Salad 100 | #69D994 |
| Body comp panel background | Salad 60 | #E5F6EB |
| Clinical BMD panel accent, icons | Blue accent | #46C9F7 |
| Clinical BMD panel background | Light blue tint | #E8F4FD |
| Warning banner background | Light red | #FDEDEC |
| Warning banner border | Coral/red | #E87D7D |
| Warning text, limitation text | Deep red | #C0392B |
| Caution note background | Light yellow | #FFF8E1 |
| Caution note border | Amber | #F5C842 |
| Badges, card fills | White | #FFFFFF |

The green vs. blue color scheme creates an immediate visual distinction between the two scan types without implying that one is better or worse than the other (green/red would imply good/bad). The red is reserved for the warning banner to emphasize the critical distinction.

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Panel headers:** 16px, weight 600.
- **Section labels:** 13px, weight 600.
- **List items:** 11px, weight 400.
- **Badge text:** 11px, weight 700.
- **Banner headline:** 15px, weight 700.
- **Banner body:** 12px, weight 500.
- **Notes/limitations:** 10px, weight 500-600.
- **Scan site labels:** 11px, weight 500.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 500".
- The side-by-side layout requires adequate width to display both panels. At narrow widths, the measurement lists are the most critical elements.
- The bottom banner should span the full width and remain readable at all scales.
- All text legible at 50% scale.

## Accessibility

- **Alt text:** "Side-by-side comparison of two types of DEXA scans. Left panel, Body Composition DEXA (what BodySpec provides): performs a whole body scan measuring fat mass, lean mass, bone mineral content, visceral fat, regional body composition, and android/gynoid ratios. Reports total body bone mineral content in grams but does not produce diagnostic T-scores. Right panel, Clinical BMD DEXA: performs site-specific scans of the lumbar spine (L1 through L4) and proximal femur, measuring T-scores, Z-scores, site-specific bone mineral density, fracture risk via FRAX, and providing osteoporosis diagnosis. Requires a physician order. Uses WHO diagnostic criteria with a T-score of negative 2.5 or below. Bottom banner warns: Different scans, different purposes. Body composition DEXA does not replace clinical BMD assessment for osteoporosis."
- **SVG title element:** "Comparison of body composition DEXA and clinical BMD DEXA scans."
- **No color-only encoding:** Each panel is clearly labeled with its scan type name. All measurement items are listed as text. The scan area illustrations include text labels (Whole Body Scan, Lumbar Spine, Proximal Femur). The badges ("What BodySpec Provides" / "Requires Physician Order") provide textual context. The bottom banner communicates the key message in text. Color distinguishes the panels (green vs. blue) but text labels carry the meaning.
- **Contrast:** #1C3133 on #E5F6EB: exceeds 10:1. #1C3133 on #E8F4FD: exceeds 10:1. White text on #69D994 badge: ~3:1 (use bold weight). White text on #46C9F7 badge: ~3:1 (use bold weight). #C0392B on #FDEDEC: ~5.5:1 (meets AA). #C0392B on #FFF8E1: ~5:1 (meets AA).

## Design Notes

- The two panels should feel like equal counterparts -- same visual weight, same structure. Neither scan type should appear "better" than the other; they serve different purposes.
- The body silhouette (left) vs. focused scan-site icons (right) is the primary visual metaphor: whole body vs. specific sites.
- The dashed scan boundaries around the illustrations reinforce the concept of "scan area."
- The bottom warning banner is the most important takeaway. It should feel like a definitive conclusion, not an afterthought.
- The "vs" badge on the center divider adds visual interest and clarifies the comparative structure.
- Keep the scan-site illustrations simple and stylized -- anatomical accuracy is less important than the conceptual distinction between "whole body" and "specific site."
