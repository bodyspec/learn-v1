---
target_file: content/modules/physician/02-interpreting-results.md
target_section: "## Weight Loss Quality Assessment"
placement: Inline image immediately after the section heading, before the "Not all weight loss is equal" paragraph. Also used in content/modules/trainer/02-interpreting-results.md.
output_path: content/assets/diagrams/weight-loss-quality.svg
---

# Weight Loss Quality Comparison Diagram

## Purpose

Illustrate that the same total weight loss can have vastly different compositions, leading to different metabolic and functional outcomes. The diagram compares a "favorable" weight loss pattern (mostly fat loss, minimal lean loss) with a "concerning" pattern (significant lean loss alongside fat loss). This teaches clinicians and trainers to evaluate the quality of weight loss, not just the quantity.

## Visual Layout

**Canvas:** 800 x 500px, landscape orientation. Background: #F8F8F8.

### Overall Structure

The diagram is split into two halves by a vertical dashed center divider:

- **Left half (x: 30-395):** Favorable weight loss scenario.
- **Right half (x: 405-770):** Concerning weight loss scenario.

**Center divider:** Vertical dashed line at x: 400, from y: 75 to y: 470. Stroke: #DFE2E2, 2px, dash 6,4.

### Left Half -- Favorable Weight Loss

**Section title:** "Favorable Weight Loss" in 16px semibold #69D994, centered in the left half.

**Before/After stacked bars:**

Two vertical stacked bars side by side:

**"Before" bar (left, x: ~90):**
- Label above: "Before" in 12px medium #7C8D90, "200 lbs" in 11px #7C8D90.
- Width: 60px. Total height: ~246px (proportional to 200 lbs).
- **Fat portion (top):** Height ~72px (30% of 200 = 60 lbs). Fill: #E87D7D, rx: 4 on top corners.
  - Label inside: "60 lbs fat" in 10px #FFFFFF medium.
- **Lean portion (middle):** Height ~162px (67.5% of 200 = 135 lbs). Fill: #69D994.
  - Label inside: "135 lbs lean" in 10px #1C3133 medium.
- **Bone portion (bottom):** Height ~12px (5 lbs). Fill: #1C3133, rx: 4 on bottom corners.

**Horizontal arrow** between Before and After bars. Stroke: #69D994 2px, with green arrowhead.

**"After" bar (right, x: ~250):**
- Label above: "After" in 12px medium #7C8D90, "180 lbs" in 11px #7C8D90.
- Width: 60px. Total height: ~222px (proportional to 180 lbs).
- **Fat portion (top):** Height ~50px (42 lbs). Fill: #E87D7D.
  - Label: "42 lbs fat" in 10px #FFFFFF.
- **Lean portion (middle):** Height ~160px (133 lbs). Fill: #69D994.
  - Label: "133 lbs lean" in 10px #1C3133.
- **Bone portion (bottom):** Height ~12px. Fill: #1C3133.

**Summary box (below the bars):**
- Rounded rectangle (240px x 65px). Fill: #E5F6EB, stroke: #69D994 1.5px, rx: 8.
- Line 1: "-20 lbs total: -18 fat, -2 lean" in 12px semibold #1C3133.
- Line 2: "10% lean loss -- Excellent" in 12px bold #69D994.
- Line 3: "Metabolic rate maintained" in 10px #7C8D90.

### Right Half -- Concerning Weight Loss

**Section title:** "Concerning Weight Loss" in 16px semibold #E87D7D, centered in the right half.

**Before/After stacked bars:**

**"Before" bar (left, x: ~490):**
- Same dimensions and composition as the left half's "Before" bar (identical starting point: 200 lbs, 60 fat, 135 lean, 5 bone).

**Horizontal arrow** between bars. Stroke: #E87D7D 2px, with red arrowhead.

**"After" bar (right, x: ~650):**
- Label: "After" / "180 lbs".
- Width: 60px. Total height: ~222px.
- **Fat portion:** Height ~60px (50 lbs). Fill: #E87D7D.
  - Label: "50 lbs fat".
