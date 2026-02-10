# Content Review — Changelog

All edits made during the content review are documented below, one entry per change.

Format:
- **Type:** addition | correction | removal | source-update | callout | diagram-embed | quiz-update | new-content
- **Location:** section/heading where edit occurs
- **Before:** brief summary or quote of original
- **After:** brief summary or quote of replacement
- **Rationale:** why this change was made

---

## content/modules/core/01-how-dexa-works.md

### Edit 1: source-update — Add citations and references section
- **Type:** addition
- **Location:** Entire file; new References section at bottom
- **Before:** Zero citations; no references section
- **After:** Three citations added (Shepherd 2017, IAEA RPOP, Toombs 2012) with inline references and formal References section
- **Rationale:** Technical claims about DEXA technology, beam energies, and three-compartment model need supporting references per sourcing standards

### Edit 2: correction — More precise radiation dose information
- **Type:** correction
- **Location:** :::note block under "The Technology"
- **Before:** "about 1/10th of a chest X-ray, or roughly equivalent to a few hours of natural background radiation"
- **After:** "approximately 1-10 microsieverts (μSv), compared to ~20-100 μSv for a chest X-ray or ~30-40 μSv for a coast-to-coast flight" with IAEA citation
- **Rationale:** Quantitative dose data is more informative and verifiable than vague comparisons; aligns with IAEA source

### Edit 3: correction — More precise beam description
- **Type:** correction
- **Location:** "The Technology" section, beam description
- **Before:** "different tissues absorb them at different rates" with simple absorbs/appears descriptions
- **After:** "different tissues attenuate them at different rates based on their atomic composition and density" with beam energies noted (~40 keV and 70 keV); removed "appears brightest/darkest" language
- **Rationale:** More technically accurate description appropriate for educational content; "attenuation" is the correct physics term

### Edit 4: diagram-embed — Embed dexa-scan-position.svg
- **Type:** diagram-embed
- **Location:** "The Scanning Process" section
- **Before:** No diagram in scanning process section
- **After:** Added `![Person lying on DEXA scanning table](/content/assets/diagrams/dexa-scan-position.svg)` before the numbered list
- **Rationale:** Previously orphaned diagram now embedded in its natural location; helps visualize the scanning process

---

## content/modules/core/02-accuracy.md

### Edit 5: diagram-embed — Embed method-comparison.svg
- **Type:** diagram-embed
- **Location:** "Comparing Methods" section
- **Before:** No diagram before method comparison table
- **After:** Added `![Comparison of DEXA, BIA, and skinfold caliper accuracy](/content/assets/diagrams/method-comparison.svg)` before comparison text
- **Rationale:** Previously orphaned diagram now embedded in its natural location; visually reinforces the accuracy comparison table

---

## content/modules/core/04-reading-reports.md

### Edit 6: callout — Major rewrite for BodySpec differentiation
- **Type:** callout
- **Location:** Entire file rewritten
- **Before:** Generic DEXA report walkthrough with 0 citations and no BodySpec differentiation; sections: "Report Overview", "Summary Section", basic "Regional Analysis", basic "Trend Charts", basic "Percentile Rankings", "Common Questions"
- **After:** BodySpec-specific report walkthrough with organic differentiation callouts throughout. Key additions: interactive web dashboard mention with link to sample report, 450K+ scan dataset mentioned for percentile rankings and VAT comparisons, dedicated "Symmetry Analysis" subsection, enhanced "Trend Tracking" section highlighting multi-year/multi-scan history, new "AI Assistant" section, same-day digital delivery mentioned, comparison to traditional static PDF reports throughout. Tone is informative, not salesy.
- **Rationale:** This file is the primary target for BodySpec report differentiation per design.md. Previous content was generic and didn't explain what makes BodySpec's report unique. All differentiators (interactivity, 450K+ dataset, percentile rankings, symmetry, trend tracking, AI assistant, modern visuals, same-day results) are now organically integrated.

---

## content/modules/physician/02-interpreting-results.md

### Edit 7: diagram-embed — Embed weight-loss-quality.svg
- **Type:** diagram-embed
- **Location:** "Weight Loss Quality Assessment" section
- **Before:** No diagram before weight loss assessment content
- **After:** Added `![Favorable vs concerning weight loss composition](/content/assets/diagrams/weight-loss-quality.svg)` before the section text
- **Rationale:** Previously orphaned diagram now embedded in its natural location; visually communicates the concept of good vs poor weight loss composition

---

## content/modules/chiropractor/01-msk-relevance.md

### Edit 8: addition — Citation for lean mass and joint stability
- **Type:** addition
- **Location:** "Lean Mass and Support" section
- **Before:** Four bullet points about what adequate muscle mass provides; no supporting reference
- **After:** Added supporting statement with Cruz-Jentoft et al. 2019 citation linking lean mass to joint stability and functional capacity
- **Rationale:** Chiropractor module had only 1 citation total; adding evidence for clinical claims improves credibility for DC audience

### Edit 9: diagram-embed — Embed regional-divisions.svg
- **Type:** diagram-embed
- **Location:** "Regional Analysis Applications" section
- **Before:** No diagram in regional analysis section
- **After:** Added `![Body outline showing arm, leg, and trunk divisions](/content/assets/diagrams/regional-divisions.svg)` before trunk composition subsection
- **Rationale:** Diagram already used in core module; also relevant here to visualize the regional analysis concepts discussed in chiropractic context

### Edit 10: source-update — Add Cruz-Jentoft reference
- **Type:** source-update
- **Location:** References section
- **Before:** Only one reference (Messier 2005)
- **After:** Added [^2] Cruz-Jentoft AJ, et al. EWGSOP2 sarcopenia consensus (2019)
- **Rationale:** Supports new lean mass claim added in Edit 8

