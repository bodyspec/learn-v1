# Quiz Writing Guide — BodySpec Learn

Based on analysis of all 4 existing quizzes (core, physician, chiropractor, trainer).

## YAML Structure

```yaml
module_id: [string]
passing_score: 80
max_attempts: null
randomize_questions: false
randomize_options: true

questions:
  - id: [prefix]-q[1-8]
    type: multiple_choice | scenario
    text: "Question text" | multiline with |
    options:  # Always exactly 4
      - text: "Option"
        correct: false
      - text: "Correct option"
        correct: true
      - text: "Option"
        correct: false
      - text: "Option"
        correct: false
    explanation: |
      Direct answer (60-100 words).
      Why correct answer is correct.
      Clinical relevance.
```

## Question Type Distribution

- **8 questions per quiz** (no variation)
- **5-6 multiple_choice + 2-3 scenario**
- Scenarios distributed at Q2, Q4, Q6-Q7 positions

## Question Position Pattern

| Position | Type | Difficulty | Purpose |
|----------|------|-----------|---------|
| Q1 | multiple_choice | Basic recall | Foundational definition/threshold |
| Q2 | scenario (usually) | Applied | Apply Q1 concept to case |
| Q3 | multiple_choice | Basic recall | New concept/threshold |
| Q4 | scenario (usually) | Applied | Multi-step reasoning |
| Q5 | multiple_choice | Procedural | Timing, protocols, thresholds |
| Q6 | multiple_choice or scenario | Concept | Terminology/pattern |
| Q7 | scenario (usually) | Clinical judgment | Complex case analysis |
| Q8 | multiple_choice | Synthesis | Relationships, "why does this matter?" |

## Scenario Question Structure

1. Clinical/practical setup (1-3 sentences)
2. Specific data (measurements, values, timeline)
3. Question stem: "What is...?" or "What is the BEST...?"
4. Same 4-option format as multiple_choice

## Explanation Style

- 60-100 words, multiline with `|`
- Structure: direct answer → reasoning → clinical relevance
- Reference specific thresholds/criteria from module content

## ID Prefixes for New Quizzes

- sarcopenia: `sarc-q1` through `sarc-q8`
- bone-health: `bone-q1` through `bone-q8`
- glp1-monitoring: `glp1-q1` through `glp1-q8`
- visceral-fat: `vfat-q1` through `vfat-q8`

## Checklist

- [ ] 8 total questions
- [ ] 5-6 MC + 2-3 scenario
- [ ] 4 options per question, 1 correct
- [ ] Explanations 60-100 words
- [ ] Content references specific module facts
- [ ] Difficulty: basic → applied → judgment
- [ ] Scenarios have setup + data + clinical question
