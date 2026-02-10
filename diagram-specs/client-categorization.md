---
target_file: content/modules/trainer/01-program-design.md
target_section: "## Using DEXA for Needs Assessment"
placement: Inline image immediately after the section heading, before the "### Initial Client Evaluation" subsection
output_path: content/assets/diagrams/client-categorization.svg
---

# Client Categorization Quadrant Diagram

## Purpose

Present a 2x2 matrix that categorizes clients by body fat level and lean mass level, creating four distinct programming profiles. The viewer should be able to quickly identify where a client falls based on their DEXA results and immediately understand the primary programming focus for that profile. This simplifies the five-profile table in the content into an immediately scannable visual framework that trainers can internalize and apply.

## Visual Layout

**Canvas:** 800 x 500px, landscape orientation. Background: #F8F8F8.

### Overall Structure

A 2x2 quadrant grid centered on the canvas, with axis labels on the left and bottom edges. Each quadrant contains a category name, a color-coded background, and a one-line programming focus.

### Axis Lines (forming the quadrant cross)

**Vertical axis (lean mass):**
- Vertical line from x: 200, y: 85 to x: 200, y: 430. Stroke: #1C3133, 2.5px.
- Arrowhead at top: Filled #1C3133 triangle (8px wide, 10px tall) pointing up.

**Horizontal axis (body fat):**
- Horizontal line from x: 200, y: 257 to x: 760, y: 257. Stroke: #1C3133, 2.5px.
- Arrowhead at right: Filled #1C3133 triangle pointing right.

### Axis Labels

**Y-axis (left side):**
- "LEAN MASS" in 12px bold #1C3133, rotated 90 degrees counter-clockwise, centered vertically at x: 45, y: 257.
- "High" in 12px semibold #1C3133 at x: 170, y: 100 (top of axis).
- "Low" in 12px semibold #1C3133 at x: 170, y: 420 (bottom of axis).
- Upward arrow indicator: Small triangle (5px) in #69D994 at x: 185, y: 100 pointing up.
- Downward arrow indicator: Small triangle (5px) in #E87D7D at x: 185, y: 420 pointing down.

**X-axis (bottom):**
- "BODY FAT" in 12px bold #1C3133 at x: 480, y: 468, centered.
- "Low" in 12px semibold #1C3133 at x: 250, y: 448.
- "High" in 12px semibold #1C3133 at x: 710, y: 448.
- Left arrow indicator: Small triangle (5px) in #69D994 at x: 250, y: 440 pointing left.
- Right arrow indicator: Small triangle (5px) in #E87D7D at x: 710, y: 440 pointing right.

### Quadrant Boxes

Four rounded rectangles, each fitting within their quadrant of the cross. Each box has 10px margin from the axis lines and 10px margin from the canvas edges where applicable.

**Quadrant 1: Top-Left -- "Athletic" (high lean, low fat)**
- Position: x: 210, y: 90. Size: 265px x 160px. rx: 12.
- Fill: #E5F6EB (light green). Stroke: #69D994, 2px.
- **Category name:** "Athletic" in 20px bold #1C3133, centered at y: 135.
- **Icon area:** A simple star/badge shape (optional): five-pointed star (20px diameter), stroke: #69D994 2px, fill: none, centered above the category name at y: 115.
- **Programming focus:** "Maintain & Optimize" in 13px semibold #69D994, centered at y: 165.
- **Detail:** "Performance-specific goals,\nperiodization, fine-tuning" in 10px #7C8D90, centered, multi-line starting at y: 190.

