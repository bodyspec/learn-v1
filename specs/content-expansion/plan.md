# Implementation Plan — Content Expansion

## Checklist

- [ ] Step 1: Update module YAML configurations
- [ ] Step 2: Write sarcopenia section 2 content
- [ ] Step 3: Write bone-health section 2 content
- [ ] Step 4: Write sarcopenia quiz
- [ ] Step 5: Write bone-health quiz
- [ ] Step 6: Write GLP-1 monitoring quiz
- [ ] Step 7: Write visceral fat quiz
- [ ] Step 8: Update diagrams README
- [ ] Step 9: Validate all files

---

## Step 1: Update module YAML configurations

**Objective:** Update all 4 deep-dive `_module.yaml` files to reflect new sections and certification requirements.

**Implementation guidance:**

Update `content/deep-dives/sarcopenia/_module.yaml`:
- Add section entry: `{slug: 02-intervention-monitoring, file: 02-intervention-monitoring.md, title: "Intervention & Monitoring"}`
- Change `estimated_minutes: 15` → `estimated_minutes: 25`
- Change `required_for_certificate: false` → `required_for_certificate: true`

Update `content/deep-dives/bone-health/_module.yaml`:
- Add section entry: `{slug: 02-clinical-context, file: 02-clinical-context.md, title: "Clinical Context & Next Steps"}`
- Change `estimated_minutes: 12` → `estimated_minutes: 22`
- Change `required_for_certificate: false` → `required_for_certificate: true`

Update `content/deep-dives/glp1-monitoring/_module.yaml`:
- Change `required_for_certificate: false` → `required_for_certificate: true`
- No section or timing changes

Update `content/deep-dives/visceral-fat/_module.yaml`:
- Change `required_for_certificate: false` → `required_for_certificate: true`
- No section or timing changes

**Test requirements:** Verify each YAML is valid and parseable. Confirm all listed section files exist (section 2 files will be created in Steps 2-3).

**Integration notes:** These changes are backward-compatible. The backend content loader reads `_module.yaml` to discover sections; adding entries is safe. The `required_for_certificate` change affects certificate logic in the backend.

**Demo:** All 4 `_module.yaml` files updated. `cat` each file to confirm structure.

---

## Step 2: Write sarcopenia section 2 content

**Objective:** Create `content/deep-dives/sarcopenia/02-intervention-monitoring.md` — a ~2,500-word section on sarcopenia intervention and DEXA-based monitoring.

**Implementation guidance:**

Follow the structure from design.md:
```
# Intervention & Monitoring

## Overview (~200 words)
## Evidence-Based Exercise (~400 words)
### Resistance Training Protocols
### Multicomponent Programming
## Nutrition for Muscle Health (~400 words)
### Protein Optimization
### Supplementary Nutrients
## DEXA Monitoring Protocol (~400 words)
### Tracking Progress
### Minimum Detectable Change
## Expected Outcomes (~300 words)
### Realistic Timelines
### Functional Improvements
## When to Escalate (~300 words)
### Red Flags
### Differential Diagnosis
## Summary (~150 words)
## References
```

Key content from `research/sarcopenia-intervention.md`:
- RT: 2-3x/week, 60-80% 1RM, 2-3 sets × 8-12 reps, ≥12 weeks (ICFSR)
- Protein: 1.2-1.5 g/kg/day (PROT-AGE), per-meal threshold 25-30g with 3-4g leucine
- Vitamin D: 800-1,000 IU/day if deficient; creatine 3-5 g/day (emerging)
- ALM CV ~0.93%, LSC ~500g → scan every 6-12 months
- Gains: +0.5-1.0 kg RT alone (12 wk), +2.0-3.1 kg with RT + protein + creatine (12-24 wk)
- Red flags: >1 kg ALM loss in 6-12 mo, unexplained weight loss >5%, new proximal weakness
- References: EWGSOP2 (Cruz-Jentoft 2019), ICFSR (Dent 2018), PROT-AGE (Bauer 2013), ESPEN (Deutz 2014), Lopez 2022, Candow 2022

