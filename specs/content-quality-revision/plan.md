# Implementation Plan: Content Quality Revision

## Checklist

- [ ] Step 1: Establish revision tooling and verification scripts
- [ ] Step 2: Revise Tier 1 files (major revision — 3 files)
- [ ] Step 3: Revise Tier 2 files, batch A — core and physician (3 files)
- [ ] Step 4: Revise Tier 2 files, batch B — deep-dives (3 files)
- [ ] Step 5: Revise Tier 2 files, batch C — track modules (3 files)
- [ ] Step 6: Revise Tier 3 files, batch A — core modules (5 files)
- [ ] Step 7: Revise Tier 3 files, batch B — track and deep-dive modules (5 files)
- [ ] Step 8: Final quality pass and verification

---

## Step 1: Establish revision tooling and verification scripts

**Objective:** Create a lightweight verification script that can be run after each batch of revisions to catch regressions automatically.

**Implementation guidance:**
- Create `scripts/verify-content.sh` that checks:
  - No cross-reference phrases exist (`grep -r` for "previous section", "as we discussed", "we covered earlier", "next section", "we'll cover", "section above", "section below")
  - All image paths from original files are preserved in revised files (diff `![` lines before/after)
  - All `[^N]` footnotes are present (count per file, revised >= original)
  - All `:::` callout blocks are properly paired (every `:::type` has a closing `:::`)
- Run the script against unmodified files first to establish baseline (expected: cross-ref phrases found, all other checks pass)

**Test requirements:**
- Script runs cleanly on current unmodified content
- Cross-reference grep finds the known instances from `research/cross-references.md`

**Integration notes:**
- This script will be run after every subsequent step to verify no regressions

**Demo:** Run `./scripts/verify-content.sh` and see baseline results showing known cross-references and passing image/citation/callout checks.

---

## Step 2: Revise Tier 1 files (major revision — 3 files)

**Objective:** Transform the three lowest-quality files from list-heavy reference docs into polished prose articles.

**Files:**
1. `content/deep-dives/sarcopenia/01-sarcopenia-aging.md` (40% → 65%+ prose)
2. `content/modules/core/03-key-metrics.md` (50% → 65%+ prose)
3. `content/deep-dives/glp1-monitoring/01-tracking-weight-loss.md` (50% → 65%+ prose)

**Implementation guidance:**

*sarcopenia/01-sarcopenia-aging.md:*
- Add narrative introduction framing why sarcopenia matters (prevalence, clinical impact)
- Transform the 7-item pathophysiology list into explanatory prose — each factor gets 2-3 sentences explaining the mechanism, not just naming it
- Add cut-points and clinical interpretation to the assessment section (grip strength, chair stand, gait speed, SPPB) — currently lists tests with no context
- Expand the summary from 3 rushed sentences
- Preserve the EWGSOP2 diagnostic algorithm diagram reference
- Preserve all existing citations; add citations for pathophysiology claims

*core/03-key-metrics.md:*
- Add narrative explaining *why* height-normalization matters for FFMI (not just the formula)
- Expand bone section from 11 lines — explain what BMD/BMC mean clinically and why BodySpec scans differ from diagnostic scans
- Add clinical context for A/G ratio (what values are normal, why the ratio matters beyond raw numbers)
- Transform "VAT" section to explain the term before the heading uses it
- Wrap all tables in prose context
- Preserve all 5 diagram references

*glp1/01-tracking-weight-loss.md:*
- Strengthen introduction with explicit preview of what will be covered
- Transform special populations section from bare bullet lists into prose explaining clinical reasoning for each population
- Add prose explanation to concerning patterns section — not just what to look for but *why* each pattern matters
- Add forward context for intervention (without cross-referencing part 2)
- Preserve diagram reference and clinical trial data table

**Test requirements:**
- Run `scripts/verify-content.sh` — all checks pass
- Manual: each file's sections open with introductory prose
- Manual: no cross-reference phrases

**Integration notes:**
- These files set the quality floor. If the approach works well here, it validates the pattern for Tiers 2 and 3.
- Read `core/01-how-dexa-works.md` and `visceral-fat/01-understanding-vat.md` before starting, to calibrate tone.

**Demo:** Read all three revised files. Each should read as a coherent article, not a reference list.

---

## Step 3: Revise Tier 2 files, batch A — core and physician (3 files)

**Objective:** Fix moderate issues in core and physician track files.

**Files:**
1. `content/modules/core/04-reading-reports.md` — reframe product-promotional tone
2. `content/modules/physician/02-interpreting-results.md` — add "why" to threshold tables, expand serial scan section
3. `content/deep-dives/bone-health/02-clinical-context.md` — smooth osteosarcopenia transition, define mechanostat at first mention

**Implementation guidance:**

