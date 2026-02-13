---
target_file: content/deep-dives/visceral-fat/01-understanding-vat.md
target_section: "## Why VAT Matters More Than Total Body Fat"
placement: Inline image immediately after the section heading, before the "Metabolic Activity" subsection
output_path: content/assets/diagrams/vat-disease-pathways.svg
---

# VAT Disease Pathways Hub-and-Spoke Diagram

## Purpose

Visualize the causal chain from visceral adipose tissue through mechanistic pathways to downstream disease outcomes. The viewer should understand that VAT is not inert storage but an active endocrine organ that drives disease through three distinct mechanistic pathways: inflammatory cytokine release, free fatty acid portal drainage, and insulin resistance. Each pathway connects to specific disease outcomes with varying severity. This diagram makes the abstract concept of "metabolically active fat" concrete by showing exactly how VAT causes harm.

## Visual Layout

**Canvas:** 800 x 550px, landscape orientation. Background: #F8F8F8.

### Central Hub (cx: 400, cy: 245)

A large circle representing visceral adipose tissue, the origin of all pathways.

- Circle: r: 60px. Fill: #F5C842 (amber). Stroke: #1C3133 2.5px.
- Primary label: "Visceral" in 16px bold #1C3133, centered at cy: 238.
- Secondary label: "Adipose Tissue" in 14px bold #1C3133, centered at cy: 258.
- Tertiary label: "(VAT)" in 12px semibold #7C8D90, centered at cy: 276.
- Subtle radial gradient: center #F5C842, edge #E8B820, to give a slight 3D depth effect.

### Pathway Connector Lines (Hub to Intermediate Nodes)

Three curved connector lines from the hub to the three intermediate pathway nodes. Each line:
- Stroke: #7C8D90, 2px, with arrowhead marker at the destination end.
- Arrowhead: 10px triangle, fill matching the destination node color.
- Lines should be slightly curved (quadratic bezier) to avoid a rigid mechanical feel.

**Line 1 (Hub to Inflammatory Cytokines):** From hub left edge (x: 340, y: 220) curving up-left to node center (x: 145, y: 130).

**Line 2 (Hub to Free Fatty Acids):** From hub top edge (x: 400, y: 185) curving up-right to node center (x: 655, y: 130).

**Line 3 (Hub to Insulin Resistance):** From hub bottom edge (x: 400, y: 305) curving down to node center (x: 400, y: 430).

### Intermediate Pathway Nodes (Three Medium Circles)

These represent the three mechanistic pathways through which VAT drives disease.

**Node 1: Inflammatory Cytokines (cx: 145, cy: 130)**
- Circle: r: 48px. Fill: #E87D7D (coral). Stroke: #1C3133 2px.
- Primary label: "Inflammatory" in 12px bold #FFFFFF, centered at cy: 122.
- Secondary label: "Cytokines" in 12px bold #FFFFFF, centered at cy: 138.
- Sub-label: "IL-6, TNF-alpha, CRP" in 9px medium #1C3133, centered at cy: 155 (below the circle, outside, in dark text for readability).

**Node 2: Free Fatty Acids (cx: 655, cy: 130)**
- Circle: r: 48px. Fill: #E87D7D (coral). Stroke: #1C3133 2px.
- Primary label: "Free Fatty" in 12px bold #FFFFFF, centered at cy: 122.
- Secondary label: "Acids" in 12px bold #FFFFFF, centered at cy: 138.
- Sub-label: "Portal vein to liver" in 9px medium #1C3133, centered at cy: 155 (below the circle, outside).

**Node 3: Insulin Resistance (cx: 400, cy: 430)**
- Circle: r: 48px. Fill: #E87D7D (coral). Stroke: #1C3133 2px.
- Primary label: "Insulin" in 12px bold #FFFFFF, centered at cy: 422.
- Secondary label: "Resistance" in 12px bold #FFFFFF, centered at cy: 438.
- Sub-label: "Impaired glucose handling" in 9px medium #1C3133, centered at cy: 458 (below the circle, outside).

### Disease Outcome Connector Lines (Intermediate Nodes to Disease Boxes)

