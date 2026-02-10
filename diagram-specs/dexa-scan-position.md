---
target_file: content/modules/core/01-how-dexa-works.md
target_section: "## The Scanning Process"
placement: Inline image immediately after the section heading, before the first paragraph
output_path: content/assets/diagrams/dexa-scan-position.svg
---

# DEXA Scan Positioning Diagram

## Purpose

Show a patient correctly positioned for a DEXA body composition scan. The viewer should understand the physical setup: patient lies supine on a padded table, scanner arm passes overhead from head to toe, arms at sides, feet slightly apart. This helps set expectations for anyone unfamiliar with the scanning process.

## Visual Layout

**Canvas:** 800 x 500px, landscape orientation. Background: #F8F8F8.

### Main Illustration (center, y: 100-410)

A simplified **side-view / profile illustration** of the scanning setup:

**DEXA Table:**
- A long horizontal rounded rectangle (width ~600px, height ~30px) positioned at approximately y: 300. Fill: #DFE2E2, stroke: #7C8D90 2px, rx: 6.
- Two table legs: Vertical rectangles (20px wide, 80px tall) beneath the table at each end. Fill: #7C8D90, rx: 3.

**Patient (supine side-view, simplified line art):**
- Positioned lying on the table, head to the left.
- **Head:** Circle (r: 25), positioned at the left end of the table, resting just above the table surface. Stroke: #1C3133 2.5px, no fill.
- **Torso:** Rounded rectangle (~200px wide, ~40px tall), rx: 8. Stroke: #1C3133 2.5px, no fill.
- **Legs:** Two slightly separated horizontal rectangles (~180px each, ~18px tall), rx: 6. Stroke: #1C3133 2.5px, no fill.
- **Arms at sides:** A thin horizontal rectangle (~150px, ~10px tall) positioned slightly below the torso, representing arms resting alongside the body. Stroke: #1C3133 2px, no fill.

**Scanner Arm (C-arm gantry):**
- Positioned above the patient, spanning a portion of the table width.
- **Top bar:** Horizontal rectangle (200px wide, 20px tall) at y: ~100. Fill: #7C8D90, stroke: #1C3133 1.5px, rx: 6.
- **Vertical supports:** Two vertical rectangles (20px wide, ~200px tall) connecting the top bar down toward the table level. Fill: #7C8D90, stroke: #1C3133 1.5px, rx: 4.
- **Source/detector indicator:** A small circle (r: 8) centered on the top bar, fill: #69D994, stroke: #1C3133 1.5px. This represents the X-ray emitter.
- Label above: "Scanner arm" in 11px #7C8D90.

**Scan direction arrow:**
- A horizontal arrow from left to right, positioned between the scanner arm and the patient. Stroke: #69D994, 2px, with arrowhead marker.
- Label: "Scan direction (head to toe)" in 11px #69D994.

### Annotations (positioned around the main illustration)

- **Supine position note:** Leader line pointing to the patient's torso. Text: "Supine position, minimal clothing" in 12px #1C3133.
- **Palms note:** Leader line to the arms. Text: "Palms flat at sides" in 12px #1C3133.
- **Feet note:** Leader line to the end of the legs. Text: "Feet slightly apart" in 12px #1C3133.

### Bottom Info (y: 420-490)

- **Scan time badge:** Centered rounded rectangle (240px x 40px), fill: #E5F6EB, stroke: #69D994 1.5px, rx: 8. Text inside: "Scan time: ~6-7 minutes" in 14px medium #1C3133.
- **Radiation note:** Centered text below the badge: "Radiation exposure: ~1/10th of a chest X-ray" in 12px #7C8D90.

## Title

"DEXA Scan Positioning" -- centered at top (y: 40), Poppins 22px bold, #1C3133.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Patient outline, primary text | BodySpec dark | #1C3133 |
| Muted text, table legs, scanner arm | BodySpec dark55 | #7C8D90 |
| Table surface, borders | BodySpec dark15 | #DFE2E2 |
| Scan direction, source indicator, badge bg | Salad 100 / Salad 60 | #69D994 / #E5F6EB |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Badge text:** 14px, weight 500.
- **Annotations:** 11-12px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 500".
- The illustration should scale cleanly. At narrow widths, all text and the patient figure should remain identifiable.

## Accessibility

- **Alt text:** "Side-view diagram of DEXA scan positioning showing a patient lying supine on a padded table with arms at their sides and feet slightly apart, while a scanner arm passes overhead from head to toe. The scan takes approximately 6 to 7 minutes with radiation exposure about one-tenth of a chest X-ray."
- **SVG title element:** "DEXA body composition scan patient positioning diagram."
- **No color-only encoding:** All elements are outlined with distinct shapes and labeled with text. The scanner arm, patient, and table are visually distinct through shape and stroke weight, not just color.
- **Contrast:** Primary annotations in #1C3133 on #F8F8F8 provide excellent contrast (~12:1). Secondary annotations in #7C8D90 meet AA for large text.

## Design Notes

- The patient figure should be **gender-neutral** and **simplified** -- a line-art silhouette rather than a detailed illustration. Avoid any identifying features.
- The scanner arm should look like a medical device, not menacing. Use soft rounded rectangles and the green accent for the source indicator.
- Ensure there is visual space between the scanner arm and patient to avoid a "claustrophobic" feel.