*core/04-reading-reports.md:*
- Reframe BodySpec-specific features as educational content about what to look for in DEXA reports generally, with BodySpec as the example
- Remove or rewrite the AI assistant section — either cut it or reframe as "additional resources" rather than product promotion
- Replace "unlike traditional reports" framing with positive statements about what good reporting looks like
- Preserve the sample report link and diagram reference

*physician/02-interpreting-results.md:*
- Add prose explaining *why* specific VAT thresholds (100 cm², 160 cm²) indicate risk — connect to metabolic mechanisms
- Expand serial scan interpretation from 17 lines to a proper section with guidance on clinically meaningful change, measurement precision context, and clinical decision-making
- Add prose context around all tables

*bone/02-clinical-context.md:*
- Remove "The first section... established" / "This section builds on that foundation" from intro
- Re-introduce bone density concepts directly in the introduction
- Add transition sentence before osteosarcopenia section explaining why bone-muscle overlap matters in a bone health context
- Define mechanostat theory before using the term

**Test requirements:**
- Run `scripts/verify-content.sh` — all checks pass, cross-reference count decreased
- Manual: `04-reading-reports.md` reads as education, not marketing
- Manual: bone-02 intro is self-contained

**Demo:** Read `04-reading-reports.md` — it should teach about DEXA reports without feeling like a sales pitch.

---

## Step 4: Revise Tier 2 files, batch B — deep-dives (3 files)

**Objective:** Improve prose density and narrative depth in deep-dive files.

**Files:**
1. `content/deep-dives/visceral-fat/02-intervention-tracking.md` — balance HIIT section, expand medication detail
2. `content/deep-dives/sarcopenia/02-intervention-monitoring.md` — add MDC worked example, consolidate repetitive sections
3. `content/deep-dives/glp1-monitoring/02-preserving-muscle.md` — prioritize protein strategies, add decision-point guidance to escalation

**Implementation guidance:**

*visceral-fat/02-intervention-tracking.md:*
- Expand HIIT section to match its claimed effectiveness — if it's "particularly effective," give it proportional coverage
- Add mechanism-level explanation for why each medication class affects VAT
- Add citations to the "expected VAT change" column in the realistic expectations table
- Add prose explaining rate-of-change patterns (initial rapid response, plateau)

*sarcopenia/02-intervention-monitoring.md:*
- Remove "section one covered..." from introduction — open directly with intervention purpose
- Add a worked example for Minimum Detectable Change (e.g., "For a patient with ALM of 20 kg...")
- Consolidate red flags and escalation sections to eliminate repetition
- Preserve the monitoring timeline diagram

*glp1/02-preserving-muscle.md:*
- Rework "when patients show concerning lean mass loss" intro to be self-contained
- Add prioritization to the 5 protein strategies — recommend a starting point
- Add decision-point guidance to escalation section (e.g., "Start with dietitian referral; if adherence isn't the barrier, add PT")
- Explain how to weigh DEXA metrics vs. functional metrics when they diverge

**Test requirements:**
- Run `scripts/verify-content.sh` — all checks pass
- Manual: sarcopenia-02 and glp1-02 intros are self-contained
- Manual: MDC explanation is clear to a non-statistician

**Demo:** Read sarcopenia-02 MDC section — a provider should understand what constitutes a "real" change vs. measurement noise.

---

## Step 5: Revise Tier 2 files, batch C — track modules (3 files)

**Objective:** Improve prose density in track-specific modules.

**Files:**
1. `content/modules/trainer/03-tracking-cadence.md` — wrap tables in prose context
2. `content/modules/chiropractor/02-assessment-integration.md` — deepen case studies, add precision discussion
3. `content/modules/trainer/01-program-design.md` — deepen individual variation discussion

**Implementation guidance:**

*trainer/03-tracking-cadence.md:*
- Add prose context before and after all 5 tables — explain what each table shows and key takeaways
- Expand precision factors discussion (body position, hydration, menstrual cycle effects)
- Define "baseline" in context rather than assuming prior knowledge

*chiro/02-assessment-integration.md:*
- Expand case study vignettes from brief summaries into more detailed clinical narratives
- Add discussion of when asymmetry is normal variation vs. pathological — measurement precision context
- Preserve diagram and tip callout

*trainer/01-program-design.md:*
- Add prose discussing individual variation factors (genetics, age, training history, metabolism)
- Expand "Setting Realistic Targets" section with more context on why ranges exist
- Preserve all existing citations and diagram reference

**Test requirements:**
- Run `scripts/verify-content.sh` — all checks pass
- Manual: no table or list appears without prose context

**Demo:** Read `trainer/03-tracking-cadence.md` — tables should feel like they support a narrative, not replace one.

---

## Step 6: Revise Tier 3 files, batch A — core modules (5 files)

