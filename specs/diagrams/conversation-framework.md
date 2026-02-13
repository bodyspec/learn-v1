---
target_file: content/modules/physician/03-patient-conversations.md
target_section: "## Principles of Communication"
placement: Inline image immediately after the section heading, before "### Lead with Context"
output_path: content/assets/diagrams/conversation-framework.svg
---

# Patient Conversation Framework Diagram

## Purpose

Visualize the three-step framework for discussing DEXA results with patients: (1) Lead with Context, (2) Present Key Metrics, (3) Action Plan. The diagram should make the sequential nature of the framework immediately clear and provide concrete example phrases for each step. The viewer should internalize the flow -- context first, then data, then action -- as a repeatable conversation pattern.

## Visual Layout

**Canvas:** 800 x 400px, landscape orientation. Background: #F8F8F8.

### Three-Step Horizontal Flow (y: 80-280)

Three rounded rectangles arranged horizontally with connecting arrows between them. The three boxes are evenly spaced across the canvas.

**Step 1: "Lead with Context" (x: 30-250, width: 220px)**

- **Main box:** 220px x 140px. Fill: #E5F6EB (light green). Stroke: #69D994 2px. rx: 10.
- **Step badge:** Rounded rectangle (28px x 28px) at top-left corner of the box (x: 42, y: 72), overlapping the top edge by 14px. Fill: #69D994. rx: 6. Text: "1" in 16px bold #FFFFFF, centered.
- **Title:** "Lead with Context" in 15px semibold #1C3133, centered at y: 116.
- **Divider:** Horizontal line (180px, centered) at y: 132. Stroke: #69D994, 1px, opacity 0.4.
- **Description:** "Explain what DEXA measures and why it matters" in 11px #7C8D90, centered, wrapping within 190px width, at y: 148.

**Connecting Arrow 1 (x: 255-285)**
- Horizontal arrow from right edge of Step 1 to left edge of Step 2. Shaft: 2px stroke #1C3133. Length: ~30px. Arrowhead: right-pointing triangle (8px wide x 10px tall), fill: #1C3133.

**Step 2: "Present Key Metrics" (x: 290-510, width: 220px)**

- **Main box:** 220px x 140px. Fill: #F0F8FF (very light blue). Stroke: #46C9F7 2px. rx: 10.
- **Step badge:** Same style as Step 1, at x: 302, y: 72. Fill: #46C9F7. Text: "2" in 16px bold #FFFFFF.
- **Title:** "Present Key Metrics" in 15px semibold #1C3133, centered at y: 116.
- **Divider:** Horizontal line (180px) at y: 132. Stroke: #46C9F7, 1px, opacity 0.4.
- **Description:** "Focus on 2-3 actionable numbers, not every data point" in 11px #7C8D90, centered, wrapping within 190px, at y: 148.

**Connecting Arrow 2 (x: 515-545)**
- Same style as Arrow 1. Shaft: 2px #1C3133. Arrowhead: fill: #1C3133.

**Step 3: "Action Plan" (x: 550-770, width: 220px)**

- **Main box:** 220px x 140px. Fill: #FFF8E1 (light yellow). Stroke: #F5C842 2px. rx: 10.
- **Step badge:** Same style, at x: 562, y: 72. Fill: #F5C842. Text: "3" in 16px bold #1C3133 (dark text on yellow for contrast).
- **Title:** "Action Plan" in 15px semibold #1C3133, centered at y: 116.
- **Divider:** Horizontal line (180px) at y: 132. Stroke: #F5C842, 1px, opacity 0.4.
- **Description:** "Specific recommendations with a follow-up timeline" in 11px #7C8D90, centered, wrapping within 190px, at y: 148.

### Example Phrases (y: 250-380)

Below each step box, a speech-bubble-style card containing 1-2 example conversation phrases. Each card has a small upward-pointing triangle (notch) connecting it visually to the step above.