Style requirements from `research/style-guide.md`:
- Markdown footnotes `[^n]` for all cited claims
- Use :::clinical for key practice points (e.g., LSC explanation, protein per-meal threshold)
- Use :::warning for red flags section
- Use :::note for terminology (e.g., MCID definitions)
- Embed diagram: `![Sarcopenia monitoring timeline](/content/assets/diagrams/sarcopenia-monitoring-timeline.svg)` in the "Tracking Progress" subsection
- Clinical-conversational tone, present tense for facts

**Test requirements:** Word count 2,000-3,500. All footnotes have definitions. Diagram path valid. No contradiction with section 1. Follows style guide.

**Integration notes:** File is referenced by the `_module.yaml` updated in Step 1.

**Demo:** New section renders in the content viewer. Read-through confirms clinical accuracy and style consistency with section 1.

---

## Step 3: Write bone-health section 2 content

**Objective:** Create `content/deep-dives/bone-health/02-clinical-context.md` — a ~2,500-word section on clinical bone health context and next steps.

**Implementation guidance:**

Follow the structure from design.md:
```
# Clinical Context & Next Steps

## Overview (~200 words)
## When to Refer for Clinical BMD (~500 words)
### Screening Guidelines
### FRAX and Risk Assessment
### Body-Comp DEXA as Opportunistic Screening
## Lifestyle Factors for Bone Health (~400 words)
### Exercise
### Nutrition
## The Body Composition-Bone Connection (~400 words)
### Mechanostat Theory
### Osteosarcopenia
## Patient Communication (~300 words)
### Common Scenarios
## Summary (~150 words)
## References
```

Key content from `research/bone-health-clinical-context.md`:
- USPSTF 2025: women ≥65, postmenopausal + risk factors for younger; insufficient evidence for men
- ISCD 2023: valid BMD sites = femoral neck, total hip, lumbar spine, 33% radius — NOT whole-body
- FRAX: ≥3% hip or ≥20% major osteoporotic fracture at 10 years → treat
- Body-comp DEXA = "opportunistic screening": flag low BMC patients for clinical follow-up
- Exercise: weight-bearing aerobic 3-5 days/week, RT 2-3 days/week (ACSM)
- Calcium: 1,000-1,200 mg/day (IOM/BHOF), Vitamin D: 600-1,000 IU/day
- Protein: ≥1.0-1.2 g/kg/day (ESCEO/IOF 2018)
- Osteosarcopenia: ~21% prevalence in older adults, OR 2.46 fracture, OR 1.66 mortality
- Mechanostat: ALMI correlates r=0.54-0.64 with BMD
- References: USPSTF 2025 (JAMA 333(6)), ISCD 2023, ESCEO/IOF 2018, Endocrine Society 2024

Style requirements:
- Same as Step 2 (footnotes, callout boxes, tone)
- Use :::warning for the critical "body-comp DEXA does NOT diagnose osteoporosis" message
- Use :::clinical for FRAX thresholds, opportunistic screening concept
- Embed diagram: `![Bone health referral pathway](/content/assets/diagrams/bone-health-referral-pathway.svg)` in "Screening Guidelines" subsection
- Avoid duplicating section 1's USPSTF bullet list — reference and extend

**Test requirements:** Same as Step 2.

**Integration notes:** File is referenced by the `_module.yaml` updated in Step 1.

**Demo:** New section renders alongside section 1. Critical distinction between body-comp and clinical BMD is reinforced, not contradicted.

---

## Step 4: Write sarcopenia quiz

**Objective:** Create `content/quizzes/sarcopenia.yaml` — 8 questions covering both sarcopenia sections.

**Implementation guidance:**

Follow quiz format from `research/quiz-guide.md`. ID prefix: `sarc-q1` through `sarc-q8`.

Suggested question topics (4 from section 1, 4 from section 2):

From section 1 (existing content):
- Q1 (MC, recall): EWGSOP2 diagnostic pathway — what defines "confirmed" sarcopenia?
- Q2 (scenario): Patient with low grip strength, normal ALM — classification?
- Q3 (MC, recall): DEXA ALM/ht² cut-points for sarcopenia (M <7.0, F <5.5)
- Q4 (scenario): Elderly patient with falls, low gait speed, low ALM — severity classification?

