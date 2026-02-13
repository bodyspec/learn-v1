---
target_file: content/modules/trainer/03-tracking-cadence.md
target_section: "## Recommended Scan Frequency"
placement: Inline image immediately after the section heading, before the "### General Guidelines" subsection
output_path: content/assets/diagrams/scan-timeline.svg
---

# Scan Frequency Timeline Diagram

## Purpose

Visualize the recommended DEXA scan cadence across a 12-month training journey, divided into four distinct phases. The viewer should understand that scan frequency changes with the client's phase: a single baseline scan at the start, regular scans every 8-12 weeks during active transformation, a confirmation scan during maintenance, and an annual check-in. The diagram reinforces that strategic timing maximizes the value of DEXA data and that more frequent scanning is not always better.

## Visual Layout

**Canvas:** 800 x 350px, landscape orientation. Background: #F8F8F8.

### Title Area (y: 0-55)

- Title centered at top.
- Subtitle below.

### Phase Color Bands (y: 80-110)

Four colored phase label banners span the width above the timeline, each aligned to its corresponding segment. These establish the phase names and color-coding before the viewer reaches the timeline.

**Phase 1 banner (x: 60-130):**
- Rounded rectangle (70px x 24px). Fill: #46C9F7 (blue). rx: 4.
- Text: "Baseline" in 11px semibold #FFFFFF, centered.

**Phase 2 banner (x: 155-420):**
- Rounded rectangle (265px x 24px). Fill: #69D994 (green). rx: 4.
- Text: "Active Tracking" in 11px semibold #1C3133, centered.

**Phase 3 banner (x: 445-580):**
- Rounded rectangle (135px x 24px). Fill: #F5C842 (amber). rx: 4.
- Text: "Maintenance" in 11px semibold #1C3133, centered.

**Phase 4 banner (x: 605-740):**
- Rounded rectangle (135px x 24px). Fill: #46C9F7 (blue). rx: 4.
- Text: "Annual Check" in 11px semibold #FFFFFF, centered.

### Horizontal Timeline (y: 130-145)

A single horizontal line spanning x: 60 to x: 740. Stroke: #1C3133, 3px. Rounded line caps.

**Phase segments along the timeline are indicated by the colored sections of the line itself:**
- x: 60-130 (Baseline / Week 0): stroke color #46C9F7, 3px.
- x: 130-420 (Active / Months 1-6): stroke color #69D994, 3px.
- x: 420-580 (Maintenance / Months 6-9): stroke color #F5C842, 3px.
- x: 580-740 (Annual / Months 9-12): stroke color #46C9F7, 3px.

### Month Tick Marks (y: 145-160)

Small vertical tick marks (8px tall) below the timeline at each month boundary, with month labels below.

| Position | Label |
|----------|-------|
| x: 60 | "Week 0" in 10px semibold #1C3133 |
| x: 117 | "1 mo" in 10px #7C8D90 |
| x: 174 | "2 mo" in 10px #7C8D90 |
| x: 231 | "3 mo" in 10px #7C8D90 |
| x: 288 | "4 mo" in 10px #7C8D90 |
| x: 345 | "5 mo" in 10px #7C8D90 |
| x: 403 | "6 mo" in 10px semibold #1C3133 |
| x: 460 | "7 mo" in 10px #7C8D90 |
| x: 517 | "8 mo" in 10px #7C8D90 |
| x: 574 | "9 mo" in 10px #7C8D90 |
| x: 631 | "10 mo" in 10px #7C8D90 |
| x: 688 | "11 mo" in 10px #7C8D90 |
| x: 740 | "12 mo" in 10px semibold #1C3133 |

Key milestone months (Week 0, 6 mo, 12 mo) use #1C3133 semibold; others use #7C8D90 regular.

### Scan Markers (on the timeline, y: 120-145)

Circles positioned on the timeline at each recommended scan point, with a connecting line extending upward to the phase banner.

**Scan 1 -- Baseline (x: 60):**
- Circle: 14px diameter. Fill: #46C9F7. Stroke: #1C3133, 2px. Centered on the timeline.
- Label above circle: "Scan 1" in 10px bold #1C3133.

**Scan 2 -- 8-12 weeks (x: ~220, representing ~10 weeks):**
- Circle: 14px diameter. Fill: #69D994. Stroke: #1C3133, 2px.
- Label above: "Scan 2" in 10px bold #1C3133.
- Annotation below marker: "8-12 wk" in 9px #7C8D90.

**Scan 3 -- 16-20 weeks (x: ~335, representing ~18 weeks):**
- Circle: 14px diameter. Fill: #69D994. Stroke: #1C3133, 2px.
- Label above: "Scan 3" in 10px bold #1C3133.
- Annotation below marker: "8-12 wk" in 9px #7C8D90.

**Scan 4 -- 6 months (x: 403):**
- Circle: 14px diameter. Fill: #F5C842. Stroke: #1C3133, 2px.
- Label above: "Scan 4" in 10px bold #1C3133.

**Scan 5 -- 12 months (x: 740):**
- Circle: 14px diameter. Fill: #46C9F7. Stroke: #1C3133, 2px.
- Label above: "Scan 5" in 10px bold #1C3133.

### Interval Annotations (y: 165-185)

Horizontal double-headed arrows between scan markers showing the interval duration:

- Between Scan 1 and Scan 2: Arrow spanning x: 60 to x: 220. Label centered above: "8-12 weeks" in 10px #7C8D90.
- Between Scan 2 and Scan 3: Arrow spanning x: 220 to x: 335. Label: "8-12 weeks" in 10px #7C8D90.
- Between Scan 3 and Scan 4: Arrow spanning x: 335 to x: 403. Label: "~8 weeks" in 10px #7C8D90.
- Between Scan 4 and Scan 5: Arrow spanning x: 403 to x: 740. Label: "6 months" in 10px #7C8D90.

