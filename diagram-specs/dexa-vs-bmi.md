---
target_file: content/modules/core/05-misconceptions.md
target_section: "### 'BMI tells you if you're healthy'"
placement: Inline image after the section content text, illustrating the concept described in the paragraph. Also referenced in content/modules/physician/01-clinical-indications.md.
output_path: content/assets/diagrams/dexa-vs-bmi.svg
---

# DEXA vs. BMI -- Same BMI, Different Composition

## Purpose

Demonstrate that BMI cannot distinguish between two people with the same BMI but vastly different body compositions. Person A is muscular and lean (low body fat, high lean mass), while Person B carries excess fat with less muscle. Both have the same BMI of 27 ("overweight"), but DEXA reveals one is metabolically healthy and the other has elevated metabolic risk. This is one of the most powerful illustrations of DEXA's value.

## Visual Layout

**Canvas:** 800 x 600px, landscape orientation. Background: #F8F8F8.

### Left Side (x: 40-360) -- Person A (Muscular/Lean)

**Label:** "Person A" in 16px semibold #1C3133, centered above the figure.

**Body silhouette:**
- A simplified front-facing human figure drawn in line art. This figure should have **broader shoulders and a narrower waist** to suggest an athletic build. Stroke: #1C3133 2.5px, no fill.
- The silhouette should be gender-neutral but clearly convey muscularity through proportions (wider upper body, defined waist/hip ratio).

**Stats card:**
- Rounded rectangle (160px x 75px), white fill, #DFE2E2 border 1.5px, rx: 6. Positioned below or overlapping the lower portion of the figure.
- Line 1: 'BMI: 27 ("Overweight")' in 12px semibold #1C3133.
- Line 2: "Weight: 195 lbs" in 12px #1C3133.
- Line 3: "Body Fat: 15%" in 12px #1C3133.
- Line 4: "VAT: 65 cm2 (low)" in 12px #69D994 medium.

**Composition bar (below the stats):**
- Small horizontal bar (140px x 25px), rx: 4.
- Filled mostly with #69D994 (lean), with a small left portion in #E87D7D (fat, proportional to 15%).
- Label below: "15% fat / 80% lean / 5% bone" in 12px #1C3133.

**Verdict badge (below composition bar):**
- Rounded rectangle (140px x 35px), fill: #E5F6EB, stroke: #69D994 2px, rx: 8.
- "Metabolically Healthy" in 14px bold #1C3133.

### Center Divider (x: ~370-430)

- Vertical dashed line from y: 80 to y: 530. Stroke: #DFE2E2, 2px, dash 6,4.
- Center badge: Rounded rectangle (120px x 65px), fill: #1C3133, rx: 8. Positioned at vertical center.
  - "Same BMI" in 18px bold #FFFFFF.
  - "27" in 22px extra-bold #69D994.

### Right Side (x: 440-760) -- Person B (Higher Body Fat)

**Label:** "Person B" in 16px semibold #1C3133, centered above the figure.

**Body silhouette:**
- A simplified front-facing human figure with a **wider midsection** to suggest central adiposity. Stroke: #1C3133 2.5px, no fill.
- A dashed ellipse around the midsection (stroke: #E87D7D 1.5px, dash 4,3) to highlight abdominal fat accumulation.
- Should be the same height as Person A to reinforce "same BMI."

**Stats card:**
- Same layout as Person A.
- Line 1: 'BMI: 27 ("Overweight")' in 12px semibold #1C3133.
- Line 2: "Weight: 195 lbs" in 12px #1C3133.
- Line 3: "Body Fat: 32%" in 12px #1C3133.
- Line 4: "VAT: 155 cm2 (moderate-high)" in 12px #E87D7D medium.

**Composition bar:**
- Same size and position as Person A's.
- Larger left portion in #E87D7D (fat, proportional to 32%), remainder in #69D994.
- Label: "32% fat / 63% lean / 5% bone" in 12px #1C3133.

**Verdict badge:**
- Rounded rectangle, fill: #FDEDEC, stroke: #E87D7D 2px, rx: 8.
- "Elevated Metabolic Risk" in 13px bold #E87D7D.

### Bottom Callout (y: 535-575)

- Centered rounded rectangle (400px x 35px), fill: #E5F6EB, stroke: #69D994 1.5px, rx: 8.
- "DEXA reveals the composition behind the number" in 13px semibold #1C3133.

## Title

"Same BMI, Different Body Composition" -- centered at top (y: 35), Poppins 22px bold, #1C3133.

**Subtitle:** "BMI cannot distinguish between these two people" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Body outlines, primary text, bone | BodySpec dark | #1C3133 |
| Muted text | BodySpec dark55 | #7C8D90 |
| Borders | BodySpec dark15 | #DFE2E2 |
| Lean tissue, healthy indicators | Salad 100 | #69D994 |
| Healthy badge background | Salad 60 | #E5F6EB |
| Fat tissue, risk indicators | Coral/red | #E87D7D |
| Risk badge background | Light red | #FDEDEC |
| BMI badge background | BodySpec dark | #1C3133 |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Person labels:** 16px, weight 600.
- **Stats card:** 12px, weight 400-600.
- **Verdict labels:** 13-14px, weight 700.
- **BMI badge:** 18px + 22px, weights 700-800.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 600".
- The side-by-side comparison requires horizontal space; this works well in landscape/wide containers.
- At very narrow widths, the two figures and their annotations may crowd. The core comparison (same BMI badge in center, green verdict on left, red verdict on right) remains understandable.

## Accessibility

- **Alt text:** "Side-by-side comparison of two people with the same BMI of 27, labeled overweight. Person A on the left has a muscular build with 15 percent body fat, 195 pounds, and a low visceral fat area of 65 square centimeters, and is labeled metabolically healthy. Person B on the right has central adiposity with 32 percent body fat, 195 pounds, and a moderate-high visceral fat area of 155 square centimeters, and is labeled elevated metabolic risk. A central badge emphasizes they share the same BMI of 27. A bottom callout reads: DEXA reveals the composition behind the number."
- **SVG title element:** "Same BMI different body composition comparison showing DEXA versus BMI limitations."
- **No color-only encoding:** Each person has extensive text labels (stats card, composition breakdown, verdict text). The silhouette shapes differ (muscular vs. wider midsection). Color reinforces but does not solely carry the message.
- **Contrast:** All text on #F8F8F8 or white card backgrounds in #1C3133 exceeds 12:1. Green and red verdict text against their light backgrounds both exceed 3:1 at the specified font sizes and weights.

## Design Notes

- The two body silhouettes should be **clearly different in shape** but the same height, reinforcing that weight and BMI are identical.
- Avoid making Person B look cartoonishly overweight. The difference should be subtle but clear -- slightly wider midsection, less defined shoulders.
- The dashed ellipse around Person B's midsection is a gentle way to indicate central adiposity without being stigmatizing.
- This diagram is used in both the core misconceptions module and the physician clinical indications module, so it should be suitable for both general and clinical audiences.