Thinner connector lines from each intermediate node to its disease outcome boxes. Each line:
- Stroke: #DFE2E2, 1.5px, with small arrowhead marker (8px triangle, fill #C0392B).
- Slightly curved bezier paths to avoid crossing other elements.

### Disease Outcome Boxes

Rounded rectangles (140px x 38px, rx: 6) positioned around the periphery. Each box has a severity-based fill color: deeper red for higher-severity associations.

**From Inflammatory Cytokines (Node 1, left cluster):**

1. **Cardiovascular Disease (x: 20, y: 30, centered at x: 90):**
   - Fill: #C0392B (deep red). Stroke: #1C3133 1.5px.
   - Text: "Cardiovascular Disease" in 10px bold #FFFFFF.
   - Connector from Node 1 upper-left.

2. **Cancer Risk (x: 20, y: 78, centered at x: 90):**
   - Fill: #FDEDEC (light red). Stroke: #E87D7D 1.5px.
   - Text: "Cancer Risk" in 10px semibold #1C3133.
   - Connector from Node 1 left.

**From Free Fatty Acids (Node 2, right cluster):**

3. **NAFLD (x: 640, y: 30, centered at x: 710):**
   - Fill: #C0392B (deep red). Stroke: #1C3133 1.5px.
   - Text: "NAFLD" in 10px bold #FFFFFF.
   - Width: 100px (shorter label, narrower box).
   - Connector from Node 2 upper-right.

4. **Dyslipidemia (x: 640, y: 78, centered at x: 710):**
   - Fill: #FDEDEC (light red). Stroke: #E87D7D 1.5px.
   - Text: "Dyslipidemia" in 10px semibold #1C3133.
   - Width: 110px.
   - Connector from Node 2 right.

**From Insulin Resistance (Node 3, bottom cluster):**

5. **Type 2 Diabetes (x: 200, y: 497, centered at x: 270):**
   - Fill: #C0392B (deep red). Stroke: #1C3133 1.5px.
   - Text: "Type 2 Diabetes" in 10px bold #FFFFFF.
   - Width: 120px.
   - Connector from Node 3 lower-left.

6. **Metabolic Syndrome (x: 475, y: 497, centered at x: 555):**
   - Fill: #C0392B (deep red). Stroke: #1C3133 1.5px.
   - Text: "Metabolic Syndrome" in 10px bold #FFFFFF.
   - Width: 140px.
   - Connector from Node 3 lower-right.

### Severity Legend (bottom-right, x: 630, y: 500)

A small legend box with white fill and #DFE2E2 border (1px, rx: 4), padding 8px:
- Row 1: Small square (12x12px) fill #C0392B, then "Strong association" in 9px #1C3133.
- Row 2: Small square (12x12px) fill #FDEDEC with #E87D7D border, then "Emerging evidence" in 9px #1C3133.

### Cross-Pathway Connections (Dashed)

To show that the three pathways are interconnected (not isolated):
- Dashed arc from Node 1 (Inflammatory Cytokines) to Node 3 (Insulin Resistance): stroke #DFE2E2, 1px, dash 4,3. Shows that inflammation drives insulin resistance.
- Dashed arc from Node 2 (Free Fatty Acids) to Node 3 (Insulin Resistance): stroke #DFE2E2, 1px, dash 4,3. Shows that hepatic FFA delivery impairs insulin clearance.
- These arcs should be subtle and not compete with the primary connector lines.

## Title

"How Visceral Fat Drives Disease" -- centered at top (y: 25), Poppins 22px bold, #1C3133.

**Subtitle:** "Mechanistic pathways from VAT to metabolic disease" in 13px #7C8D90, centered at y: 45.

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light gray | #F8F8F8 |
| Primary text, outlines | BodySpec dark | #1C3133 |
| Muted text, secondary connectors | BodySpec dark55 | #7C8D90 |
| Borders, dashed cross-links | BodySpec dark15 | #DFE2E2 |
| Central hub (VAT) | Amber/yellow | #F5C842 |
| Hub gradient edge | Darker amber | #E8B820 |
| Pathway nodes (mechanisms) | Coral/red | #E87D7D |
| High-severity disease outcomes | Deep red | #C0392B |
| Lower-severity disease outcomes bg | Light red | #FDEDEC |
| Lower-severity disease outcome border | Coral/red | #E87D7D |

