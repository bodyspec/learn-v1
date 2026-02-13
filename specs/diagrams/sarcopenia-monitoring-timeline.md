---
target_file: content/deep-dives/sarcopenia/02-intervention-monitoring.md
target_section: "## Tracking Progress"
placement: Inline image immediately after the section heading
output_path: content/assets/diagrams/sarcopenia-monitoring-timeline.svg
---

# Sarcopenia Intervention Monitoring Timeline Diagram

## Purpose

Present the practical monitoring cadence and intervention timeline for sarcopenia management over 12 months. The viewer should understand the recommended schedule of DEXA scans and functional assessments, what interventions to prescribe at each phase, what to evaluate at each checkpoint, and how to interpret outcomes (improving, stable, or declining). This diagram bridges the gap between diagnostic criteria (covered in the EWGSOP2 algorithm) and longitudinal clinical management.

## Visual Layout

**Canvas:** 800 x 450px, landscape orientation. Background: #F8F8F8.

### Main Timeline (y: 140-170)

A horizontal timeline bar spanning the full intervention period.

**Timeline bar:**
- Rounded rectangle: x: 80, y: 148, width: 640, height: 12px, rx: 6. Fill: #DFE2E2.
- The bar serves as the visual backbone connecting all checkpoints.

**Timeline segments (colored overlays on the bar):**

1. **Months 0-3 segment:** x: 80, width: 160px. Fill: #69D994 at 60% opacity. Overlay on the base bar.
2. **Months 3-6 segment:** x: 240, width: 160px. Fill: #46C9F7 at 60% opacity.
3. **Months 6-12 segment:** x: 400, width: 320px. Fill: #E5F6EB at 80% opacity.

### Checkpoint Markers (on the timeline)

Vertical markers at each assessment point, extending above and below the timeline.

**Month 0 Marker (x: 80):**
- Vertical line: x: 80, from y: 105 to y: 195. Stroke: #1C3133, 2px.
- Circle marker on timeline: cx: 80, cy: 154, r: 8. Fill: #1C3133. Stroke: #FFFFFF 2px.
- Label above: "Month 0" in 12px bold #1C3133, centered at y: 98.

**Month 3 Marker (x: 240):**
- Vertical line: x: 240, from y: 105 to y: 195. Stroke: #1C3133, 2px.
- Circle marker: cx: 240, cy: 154, r: 8. Fill: #69D994. Stroke: #FFFFFF 2px.
- Label above: "Month 3" in 12px bold #1C3133, centered at y: 98.

**Month 6 Marker (x: 400):**
- Vertical line: x: 400, from y: 105 to y: 195. Stroke: #1C3133, 2px.
- Circle marker: cx: 400, cy: 154, r: 8. Fill: #46C9F7. Stroke: #FFFFFF 2px.
- Label above: "Month 6" in 12px bold #1C3133, centered at y: 98.

**Month 12 Marker (x: 720):**
- Vertical line: x: 720, from y: 105 to y: 195. Stroke: #1C3133, 2px.
- Circle marker: cx: 720, cy: 154, r: 8. Fill: #1C3133. Stroke: #FFFFFF 2px.
- Label above: "Month 12" in 12px bold #1C3133, centered at y: 98.

### Assessment Detail Cards (above the timeline, y: 60-95 area, staggered to avoid overlap)

Rounded rectangles positioned above each checkpoint marker, connected by thin vertical lines.

**Card 1: Baseline Assessment (above Month 0, x: 15, y: 55)**
- Rounded rectangle: 130px x 42px, rx: 6. Fill: #FFFFFF. Stroke: #1C3133 1.5px.
- Line 1: "Baseline DEXA" in 11px bold #1C3133.
- Line 2: "ALM, grip, gait speed" in 9px #7C8D90.
- DEXA badge: Small rounded rectangle (38px x 14px) at upper-right corner of card. Fill: #46C9F7, rx: 3. Text: "DEXA" in 8px bold #FFFFFF.

**Card 2: First Follow-up (above Month 3, x: 175, y: 55)**
- Rounded rectangle: 130px x 42px, rx: 6. Fill: #FFFFFF. Stroke: #69D994 1.5px.
- Line 1: "Follow-up DEXA" in 11px bold #1C3133.
- Line 2: "Check ALM trend" in 9px #7C8D90.
- DEXA badge: Same as Card 1.

**Card 3: Key Assessment (above Month 6, x: 335, y: 55)**
- Rounded rectangle: 130px x 42px, rx: 6. Fill: #FFFFFF. Stroke: #46C9F7 1.5px.
- Line 1: "Key Assessment" in 11px bold #1C3133.
- Line 2: "ALM/ht2 + function" in 9px #7C8D90.
- DEXA badge: Same as Card 1.
- This card has a slightly thicker border (2px) to emphasize it as the most important mid-point evaluation.