From section 2 (new content):
- Q5 (MC, procedural): Minimum DEXA monitoring interval for ALM tracking (6-12 months, based on LSC)
- Q6 (MC, concept): Protein per-meal threshold to overcome anabolic resistance (25-30g)
- Q7 (scenario): Patient on RT for 12 weeks, ALM increased 0.3 kg — is this meaningful? (No, below LSC ~500g)
- Q8 (MC, synthesis): Why is resistance training the only Level 1 evidence intervention?

**Test requirements:** YAML valid. 8 questions, 4 options each, 1 correct. IDs unique. Explanations 60-100 words. Content from module.

**Integration notes:** `module_id: sarcopenia` must match the module's `id` field.

**Demo:** Quiz loads in the quiz engine. Questions test content from both sections.

---

## Step 5: Write bone-health quiz

**Objective:** Create `content/quizzes/bone-health.yaml` — 8 questions covering both bone-health sections.

**Implementation guidance:**

ID prefix: `bone-q1` through `bone-q8`.

Suggested question topics:

From section 1 (existing):
- Q1 (MC, recall): What does body-comp DEXA measure for bone? (Total body BMC, not site-specific BMD)
- Q2 (scenario): Patient asks "does my DEXA check for osteoporosis?" — best response?
- Q3 (MC, recall): Valid sites for clinical BMD diagnosis (femoral neck, total hip, lumbar spine, 33% radius)
- Q4 (scenario): Patient with low BMC percentile on body-comp DEXA — next step?

From section 2 (new):
- Q5 (MC, procedural): USPSTF BMD screening age threshold for women (≥65)
- Q6 (MC, concept): What is osteosarcopenia? (Co-occurrence of sarcopenia + osteopenia/osteoporosis)
- Q7 (scenario): 58-year-old postmenopausal woman, low BMC on body-comp DEXA, family history of fracture — recommendation?
- Q8 (MC, synthesis): Why is body-comp DEXA useful for bone health if it can't diagnose osteoporosis? (Opportunistic screening)

**Test requirements:** Same as Step 4.

**Integration notes:** `module_id: bone-health`.

**Demo:** Quiz loads. Questions reinforce the body-comp vs clinical BMD distinction.

---

## Step 6: Write GLP-1 monitoring quiz

**Objective:** Create `content/quizzes/glp1-monitoring.yaml` — 8 questions covering both GLP-1 sections.

**Implementation guidance:**

ID prefix: `glp1-q1` through `glp1-q8`.

Suggested question topics:

From section 1 (tracking weight loss):
- Q1 (MC, recall): What percentage of GLP-1 weight loss may be lean mass? (25-40%)
- Q2 (scenario): Patient lost 20 lbs on semaglutide, 10 lbs lean — assessment? (Concerning, >25% lean)
- Q3 (MC, recall): Recommended baseline DEXA timing for GLP-1 patients (before starting medication)
- Q4 (scenario): Patient 6 months into GLP-1 therapy, VAT dropped 35% but ALM dropped 8% — interpretation?

From section 2 (preserving muscle):
- Q5 (MC, procedural): Protein target during GLP-1 weight loss with RT (1.6-2.2 g/kg/day)
- Q6 (MC, concept): Why is resistance training essential during GLP-1 therapy? (Mitigates lean mass loss)
- Q7 (scenario): Patient can't tolerate high protein due to GI side effects — best approach?
- Q8 (MC, synthesis): What is the foundation of the muscle preservation hierarchy? (Protein optimization)

**Test requirements:** Same as Step 4.

**Integration notes:** `module_id: glp1-monitoring`.

**Demo:** Quiz tests both monitoring knowledge and intervention strategies.

---

## Step 7: Write visceral fat quiz

**Objective:** Create `content/quizzes/visceral-fat.yaml` — 8 questions covering both visceral fat sections.

**Implementation guidance:**

ID prefix: `vfat-q1` through `vfat-q8`.

Suggested question topics:

From section 1 (understanding VAT):
- Q1 (MC, recall): Clinical threshold for elevated VAT (100 cm²)
- Q2 (scenario): Patient with BMI 23 but VAT 135 cm² — significance?
- Q3 (MC, recall): What makes VAT metabolically dangerous compared to subcutaneous fat? (Portal drainage, inflammatory cytokines)
- Q4 (scenario): Patient with VAT 210 cm² — risk category and recommendation?

