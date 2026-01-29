# Citations Needed

This document tracks all claims in the educational content that require scientific citations or references.

---

## High Priority: Clinical/Scientific Claims

### Core Module

#### `modules/core/02-accuracy.md`

| Line | Claim | Citation Type | Status |
|------|-------|---------------|--------|
| 17-23 | DEXA precision CV%: Total body fat 1-2%, Lean mass 0.5-1%, BMD 1-1.5%, VAT 2-4% | Validation study or manufacturer data | ⬜ TODO |
| 53-58 | Method comparison: DEXA ±1-2%, BIA ±4-8%, Skinfolds ±3-5% | Comparative study/meta-analysis | ⬜ TODO |
| 64-72 | DEXA validated against 4-compartment models, MRI, CT | Review article | ⬜ TODO |

**Suggested sources:**
- Shepherd JA, et al. "Body composition by DXA." Bone. 2017.
- Toombs RJ, et al. "The impact of recent technological advances on the trueness and precision of DXA." Obesity. 2012.

#### `modules/core/03-key-metrics.md`

| Line | Claim | Citation Type | Status |
|------|-------|---------------|--------|
| — | Body fat percentage reference ranges (essential, athletes, fitness, acceptable, obese) | ACSM guidelines or population studies | ⬜ TODO |
| — | VAT risk thresholds: <100 cm² normal, 100-160 cm² elevated, >160 cm² high | Consensus statement or epidemiological study | ⬜ TODO |
| — | Android/gynoid ratio interpretation | Clinical guidelines | ⬜ TODO |

**Suggested sources:**
- ACSM's Guidelines for Exercise Testing and Prescription
- Kaul S, et al. "Dual-energy X-ray absorptiometry for quantification of visceral fat." Obesity. 2012.

#### `modules/core/05-misconceptions.md`

| Line | Claim | Citation Type | Status |
|------|-------|---------------|--------|
| — | DEXA radiation dose comparison (chest X-ray, cross-country flight) | Radiation safety guidelines | ⬜ TODO |
| — | Scanning frequency safety | Manufacturer/regulatory guidance | ⬜ TODO |

**Suggested sources:**
- FDA guidance on DEXA radiation exposure
- ICRP radiation protection standards

---

### Physician Module

#### `modules/physician/01-clinical-indications.md`

| Line | Claim | Citation Type | Status |
|------|-------|---------------|--------|
| 21 | "VAT is an independent predictor of metabolic disease risk" | Prospective cohort studies | ⬜ TODO |
| — | TOFI (Thin Outside Fat Inside) prevalence and risk | Epidemiological studies | ⬜ TODO |

**Suggested sources:**
- Neeland IJ, et al. "Visceral and ectopic fat, atherosclerosis, and cardiometabolic disease." Nat Rev Cardiol. 2019.

#### `modules/physician/02-interpreting-results.md`

| Line | Claim | Citation Type | Status |
|------|-------|---------------|--------|
| — | EWGSOP2 sarcopenia diagnostic criteria | EWGSOP2 consensus paper | ⬜ TODO |
| — | VAT risk stratification thresholds by category | Clinical guidelines | ⬜ TODO |
| — | Lean mass changes by decade of life | Longitudinal studies | ⬜ TODO |
| — | Menopause/andropause body composition changes | Review articles | ⬜ TODO |

**Suggested sources:**
- Cruz-Jentoft AJ, et al. "Sarcopenia: revised European consensus on definition and diagnosis." Age Ageing. 2019.

#### `modules/physician/04-red-flags.md`

| Line | Claim | Citation Type | Status |
|------|-------|---------------|--------|
| — | VAT >200 cm² as severely elevated threshold | Clinical guidelines | ⬜ TODO |
| — | >5% muscle loss in 3-6 months as concerning | Sarcopenia literature | ⬜ TODO |
| — | >15% limb asymmetry as clinically significant | Rehabilitation/PT literature | ⬜ TODO |
| — | Cachexia diagnostic criteria | ESPEN/consensus definitions | ⬜ TODO |

**Suggested sources:**
- Fearon K, et al. "Definition and classification of cancer cachexia." Lancet Oncol. 2011.

---

### Deep Dives

#### `deep-dives/sarcopenia/01-sarcopenia-aging.md`

| Line | Claim | Citation Type | Status |
|------|-------|---------------|--------|
| 26-29 | ALM/height² cut-points: Men <7.0, Women <5.5 kg/m² | EWGSOP2 | ⬜ TODO |
| 39-41 | Sarcopenia prevalence: 5-13% (60-70y), 11-50% (70-80y), 50%+ (80+) | Systematic review | ⬜ TODO |
| 56 | Sarcopenia ICD-10 code M62.84 | ICD-10-CM | ⬜ TODO |
| 75 | Muscle loss rate: 3-8% per decade after 30 | Longitudinal studies | ⬜ TODO |
| 113-116 | Protein requirements: 1.0-1.2 g/kg minimum, 1.2-1.6 g/kg optimal | PROT-AGE, ESPEN | ⬜ TODO |
| — | Leucine requirements and timing | Sports nutrition research | ⬜ TODO |

**Suggested sources:**
- Cruz-Jentoft AJ, et al. EWGSOP2. Age Ageing. 2019.
- Bauer J, et al. "Evidence-based recommendations for optimal dietary protein intake in older people: a position paper from the PROT-AGE Study Group." JAMDA. 2013.
- Deutz NE, et al. "Protein intake and exercise for optimal muscle function with aging: recommendations from the ESPEN Expert Group." Clin Nutr. 2014.

---

## Medium Priority: Best Practice Claims

### Trainer Module

#### `modules/trainer/01-program-design.md`

| Line | Claim | Citation Type | Status |
|------|-------|---------------|--------|
| — | Realistic muscle gain: 0.5-1 lb/month for trained individuals | Training studies | ⬜ TODO |
| — | Protein targets: 1.6-2.2 g/kg for muscle building | ISSN position stand | ⬜ TODO |
| — | Body recomposition feasibility by training status | Research reviews | ⬜ TODO |

**Suggested sources:**
- Jäger R, et al. "International Society of Sports Nutrition Position Stand: protein and exercise." JISSN. 2017.
- Barakat C, et al. "Body Recomposition: Can Trained Individuals Build Muscle and Lose Fat at the Same Time?" Strength Cond J. 2020.

#### `modules/trainer/03-tracking-cadence.md`

| Line | Claim | Citation Type | Status |
|------|-------|---------------|--------|
| — | Recommended scan intervals (3-6 months) | Expert consensus/precision data | ⬜ TODO |
| — | Minimum detectable change thresholds | DEXA precision studies | ⬜ TODO |

---

## Citation Format

When adding citations, use this format in the markdown:

```markdown
Studies show DEXA precision for body fat percentage is typically 1-2% CV.[^1]

[^1]: Shepherd JA, et al. "Body composition by DXA." Bone. 2017;104:101-105.
```

Or for inline references:

```markdown
According to the EWGSOP2 consensus (Cruz-Jentoft et al., 2019), sarcopenia is defined as...
```

---

## Status Key

- ⬜ TODO - Citation needed
- 🔄 In Progress - Researching source
- ✅ Complete - Citation added to content

---

## Notes

1. Prioritize primary sources (original research) over secondary sources
2. Use most recent guidelines where available (e.g., EWGSOP2 over EWGSOP1)
3. For clinical thresholds, prefer consensus statements or position papers
4. Consider adding a References section at the end of each module once citations are compiled
