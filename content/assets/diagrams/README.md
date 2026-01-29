# Diagrams Needed

This directory should contain educational diagrams and illustrations.

---

## Technical/Scientific Diagrams

| Filename | Description | Use In | Status |
|----------|-------------|--------|--------|
| `three-compartment-model.svg` | Illustration showing fat mass, lean mass, and bone mineral as three distinct compartments | `core/01-how-dexa-works.md` | ⬜ TODO |
| `dexa-dual-energy.svg` | Simplified diagram showing how dual-energy X-rays differentiate tissue types | `core/01-how-dexa-works.md` | ⬜ TODO |
| `dexa-scan-position.svg` | Person lying on DEXA table in proper scan position | `core/01-how-dexa-works.md` | ⬜ TODO |

---

## Body Region Diagrams

| Filename | Description | Use In | Status |
|----------|-------------|--------|--------|
| `android-gynoid-regions.svg` | Body outline showing android (abdominal) and gynoid (hip/thigh) measurement regions | `core/03-key-metrics.md` | ⬜ TODO |
| `regional-divisions.svg` | Body divided into arms, legs, trunk regions as measured by DEXA | `core/03-key-metrics.md`, `chiropractor/01-msk-relevance.md` | ⬜ TODO |
| `vat-sat-location.svg` | Cross-section or front view showing visceral (around organs) vs subcutaneous (under skin) fat | `core/03-key-metrics.md`, `deep-dives/visceral-fat` | ⬜ TODO |

---

## Reference Charts

| Filename | Description | Use In | Status |
|----------|-------------|--------|--------|
| `body-fat-ranges-male.svg` | Visual chart showing body fat % categories for men (essential → obese) | `core/03-key-metrics.md` | ⬜ TODO |
| `body-fat-ranges-female.svg` | Visual chart showing body fat % categories for women | `core/03-key-metrics.md` | ⬜ TODO |
| `vat-risk-zones.svg` | Visual showing VAT thresholds (<100, 100-160, >160 cm²) with risk levels | `core/03-key-metrics.md`, `physician/02-interpreting-results.md` | ⬜ TODO |

---

## Clinical/Diagnostic Diagrams

| Filename | Description | Use In | Status |
|----------|-------------|--------|--------|
| `sarcopenia-diagnostic-algorithm.svg` | Flowchart showing EWGSOP2 sarcopenia diagnosis pathway | `deep-dives/sarcopenia/01-sarcopenia-aging.md` | ⬜ TODO |
| `weight-loss-quality.svg` | Diagram showing "good" (fat loss, lean preserved) vs "bad" (muscle loss) weight loss | `physician/02-interpreting-results.md`, `trainer/02-client-management.md` | ⬜ TODO |

---

## Comparison Graphics

| Filename | Description | Use In | Status |
|----------|-------------|--------|--------|
| `method-comparison.svg` | Visual comparing accuracy of DEXA vs BIA vs calipers vs visual estimation | `core/02-accuracy.md` | ⬜ TODO |
| `dexa-vs-bmi.svg` | Side-by-side showing two people with same BMI but different body composition | `core/05-misconceptions.md`, `physician/01-clinical-indications.md` | ⬜ TODO |

---

## Design Guidelines

### Style
- Clean, professional, medical-illustration style
- Consistent color palette (suggest using BodySpec brand colors)
- Minimal text on diagrams (labels only)
- High contrast for accessibility

### Colors (from STYLE.md)
- Primary dark: `#1C3133`
- Accent green: `#69D994`
- Light backgrounds: `#E5F6EB`
- Warning/attention: Use amber/orange for risk indicators

### Format
- **SVG preferred** for scalability and web use
- PNG fallback at 2x resolution (retina)
- Minimum width: 800px for full-width diagrams
- Aspect ratios: 16:9 for wide diagrams, 4:3 or 1:1 for compact

### Accessibility
- Include alt text descriptions when embedding
- Ensure sufficient color contrast (WCAG AA minimum)
- Don't rely solely on color to convey meaning

---

## Creation Options

1. **Figma/Sketch** - For custom vector illustrations
2. **Canva** - Quick diagrams with templates
3. **BioRender** - Specialized for scientific/medical illustrations
4. **Excalidraw** - Hand-drawn style, good for quick concepts
5. **AI tools** - Can generate initial concepts to refine

---

## Status Key

- ⬜ TODO - Not yet created
- 🔄 In Progress - Being designed
- ✅ Complete - Ready for use
