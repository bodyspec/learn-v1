# Content Audit

## Quality Summary

| File | Quality | Prose % | Key Issues |
|------|---------|---------|------------|
| **Core Modules** | | | |
| core/01-how-dexa-works.md | Good | 75% | Minimal issues; gold standard file |
| core/02-accuracy.md | Good | 65% | Minor: CV% and error unit explanations needed |
| core/03-key-metrics.md | **Mixed** | 50% | List-heavy; FFMI/VAT/bone sections lack narrative depth; A/G ratio needs context |
| core/04-reading-reports.md | Good | 70% | Product-promotional tone (AI assistant, dashboard emphasis); reads like marketing |
| core/05-misconceptions.md | Good | 80% | Some claims lack citations; spot reduction claim unsourced |
| core/06-scan-preparation.md | Good | 75% | Timeline rationale missing; medication section incomplete |
| **Chiropractor Modules** | | | |
| chiro/01-msk-relevance.md | Good | 65% | Minimal issues; strong evidence base |
| chiro/02-assessment-integration.md | Good | 60% | Case studies brief; no measurement precision discussion |
| chiro/03-communication.md | Good | 70% | Some claims lack citations (e.g., "5-8% underestimate") |
| **Physician Modules** | | | |
| physician/01-clinical-indications.md | Good | 55% | Solid; contraindication reasoning could be deeper |
| physician/02-interpreting-results.md | Good | 50% | Tables good but lack "why" for thresholds; serial scan section thin |
| physician/03-patient-conversations.md | Good | 75% | No formal citations (appropriate for communication content) |
| physician/04-red-flags.md | Good | 65% | Comprehensive; could add pre-referral workup guidance |
| **Trainer Modules** | | | |
| trainer/01-program-design.md | Good | 60% | Good coaching language; could deepen individual variation |
| trainer/02-client-management.md | Good | 70% | Practical; handling resistance section could expand |
| trainer/03-tracking-cadence.md | Good | 55% | Table-heavy; precision factors could be expanded |
| **Deep-Dives: Bone Health** | | | |
| bone/01-bone-density-basics.md | Good | 65% | Patient communication section lengthy; minor formatting |
| bone/02-clinical-context.md | Good | 55% | Osteosarcopenia section transition abrupt; mechanostat undefined at first mention |
| **Deep-Dives: GLP-1** | | | |
| glp1/01-tracking-weight-loss.md | **Mixed** | 50% | Special populations section bare lists; weak cross-references; intro lacks preview |
| glp1/02-preserving-muscle.md | Good | 60% | Escalation section lacks prioritization; protein strategies unranked |
| **Deep-Dives: Sarcopenia** | | | |
| sarcopenia/01-sarcopenia-aging.md | **Mixed** | 40% | **Most list-heavy file.** Reads like reference doc, not narrative. Pathophysiology lists 7 factors with zero explanation. Assessment section lists tests with no cut-points. |
| sarcopenia/02-intervention-monitoring.md | Good | 55% | Strong clinical detail; MDC explanation dense; red flags section repetitive |
| **Deep-Dives: Visceral Fat** | | | |
| visceral-fat/01-understanding-vat.md | Good | 70% | Best-written deep-dive; minor gaps in ethnic thresholds |
| visceral-fat/02-intervention-tracking.md | Good | 55% | HIIT section underweight; medication section too brief for clinical use |

## Priority Tiers

### Tier 1: Needs Major Revision (prose < 50%, structural issues)
- **sarcopenia/01-sarcopenia-aging.md** — 40% prose, reads like a reference list
- **core/03-key-metrics.md** — 50% prose, list-heavy throughout
- **glp1/01-tracking-weight-loss.md** — 50% prose, bare lists in special populations

### Tier 2: Needs Moderate Revision (prose 50-60%, specific sections weak)
- **core/04-reading-reports.md** — good prose % but product-promotional tone needs reframing
- **physician/02-interpreting-results.md** — 50% prose, serial scan section thin
- **bone/02-clinical-context.md** — 55% prose, transitions need work
- **trainer/03-tracking-cadence.md** — 55% prose, table-heavy
- **visceral-fat/02-intervention-tracking.md** — 55% prose, uneven section depth
- **sarcopenia/02-intervention-monitoring.md** — 55% prose, dense explanations
- **chiro/02-assessment-integration.md** — 60% prose, case studies thin
- **glp1/02-preserving-muscle.md** — 60% prose, strategy sections need narrative

### Tier 3: Needs Minor Revision (good prose, small fixes)
- **core/02-accuracy.md** — minor explanation gaps
- **core/05-misconceptions.md** — citation gaps for some claims
- **core/06-scan-preparation.md** — timeline rationale, medication expansion
- **physician/01-clinical-indications.md** — mostly solid
- **physician/04-red-flags.md** — mostly solid
- **trainer/01-program-design.md** — minor depth additions
- **trainer/02-client-management.md** — minor expansion
- **chiro/01-msk-relevance.md** — minimal issues
- **chiro/03-communication.md** — citation for one claim
- **bone/01-bone-density-basics.md** — minor formatting
- **physician/03-patient-conversations.md** — mostly solid

### Tier 4: Gold Standard (minimal or no revision)
- **core/01-how-dexa-works.md** — best core file, strong narrative
- **visceral-fat/01-understanding-vat.md** — best deep-dive, excellent prose flow

## Cross-Reference Inventory

### Explicit backward references to remove/rework:
- **bone/02-clinical-context.md** line 3: "The first section... established" / "This section builds on that foundation"
- **sarcopenia/02-intervention-monitoring.md** line 3: "section one covered what and how to identify... this section focuses on what to do about it"
- **glp1/02-preserving-muscle.md** line 4: "when patients on GLP-1 medications show concerning lean mass loss on DEXA" (implicit reference to part 1)

### Implicit forward/backward references:
- **core/04-reading-reports.md**: multiple references to "earlier" concepts about metrics
- **physician/02-interpreting-results.md** line 19: "the same metrics" references an earlier step
- Various files reference concepts introduced in other files without explicit "previous section" language — these are fine and can stay as contextual re-introductions