**Quadrant 2: Top-Right -- "Overfat" (high lean, high fat)**
- Position: x: 485, y: 90. Size: 265px x 160px. rx: 12.
- Fill: #FFF8E1 (light yellow). Stroke: #F5C842, 2px.
- **Category name:** "Overfat" in 20px bold #1C3133, centered at y: 135.
- **Icon area:** A downward arrow inside a circle: circle (r: 10px, stroke: #F5C842 2px, fill: none), with a small downward-pointing arrow (stroke: #F5C842 2px) inside, at y: 115.
- **Programming focus:** "Fat Loss Priority" in 13px semibold #F5C842, centered at y: 165.
- **Detail:** "Caloric deficit, high protein,\npreserve existing muscle" in 10px #7C8D90, centered, multi-line starting at y: 190.

**Quadrant 3: Bottom-Left -- "Under-Muscled" (low lean, low fat)**
- Position: x: 210, y: 265. Size: 265px x 160px. rx: 12.
- Fill: #E8F4FD (light blue, derived from #46C9F7 at ~10% opacity on white). Stroke: #46C9F7, 2px.
- **Category name:** "Under-Muscled" in 20px bold #1C3133, centered at y: 310.
- **Icon area:** An upward arrow inside a circle: circle (r: 10px, stroke: #46C9F7 2px, fill: none), with a small upward-pointing arrow (stroke: #46C9F7 2px) inside, at y: 290.
- **Programming focus:** "Muscle Building Priority" in 13px semibold #46C9F7, centered at y: 340.
- **Detail:** "Caloric surplus, progressive\nresistance, compound lifts" in 10px #7C8D90, centered, multi-line starting at y: 365.

**Quadrant 4: Bottom-Right -- "Recomposition" (low lean, high fat)**
- Position: x: 485, y: 265. Size: 265px x 160px. rx: 12.
- Fill: #FDEDEC (light red). Stroke: #E87D7D, 2px.
- **Category name:** "Recomposition" in 20px bold #1C3133, centered at y: 310.
- **Icon area:** Two bidirectional arrows forming an "exchange" symbol: two small opposing arrows (one up #69D994, one down #E87D7D), each 2px stroke, at y: 290, suggesting simultaneous fat loss and muscle gain.
- **Programming focus:** "Dual Focus" in 13px semibold #E87D7D, centered at y: 340.
- **Detail:** "Simultaneous fat loss + muscle gain,\nhigh protein, patience required" in 10px #7C8D90, centered, multi-line starting at y: 365.
- **Challenge badge:** Small rounded rectangle (80px x 18px) at the bottom-right corner of the box (x: 662, y: 408). Fill: #E87D7D. rx: 4. Text: "HARDEST" in 9px bold #FFFFFF.

### Quadrant Cross Center Label

At the intersection of the two axes (x: 200, y: 257), place a small white circle (r: 18px, fill: #FFFFFF, stroke: #1C3133 2px) with "DEXA" in 10px bold #1C3133 centered inside. This anchors the framework to the measurement tool.

## Title

"Client Categorization by DEXA Profile" -- centered at top (y: 35), Poppins 22px bold, #1C3133.

**Subtitle:** "Programming focus based on body fat and lean mass levels" in 13px #7C8D90.

## Color Palette

| Quadrant | Background | Border | Hex (bg / border) |
|----------|------------|--------|-------------------|
| Athletic (high lean, low fat) | Light green | Salad 100 | #E5F6EB / #69D994 |
| Overfat (high lean, high fat) | Light yellow | Amber | #FFF8E1 / #F5C842 |
| Under-Muscled (low lean, low fat) | Light blue | Blue accent | #E8F4FD / #46C9F7 |
| Recomposition (low lean, high fat) | Light red | Coral | #FDEDEC / #E87D7D |

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text, axes | BodySpec dark | #1C3133 |
| Muted text, details | BodySpec dark55 | #7C8D90 |
| Borders, grid | BodySpec dark15 | #DFE2E2 |

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Category names:** 20px, weight 700.
- **Programming focus:** 13px, weight 600.
- **Detail descriptions:** 10px, weight 400.
- **Axis labels (LEAN MASS, BODY FAT):** 12px, weight 700.
- **Axis endpoints (High, Low):** 12px, weight 600.
- **DEXA center label:** 10px, weight 700.
- **HARDEST badge:** 9px, weight 700.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 500".
- The 2x2 grid scales naturally within any container. The quadrant structure remains clear even at reduced sizes because the four color-coded regions are visually distinct.
- At narrow widths below ~400px, the detail text lines may become harder to read, but the category names and programming focus lines (the primary information) remain legible.
- The axis labels and directional arrows provide orientation even when the detail text is too small to read.

## Accessibility

- **Alt text:** "Two-by-two matrix categorizing clients by body composition. The horizontal axis represents body fat from low to high, and the vertical axis represents lean mass from low to high. Top-left quadrant: Athletic profile (high lean mass, low body fat) with focus on maintaining and optimizing through performance-specific goals and periodization. Top-right quadrant: Overfat profile (high lean mass, high body fat) with fat loss priority, emphasizing caloric deficit, high protein, and preserving existing muscle. Bottom-left quadrant: Under-Muscled profile (low lean mass, low body fat) with muscle building priority through caloric surplus, progressive resistance, and compound lifts. Bottom-right quadrant: Recomposition profile (low lean mass, high body fat) requiring dual focus on simultaneous fat loss and muscle gain, labeled as the hardest challenge."
- **SVG title element:** "Client categorization quadrant based on DEXA body fat and lean mass levels."
- **No color-only encoding:** Each quadrant contains a text category name, programming focus, and detailed description. The axis labels (High/Low) and axis titles (LEAN MASS, BODY FAT) provide orientation. The "HARDEST" badge on the Recomposition quadrant is textual. The DEXA center label reinforces the measurement basis. Color is used to differentiate quadrants but every quadrant is fully described by its text content.
- **Contrast:** #1C3133 text on #E5F6EB: exceeds 12:1. #1C3133 text on #FFF8E1: exceeds 12:1. #1C3133 text on #E8F4FD: exceeds 12:1. #1C3133 text on #FDEDEC: exceeds 11:1. Programming focus colored text (#69D994 on #E5F6EB: ~2.2:1, #F5C842 on #FFF8E1: ~1.7:1) -- these are supplementary labels where the category name in #1C3133 above provides the primary identification. Consider rendering these at semibold weight for legibility. White text on #E87D7D badge: ~3.4:1 (use bold weight at 9px; supplementary label).

## Design Notes

- The 2x2 matrix is a universally understood framework that trainers can quickly memorize and apply mentally during client consultations.
- Each quadrant has a distinct color drawn from the BodySpec palette, making the four profiles visually memorable. The color choices are intuitive: green for the "ideal" athletic profile, yellow for "caution" (overfat, needs change), blue for "building" (under-muscled, needs growth), and red for the "hardest" challenge (recomposition requiring dual focus).
- The "DEXA" label at the center intersection emphasizes that this categorization is enabled by DEXA data, not guesswork.
- The "HARDEST" badge on the Recomposition quadrant sets expectations for trainers and helps them communicate realistic timelines to clients in that category.
- The content table has five profiles but this diagram uses four quadrants. The fifth profile ("Athletic recomp" in the content) maps to the border between the Athletic and Recomposition quadrants, which is a more advanced concept. The 2x2 simplification is more immediately useful for initial client categorization.
