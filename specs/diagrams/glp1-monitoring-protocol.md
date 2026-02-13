---
target_file: content/deep-dives/glp1-monitoring/01-tracking-weight-loss.md
target_section: "## Using DEXA to Monitor"
placement: Inline image immediately after the section heading, before the "### Recommended Protocol" subsection
output_path: content/assets/diagrams/glp1-monitoring-protocol.svg
---

# GLP-1 DEXA Monitoring Protocol Diagram

## Purpose

Present a structured 4-phase DEXA monitoring protocol for patients on GLP-1 receptor agonist therapy. The viewer should understand the recommended scan timing (pre-treatment, 3 months, 6 months, 12+ months), what to measure at each phase, and what patterns to watch for. Colored status indicators (green/amber/red) at each phase communicate favorable, watchful, and concerning findings without requiring clinical expertise to interpret.

## Visual Layout

**Canvas:** 800 x 600px, landscape orientation. Background: #F8F8F8.

### Title Area (y: 0-60)

- Title centered at top.
- Subtitle below.

### Vertical Timeline Structure (y: 80-560)

A vertical timeline runs down the left side of the diagram (x: 90), with four phase cards extending to the right. The timeline is a continuous vertical line with phase nodes (circles) at each phase.

**Timeline spine:**
- Vertical line from y: 100 to y: 540. Stroke: #1C3133, 3px. x: 90.

**Phase node markers on the timeline:**
- Four circles (20px diameter) positioned on the timeline spine at each phase's y-center. Fill: white. Stroke: #1C3133, 2.5px.
- Inside each circle: the phase number in 11px bold #1C3133.

### Phase 1 Card -- Pre-Treatment Baseline (y: 80-185)

**Timeline node:** Circle at (x: 90, y: 115). Number "1" inside.

**Timepoint label (x: 50-80, y: 105-125):**
- Text right-aligned to the left of the timeline: "Before" in 11px semibold #1C3133. Below: "Treatment" in 11px semibold #1C3133.

**Phase card (x: 130-760, y: 80-185):**
- Rounded rectangle (630px x 105px). Fill: #FFFFFF. Stroke: #DFE2E2, 1.5px. rx: 10.
- Left accent bar: 4px wide vertical strip along the left edge of the card. Fill: #46C9F7 (blue). rx: 2 on left corners.

**Card content:**

*Header row (y: 90-110):*
- Title: "Pre-Treatment Baseline" in 15px semibold #1C3133. x: 148.
- Timing badge: Rounded rectangle (80px x 22px). Fill: #46C9F7. rx: 11. Text: "Week 0" in 10px bold #FFFFFF. Positioned right-aligned at x: 680.

*Two-column content (y: 115-175):*