- **Lean portion:** Height ~150px (125 lbs). Fill: #69D994.
  - Label: "125 lbs lean".
- **Bone portion:** Height ~12px. Fill: #1C3133.

**Summary box:**
- Rounded rectangle (240px x 65px). Fill: #FDEDEC (light red), stroke: #E87D7D 1.5px, rx: 8.
- Line 1: "-20 lbs total: -10 fat, -10 lean" in 12px semibold #1C3133.
- Line 2: "50% lean loss -- Concerning" in 12px bold #E87D7D.
- Line 3: "Metabolic rate reduced, functional risk" in 10px #7C8D90.

### Visual Comparison Cues

The key visual difference the viewer should notice:
- Left side: The "After" fat bar is much shorter than "Before" (big fat reduction), while the lean bar barely changes (lean preservation).
- Right side: The "After" fat bar is only slightly shorter (modest fat reduction), while the lean bar is noticeably shorter (significant lean loss).

The stacked bars should be **vertically aligned at their tops** so the total height difference (Before 200 lbs vs. After 180 lbs) is visible, and the composition shift is clear.

## Title

"Quality of Weight Loss Matters" -- centered at top (y: 35), Poppins 22px bold, #1C3133.

**Subtitle:** "Same total weight loss, very different outcomes" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text, bone | BodySpec dark | #1C3133 |
| Muted text | BodySpec dark55 | #7C8D90 |
| Center divider, borders | BodySpec dark15 | #DFE2E2 |
| Lean tissue, favorable indicators | Salad 100 | #69D994 |
| Favorable summary background | Salad 60 | #E5F6EB |
| Fat tissue, concerning indicators | Coral/red | #E87D7D |
| Concerning summary background | Light red | #FDEDEC |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Section titles:** 16px, weight 600.
- **Bar labels:** 10-12px, weight 400-500.
- **Summary headlines:** 12px, weight 600-700.
- **Summary details:** 10px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 500".
- The side-by-side layout requires sufficient width. At narrow widths, the bars and summary boxes are the critical elements.
- The stacked bar format is space-efficient and communicates composition proportionally.

## Accessibility

- **Alt text:** "Side-by-side comparison of two weight loss scenarios, both losing 20 pounds from 200 to 180 pounds. Favorable weight loss on the left shows 18 pounds of fat lost and only 2 pounds of lean lost (10 percent lean loss, labeled excellent, metabolic rate maintained). Concerning weight loss on the right shows 10 pounds of fat lost and 10 pounds of lean lost (50 percent lean loss, labeled concerning, metabolic rate reduced with functional risk). Stacked bar charts show the before and after composition for each scenario."
- **SVG title element:** "Weight loss quality comparison: favorable versus concerning patterns."
- **No color-only encoding:** Every data point is labeled with numeric values (pounds, percentages). The summary boxes contain full text descriptions. The section titles ("Favorable" / "Concerning") are textual. Color reinforces the message but is not the sole carrier.
- **Contrast:** White text on #E87D7D fat bars: ~3.4:1 at 10px with medium weight (borderline; consider using 11px or bold weight, or placing labels outside the bar). #1C3133 text on #69D994 lean bars: ~4.6:1 (meets AA). Summary text in #1C3133 on tinted backgrounds: exceeds 10:1.

## Data Accuracy

- The weight values (200 lbs to 180 lbs) are illustrative examples, not clinical data.
- The 25% rule of thumb for lean loss is referenced in the content: <25% of total weight lost coming from lean mass is generally considered favorable.
- The "50% lean loss" scenario is realistic in cases of crash dieting, very low protein intake, or prolonged bed rest.
- This diagram is used in both the physician and trainer interpretation modules.

## Design Notes

- Ensure the "Before" bars on both sides are **identical** to reinforce that these two people started at the same composition.
- The visual emphasis should be on the **difference in the After bars** -- this is where the story is told.
- The green and red arrows between Before/After bars add directional flow and color-code the outcome.
- Consider animating the transition in a future interactive version, but the static SVG should tell the complete story.
