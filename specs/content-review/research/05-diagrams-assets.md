# Diagrams & Assets Review

## Current State
- **14 SVG diagrams** in `content/assets/diagrams/`
- **9 embedded in content** (64% utilization)
- **5 created but not embedded** (orphaned)
- **0 report samples** (directory exists with README, no files)
- **No `diagram-specs/` directory** exists

## Embedded Diagrams (9)
| Diagram | Used In |
|---------|---------|
| dexa-dual-energy.svg | core/01-how-dexa-works.md |
| three-compartment-model.svg | core/01-how-dexa-works.md |
| regional-divisions.svg | core/01-how-dexa-works.md |
| body-fat-ranges-male.svg | core/03-key-metrics.md |
| body-fat-ranges-female.svg | core/03-key-metrics.md |
| android-gynoid-regions.svg | core/03-key-metrics.md |
| vat-sat-location.svg | core/03-key-metrics.md |
| vat-risk-zones.svg | core/03-key-metrics.md |
| dexa-vs-bmi.svg | deep-dives/visceral-fat/01-understanding-vat.md |

## Orphaned Diagrams — Created but Not Embedded (5)
| Diagram | Should Be In |
|---------|-------------|
| dexa-scan-position.svg | core/01-how-dexa-works.md |
| method-comparison.svg | core/02-accuracy.md |
| sarcopenia-diagnostic-algorithm.svg | deep-dives/sarcopenia/01-sarcopenia-aging.md |
| weight-loss-quality.svg | physician/02-interpreting-results.md AND trainer/02-client-management.md |

## Missing Report Samples (all TODO)
Screenshots needed (PNG):
- report-overview.png
- body-composition-section.png
- regional-analysis.png
- vat-section.png
- trend-chart.png
- percentile-ranking.png

Sample PDFs needed:
- example-healthy-adult.pdf
- example-elevated-vat.pdf
- example-sarcopenia-risk.pdf
- example-asymmetry.pdf
- example-recomposition.pdf
- example-weight-loss.pdf

Referenced by: core/04-reading-reports.md, core/03-key-metrics.md, chiropractor/01-msk-relevance.md, physician/02-interpreting-results.md, trainer/03-tracking-cadence.md

## Content Files With No Diagrams At All
Most track-specific files (physician, chiropractor, trainer) have zero diagrams. Only core module and one deep-dive have embedded visuals.
