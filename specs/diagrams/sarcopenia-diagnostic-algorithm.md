---
target_file: content/deep-dives/sarcopenia/01-sarcopenia-aging.md
target_section: "## Assessment"
placement: Inline image immediately after the section heading, before the "Using DEXA for Sarcopenia Assessment" subsection
output_path: content/assets/diagrams/sarcopenia-diagnostic-algorithm.svg
---

# Sarcopenia Diagnostic Algorithm (EWGSOP2) Diagram

## Purpose

Present the EWGSOP2 (European Working Group on Sarcopenia in Older People, revised 2019) diagnostic algorithm as a clear flowchart. The viewer should be able to follow the step-by-step diagnostic pathway from initial screening through to classification of probable, confirmed, or severe sarcopenia. The DEXA measurement step should be visually highlighted since this is a DEXA education platform.

## Visual Layout

**Canvas:** 800 x 700px, landscape orientation. Background: #F8F8F8.

### Flowchart Structure (top-to-bottom, centered)

The flowchart flows vertically from top to bottom with decision diamonds branching right for "No" paths.

**Step 1: Screening (y: 75-120)**
- Rounded rectangle (300px x 45px), centered. Fill: #E5F6EB (salad-60), stroke: #69D994 2px, rx: 8.
- Text: "1. Clinical Suspicion or SARC-F Screening" in 13px semibold #1C3133.

**Arrow down** from Step 1 to Step 2 decision. Stroke: #1C3133 2px, with downward arrowhead marker.

**Step 2: Strength Assessment Decision (y: 155-255)**
- Diamond shape (polygon), approximately 300px wide, 100px tall. Fill: white, stroke: #1C3133 2px.
- Text (centered, multi-line):
  - "Low Muscle Strength?" in 11px semibold #1C3133.
  - "Grip: M <27kg, F <16kg" in 10px #7C8D90.

**"No" path (right):**
- Horizontal arrow from right point of diamond to a result box. Stroke: #7C8D90 2px.
- Label on arrow: "No" in 11px semibold #7C8D90.
- **Result box:** Rounded rectangle (120px x 40px). Fill: #69D994, stroke: #1C3133 1.5px, rx: 8.
  - "No Sarcopenia" in 12px semibold #1C3133.

**"Yes" path (down):**
- Vertical arrow from bottom point of diamond. Stroke: #1C3133 2px.
- Label: "Yes" in 11px semibold #1C3133.

**Step 3: Probable Sarcopenia (y: 290-335)**
- Rounded rectangle (300px x 45px), centered. Fill: #FFF8E1 (light yellow), stroke: #F5C842 2px, rx: 8.
- Text line 1: "2. Probable Sarcopenia" in 13px semibold #1C3133.
- Text line 2: "Begin intervention; confirm with DEXA" in 11px #7C8D90.

**Arrow down** to Step 4 decision.

**Step 4: Muscle Quantity Decision -- DEXA Step (y: 370-480)**
- Diamond shape, same dimensions. Fill: white, stroke: **#46C9F7** (blue) **3px** (thicker border to highlight this as the DEXA step).
- Text (centered, multi-line):
  - "Low Muscle Quantity?" in 11px semibold #1C3133.
  - "DEXA ALM/ht2:" in 10px semibold **#46C9F7** (blue, emphasizing DEXA).
  - "M <7.0, F <5.5 kg/m2" in 10px #7C8D90.
- **DEXA badge:** Small rounded rectangle (55px x 22px), positioned at the upper-right corner of the diamond. Fill: #46C9F7, rx: 4.
  - "DEXA" in 10px bold #FFFFFF.

**"No" path (right):**
- Arrow to result box.
- **Result box:** Rounded rectangle (120px x 40px). Fill: #FFF8E1, stroke: #F5C842 1.5px, rx: 8.
  - "Probable Sarcopenia Only" in 10px semibold #1C3133 (two lines).

**"Yes" path (down):**
- Arrow continues down.

**Step 5: Physical Performance Decision (y: 515-605)**
- Diamond shape. Fill: white, stroke: #1C3133 2px.
- Text:
  - "Low Physical Performance?" in 11px semibold #1C3133.
  - "Gait speed <0.8 m/s" in 10px #7C8D90.