**Phrase Card 1 (below Step 1, x: 30-250, y: 250-345)**
- **Notch:** Upward-pointing triangle (12px wide x 8px tall) centered horizontally, at y: 250. Fill: #FFFFFF, stroke: #DFE2E2.
- **Card:** 220px x 88px. Fill: #FFFFFF. Stroke: #DFE2E2 1.5px. rx: 8.
- **Quote icon:** Small open-quote mark (") in 18px #69D994 at x: 42, y: 268.
- **Phrase 1:** "This scan gives us a detailed look at where your weight comes from -- fat, muscle, and bone." in 10px italic #1C3133, left-aligned within 190px padding, starting at y: 272.
- **Phrase 2:** "What were you hoping to learn from this?" in 10px italic #1C3133, at y: 310. Preceded by a thin divider line (180px, #DFE2E2 1px) at y: 302.

**Phrase Card 2 (below Step 2, x: 290-510, y: 250-345)**
- **Notch and card:** Same style as Card 1.
- **Quote icon:** (") in 18px #46C9F7.
- **Phrase 1:** "Two numbers I want to focus on: your body fat is 28%, and your visceral fat is 120 cm2." in 10px italic #1C3133, starting at y: 272.
- **Phrase 2:** "Here is where you fall compared to others your age." in 10px italic #1C3133, at y: 310.

**Phrase Card 3 (below Step 3, x: 550-770, y: 250-345)**
- **Notch and card:** Same style.
- **Quote icon:** (") in 18px #F5C842.
- **Phrase 1:** "Let's aim to reduce visceral fat by 15% over the next 4 months with exercise 3x/week and protein at every meal." in 10px italic #1C3133, starting at y: 272.
- **Phrase 2:** "We'll rescan in 4 months to measure progress." in 10px italic #1C3133, at y: 318.

### Bottom Summary Bar (y: 365-390)

A centered rounded rectangle (520px x 28px), fill: #1C3133, rx: 6.
- Text: "Context first -- Data second -- Action always" in 12px semibold #FFFFFF, centered. The em-dashes are spaced with 8px #7C8D90 vertical bar separators instead ("|").

## Title

"The Patient Conversation Framework" -- centered at top (y: 35), Poppins 22px bold, #1C3133.

**Subtitle:** "Three steps for discussing DEXA results effectively" in 13px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text | BodySpec dark | #1C3133 |
| Muted text, descriptions | BodySpec dark55 | #7C8D90 |
| Borders, dividers, card strokes | Border gray | #DFE2E2 |
| Step 1 (Context) accent, background | Salad 100 / Salad 60 | #69D994 / #E5F6EB |
| Step 2 (Metrics) accent, background | Blue / Light blue | #46C9F7 / #F0F8FF |
| Step 3 (Action) accent, background | Amber / Light yellow | #F5C842 / #FFF8E1 |
| Phrase cards | White | #FFFFFF |
| Summary bar | BodySpec dark | #1C3133 |
| Summary bar text | White | #FFFFFF |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Step numbers:** 16px, weight 700.
- **Step titles:** 15px, weight 600.
- **Step descriptions:** 11px, weight 400.
- **Example phrases:** 10px, weight 400, italic.
- **Quote icons:** 18px, weight 400.
- **Summary bar text:** 12px, weight 600.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 400".
- The horizontal three-step layout is optimized for wide containers. At narrow widths, the step boxes may need to compress slightly, but the numbered badges and connecting arrows maintain the sequential reading order.
- The phrase cards below each step provide the most valuable content for clinical use and should remain readable at 60% scale.
- Minimum effective width: ~500px (below this, consider a stacked vertical layout in a future responsive version).

## Accessibility

- **Alt text:** "Horizontal three-step flow diagram showing the patient conversation framework for DEXA results. Step 1, Lead with Context: explain what DEXA measures and why it matters, with example phrases like 'This scan gives us a detailed look at where your weight comes from' and 'What were you hoping to learn from this?' Step 2, Present Key Metrics: focus on 2 to 3 actionable numbers, with examples like 'Two numbers I want to focus on: your body fat is 28 percent, and your visceral fat is 120 square centimeters.' Step 3, Action Plan: specific recommendations with a follow-up timeline, with examples like 'Let's aim to reduce visceral fat by 15 percent over the next 4 months' and 'We'll rescan in 4 months to measure progress.' A summary bar reads: Context first, Data second, Action always."
- **SVG title element:** "Three-step patient conversation framework for discussing DEXA results."
- **No color-only encoding:** Each step is numbered (1, 2, 3) with prominent badges. Steps have distinct text titles. The connecting arrows indicate sequential order. Example phrases are full text. The summary bar repeats the framework in text. Color distinguishes steps but is not the sole differentiator.
- **Contrast:** White numbers on #69D994 badges: ~2.7:1 (compensated by 16px bold weight). White on #46C9F7: ~2.8:1 (16px bold). Dark #1C3133 on #F5C842: ~12:1. All body text in #1C3133 on light backgrounds exceeds 10:1. White text on #1C3133 summary bar exceeds 12:1. Italic phrase text at 10px in #1C3133 on white exceeds 15:1.

## Design Notes

- The left-to-right flow mirrors the temporal sequence of a clinical conversation, reinforcing the "context before data before action" principle.
- The speech-bubble phrase cards provide immediately usable language that clinicians can adapt. This is the most practically valuable element of the diagram.
- The three accent colors (green, blue, yellow) create a warm-to-cool-to-warm progression that feels balanced rather than hierarchical -- all three steps are equally important.
- The summary bar at the bottom serves as a memorable takeaway line that clinicians can internalize as a mental model.
- The step badges intentionally overlap the top edges of the boxes to create visual energy and draw the eye to the sequence.