Arrows: stroke #DFE2E2, 1.5px, with small arrowhead markers at both ends.

### Purpose Cards (y: 210-330)

Four rounded rectangles aligned below their corresponding phase segments, each describing the purpose of scanning in that phase.

**Card 1 -- Baseline (x: 30-155):**
- Rounded rectangle (125px x 110px). Fill: #FFFFFF. Stroke: #46C9F7, 1.5px. rx: 8.
- Icon line: Small circle icon (6px, fill: #46C9F7) at top-left of text block.
- Title: "Establish Starting Point" in 12px semibold #1C3133.
- Body text (3 lines, 10px, #7C8D90):
  - "Record baseline composition"
  - "Set realistic goals"
  - "Identify focus areas"

**Card 2 -- Active (x: 175-415):**
- Rounded rectangle (240px x 110px). Fill: #FFFFFF. Stroke: #69D994, 1.5px. rx: 8.
- Icon line: Small circle icon (6px, fill: #69D994).
- Title: "Track Changes, Adjust Program" in 12px semibold #1C3133.
- Body text (3 lines, 10px, #7C8D90):
  - "Confirm fat loss vs. muscle gain"
  - "Adjust nutrition & training"
  - "Validate program effectiveness"

**Card 3 -- Maintenance (x: 435-575):**
- Rounded rectangle (140px x 110px). Fill: #FFFFFF. Stroke: #F5C842, 1.5px. rx: 8.
- Icon line: Small circle icon (6px, fill: #F5C842).
- Title: "Confirm Maintenance" in 12px semibold #1C3133.
- Body text (3 lines, 10px, #7C8D90):
  - "Ensure stability"
  - "Catch early drift"
  - "Adjust as needed"

**Card 4 -- Annual (x: 595-740):**
- Rounded rectangle (145px x 110px). Fill: #FFFFFF. Stroke: #46C9F7, 1.5px. rx: 8.
- Icon line: Small circle icon (6px, fill: #46C9F7).
- Title: "Long-Term Monitoring" in 12px semibold #1C3133.
- Body text (3 lines, 10px, #7C8D90):
  - "Detect gradual trends"
  - "Annual health check"
  - "Update long-term plan"

### Connecting Lines (Purpose Cards to Timeline)

Thin dashed vertical lines (stroke: #DFE2E2, 1px, dash 4,3) connecting the top of each purpose card to the corresponding phase segment on the timeline.

## Title

"Recommended DEXA Scan Timeline" -- centered at top (y: 30), Poppins 22px bold, #1C3133.

**Subtitle:** "Strategic timing maximizes the value of each scan" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text, scan marker strokes | BodySpec dark | #1C3133 |
| Muted text, tick marks | BodySpec dark55 | #7C8D90 |
| Interval arrows, connecting lines | BodySpec dark15 | #DFE2E2 |
| Baseline & Annual phase | Blue accent | #46C9F7 |
| Active Tracking phase, scan markers | Salad 100 | #69D994 |
| Maintenance phase | Amber/yellow | #F5C842 |
| Purpose card fill | White | #FFFFFF |

The blue is used for both Baseline and Annual phases to bookend the journey, while green (the most active phase) and amber (transition/maintenance) fill the middle.

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Phase banners:** 11px, weight 600.
- **Scan labels:** 10px, weight 700.
- **Month tick labels:** 10px, weight 400-600.
- **Purpose card titles:** 12px, weight 600.
- **Purpose card body:** 10px, weight 400.
- **Interval labels:** 10px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 350".
- The horizontal timeline format naturally fits landscape/wide containers. At narrow widths, the month labels may crowd; the scan markers and phase bands remain the primary communication.
- All text should remain legible at 50% scale (minimum ~5px rendered).
- Purpose cards may overlap at very narrow widths; priority is the timeline and scan markers.

## Accessibility

- **Alt text:** "Horizontal timeline showing recommended DEXA scan frequency over 12 months. Phase 1, Baseline: a single scan at Week 0 to establish the starting point. Phase 2, Active Tracking from months 1 through 6: scans every 8 to 12 weeks to track changes and adjust the program, with scan markers at approximately 10 weeks and 18 weeks. Phase 3, Maintenance from months 6 through 9: a confirmation scan at month 6 to ensure stability. Phase 4, Annual Check at month 12: a long-term monitoring scan. Purpose cards below each phase describe their goals: establish starting point, track changes and adjust program, confirm maintenance, and long-term monitoring."
- **SVG title element:** "Recommended DEXA scan timeline across four training phases."
- **No color-only encoding:** Each phase is labeled with its name in a banner. Scan markers are numbered (Scan 1 through Scan 5). Interval durations are annotated with text. Purpose cards describe each phase's role in words. Color reinforces phase identity but is not the sole differentiator.
- **Contrast:** White text on #46C9F7 blue banners: ~3.1:1 (use semibold weight to compensate; alternatively darken to #3BB5E0 for better contrast). #1C3133 text on #69D994 and #F5C842: exceeds 4.5:1. All purpose card text is #1C3133 on #FFFFFF: exceeds 14:1.

## Design Notes

- The timeline should feel like a journey with a clear left-to-right progression. Avoid making it feel like a rigid schedule -- the scan intervals (8-12 weeks) have ranges to communicate flexibility.
- The phase color bands above the timeline should feel like a segmented progress bar, visually connecting to the purpose cards below via the dashed connecting lines.
- Scan markers should be prominent enough to feel like milestones on the journey.
- The double-headed interval arrows reinforce the spacing between scans without cluttering the timeline itself.
- Keep the purpose cards compact; they supplement the timeline, not compete with it.
