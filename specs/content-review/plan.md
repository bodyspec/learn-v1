# Content Review — Implementation Plan

## Checklist

- [x] Step 1: Setup changelog and diagram-specs directory
- [x] Step 2: Review and update Core module content
- [x] Step 3: Review and update Physician module content
- [x] Step 4: Review and update Chiropractor module content
- [x] Step 5: Review and update Trainer module content
- [x] Step 6: Review and update Deep-dive content
- [x] Step 7: Identify and write missing content
- [x] Step 8: Update quizzes
- [x] Step 9: Write diagram specs for existing placeholders
- [x] Step 10: Write diagram specs for new diagrams
- [x] Step 11: Embed unreferenced diagrams into content
- [x] Step 12: Run tests and verify
- [x] Step 13: Final review and summary

---

## Step 1: Setup changelog and diagram-specs directory

**Objective:** Create the changelog file and diagram-specs directory so edits can be recorded from the start.

**Implementation:**
- Create `specs/content-review/changelog.md` with header and format template
- Create `diagram-specs/` directory at project root

**Test requirements:** None — structural setup only.

**Integration:** All subsequent steps append to the changelog.

**Demo:** Changelog file exists and is ready to receive entries. `diagram-specs/` directory exists.

---

## Step 2: Review and update Core module content

**Objective:** Review all 5 core module files for source quality, content accuracy, tone, and BodySpec report differentiation. Core is reviewed first because all tracks build on it.

**Implementation guidance:**

1. **`core/01-how-dexa-works.md`** — Currently 0 citations. Add references for technical claims about dual-energy X-ray technology, three-compartment model, and measurement principles. Verify accuracy of technical descriptions.

2. **`core/02-accuracy.md`** — 5 citations exist. Verify all are accurate and current. Check if precision/CV claims match cited sources. Embed `method-comparison.svg` reference (currently orphaned). Review factors-affecting-accuracy section for completeness.

3. **`core/03-key-metrics.md`** — 4 citations, 5 diagrams embedded. Verify metric definitions and thresholds match sources. Check body fat % ranges, FFMI values, VAT thresholds against current literature.

