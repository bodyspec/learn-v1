# Requirements — Content Expansion

## Q&A Record

### Q1: Deep-dive quiz format
**Q:** The 4 main-track quizzes all use the same format: 8 questions, 80% passing score, unlimited attempts, mix of `multiple_choice` and `scenario` types. Should deep-dive quizzes follow the same format, or something lighter (e.g., fewer questions given the shorter/optional nature of deep-dives)?

**A:** Same format — 8 questions, 80% passing, unlimited attempts, mix of multiple_choice and scenario types.

### Q2: New section topics for sarcopenia and bone-health
**Q:** The two modules that need a second section are:
- **sarcopenia** (current: "Understanding Sarcopenia" — covers definition, prevalence, DEXA-based assessment via ALMI, diagnostic criteria)
- **bone-health** (current: "Bone Density Basics" — covers T-scores, Z-scores, how body-comp DEXA differs from clinical BMD, osteoporosis screening)

For each, I'd suggest a natural second section focused on practical application:
- sarcopenia → "Intervention & Monitoring" (exercise/nutrition strategies, tracking progress with repeat DEXA scans, case examples)
- bone-health → "Clinical Context & Next Steps" (when to refer for clinical BMD, lifestyle factors, how body-comp DEXA bone data fits into broader patient care)

Do these directions make sense, or do you have different topics in mind?

**A:** Approved. Sarcopenia gets "Intervention & Monitoring", bone-health gets "Clinical Context & Next Steps".

### Q3: New diagrams
**Q:** The existing content uses SVG diagrams throughout (13 total across modules). The current sections in sarcopenia and bone-health each reference at least one diagram. Should the new sections also include diagrams? For example:
- sarcopenia section 2 → an "intervention decision tree" or "monitoring timeline" diagram
- bone-health section 2 → a "referral pathway" or "BMD vs body-comp DEXA comparison" flowchart

Or should we keep it text-only for the new sections?

**A:** Yes, include diagrams. Every section should have a diagram spec (matching the detail level of existing specs in `diagram-specs/`). Audit all sections, not just the new ones, and create specs for any missing. 17 new diagram specs approved — see rough-idea.md for the full list of proposed diagrams.

### Q4: Deep-dive quiz certification requirement
**Q:** The 4 main-track modules are `required_for_certificate: true`. Deep-dives are `required_for_certificate: false`. Now that deep-dives will have quizzes, should passing them be required for certification, or remain optional enrichment?

**A:** Deep-dive quizzes will also be required for certification. Update `required_for_certificate: true` on all deep-dive modules.

### Q5: Deep-dive track assignment for quizzes
**Q:** Currently deep-dives are associated with tracks (sarcopenia & bone-health → core, glp1-monitoring → physician, visceral-fat → core). Should each deep-dive quiz only be required for its associated track's certificate, or should all deep-dives be required across all tracks?

For example: should a trainer need to pass the glp1-monitoring quiz (currently tagged as physician track), or only their own track's deep-dives?

**A:** Only their own track's deep-dives. So:
- Core track certificate requires: core module quiz + sarcopenia quiz + bone-health quiz + visceral-fat quiz
- Physician track certificate requires: core + physician module quiz + glp1-monitoring quiz
- Chiropractor track certificate requires: core + chiropractor module quiz (no chiro deep-dives currently)
- Trainer track certificate requires: core + trainer module quiz (no trainer deep-dives currently)

### Q6: Chiropractor and trainer deep-dives
**Q:** Following the pattern above, chiropractor and trainer tracks have no deep-dives, meaning their certificates require fewer quizzes than core or physician. Is that acceptable, or should we plan deep-dive content for those tracks too (out of scope for this expansion, but worth noting)?

**A:** All modules belonging to a track must be passed for that track's certificate, regardless of deep-dive status. The deep-dive label is just a content categorization, not a certification exemption. Current certificate requirements by track:
- **Core:** core quiz + sarcopenia + bone-health + visceral-fat (4 quizzes)
- **Physician:** physician quiz + glp1-monitoring (2 quizzes) — *plus core as prerequisite*
- **Chiropractor:** chiropractor quiz (1 quiz) — *plus core as prerequisite*
- **Trainer:** trainer quiz (1 quiz) — *plus core as prerequisite*

No need to add deep-dives to chiro/trainer just for parity.

### Q7: Estimated time for new sections
**Q:** The existing deep-dive modules have `estimated_minutes` set (sarcopenia: 15, bone-health: 12). Adding a second section to each will increase read time. Should I estimate new section lengths to match the existing ones (~12-15 min per section), or should they be shorter supplementary sections (~5-8 min)?

**A:** Estimate per-section read time and sum for the module total. Will calculate during design phase based on content depth.
