# Design — Content Expansion

## Overview

Expand the BodySpec Learn content library so that every module (including deep-dives) meets two baseline requirements: at least 2 sections and a quiz. This involves writing 2 new content sections, 4 new quizzes, updating 4 module YAML configurations, creating 17 new diagram specs, and updating the diagrams README.

The expansion is additive — no existing content is rewritten or restructured. New content matches the established style: clinical-conversational tone, markdown footnote citations, :::note/:::clinical/:::warning callouts, 2,000-3,500 words per document, and 1-2 SVG diagrams per section.

---

## Detailed Requirements

### Content Sections

**Two deep-dive modules need a second section:**

1. **Sarcopenia — "Intervention & Monitoring"** (`deep-dives/sarcopenia/02-intervention-monitoring.md`)
   - Evidence-based exercise protocols (EWGSOP2, ICFSR guidelines)
   - Protein/nutrition recommendations (PROT-AGE: 1.2-1.5 g/kg/day, 25-30g per meal with 3-4g leucine)
   - DEXA monitoring cadence (baseline → 6 months → 12 months; ALM LSC ~500g means 6-12 month intervals)
   - Expected outcomes (RT alone: +0.5-1.0 kg at 12 weeks; RT + protein + creatine: up to +2.0-3.1 kg at 12-24 weeks)
   - Functional test integration (grip strength, gait speed, SPPB)
   - Red flags and escalation criteria (>1 kg ALM loss in 6-12 months, unexplained weight loss >5%)
   - Diagram: `sarcopenia-monitoring-timeline.svg` (spec #16)

2. **Bone Health — "Clinical Context & Next Steps"** (`deep-dives/bone-health/02-clinical-context.md`)
   - When to refer for clinical BMD DEXA (USPSTF 2025, ISCD 2023 positions)
   - Body-comp DEXA bone data as "opportunistic screening" — supplementary, NOT diagnostic
   - Lifestyle factors (weight-bearing exercise, calcium 1,000-1,200 mg/day, vitamin D 600-1,000 IU/day, protein ≥1.0 g/kg/day)
   - Body composition-bone connection (mechanostat theory, osteosarcopenia prevalence ~21%)
   - Patient communication framework (normal BMC, borderline/low BMC, combined findings, declining trends)
   - Diagram: `bone-health-referral-pathway.svg` (spec #17)

**Style requirements (both sections):**
- Follow structural pattern: Overview → mechanism/context → clinical application → monitoring → patient communication → summary → references
- Markdown footnotes `[^n]` for all citations
- 3 callout box types: :::note, :::clinical, :::warning
- 2,000-3,500 words (without references)
- 1 diagram each, inline with narrative

### Quizzes

**Four new quizzes for deep-dive modules:**

| Quiz | File | ID Prefix | Questions | Format |
|------|------|-----------|-----------|--------|
| Sarcopenia | `quizzes/sarcopenia.yaml` | `sarc-q1..q8` | 8 | 5-6 MC + 2-3 scenario |
| Bone Health | `quizzes/bone-health.yaml` | `bone-q1..q8` | 8 | 5-6 MC + 2-3 scenario |
| GLP-1 Monitoring | `quizzes/glp1-monitoring.yaml` | `glp1-q1..q8` | 8 | 5-6 MC + 2-3 scenario |
| Visceral Fat | `quizzes/visceral-fat.yaml` | `vfat-q1..q8` | 8 | 5-6 MC + 2-3 scenario |

**All quizzes use identical settings:**
```yaml
passing_score: 80
max_attempts: null
randomize_questions: false
randomize_options: true
```

**Question position pattern:**
- Q1: Basic recall (MC) — foundational definition/threshold
- Q2: Applied (scenario usually) — apply Q1 concept to case
- Q3: Basic recall (MC) — new concept/threshold
- Q4: Applied (scenario usually) — multi-step reasoning
- Q5: Procedural (MC) — timing, protocols, thresholds
- Q6: Concept (MC or scenario) — terminology/pattern
- Q7: Clinical judgment (scenario usually) — complex case analysis
- Q8: Synthesis (MC) — relationships, "why does this matter?"

**Explanation style:** 60-100 words, multiline `|`, direct answer → reasoning → clinical relevance.

**Quiz content must reference specific thresholds from module content** (e.g., ALM/ht² cut-points, VAT 100 cm² threshold, USPSTF screening age criteria).

### Module YAML Updates

**Update `_module.yaml` for all 4 deep-dive modules:**

1. **sarcopenia** — Add section 2, update `estimated_minutes`, set `required_for_certificate: true`
2. **bone-health** — Add section 2, update `estimated_minutes`, set `required_for_certificate: true`
3. **glp1-monitoring** — Set `required_for_certificate: true` (sections already complete)
4. **visceral-fat** — Set `required_for_certificate: true` (sections already complete)

**Estimated minutes (updated):**
- sarcopenia: 15 → ~25 (existing ~15 + new section ~10)
- bone-health: 12 → ~22 (existing ~12 + new section ~10)
- glp1-monitoring: 15 (unchanged, already has 2 sections)
- visceral-fat: 15 (unchanged, already has 2 sections)

### Certification Logic

- Deep-dive quiz completion required for the associated track's certificate
- Track assignments remain unchanged:
  - Core track: core + sarcopenia + bone-health + visceral-fat (4 quizzes)
  - Physician track: physician + glp1-monitoring (2 quizzes, plus core as prerequisite)
  - Chiropractor track: chiropractor (1 quiz, plus core as prerequisite)
  - Trainer track: trainer (1 quiz, plus core as prerequisite)

### Diagram Specs

17 new diagram specs already written in `diagram-specs/`:

| # | Filename | Target Section |
|---|----------|---------------|
| 1 | report-anatomy.md | core/04-reading-reports |
| 2 | clinical-indications-matrix.md | physician/01-clinical-indications |
| 3 | conversation-framework.md | physician/03-patient-conversations |
| 4 | red-flags-thresholds.md | physician/04-red-flags |
| 5 | structural-load-impact.md | chiropractor/01-msk-relevance |
| 6 | assessment-workflow.md | chiropractor/02-assessment-integration |
| 7 | progress-visualization.md | chiropractor/03-communication |
| 8 | client-categorization.md | trainer/01-program-design |
| 9 | goal-setting-framework.md | trainer/02-client-management |
| 10 | scan-timeline.md | trainer/03-tracking-cadence |
| 11 | bmd-vs-body-comp-dexa.md | bone-health/01-bone-density-basics |
| 12 | glp1-monitoring-protocol.md | glp1-monitoring/01-tracking-weight-loss |
| 13 | muscle-preservation-strategies.md | glp1-monitoring/02-preserving-muscle |
| 14 | vat-disease-pathways.md | visceral-fat/01-understanding-vat |
| 15 | vat-intervention-response.md | visceral-fat/02-intervention-tracking |
| 16 | sarcopenia-monitoring-timeline.md | sarcopenia/02-intervention-monitoring (NEW) |
| 17 | bone-health-referral-pathway.md | bone-health/02-clinical-context (NEW) |

### Diagrams README Update

Update `content/assets/diagrams/README.md` to add entries for all 17 new diagrams with filenames, descriptions, target sections, and TODO status.

---

## Architecture Overview

```
content/
├── modules/                          # No changes to main modules
│   ├── core/                         # 6 sections, quiz exists ✓
│   ├── physician/                    # 4 sections, quiz exists ✓
│   ├── chiropractor/                 # 3 sections, quiz exists ✓
│   └── trainer/                      # 3 sections, quiz exists ✓
├── deep-dives/
│   ├── sarcopenia/
│   │   ├── _module.yaml              # UPDATE: add section 2, required_for_cert, est_minutes
│   │   ├── 01-sarcopenia-aging.md    # Existing ✓
│   │   └── 02-intervention-monitoring.md  # NEW
│   ├── bone-health/
│   │   ├── _module.yaml              # UPDATE: add section 2, required_for_cert, est_minutes
│   │   ├── 01-bone-density-basics.md # Existing ✓
│   │   └── 02-clinical-context.md    # NEW
│   ├── glp1-monitoring/
│   │   ├── _module.yaml              # UPDATE: required_for_cert only
│   │   ├── 01-tracking-weight-loss.md # Existing ✓
│   │   └── 02-preserving-muscle.md   # Existing ✓
│   └── visceral-fat/
│       ├── _module.yaml              # UPDATE: required_for_cert only
│       ├── 01-understanding-vat.md   # Existing ✓
│       └── 02-intervention-tracking.md # Existing ✓
├── quizzes/
│   ├── core.yaml                     # Existing ✓
│   ├── physician.yaml                # Existing ✓
│   ├── chiropractor.yaml             # Existing ✓
│   ├── trainer.yaml                  # Existing ✓
│   ├── sarcopenia.yaml               # NEW
│   ├── bone-health.yaml              # NEW
│   ├── glp1-monitoring.yaml          # NEW
│   └── visceral-fat.yaml             # NEW
└── assets/
    └── diagrams/
        └── README.md                 # UPDATE: add 17 new entries
```

---

## Components and Interfaces

### New Content Sections

**Component 1: `02-intervention-monitoring.md` (Sarcopenia)**

Proposed structure:
```
# Intervention & Monitoring

## Overview
## Evidence-Based Exercise
### Resistance Training Protocols
### Multicomponent Programming
## Nutrition for Muscle Health
### Protein Optimization
### Supplementary Nutrients
## DEXA Monitoring Protocol
### Tracking Progress
### Minimum Detectable Change
## Expected Outcomes
### Realistic Timelines
### Functional Improvements
## When to Escalate
### Red Flags
### Differential Diagnosis
## Summary
## References
```

Key data points from research:
- RT prescription: 2-3x/week, 60-80% 1RM, 2-3 sets × 8-12 reps, ≥12 weeks
- Protein: 1.2-1.5 g/kg/day (PROT-AGE), 25-30g per meal
- ALM LSC ~500g → scans every 6-12 months (not 3-6)
- Gains: +0.5-1.0 kg (RT alone, 12 wk), up to +3.1 kg (RT + protein + creatine, 24 wk)
- Red flags: >1 kg ALM loss in 6-12 mo, unexplained weight loss >5%
- References: EWGSOP2, ICFSR, PROT-AGE, ESPEN, Lopez 2022, Candow 2022

**Component 2: `02-clinical-context.md` (Bone Health)**

Proposed structure:
```
# Clinical Context & Next Steps

## Overview
## When to Refer for Clinical BMD
### Screening Guidelines
### FRAX and Risk Assessment
### Body-Comp DEXA as Opportunistic Screening
## Lifestyle Factors for Bone Health
### Exercise
### Nutrition
## The Body Composition-Bone Connection
### Mechanostat Theory
### Osteosarcopenia
## Patient Communication
### Common Scenarios
## Summary
## References
```

Key data points from research:
- USPSTF 2025: women ≥65, postmenopausal with risk factors
- ISCD 2023: valid BMD sites are femoral neck, total hip, lumbar spine, 33% radius — NOT whole-body
- FRAX thresholds: ≥3% hip or ≥20% major osteoporotic at 10 years
- Osteosarcopenia: ~21% prevalence, OR 2.46 fracture, OR 1.66 mortality
- Calcium: 1,000-1,200 mg/day, Vitamin D: 600-1,000 IU/day
- References: USPSTF 2025, ISCD 2023, ESCEO/IOF 2018, ACSM position stand

### Quiz Content

Each quiz tests knowledge from ALL sections in its module (both existing and new where applicable).

**Sarcopenia Quiz — Content Coverage:**
- Section 1 (existing): definition, EWGSOP2 criteria, DEXA cut-points, prevalence, pathophysiology
- Section 2 (new): exercise protocols, protein targets, monitoring cadence, expected outcomes, escalation
- Mix: 4 questions from section 1 content, 4 from section 2 content

**Bone Health Quiz — Content Coverage:**
- Section 1 (existing): body-comp vs clinical BMD distinction, T/Z-scores, BMC interpretation
- Section 2 (new): referral criteria, lifestyle factors, osteosarcopenia, patient communication
- Mix: 4 questions from section 1, 4 from section 2

**GLP-1 Monitoring Quiz — Content Coverage:**
- Section 1 (existing): weight loss composition, monitoring protocol, interpreting results, special populations
- Section 2 (existing): protein optimization, resistance training, medication considerations, escalation
- Mix: 4 questions from section 1, 4 from section 2

**Visceral Fat Quiz — Content Coverage:**
- Section 1 (existing): metabolic activity, portal hypothesis, DEXA measurement, disease risk
- Section 2 (existing): interventions, realistic expectations, interpreting trends, clinical application
- Mix: 4 questions from section 1, 4 from section 2

---

## Data Models

### Module YAML Schema (updates only)

```yaml
# sarcopenia/_module.yaml — changes
estimated_minutes: 25          # was 15
required_for_certificate: true  # was false
sections:
  # existing section unchanged
  - slug: 01-sarcopenia-aging
    file: 01-sarcopenia-aging.md
    title: "Understanding Sarcopenia"
  # NEW section
  - slug: 02-intervention-monitoring
    file: 02-intervention-monitoring.md
    title: "Intervention & Monitoring"
```

```yaml
# bone-health/_module.yaml — changes
estimated_minutes: 22          # was 12
required_for_certificate: true  # was false
sections:
  # existing section unchanged
  - slug: 01-bone-density-basics
    file: 01-bone-density-basics.md
    title: "Bone Density Basics"
  # NEW section
  - slug: 02-clinical-context
    file: 02-clinical-context.md
    title: "Clinical Context & Next Steps"
```

```yaml
# glp1-monitoring/_module.yaml — changes
required_for_certificate: true  # was false
# sections and estimated_minutes unchanged
```

```yaml
# visceral-fat/_module.yaml — changes
required_for_certificate: true  # was false
# sections and estimated_minutes unchanged
```

### Quiz YAML Schema

All new quizzes follow the existing schema exactly (see `research/quiz-guide.md`). No schema changes needed.

---

## Error Handling

### Content Consistency Checks

- Every section listed in `_module.yaml` must have a corresponding `.md` file
- Every `module_id` in a quiz YAML must match an `id` in some `_module.yaml`
- Quiz question IDs must be unique across all quizzes
- All diagram paths referenced in markdown `![alt](/path)` must exist in `content/assets/diagrams/`
- Footnote numbers must be sequential and all referenced footnotes must have definitions

### Edge Cases

- **Existing sarcopenia section 1 mentions "every 3-6 months" for monitoring** — new section 2 should note that 6-12 months is more appropriate for DEXA lean mass tracking (ALM LSC ~500g), while functional tests can be done more frequently. This doesn't contradict section 1 (which discusses monitoring in general) but adds precision.
- **Bone-health section 1 already covers "When to Recommend Clinical BMD"** — section 2 expands this with the detailed referral flowchart, FRAX integration, and the "opportunistic screening" framework. Avoid duplicating the USPSTF bullet list; reference and extend it.

---

## Acceptance Criteria

### New Content Sections

**Given** the sarcopenia module has 1 section
**When** `02-intervention-monitoring.md` is added
**Then** the module has 2 sections, the file follows the style guide (Overview + Summary + References, footnote citations, callout boxes), contains 2,000-3,500 words, and embeds the `sarcopenia-monitoring-timeline.svg` diagram

**Given** the bone-health module has 1 section
**When** `02-clinical-context.md` is added
**Then** the module has 2 sections, the file follows the style guide, contains 2,000-3,500 words, and embeds the `bone-health-referral-pathway.svg` diagram

### Quizzes

**Given** a deep-dive module has no quiz
**When** a quiz YAML is created for that module
**Then** it has exactly 8 questions, 5-6 MC + 2-3 scenario, 4 options each with 1 correct, passing_score 80, explanations 60-100 words, and question IDs follow the `{prefix}-q{n}` convention

**Given** all 4 deep-dive quizzes are created
**When** the quiz files are validated
**Then** all question IDs are unique across the entire quiz corpus (existing + new = 64 questions total)

### Module YAML Updates

**Given** a deep-dive module has `required_for_certificate: false`
**When** the `_module.yaml` is updated
**Then** `required_for_certificate` is `true` and `estimated_minutes` reflects the total of all sections

### Diagram Specs

**Given** 17 new diagram specs have been written
**When** the diagrams README is updated
**Then** each new diagram has an entry with filename, description, target section, and TODO status

### Certification Logic

**Given** a user is on the core track
**When** they complete all required modules
**Then** they must pass: core quiz + sarcopenia quiz + bone-health quiz + visceral-fat quiz

**Given** a user is on the physician track
**When** they complete all required modules
**Then** they must pass: physician quiz + glp1-monitoring quiz (plus core as prerequisite)

---

## Testing Strategy

### Content Validation (Manual)

- [ ] New sections follow style guide (heading hierarchy, tone, citations, callouts)
- [ ] All footnote references have corresponding definitions
- [ ] No broken diagram paths
- [ ] Content doesn't contradict existing sections
- [ ] Clinical claims are properly sourced with citations from research notes
- [ ] Estimated minutes are reasonable for content length

### Quiz Validation (Automated + Manual)

- [ ] YAML syntax valid (parseable)
- [ ] Schema matches existing quizzes (all required fields present)
- [ ] Exactly 8 questions per quiz
- [ ] Each question has exactly 4 options with exactly 1 correct
- [ ] Question IDs unique across all quizzes
- [ ] Explanations present and 60-100 words
- [ ] `module_id` matches a valid module
- [ ] Manual review: questions test content from the module, not general knowledge

### Module YAML Validation

- [ ] All sections listed in YAML have corresponding .md files
- [ ] `required_for_certificate: true` on all 4 deep-dive modules
- [ ] `estimated_minutes` updated for sarcopenia and bone-health

### Integration Checks

- [ ] Backend quiz service can load new quiz files
- [ ] Frontend content loader can render new sections
- [ ] Certificate logic correctly includes deep-dive quizzes per track

---

## Appendices

### Appendix A: Research Findings Summary

| Topic | Key Finding | Source |
|-------|-------------|-------|
| Sarcopenia RT | Only Level 1 evidence intervention | EWGSOP2, ICFSR |
| Sarcopenia protein | 1.2-1.5 g/kg/day, 25-30g/meal | PROT-AGE 2014 |
| ALM precision | CV ~0.93%, LSC ~500g | ISCD |
| RT lean gains | +0.5-1.0 kg at 12 weeks | Lopez 2022 |
| BMD screening | Women ≥65, risk-based younger | USPSTF 2025 |
| Osteosarcopenia | 21% prevalence, OR 2.46 fracture | Multiple meta-analyses |
| Body-comp bone | Supplementary, not diagnostic | ISCD 2023 |
| VAT threshold | 100 cm² widely established | Kaul 2012, Neeland 2019 |

Full research notes: `research/sarcopenia-intervention.md`, `research/bone-health-clinical-context.md`

### Appendix B: Style Reference

Full style guide: `research/style-guide.md`
Full quiz guide: `research/quiz-guide.md`

### Appendix C: Alternative Approaches Considered

1. **Restructure deep-dives into main modules** — Rejected. Deep-dives serve a distinct purpose as optional depth; the `is_deep_dive` flag remains for UI presentation even though certification now requires them.

2. **Fewer than 8 questions for deep-dive quizzes** — Rejected per user requirement. Same format across all quizzes for consistency.

3. **Shared quizzes across tracks** — Rejected. Each quiz belongs to one module, which belongs to one track. No cross-track quiz sharing.

4. **Add deep-dives for chiropractor and trainer tracks** — Deferred. Not needed for parity; tracks have different depths based on content relevance.

### Appendix D: Files Changed

| Action | File | Type |
|--------|------|------|
| CREATE | `content/deep-dives/sarcopenia/02-intervention-monitoring.md` | Content |
| CREATE | `content/deep-dives/bone-health/02-clinical-context.md` | Content |
| CREATE | `content/quizzes/sarcopenia.yaml` | Quiz |
| CREATE | `content/quizzes/bone-health.yaml` | Quiz |
| CREATE | `content/quizzes/glp1-monitoring.yaml` | Quiz |
| CREATE | `content/quizzes/visceral-fat.yaml` | Quiz |
| UPDATE | `content/deep-dives/sarcopenia/_module.yaml` | Config |
| UPDATE | `content/deep-dives/bone-health/_module.yaml` | Config |
| UPDATE | `content/deep-dives/glp1-monitoring/_module.yaml` | Config |
| UPDATE | `content/deep-dives/visceral-fat/_module.yaml` | Config |
| UPDATE | `content/assets/diagrams/README.md` | Docs |
| CREATED | `diagram-specs/*.md` (17 files) | Specs |

**Total: 6 new files, 5 updated files, 17 diagram specs (already written)**