**"No" path (right):**
- Arrow to result box.
- **Result box:** Rounded rectangle (120px x 40px). Fill: #E87D7D, stroke: #1C3133 1.5px, rx: 8.
  - "Confirmed Sarcopenia" in 10px semibold #FFFFFF (two lines).

**"Yes" path (down):**
- Arrow to final result.

**Step 6: Severe Sarcopenia (y: 635-675)**
- Rounded rectangle (200px x 40px), centered. Fill: #C0392B (deep red), stroke: #1C3133 1.5px, rx: 8.
- "Severe Sarcopenia" in 14px bold #FFFFFF.

### Arrow Markers

Define two arrow markers:
- **arrowDown:** Downward-pointing triangle, fill: #1C3133.
- **arrowRight:** Right-pointing triangle, fill: #7C8D90.

## Title

"EWGSOP2 Sarcopenia Diagnostic Algorithm" -- centered at top (y: 35), Poppins 20px bold, #1C3133.

**Citation subtitle:** "Adapted from Cruz-Jentoft et al., 2019" in 12px #7C8D90.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Arrows, outlines, primary text | BodySpec dark | #1C3133 |
| Muted text, "No" paths | BodySpec dark55 | #7C8D90 |
| Step 1 (screening), No Sarcopenia | Green bg/border | #E5F6EB / #69D994 |
| Step 3, Probable Sarcopenia | Yellow bg/border | #FFF8E1 / #F5C842 |
| DEXA step highlight, DEXA badge | Blue | #46C9F7 |
| Confirmed Sarcopenia | Coral/red | #E87D7D |
| Severe Sarcopenia | Deep red | #C0392B |
| Decision diamonds | White fill | #FFFFFF |

The color progression from green (no sarcopenia) through yellow (probable) to red (confirmed) to deep red (severe) maps naturally to escalating severity.

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 20px, weight 700.
- **Citation:** 12px, weight 400.
- **Step labels:** 13px, weight 600.
- **Decision text:** 10-11px, weight 400-600.
- **Result labels:** 10-14px, weight 600-700.
- **Criteria values:** 10px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 700".
- The tall flowchart works best in a scrollable content area. At narrow widths, the "No" branches may crowd the right edge; ensure the rightmost result boxes have adequate margin.
- All text legible at 50% scale (important since this diagram has many small labels).

## Accessibility

- **Alt text:** "Flowchart of the EWGSOP2 sarcopenia diagnostic algorithm. Step 1: Clinical suspicion or SARC-F screening. Step 2: Assess muscle strength (grip strength: men less than 27 kilograms, women less than 16 kilograms). If strength is normal, no sarcopenia. If low, probable sarcopenia is diagnosed and intervention begins. Step 3: Confirm with DEXA measuring appendicular lean mass divided by height squared (men less than 7.0, women less than 5.5 kilograms per meter squared). If not confirmed, remains probable sarcopenia only. Step 4: Assess physical performance (gait speed less than 0.8 meters per second). If performance is normal, confirmed sarcopenia. If low, severe sarcopenia."
- **SVG title element:** "EWGSOP2 sarcopenia diagnostic algorithm flowchart."
- **No color-only encoding:** Each outcome box contains text labels. The decision flow is indicated by arrows with Yes/No labels. Clinical criteria are listed as numeric values inside the decision diamonds. Color severity mapping is supplementary to the text.
- **Contrast:** White text on #C0392B exceeds 4.5:1. White text on #E87D7D: check -- may need #FFFFFF bold at the specified sizes. Dark text on #FFF8E1 and #E5F6EB both exceed 12:1. White text on #46C9F7 badge: ~3:1 (use bold weight to compensate, or darken the blue slightly).

## Design Notes

- The **DEXA step** should be the most visually prominent decision in the flowchart, since this is an educational platform focused on DEXA. The blue highlight border and DEXA badge accomplish this.
- Keep diamond sizes consistent for visual rhythm.
- The "No" paths should feel like exits from the main flow, while the "Yes" paths continue the central descent.
- Ensure there is enough vertical spacing between steps for the arrows and labels to be clearly readable.
