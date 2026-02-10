# Content Review — Requirements

## Q&A Record

### Q1: Which of the three workstreams is highest priority?

The rough idea outlines three review workstreams:
1. General content review (claims, sources, gaps, low-value content)
2. BodySpec scan report content review (messaging, differentiation)
3. Diagrams review (missing diagrams, specs for new ones)

Should we treat these as equal priority, or is there a specific order you'd like to tackle them in?

**A1:** Do them in order, but workstreams 1 & 2 (both content) can be mixed together since they're both content review. Diagrams (workstream 3) comes after content is updated.

---

### Q2: Do you have a URL or file for the live BodySpec sample scan report?

Workstream 2 asks to compare content against the "actual live sample scan." Do you have a URL to a sample report, a PDF, or an image I should reference? Or is there already something in the repo (e.g., in `content/assets/`) that represents the current scan report?

**A2:** Live sample report is at https://www.bodyspec.com/sample-report

---

### Q3: What does "well sourced" mean for this content?

For the general content review, when checking if claims are "well sourced" — what's the standard? For example:
- Should every factual/medical claim link to a peer-reviewed study or clinical guideline?
- Are textbook references or authoritative organization pages (e.g., ISCD, ACSM) acceptable?
- Or is it more about ensuring claims aren't made without *any* backing?

**A3:** Don't bloat with too many footnotes, but enough to be very clearly credible — especially for nonobvious claims. Acceptable sources: textbooks, ISCD, ACSM, peer-reviewed studies. The goal is writing that feels credible, reliable, and accurate.

---

### Q4: Who is the target audience for this content review?

The platform serves four tracks: Core (all users), Physician, Chiropractor, and Trainer. When evaluating whether content is "low value" or "missing," should I consider all four audiences equally, or is there a primary audience we're optimizing for?

**A4:** All four audiences equally — no specific track we're optimizing for.

---

### Q5: For the diagrams workstream, what format should diagram specs be in?

You mentioned frontmatter noting which page the diagram belongs on, plus data/details for design. Should the actual diagrams be:
- Mermaid (rendered in markdown, easy to version control)
- SVG/image specs (described for a designer to create)
- Something else?

And should the specs live in `content/assets/` alongside existing assets, or in a separate staging location?

**A5:** Diagram specs should be long, detailed text descriptions (not Mermaid or image files). They go in a new `diagram-specs/` folder. Each spec file should have frontmatter detailing the location/page where the diagram will be placed after generation.

---

### Q6: What tone and voice should the content have?

The content spans medical professionals to personal trainers. Should the writing style be:
- Clinical/academic (e.g., "DXA absorptiometry utilizes dual-energy photon beams...")
- Professional but accessible (e.g., "DEXA uses two X-ray beams at different energy levels...")
- Conversational/friendly (e.g., "Here's how DEXA actually works under the hood...")

Or does it vary by track?

**A6:** Varies by content and track. Generally professional but accessible, leaning towards academic.

---

### Q7: How should we handle broken or unreachable source links?

When a source link is dead or inaccurate, should we:
- Flag it for manual review (just note the issue)
- Find a replacement source and suggest it
- Remove the claim if no replacement source can be found

**A7:** Find a replacement source ideally. If no sources are available at all, remove the claim — unless it's obvious/clearly true.

---

### Q8: What counts as "low value or low relevance" content for removal?

Is there a specific lens for this? For example:
- Content that doesn't help the audience apply DEXA knowledge in their practice
- Content that's too basic for the target professionals (e.g., "what is an X-ray")
- Filler or repetitive content that duplicates information across sections
- Something else?

**A8:** All of the above can be valid reasons. It's context-dependent. Minimal repetition or duplication is acceptable.

---

### Q9: For the BodySpec scan report differentiation — do you have specific competitors or alternative DEXA providers in mind to compare against?

Or should we research what's generally available from other DEXA providers (e.g., DexaFit, university/hospital reports) and highlight BodySpec's advantages organically?

**A9:** Use standard knowledge of classical DEXA provider reports — they're generally very basic. BodySpec's key differentiators:
- **Interactive report** (vs static PDFs)
- **Much larger comparison dataset** — up to 500,000 scans, allowing comparison by specific gender and age breakdowns
- **More data access** — shows results across dozens of scans (vs only a few)
- **Better visuals/charts** — modern, well-designed
- **Unique features** like symmetry analysis
- **Better overall service**

Highlight these organically through callouts, etc. — not as a direct competitor comparison page. Content should also explain different sections/capabilities of the BodySpec report as it walks through them.

---

### Q10: Should the content review produce a single audit document with all findings, or should it directly propose edits to the content files themselves?

For example:
- An audit report listing issues + recommendations per file, then a separate implementation pass
- Direct proposed edits to the markdown files in `content/`

**A10:** Both. Make edits directly to the content files AND create a changelog document that records every edit made (one entry per edit/improvement/deletion/update).

---

### Q11: For missing content — should new units/sections be written as part of this review, or just identified and scoped?

If the review finds gaps (e.g., "there should be a section on visceral fat estimation"), should we:
- Write the new content as part of this project
- Just document what's missing with a brief description of what it should cover, for a later writing pass

**A11:** Write new content as part of this project, link it into the site, and add appropriate tests if needed to maintain test coverage.

---

### Q12: For quizzes — should they also be reviewed and updated as part of this content review?

The `content/quizzes/` directory has quiz YAML files tied to modules. If content changes significantly (e.g., new sections added, claims corrected, sections removed), should we also update quiz questions to stay aligned?

**A12:** Yes — quizzes should be reviewed and updated to stay aligned with content changes.
