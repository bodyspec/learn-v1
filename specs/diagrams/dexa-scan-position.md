---
target_file: content/modules/core/01-how-dexa-works.md
target_section: "## The Scanning Process"
placement: Inline image immediately after the section heading, before the first paragraph
output_path: content/assets/diagrams/dexa-scan-position.svg
---

# DEXA Scan Positioning Diagram

## Purpose

Show a patient correctly positioned for a DEXA body composition scan using the Nana positioning protocol. The viewer should understand the physical setup: patient lies supine on a flat padded table, a narrow scanning arm passes overhead from head to toe, feet are 15 cm apart, and hands are in a blade/mid-prone position with a small gap from the trunk. This helps set expectations for anyone unfamiliar with the scanning process.

## Visual Layout

**Canvas:** 800 x 500px, landscape orientation. Background: #F8F8F8.

**IMPORTANT — Scanner Appearance:** The DEXA scanner must look like a real clinical DEXA scanner (e.g., Hologic Horizon or GE Lunar iDXA). It has a long flat padded table and a narrow overhead detector arm on a cantilever that travels along the table. Do NOT draw a large rectangular frame, box, or archway around the patient. The scanner arm is a slim horizontal bar extending from a vertical support on one side of the table.

**IMPORTANT — Top-Down View:** This diagram should be a bird's-eye / top-down view looking down at the patient on the table. This perspective best shows the Nana positioning protocol details (hand placement, foot spacing, body alignment).

### Main Illustration (center)

**DEXA Table (top-down view):**
- A long vertical rounded rectangle representing the padded scanning surface, centered on the canvas. Fill: #DFE2E2 with a slightly lighter interior representing the padding. Stroke: #7C8D90 2px, rx: 8.
- The table should be approximately 500px tall and 200px wide, oriented vertically (head at top, feet at bottom).

**Patient (top-down view, simplified outline figure):**
- Centered on the table, head toward the top.
- **Head:** Oval/circle at the top of the table. Stroke: #1C3133 2.5px, no fill.
- **Torso:** Simplified torso shape, slightly wider at shoulders tapering to waist. Stroke: #1C3133 2.5px, no fill.
- **Arms:** Positioned at the sides of the torso with a visible small gap (~3 cm equivalent) between the hands and the trunk. Hands should be in a "blade" position (mid-prone, fingers together, hand turned sideways like a karate chop — NOT open palms). Stroke: #1C3133 2px, no fill.
- **Legs:** Two legs slightly apart, extending down the table. Stroke: #1C3133 2.5px, no fill.
- **Feet:** Separated by a visible gap (15 cm apart).

**Scanner Arm (shown as a horizontal line crossing the patient):**
- A thin horizontal bar crossing the width of the table at roughly mid-torso level, representing the current position of the scanning arm. Stroke: #7C8D90 3px.
- A small indicator dot on the arm. Fill: #69D994.

**Scan Direction Arrow:**
- A single vertical arrow alongside the table pointing straight down (head to toe). Stroke: #69D994, 2px, with arrowhead at the bottom.
- Label: "Scan direction (head to toe)" in 11px #69D994, placed next to the arrow.
- Do NOT rotate the label text. Keep it horizontal.

### Annotations (positioned around the main illustration)

- **Hand position note:** Leader line to one hand. Text: "Blade hand position, 3 cm from trunk" in 12px #1C3133.
- **Foot spacing note:** Leader line to the feet. Text: "Feet 15 cm apart" in 12px #1C3133.
- **Body alignment note:** Text near the top: "Centrally aligned on table" in 12px #7C8D90.

### Bottom Info (y: 440-490)

- **Scan time badge:** Centered rounded rectangle (240px x 36px), fill: #E5F6EB, stroke: #69D994 1.5px, rx: 8. Text inside: "Scan time: ~6-7 minutes" in 14px medium #1C3133.
- **Radiation note:** Centered text below the badge: "Radiation exposure: ~1/10th of a chest X-ray" in 12px #7C8D90.

## Title

"DEXA Scan Positioning" -- centered at top (y: 30), Poppins 22px bold, #1C3133.

**Subtitle:** "Nana positioning protocol" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Patient outline, primary text | BodySpec dark | #1C3133 |
| Muted text, scanner arm | BodySpec dark55 | #7C8D90 |
| Table surface | BodySpec dark15 | #DFE2E2 |
| Positioning aids, scan indicator | Salad 100 / Salad lighter | #69D994 / #E5F6EB |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Badge text:** 14px, weight 500.
- **Annotations:** 11-12px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 500".
- The illustration should scale cleanly. At narrow widths, all text and the patient figure should remain identifiable.

## Accessibility

- **Alt text:** "Top-down diagram of DEXA scan positioning using the Nana protocol. A patient lies supine and centrally aligned on a padded table. Hands are in a blade position with a 3 centimeter gap from the trunk. Feet are 15 centimeters apart. A scanning arm passes overhead from head to toe. The scan takes approximately 6 to 7 minutes with radiation exposure about one-tenth of a chest X-ray."
- **SVG title element:** "DEXA body composition scan patient positioning diagram using Nana protocol."
- **No color-only encoding:** All elements are outlined with distinct shapes and labeled with text. Positioning aids are identified by both color and label.
- **Contrast:** Primary annotations in #1C3133 on #F8F8F8 provide excellent contrast (~12:1). Secondary annotations in #7C8D90 meet AA for large text.

## Design Notes

- The patient figure should be **gender-neutral** and **simplified** — a clean outline silhouette, not a detailed illustration. Avoid any identifying features.
- The top-down perspective is chosen specifically to show the spatial relationships that define the Nana protocol: blade hand position with gap from trunk, foot separation distance, and central body alignment.
- Do NOT draw foam blocks, paddles, or other positioning aids. Just show the body in the correct position.
- Do NOT draw the scanner as a large frame, box, or archway. The scanning arm is a slim bar that crosses over the table.

## Data Accuracy

- Nana protocol: Feet 15 cm apart, hands in blade/mid-prone position with 3 cm gap from trunk (Nana et al., 2012).
- Scan time: ~6-7 minutes for whole-body composition scan.
- Radiation: ~1-10 μSv, approximately 1/10th of a chest X-ray (IAEA RPOP).