**Objective:** Apply targeted fixes to well-written core files.

**Files:**
1. `content/modules/core/01-how-dexa-works.md` — verify gold standard, no changes expected
2. `content/modules/core/02-accuracy.md` — add CV% and error unit explanations
3. `content/modules/core/05-misconceptions.md` — add citation for spot reduction claim
4. `content/modules/core/06-scan-preparation.md` — add timeline rationale, expand medications
5. `content/deep-dives/bone-health/01-bone-density-basics.md` — tighten patient communication section

**Implementation guidance:**

*core/01-how-dexa-works.md:*
- Read to confirm it still meets the gold standard bar
- No changes unless something was missed in audit

*core/02-accuracy.md:*
- Add 1-2 sentences explaining what CV% means in plain language
- Clarify what "±" error values represent (absolute units vs. percentage)
- Add brief explanation of r² for non-statistics readers

*core/05-misconceptions.md:*
- Add citation for "targeted exercises strengthen specific muscles but don't preferentially burn fat"
- Review FAQ section for redundancy with other core files — tighten where duplicated

*core/06-scan-preparation.md:*
- Add brief rationale for why timeframes differ (2hr for meals = digestion; 12-24hr for exercise = fluid shifts; 24-48hr for travel = rehydration)
- Expand medication section beyond diuretics and corticosteroids (mention other common medications and why consistency matters more than "perfect" state)

*bone/01-bone-density-basics.md:*
- Tighten patient communication section (currently lengthy)
- Fix minor formatting inconsistency (line 82 asterisk/footnote redundancy)

**Test requirements:**
- Run `scripts/verify-content.sh` — all checks pass
- Manual: explanations are clear, citations added where needed

**Demo:** Read the CV% explanation in `02-accuracy.md` — a fitness professional should understand what it means.

---

## Step 7: Revise Tier 3 files, batch B — track and deep-dive modules (5 files)

**Objective:** Apply targeted fixes to well-written track and deep-dive files.

**Files:**
1. `content/modules/physician/01-clinical-indications.md` — add contraindication reasoning
2. `content/modules/physician/03-patient-conversations.md` — define "metabolically unhealthy normal weight"
3. `content/modules/physician/04-red-flags.md` — add pre-referral workup suggestions
4. `content/modules/trainer/02-client-management.md` — expand handling-resistance section
5. `content/modules/chiropractor/01-msk-relevance.md` — minimal, possibly add clinical examples
6. `content/modules/chiropractor/03-communication.md` — add citation for "5-8% underestimate" claim
7. `content/deep-dives/visceral-fat/01-understanding-vat.md` — verify gold standard, no changes expected

**Implementation guidance:**

*physician/01-clinical-indications.md:*
- Add 1-2 sentences explaining *why* pregnancy is a contraindication (radiation exposure, altered body composition interpretation)
- Keep brief — this is a minor addition

*physician/03-patient-conversations.md:*
- Define "metabolically unhealthy normal weight" (TOFI phenotype) at first use with a brief parenthetical or sentence

*physician/04-red-flags.md:*
- Add brief guidance on initial workup before specialist referral (what labs/assessments to consider)

*trainer/02-client-management.md:*
- Expand the handling-resistance/difficult-conversations section with 1-2 more specific examples

*chiro/01-msk-relevance.md:*
- Review for any minor improvements; likely minimal or no changes

*chiro/03-communication.md:*
- Find and add a citation for the "home devices underestimate body fat by 5-8%" claim

*visceral-fat/01-understanding-vat.md:*
- Read to confirm gold standard; no changes expected

**Test requirements:**
- Run `scripts/verify-content.sh` — all checks pass
- Manual: definitions appear at first use, citations added

**Demo:** Read `physician/03-patient-conversations.md` — "metabolically unhealthy normal weight" should be defined when first mentioned.

---

## Step 8: Final quality pass and verification

**Objective:** Verify all 24 files meet acceptance criteria as a complete set.

**Implementation guidance:**
- Run `scripts/verify-content.sh` one final time — all checks must pass
- Manually review 2-3 files from each tier to confirm:
  - Prose ratio is at or above 60% for every file
  - Tone is consistent with gold standard across all files
  - No table or list appears without prose context
  - Every section has an introductory opening
  - No cross-reference phrases remain
  - All images and citations preserved
- Create a summary of changes made per file (for commit message / PR description)

**Test requirements:**
- `scripts/verify-content.sh` exits with 0 (all checks pass)
- Manual spot-check of 8-10 files across all tiers confirms consistency

**Integration notes:**
- All changes should be committed with the `bl:` prefix convention
- Consider grouping commits by tier or by module for reviewability

**Demo:** Run the verification script and review its output showing all 24 files passing all checks.