---

## content/modules/trainer/02-client-management.md

### Edit 11: diagram-embed — Embed weight-loss-quality.svg
- **Type:** diagram-embed
- **Location:** "Demonstrating Progress" section
- **Before:** No diagram before progress demonstration content
- **After:** Added `![Favorable vs concerning weight loss composition](/content/assets/diagrams/weight-loss-quality.svg)` before "Beyond the Scale" subsection
- **Rationale:** Previously orphaned diagram also relevant here; helps trainers visualize and explain good vs poor weight loss composition to clients

---

## content/deep-dives/sarcopenia/01-sarcopenia-aging.md

### Edit 12: diagram-embed — Embed sarcopenia-diagnostic-algorithm.svg
- **Type:** diagram-embed
- **Location:** "Assessment" section
- **Before:** No diagram before assessment content
- **After:** Added `![EWGSOP2 sarcopenia diagnostic algorithm](/content/assets/diagrams/sarcopenia-diagnostic-algorithm.svg)` before "Using DEXA for Sarcopenia Assessment" subsection
- **Rationale:** Previously orphaned diagram now embedded in its natural location; the EWGSOP2 algorithm flowchart directly supports the diagnostic criteria discussed in this section

---

## content/quizzes/chiropractor.yaml

### Edit 13: quiz-update — Add 8th question for consistency
- **Type:** quiz-update
- **Location:** New question chiro-q8 at end of question list
- **Before:** 7 questions (all other quizzes have 8)
- **After:** Added chiro-q8: "Why is elevated visceral fat (android distribution) relevant to a chiropractic patient with chronic low back pain?" — correct answer: shifts center of gravity forward, increasing lumbar spine loading
- **Rationale:** Brings chiropractor quiz to 8 questions for consistency with other track quizzes; tests understanding of VAT's mechanical implications which is covered in the content

---

## content/quizzes/trainer.yaml

### Edit 14: quiz-update — Align protein recommendation with ISSN position stand
- **Type:** quiz-update
- **Location:** trainer-q3 options and explanation
- **Before:** Correct answer "2.0-2.4 g/kg lean mass" with explanation citing "2.0-2.4 g/kg of lean mass (or approximately 1.6-2.2 g/kg of total bodyweight)"
- **After:** Correct answer "2.3-3.1 g/kg lean mass" with explanation citing ISSN position stand (Jager et al., 2017)
- **Rationale:** Aligns quiz with corrected protein targets in trainer/01-program-design.md content, which was updated to match ISSN position stand recommendations for hypocaloric periods

---

## content/modules/core/06-scan-preparation.md (NEW)

### Edit 15: new-content — New scan preparation section
- **Type:** new-content
- **Location:** New file `content/modules/core/06-scan-preparation.md`
- **Before:** No dedicated scan preparation content; preparation advice was scattered across accuracy.md and tracking-cadence.md
- **After:** Comprehensive scan preparation guide covering: hydration, food/drink, exercise timing, scan-day clothing and positioning, special considerations (menstrual cycle, medications, travel), consistency checklist
- **Rationale:** Gap identified in design appendix. Scan preparation is one of the most practical topics for all audiences and consolidates advice that was previously fragmented

---

## content/modules/core/_module.yaml

### Edit 16: addition — Wire new section into module
- **Type:** addition
- **Location:** sections list at end
- **Before:** 5 sections (01-05)
- **After:** 6 sections (01-06); added slug: 06-scan-preparation
- **Rationale:** New scan preparation content must be linked into the module to be accessible in the platform

### Edit 17: correction — Update estimated reading time
- **Type:** correction
- **Location:** estimated_minutes field
- **Before:** 20 minutes
- **After:** 25 minutes
- **Rationale:** Additional section adds approximately 5 minutes of reading time

---

## diagram-specs/ (13 existing + 1 new)

### Edit 18: new-content — 13 diagram redesign specs for existing placeholders
- **Type:** new-content
- **Location:** `diagram-specs/` directory (13 files)
- **Before:** No diagram specs existed
- **After:** Created detailed redesign specs for all 13 existing placeholder SVGs: dexa-dual-energy, three-compartment-model, dexa-scan-position, regional-divisions, body-fat-ranges-male, body-fat-ranges-female, android-gynoid-regions, vat-sat-location, vat-risk-zones, method-comparison, dexa-vs-bmi, sarcopenia-diagnostic-algorithm, weight-loss-quality. Each spec includes YAML frontmatter (target_file, target_section, placement, output_path) and detailed description with visual layout, color palette, typography, sizing, and accessibility requirements.
- **Rationale:** All 14 existing SVGs are placeholders per design.md; text-based specs provide detailed instructions for redesign while maintaining constraint of not generating SVGs directly

### Edit 19: new-content — 1 new diagram spec for scan preparation checklist
- **Type:** new-content
- **Location:** `diagram-specs/scan-preparation-checklist.md`
- **Before:** No diagram existed for scan preparation content
- **After:** Spec for new scan-preparation-checklist.svg infographic covering the five key preparation steps
- **Rationale:** New content section (06-scan-preparation.md) benefits from a visual quick-reference checklist

---

## External URL Verification

### IAEA Radiation Protection Page
- **URL:** https://www.iaea.org/resources/rpop/health-professionals/other-specialities-and-imaging-modalities/dxa-bone-mineral-densitometry/patients
- **Status:** Reachable and current
- **Action:** No change needed

### ISCD 2023 Official Positions
- **URL:** https://iscd.org/official-positions-2023/
- **Status:** Reachable and current (approved August 24, 2023)
- **Action:** No change needed