The color progression from amber (VAT source) through coral (pathways) to deep red (disease outcomes) visually communicates escalating clinical severity from cause to consequence.

## Typography

- **Font family:** Poppins, system-ui, -apple-system, sans-serif.
- **Title:** 22px, weight 700.
- **Subtitle:** 13px, weight 400.
- **Hub label:** 14-16px, weight 700.
- **Hub sub-label:** 12px, weight 600.
- **Pathway node labels:** 12px, weight 700.
- **Pathway sub-labels:** 9px, weight 500.
- **Disease outcome labels:** 10px, weight 600-700.
- **Legend text:** 9px, weight 400.

## Sizing and Responsiveness

- SVG viewBox: "0 0 800 550".
- The hub-and-spoke layout is inherently balanced and reads well at various scales.
- At 50% scale, the hub and pathway nodes remain legible; disease outcome boxes may require zooming for their 10px labels.
- The diagram is wide enough to avoid element overlap while keeping pathways visually connected.

## Accessibility

- **Alt text:** "Hub-and-spoke diagram showing how visceral adipose tissue drives disease through three mechanistic pathways. The central hub is Visceral Adipose Tissue. Three intermediate pathway nodes branch out: Inflammatory Cytokines (IL-6, TNF-alpha, CRP) connecting to Cardiovascular Disease and Cancer Risk; Free Fatty Acids (portal vein drainage to liver) connecting to Non-Alcoholic Fatty Liver Disease and Dyslipidemia; and Insulin Resistance (impaired glucose handling) connecting to Type 2 Diabetes and Metabolic Syndrome. Dashed lines between pathways show they are interconnected. Disease boxes are color-coded by strength of evidence: deep red for strong associations, light red for emerging evidence."
- **SVG title element:** "Visceral adipose tissue disease pathways diagram."
- **No color-only encoding:** Every node and box contains a text label identifying the pathway or disease. The severity legend provides text descriptions alongside color swatches. The hub-and-spoke structure itself conveys the causal flow through spatial positioning (center to periphery). Arrowheads on connectors indicate directionality.
- **Contrast:** White text on #E87D7D pathway nodes: ~3.4:1 at 12px bold (compensated by bold weight and sufficient font size). White text on #C0392B disease boxes: exceeds 4.5:1. Dark text (#1C3133) on #F5C842 hub: exceeds 5:1. Dark text on #FDEDEC light red boxes: exceeds 12:1. All critical labels meet WCAG AA for their respective sizes.

## Data Accuracy

- The three-pathway model (inflammatory cytokines, free fatty acids via portal hypothesis, insulin resistance) is well-established in the literature and summarized in Neeland et al., 2019.
- Disease associations are supported by extensive epidemiological and mechanistic evidence; cardiovascular disease, type 2 diabetes, metabolic syndrome, and NAFLD have the strongest evidence base.
- Cancer risk associations are described as "emerging evidence" consistent with the current literature (chronic inflammation and altered hormone metabolism).
- Dyslipidemia is a direct consequence of hepatic FFA delivery, well-documented in metabolic research.
- Cross-pathway interconnections reflect the established understanding that these mechanisms are not independent but synergistic.

## Design Notes

- The hub-and-spoke layout was chosen over a linear flowchart because VAT drives disease through multiple simultaneous pathways, not a single chain. The radial structure communicates this parallelism.
- The amber color for the central hub distinguishes it from the red-spectrum pathway and outcome elements, signaling that VAT is the source (a risk factor to address) rather than a disease endpoint.
- Disease outcome boxes are positioned to avoid visual crowding: left cluster for inflammation-driven outcomes, right cluster for FFA-driven outcomes, bottom cluster for insulin-resistance-driven outcomes.
- The dashed cross-pathway connections add nuance without cluttering the primary visual flow. They should be the most subtle elements in the diagram.
- Keep the diagram clean and uncluttered -- the educational value comes from the clear cause-to-effect structure, not from packing in every possible connection.