**Left column -- "What to Measure" (x: 148-420):**
- Column label: "What to Measure" in 11px semibold #7C8D90, with a 1px underline in #DFE2E2.
- Four items with small square bullets (4px, fill: #46C9F7):
  - "Full body composition baseline" in 10px #1C3133
  - "Appendicular lean mass (ALM)" in 10px #1C3133
  - "VAT area for metabolic risk" in 10px #1C3133
  - "Pre-existing sarcopenia screening" in 10px #1C3133
- Spacing: 16px between items.

**Right column -- "What to Look For" (x: 440-750):**
- Column label: "What to Look For" in 11px semibold #7C8D90, with a 1px underline in #DFE2E2.
- Three items, each preceded by a colored status indicator (6px circle):
  - Green circle (#69D994): "Adequate baseline lean mass" in 10px #1C3133
  - Amber circle (#F5C842): "Low baseline ALM (pre-existing risk)" in 10px #1C3133
  - Red circle (#E87D7D): "ALM near sarcopenia thresholds" in 10px #1C3133
- Spacing: 16px between items.

### Phase 2 Card -- Early Monitoring (y: 200-305)

**Timeline node:** Circle at (x: 90, y: 235). Number "2" inside.

**Timepoint label (x: 50-80):**
- "3" in 18px bold #1C3133. Below: "Months" in 11px #7C8D90.

**Connecting segment:** The timeline spine between Phase 1 node and Phase 2 node (y: 125 to y: 225) is colored #46C9F7 transitioning to #69D994 (or use a single #69D994 segment).

**Phase card (x: 130-760, y: 200-305):**
- Rounded rectangle (630px x 105px). Fill: #FFFFFF. Stroke: #DFE2E2, 1.5px. rx: 10.
- Left accent bar: 4px wide. Fill: #69D994 (green).

**Card content:**

*Header row:*
- Title: "Early Monitoring" in 15px semibold #1C3133.
- Timing badge: Fill: #69D994. Text: "3 Months" in 10px bold #1C3133.

*Two-column content:*

**Left column -- "What to Measure":**
- Square bullets (fill: #69D994):
  - "Composition of initial weight loss" in 10px #1C3133
  - "Fat mass vs. lean mass changes" in 10px #1C3133
  - "VAT response (often dramatic early)" in 10px #1C3133
  - "ALM change from baseline" in 10px #1C3133

**Right column -- "What to Look For":**
- Green circle: ">60% of weight loss from fat" in 10px #1C3133
- Amber circle: "25-40% lean mass component" in 10px #1C3133
- Red circle: ">40% weight loss from lean mass" in 10px #1C3133

### Phase 3 Card -- Active Treatment (y: 320-425)

**Timeline node:** Circle at (x: 90, y: 355). Number "3" inside.

**Timepoint label (x: 50-80):**
- "6" in 18px bold #1C3133. Below: "Months" in 11px #7C8D90.

**Phase card (x: 130-760, y: 320-425):**
- Rounded rectangle (630px x 105px). Fill: #FFFFFF. Stroke: #DFE2E2, 1.5px. rx: 10.
- Left accent bar: 4px wide. Fill: #F5C842 (amber).

**Card content:**

*Header row:*
- Title: "Active Treatment Assessment" in 15px semibold #1C3133.
- Timing badge: Fill: #F5C842. Text: "6 Months" in 10px bold #1C3133.

*Two-column content:*

**Left column -- "What to Measure":**
- Square bullets (fill: #F5C842):
  - "Cumulative composition ratio" in 10px #1C3133
  - "Calculate % lean vs. fat lost" in 10px #1C3133
  - "FFMI trends" in 10px #1C3133
  - "Regional lean mass changes" in 10px #1C3133

**Right column -- "What to Look For":**
- Green circle: "Lean loss slowing, fat loss continuing" in 10px #1C3133
- Amber circle: "Lean loss rate not improving" in 10px #1C3133
- Red circle: "Rapid lean decline (>2 kg in 3 mo)" in 10px #1C3133

### Phase 4 Card -- Maintenance/Ongoing (y: 440-545)

**Timeline node:** Circle at (x: 90, y: 475). Number "4" inside.

**Timepoint label (x: 50-80):**
- "12+" in 16px bold #1C3133. Below: "Months" in 11px #7C8D90.

**Phase card (x: 130-760, y: 440-545):**
- Rounded rectangle (630px x 105px). Fill: #FFFFFF. Stroke: #DFE2E2, 1.5px. rx: 10.
- Left accent bar: 4px wide. Fill: #E87D7D (coral/red, representing the most critical monitoring phase).

**Card content:**

*Header row:*
- Title: "Maintenance / Ongoing Monitoring" in 15px semibold #1C3133.
- Timing badge: Fill: #E87D7D. Text: "12+ Months" in 10px bold #FFFFFF.

*Two-column content:*

**Left column -- "What to Measure":**
- Square bullets (fill: #E87D7D):
  - "Long-term composition stability" in 10px #1C3133
  - "Watch for late-onset muscle wasting" in 10px #1C3133
  - "Bone mineral content trends" in 10px #1C3133
  - "Weight plateau composition" in 10px #1C3133

**Right column -- "What to Look For":**
- Green circle: "Stable lean mass, continued fat loss" in 10px #1C3133
- Amber circle: "Plateau with composition drift" in 10px #1C3133
- Red circle: "Continued lean loss despite intervention" in 10px #1C3133

### Status Indicator Legend (y: 560-585)

A horizontal legend row centered at the bottom:

- Green circle (8px, fill: #69D994) + "Favorable" in 11px medium #1C3133. Spacing: 20px gap.
- Amber circle (8px, fill: #F5C842) + "Monitor Closely" in 11px medium #1C3133. Spacing: 20px gap.
- Red circle (8px, fill: #E87D7D) + "Intervention Needed" in 11px medium #1C3133.

Entire legend centered horizontally on the canvas.

## Title

"DEXA Monitoring Protocol for GLP-1 Therapy" -- centered at top (y: 30), Poppins 22px bold, #1C3133.

**Subtitle:** "Structured body composition monitoring during pharmacological weight loss" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text, timeline spine | BodySpec dark | #1C3133 |
| Muted text, column labels | BodySpec dark55 | #7C8D90 |
| Card borders, dividers | BodySpec dark15 | #DFE2E2 |
| Phase 1 accent (pre-treatment) | Blue accent | #46C9F7 |
| Phase 2 accent (early) | Salad 100 | #69D994 |
| Phase 3 accent (active) | Amber/yellow | #F5C842 |
| Phase 4 accent (maintenance) | Coral/red | #E87D7D |
| Favorable indicator | Salad 100 | #69D994 |
| Monitor closely indicator | Amber/yellow | #F5C842 |
| Intervention needed indicator | Coral/red | #E87D7D |
| Card fill | White | #FFFFFF |

The accent colors progress from cool (blue) through green and amber to warm (red), reflecting increasing time on medication and the escalating importance of monitoring as treatment continues.

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Phase card titles:** 15px, weight 600.
- **Timepoint numbers:** 16-18px, weight 700.
- **Timepoint labels:** 11px, weight 400-600.
- **Column headers:** 11px, weight 600.
- **List items:** 10px, weight 400.
- **Timing badge text:** 10px, weight 700.
- **Legend text:** 11px, weight 500.
- **Phase node numbers:** 11px, weight 700.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 600".
- The vertical timeline layout works well in scrollable content areas. At narrow widths, the two-column layout within each card may compress; the "What to Measure" column is the priority content.
- All text should remain legible at 50% scale.
- The timeline spine and node markers provide visual structure even at small sizes.

## Accessibility

- **Alt text:** "Vertical timeline showing a four-phase DEXA monitoring protocol for GLP-1 therapy. Phase 1, Pre-Treatment Baseline at Week 0: measure full body composition, appendicular lean mass, VAT, and screen for sarcopenia. Look for adequate baseline lean mass (favorable), low baseline ALM (monitor), or ALM near sarcopenia thresholds (concerning). Phase 2, Early Monitoring at 3 months: measure composition of initial weight loss, fat versus lean changes, VAT response, and ALM change. Favorable if more than 60 percent of weight loss is fat; concerning if more than 40 percent is lean mass. Phase 3, Active Treatment at 6 months: measure cumulative composition ratio, percent lean versus fat lost, fat-free mass index trends, and regional lean mass. Favorable if lean loss is slowing; concerning if rapid lean decline exceeds 2 kilograms in 3 months. Phase 4, Maintenance at 12 or more months: measure long-term composition stability, watch for late-onset muscle wasting, bone mineral content trends, and weight plateau composition. Favorable if lean mass is stable; concerning if lean loss continues despite intervention. Legend: green means favorable, amber means monitor closely, red means intervention needed."
- **SVG title element:** "Four-phase DEXA monitoring protocol for GLP-1 receptor agonist therapy."
- **No color-only encoding:** Each phase is numbered (1-4) and labeled with its name and timepoint. The "What to Measure" and "What to Look For" columns contain full text descriptions. The status indicators (green/amber/red circles) are supplemented by descriptive text and a legend that maps colors to meaning in words. Timing badges contain the specific timepoint.
- **Contrast:** #1C3133 on #FFFFFF card backgrounds: exceeds 14:1. White text on #46C9F7 and #E87D7D badges: ~3:1 (use bold weight). #1C3133 on #69D994 and #F5C842 badges: exceeds 4.5:1. All body text uses #1C3133 on white, ensuring maximum contrast.

## Data Accuracy

- The 4-phase monitoring protocol aligns with the recommendations in the target content, which draws on DEXA substudy data from STEP 1 (Wilding et al., 2022) and SURMOUNT-1 (Look et al., 2025).
- The 25-40% lean mass loss range for GLP-1 therapy is referenced in the content.
- The >2 kg lean mass decline in 3 months as a "concerning" threshold is a clinical guideline, not a strict evidence-based cutoff.
- The >60% fat loss as "favorable" aligns with the content's recommendation that less than 25% of total weight loss from lean mass is generally acceptable.

## Design Notes

- The vertical timeline format was chosen over horizontal because the four phases have substantial detail within each card. Vertical layout allows each phase to have a full-width card with two content columns.
- The left accent bar on each card creates a visual connection to the timeline and color-codes the phase at a glance.
- The traffic-light status indicators (green/amber/red) are a familiar pattern for clinical audiences and require minimal explanation.
- Phase card structure is deliberately consistent across all four phases: same dimensions, same two-column layout, same three status indicators. This consistency allows the viewer to compare across phases easily.
- The timeline node numbers (1-4) reinforce the sequential nature of the protocol.
- The coral/red accent for Phase 4 does not mean "danger" -- it reflects the fact that ongoing monitoring is the most critical phase for detecting late-onset muscle wasting. This is explained by the card content.