From section 2 (intervention tracking):
- Q5 (MC, procedural): Minimum DEXA interval for tracking VAT changes (3-6 months)
- Q6 (MC, concept): Which intervention type produces the greatest VAT reduction? (GLP-1 + lifestyle, 20-35%)
- Q7 (scenario): Patient's VAT dropped from 160 to 130 cm² in 3 months on exercise program — interpretation?
- Q8 (MC, synthesis): Why does VAT respond preferentially during early weight loss?

**Test requirements:** Same as Step 4.

**Integration notes:** `module_id: visceral-fat`.

**Demo:** Quiz covers both the "why VAT matters" and "how to track it" aspects.

---

## Step 8: Update diagrams README

**Objective:** Add entries for all 17 new diagrams to `content/assets/diagrams/README.md`.

**Implementation guidance:**

Add 4 new table sections to the README:

**Patient Communication Diagrams** (new section):
- `conversation-framework.svg` — 3-step patient conversation flow (context → metrics → action) | physician/03
- `progress-visualization.svg` — Before/after regional comparison showing composition improvement | chiropractor/03

**Clinical Decision Diagrams** (new section):
- `clinical-indications-matrix.svg` — Grid mapping indications to DEXA metrics | physician/01
- `red-flags-thresholds.svg` — Dashboard of 4 clinical red flag threshold gauges | physician/04
- `assessment-workflow.svg` — 4-step chiropractic assessment integration workflow | chiropractor/02
- `bone-health-referral-pathway.svg` — Decision flowchart for clinical BMD referral | bone-health/02

**Report & Tracking Diagrams** (new section):
- `report-anatomy.svg` — Annotated BodySpec report layout with 6 labeled sections | core/04
- `scan-timeline.svg` — 12-month scan cadence timeline by phase | trainer/03
- `goal-setting-framework.svg` — Client management cycle with 12-week targets | trainer/02
- `glp1-monitoring-protocol.svg` — 4-phase DEXA monitoring timeline for GLP-1 therapy | glp1-monitoring/01
- `sarcopenia-monitoring-timeline.svg` — 12-month sarcopenia intervention + DEXA checkpoints | sarcopenia/02

**Body Composition Framework Diagrams** (new section):
- `structural-load-impact.svg` — Body outline showing fat load vs lean support pathways | chiropractor/01
- `client-categorization.svg` — 2×2 matrix: lean mass vs body fat programming quadrants | trainer/01
- `bmd-vs-body-comp-dexa.svg` — Side-by-side comparison of two DEXA scan types | bone-health/01
- `muscle-preservation-strategies.svg` — 4-tier intervention pyramid for GLP-1 patients | glp1-monitoring/02
- `vat-disease-pathways.svg` — Hub-and-spoke: VAT → pathways → disease outcomes | visceral-fat/01
- `vat-intervention-response.svg` — Line chart of VAT reduction curves by intervention | visceral-fat/02

All entries use `⬜ TODO` status to match existing convention.

**Test requirements:** README is valid markdown. All filenames match diagram spec output_paths. All target sections are correct.

**Integration notes:** No functional impact — README is documentation only.

**Demo:** README shows complete inventory of all 31 diagrams (14 existing + 17 new).

---

## Step 9: Validate all files

**Objective:** Run validation checks across all new and updated files.

**Implementation guidance:**

1. **YAML validation:** Parse all 4 new quiz files and 4 updated `_module.yaml` files
2. **Content validation:**
   - Verify both new `.md` files exist and are non-empty
   - Check word counts are in 2,000-3,500 range
   - Verify all `[^n]` footnotes have definitions
   - Verify diagram image paths reference valid filenames
3. **Quiz validation:**
   - Each quiz has exactly 8 questions
   - Each question has exactly 4 options with exactly 1 `correct: true`
   - All question IDs are unique across all 8 quiz files
   - All `module_id` values match a module's `id`
   - Explanations present on all questions
4. **Module validation:**
   - All sections listed in `_module.yaml` have corresponding `.md` files
   - `required_for_certificate: true` on all 4 deep-dive modules
5. **Cross-reference:** No broken links between quizzes, modules, and content files

**Test requirements:** All checks pass with zero errors.

**Integration notes:** This step validates everything before committing. Run backend tests (`python -m pytest tests/ -v` from `backend/`) to verify quiz service loads new files correctly.

**Demo:** Validation script output shows all checks passing. Backend tests pass.