4. **`core/04-reading-reports.md`** — **Primary BodySpec differentiation target.** Currently 0 citations. Compare against live sample report (https://www.bodyspec.com/sample-report). Ensure every report section is explained. Add organic callouts for: interactivity, 450K+ dataset, percentile rankings, symmetry analysis, trend tracking across dozens of scans, AI assistant, modern visuals. Tone should be informative, not salesy.

5. **`core/05-misconceptions.md`** — 2 citations + 1 external URL (IAEA). Verify IAEA link is reachable. Check that misconception rebuttals are well-supported. Review FAQs for completeness and accuracy.

**Test requirements:** Run content loading tests after edits to ensure markdown parses correctly.

**Integration:** Changes here may affect quiz questions in `core.yaml` (addressed in Step 8).

**Demo:** All 5 core files have appropriate citations, accurate claims, and `04-reading-reports.md` thoroughly explains the BodySpec report with organic differentiation callouts.

---

## Step 3: Review and update Physician module content

**Objective:** Review all 4 physician module files for clinical accuracy, sourcing, and tone appropriate for MDs/DOs/NPs/PAs.

**Implementation guidance:**

1. **`physician/01-clinical-indications.md`** — 2 citations. Check that clinical indications are current and well-sourced. Verify medication effect claims (corticosteroids, GLP-1s, etc.) have supporting references. Add citations for nonobvious clinical claims.

2. **`physician/02-interpreting-results.md`** — 3 citations. Verify TOFI phenotype description, sarcopenia criteria (EWGSOP2), and weight loss quality assessment. Embed `weight-loss-quality.svg` reference (currently orphaned). Add BodySpec callouts where relevant (e.g., how the report's VAT percentile aids risk stratification).

3. **`physician/03-patient-conversations.md`** — 0 citations. This is communication/strategy content — citations may not be needed for most of it. Add references only where specific clinical claims are made within conversation examples.

4. **`physician/04-red-flags.md`** — 4 citations. Verify thresholds (VAT >200 cm², >15% limb asymmetry, etc.) match cited sources. Check referral criteria are clinically appropriate.

**Test requirements:** Run content loading tests.

**Integration:** Changes may affect `physician.yaml` quiz (Step 8).

**Demo:** Physician content is clinically accurate, appropriately sourced for a medical audience, and includes BodySpec report callouts where relevant.

---

## Step 4: Review and update Chiropractor module content

**Objective:** Review all 3 chiropractor module files. This module currently has the fewest citations (1 total) — likely needs the most sourcing work.

**Implementation guidance:**

1. **`chiropractor/01-msk-relevance.md`** — Only 1 citation (Messier et al. on knee loading). Add sources for: mechanical load claims, lean mass and joint stability, regional analysis applications, common MSK presentations and body composition correlations.

2. **`chiropractor/02-assessment-integration.md`** — 0 citations. Case studies should reference supporting literature where clinical claims are made. Add sources for assessment integration methodology if evidence-based guidelines exist.

3. **`chiropractor/03-communication.md`** — 0 citations. Communication content — likely fine without heavy sourcing. Add references only for specific clinical claims within examples.

**Test requirements:** Run content loading tests.

**Integration:** Changes may affect `chiropractor.yaml` quiz (Step 8).

**Demo:** Chiropractor content has credible sourcing for MSK claims, especially mechanical load and body composition correlations.

---

## Step 5: Review and update Trainer module content

**Objective:** Review all 3 trainer module files for accuracy and practical applicability for fitness professionals.

**Implementation guidance:**

1. **`trainer/01-program-design.md`** — 2 citations. Verify protein requirements, realistic muscle gain/fat loss rates, and body recomposition claims. Ensure referenced values match current ISSN/ACSM guidelines. Add BodySpec callouts where relevant (e.g., using report's regional data for asymmetry-based programming).

2. **`trainer/02-client-management.md`** — 0 citations. Embed `weight-loss-quality.svg` reference (currently orphaned). Add sources for any specific physiological claims made in client conversation examples.

3. **`trainer/03-tracking-cadence.md`** — 2 citations. Verify scan frequency recommendations match current evidence. Check that timing recommendations (hydration, exercise, time of day) are accurate. Add BodySpec callout about trend tracking capability.

**Test requirements:** Run content loading tests.

**Integration:** Changes may affect `trainer.yaml` quiz (Step 8).

**Demo:** Trainer content has practical, evidence-backed guidance with accurate numeric recommendations.

---

## Step 6: Review and update Deep-dive content

**Objective:** Review all 6 deep-dive files. These are generally well-sourced — focus on accuracy verification and completeness.

**Implementation guidance:**

1. **`bone-health/01-bone-density-basics.md`** — 3 citations + ISCD URL. Verify ISCD link is reachable. Check USPSTF screening recommendations are current (2025 update cited). Verify T-score/Z-score explanations.

2. **`sarcopenia/01-sarcopenia-aging.md`** — 6 citations. Well-sourced. Verify EWGSOP2 criteria, prevalence stats, and cut-points. Embed `sarcopenia-diagnostic-algorithm.svg` reference (currently orphaned).

3. **`visceral-fat/01-understanding-vat.md`** — 3 citations, 1 diagram. Verify VAT measurement methodology, risk thresholds, and validation claims.

4. **`visceral-fat/02-intervention-tracking.md`** — 4 citations. Verify exercise effect percentages, medication claims (GLP-1 data from STEP 1, SURMOUNT-1).

5. **`glp1-monitoring/01-tracking-weight-loss.md`** — 3 citations. Verify lean mass loss percentages, clinical trial data accuracy.

6. **`glp1-monitoring/02-preserving-muscle.md`** — 4 citations. Verify protein requirements, resistance training recommendations.

**Test requirements:** Run content loading tests.

**Integration:** Deep-dives don't have separate quizzes, but content may be referenced by main module quizzes.

**Demo:** Deep-dives are accurate, current, and thoroughly sourced.

---

## Step 7: Identify and write missing content

**Objective:** Based on gaps identified during Steps 2–6, write new content sections and integrate them.

**Implementation guidance:**

Potential gaps to evaluate (from design appendix):
- Scan preparation best practices (hydration, timing, clothing) — could be a new core section
- BodySpec dashboard interactivity / AI assistant — could expand `04-reading-reports.md` or be a new section
- Chiropractor deep-dive content (currently none)
- Trainer deep-dive content (currently none)
- Expanded bone health content (currently 1 section)
- DEXA for athletes beyond RED-S mention

For each new section:
1. Write markdown file with appropriate naming convention
2. Add to parent `_module.yaml` with correct slug, file, and title
3. Record in changelog

**Test requirements:** Verify new files load correctly. Run backend content loading tests.

**Integration:** New content feeds into quiz updates (Step 8) and diagram specs (Step 10).

**Demo:** New sections are accessible in the platform and maintain consistent tone/quality with existing content.

---

## Step 8: Update quizzes

**Objective:** Review and update all 4 quiz YAML files to align with content changes from Steps 2–7.

**Implementation guidance:**

For each quiz (`core.yaml`, `physician.yaml`, `chiropractor.yaml`, `trainer.yaml`):
1. Read through each question and verify the answer is still correct given content updates
2. Update question text, options, or explanations if underlying content changed
3. Add new questions for any significant new content sections added in Step 7
4. Verify explanations reference accurate information
5. Consider bringing chiropractor quiz from 7 to 8 questions for consistency
6. Record all changes in changelog

**Test requirements:** Run quiz-related backend tests. Verify YAML is valid and parseable.

**Integration:** Quizzes are the final content artifact — depends on all content being finalized first.

**Demo:** All quiz questions are accurate, aligned with content, and YAML parses without errors.

---

## Step 9: Write diagram specs for existing placeholders

**Objective:** Create detailed text-based redesign specs for all 14 existing placeholder SVGs.

**Implementation guidance:**

Create one spec file per diagram in `diagram-specs/`, each with:
- YAML frontmatter: `target_file`, `target_section`, `placement`, `output_path`
- Detailed text description covering: purpose, visual elements, layout, data to display, color scheme, labels, sizing, accessibility considerations

Diagrams to spec (14 total):
1. `dexa-dual-energy.svg` — X-ray beam penetration through tissue
2. `three-compartment-model.svg` — Fat, lean, bone compartments
3. `regional-divisions.svg` — Arms, legs, trunk breakdown
4. `body-fat-ranges-male.svg` — Male BF% classification ranges
5. `body-fat-ranges-female.svg` — Female BF% classification ranges
6. `android-gynoid-regions.svg` — Android/gynoid body regions
7. `vat-sat-location.svg` — Visceral vs subcutaneous fat locations
8. `vat-risk-zones.svg` — VAT threshold risk visualization
9. `dexa-vs-bmi.svg` — BMI vs DEXA comparison
10. `dexa-scan-position.svg` — Patient scan positioning
11. `method-comparison.svg` — DEXA vs BIA vs calipers
12. `sarcopenia-diagnostic-algorithm.svg` — EWGSOP2 diagnostic flowchart
13. `weight-loss-quality.svg` — Good vs poor weight loss composition
14. `README.md` — Update planning doc to reflect new spec-driven approach

**Test requirements:** None — spec files only.

**Integration:** Specs reference finalized content from Steps 2–7.

**Demo:** 14 detailed diagram specs exist in `diagram-specs/`, each with clear frontmatter and thorough text descriptions.

---

## Step 10: Write diagram specs for new diagrams

**Objective:** Identify content areas that need new diagrams (beyond the 14 existing placeholders) and write specs for them.

**Implementation guidance:**

Review all content files for sections that would benefit from visual aids. Likely candidates:
- Report sample screenshots (6 planned in `report-samples/README.md`)
- Physician module: clinical decision flowcharts, red flag algorithms
- Chiropractor module: mechanical load illustrations, assessment integration flow
- Trainer module: programming decision trees, progress tracking examples
- Any new content sections from Step 7
- BodySpec report section walkthrough visuals for `04-reading-reports.md`

Create one spec file per new diagram in `diagram-specs/` with same format as Step 9.

**Test requirements:** None — spec files only.

**Integration:** New diagram references may be added to content files (with image tags pointing to planned output paths).

**Demo:** All identified diagram needs have specs. Content files reference planned diagram paths where appropriate.

---

## Step 11: Embed unreferenced diagrams into content

**Objective:** Add image references for the 5 existing diagrams that were created but never embedded in content.

**Implementation guidance:**

Add `![alt text](../assets/diagrams/filename.svg)` references at appropriate locations:
1. `dexa-scan-position.svg` → `core/01-how-dexa-works.md`
2. `method-comparison.svg` → `core/02-accuracy.md`
3. `sarcopenia-diagnostic-algorithm.svg` → `deep-dives/sarcopenia/01-sarcopenia-aging.md`
4. `weight-loss-quality.svg` → `physician/02-interpreting-results.md`
5. `weight-loss-quality.svg` → `trainer/02-client-management.md`

Record each embed in changelog.

**Test requirements:** Verify content loads correctly with new image references.

**Integration:** These embeds point to placeholder SVGs that will be redesigned per Step 9 specs.

**Demo:** All 14 diagrams are referenced somewhere in content. No orphaned assets.

---

## Step 12: Run tests and verify

**Objective:** Run all existing tests to verify nothing is broken, add new tests if needed.

**Implementation guidance:**
1. Backend: `cd backend && python -m pytest tests/ -v`
2. Frontend: `cd frontend && npx vitest run --project unit`
3. Verify all `_module.yaml` files are valid YAML
4. Verify all quiz YAML files parse correctly
5. Verify all markdown files load without errors
6. Add tests for any new content files or quiz questions if existing test patterns require it

**Test requirements:** All tests pass. No regressions.

**Integration:** Final validation gate before summary.

**Demo:** All tests pass with no regressions.

---

## Step 13: Final review and summary

**Objective:** Review the complete changelog, verify all acceptance criteria are met, and create a summary.

**Implementation guidance:**
1. Review `specs/content-review/changelog.md` for completeness — every edit should have an entry
2. Verify all acceptance criteria from design.md
3. Spot-check a sample of edits for quality
4. Create `specs/content-review/summary.md` listing all artifacts, stats, and next steps

**Test requirements:** None — review and documentation.

**Integration:** Final deliverable.

**Demo:** Summary document exists with complete accounting of all changes made, artifacts created, and suggested next steps (diagram generation from specs, report sample creation, etc.).