**Card 4: Annual Review (above Month 12, x: 655, y: 55)**
- Rounded rectangle: 130px x 42px, rx: 6. Fill: #FFFFFF. Stroke: #1C3133 1.5px.
- Line 1: "Annual Review" in 11px bold #1C3133.
- Line 2: "Full reassessment" in 9px #7C8D90.
- DEXA badge: Same as Card 1.

### Intervention Phase Labels (below the timeline, y: 200-260)

Rounded rectangles positioned below the timeline segments, describing the intervention at each phase.

**Phase 1 Label (below Months 0-3, centered at x: 160, y: 205)**
- Rounded rectangle: 150px x 55px, rx: 6. Fill: #E5F6EB. Stroke: #69D994 1px.
- Header: "Phase 1" in 11px bold #1C3133, centered.
- Line 1: "Resistance training" in 10px #1C3133.
- Line 2: "2-3x / week" in 9px #7C8D90.
- Line 3: "Protein 1.2-1.6 g/kg/day" in 9px #7C8D90.

**Phase 2 Label (below Months 3-6, centered at x: 320, y: 205)**
- Rounded rectangle: 150px x 55px, rx: 6. Fill: #E5F6EB. Stroke: #46C9F7 1px.
- Header: "Phase 2" in 11px bold #1C3133, centered.
- Line 1: "Adjust based on" in 10px #1C3133.
- Line 2: "Month 3 results" in 9px #7C8D90.
- Line 3: "Progressive overload" in 9px #7C8D90.

**Maintenance Label (below Months 6-12, centered at x: 560, y: 205)**
- Rounded rectangle: 170px x 55px, rx: 6. Fill: #F8F8F8. Stroke: #DFE2E2 1px.
- Header: "Maintenance" in 11px bold #1C3133, centered.
- Line 1: "Continue program" in 10px #1C3133.
- Line 2: "Monitor every 6 months" in 9px #7C8D90.
- Line 3: "Adjust as needed" in 9px #7C8D90.

### Outcome Indicators (bottom section, y: 300-400)

Three outcome boxes arranged horizontally, showing the three possible trajectories. A thin horizontal line at y: 290 with label "Possible Outcomes" in 12px semibold #1C3133, centered, separates this section from the timeline above.

**Divider line:** x: 80 to x: 720, y: 295. Stroke: #DFE2E2, 1px.
**Section label:** "Outcome Assessment" in 13px semibold #1C3133, centered at y: 288.

**Outcome 1: Improving (x: 80, y: 310)**
- Rounded rectangle: 200px x 75px, rx: 8. Fill: #E5F6EB. Stroke: #69D994 2px.
- Status indicator: Circle (r: 6) at x: 100, cy: 332. Fill: #69D994.
- Header: "Improving" in 14px bold #69D994, at x: 115.
- Line 1: "ALM increasing" in 11px #1C3133. Upward arrow icon (text "^") before "ALM".
- Line 2: "Function improving" in 10px #7C8D90.
- Line 3: "Continue current plan" in 10px semibold #1C3133.

**Outcome 2: Stable (x: 300, y: 310)**
- Rounded rectangle: 200px x 75px, rx: 8. Fill: #FFF8E1. Stroke: #F5C842 2px.
- Status indicator: Circle (r: 6) at x: 320, cy: 332. Fill: #F5C842.
- Header: "Stable" in 14px bold #F5C842, at x: 335.
- Line 1: "ALM maintained" in 11px #1C3133. Horizontal arrow icon (text "~") before "ALM".
- Line 2: "Function unchanged" in 10px #7C8D90.
- Line 3: "Reassess intervention" in 10px semibold #1C3133.

**Outcome 3: Declining (x: 520, y: 310)**
- Rounded rectangle: 200px x 75px, rx: 8. Fill: #FDEDEC. Stroke: #E87D7D 2px.
- Status indicator: Circle (r: 6) at x: 540, cy: 332. Fill: #E87D7D.
- Header: "Declining" in 14px bold #E87D7D, at x: 555.
- Line 1: "ALM decreasing" in 11px #1C3133. Downward arrow icon (text "v") before "ALM".
- Line 2: "Function worsening" in 10px #7C8D90.
- Line 3: "Escalate care" in 10px bold #C0392B.

### Arrow Indicators on Outcome Boxes

Each outcome box has a small directional arrow symbol (using text characters or SVG path):
- Improving: upward-pointing triangle, fill #69D994, positioned left of the ALM text.
- Stable: horizontal dash, fill #F5C842, positioned left of the ALM text.
- Declining: downward-pointing triangle, fill #E87D7D, positioned left of the ALM text.

## Title

"Sarcopenia Monitoring Timeline" -- centered at top (y: 28), Poppins 22px bold, #1C3133.

**Subtitle:** "12-month intervention and DEXA assessment schedule" in 13px #7C8D90, centered at y: 48.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text, month 0/12 markers | BodySpec dark | #1C3133 |
| Muted text | BodySpec dark55 | #7C8D90 |
| Timeline base bar, borders, divider | BodySpec dark15 | #DFE2E2 |
| Phase 1 segment, month 3 marker, improving | Salad 100 (green) | #69D994 |
| Improving outcome background | Salad 60 | #E5F6EB |
| Phase 2 segment, month 6 marker, DEXA badge | Blue accent | #46C9F7 |
| Stable outcome | Amber/yellow | #F5C842 |
| Stable outcome background | Light yellow | #FFF8E1 |
| Declining outcome | Coral/red | #E87D7D |
| Declining outcome background | Light red | #FDEDEC |
| Escalate care text | Deep red | #C0392B |
| Assessment card fills | White | #FFFFFF |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Month labels:** 12px, weight 700.
- **Assessment card headers:** 11px, weight 700.
- **Assessment card details:** 9px, weight 400.
- **Phase headers:** 11px, weight 700.
- **Phase details:** 9-10px, weight 400.
- **Outcome section label:** 13px, weight 600.
- **Outcome headers:** 14px, weight 700.
- **Outcome details:** 10-11px, weight 400-600.
- **DEXA badge text:** 8px, weight 700.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 450".
- The horizontal timeline is the primary structural element and scales naturally with width.
- At narrow widths, the assessment cards above the timeline may crowd; the timeline itself and the outcome indicators below remain the critical communication elements.
- The three-section layout (cards above, timeline center, outcomes below) provides clear visual hierarchy.

## Accessibility

- **Alt text:** "Horizontal timeline showing a 12-month sarcopenia intervention and monitoring schedule. Month 0: Baseline DEXA scan with appendicular lean mass measurement, grip strength, and gait speed assessment. Months 0 to 3: Phase 1 intervention with resistance training 2 to 3 times per week and protein intake of 1.2 to 1.6 grams per kilogram per day. Month 3: First follow-up DEXA to check ALM trend. Months 3 to 6: Phase 2 with adjustments based on month 3 results and progressive overload. Month 6: Key assessment comparing ALM per height squared and functional tests. Months 6 to 12: Maintenance phase with continued program and monitoring every 6 months. Month 12: Annual review with full reassessment. Below the timeline, three possible outcomes are shown: Improving (green, ALM increasing, continue current plan), Stable (amber, ALM maintained, reassess intervention), and Declining (red, ALM decreasing, escalate care)."
- **SVG title element:** "Sarcopenia intervention monitoring timeline over 12 months."
- **No color-only encoding:** Every checkpoint has a text label with month number and assessment description. Each intervention phase has a text description of activities. Each outcome box has a text header, description, and recommended action. Color-coded timeline segments are supplemented by phase labels below. Directional arrow symbols in outcome boxes supplement the color coding.
- **Contrast:** White text on #46C9F7 DEXA badge: ~3:1 (compensated by bold weight at 8px; small decorative element). #1C3133 text on #E5F6EB: exceeds 10:1. #1C3133 text on #FFF8E1: exceeds 10:1. #1C3133 text on #FDEDEC: exceeds 10:1. Colored headers (#69D994, #F5C842, #E87D7D) on their respective light backgrounds: check each -- #69D994 on #E5F6EB is ~2.3:1 (use bold 14px weight for compensation; this is a large text header). #C0392B on #FDEDEC exceeds 4.5:1.

## Design Notes

- The horizontal timeline format was chosen because it maps naturally to the temporal progression of intervention, which is the core educational concept. Readers can scan left to right and understand "what happens when."
- The three-layer layout (assessment cards above, timeline in the middle, intervention phases below) groups related information while maintaining a clear visual hierarchy. The timeline itself acts as the organizing spine.
- DEXA badges on each assessment card reinforce that this is a DEXA-centered monitoring protocol, connecting back to the platform's educational mission.
- The outcome indicators are deliberately positioned as a separate section at the bottom to signal that they are the culmination of the monitoring process -- after the timeline runs its course, you assess where you are.
- The green/amber/red outcome color scheme maps to the familiar traffic-light metaphor that clinicians and patients intuitively understand.
- Phase 1 and Phase 2 intervention boxes provide enough detail (training frequency, protein targets) to be actionable without overwhelming the visual flow.
- The Month 6 "Key Assessment" card has a slightly emphasized border to draw attention to the most critical mid-point evaluation, where major intervention adjustments are typically made.
