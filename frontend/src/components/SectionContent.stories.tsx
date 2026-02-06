import type { Meta, StoryObj } from '@storybook/react-vite'
import SectionContent from './SectionContent'

const meta: Meta<typeof SectionContent> = {
  title: 'Components/SectionContent',
  component: SectionContent,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    content: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SectionContent>

export const BasicMarkdown: Story = {
  args: {
    content: `# How DEXA Works

DEXA (Dual-Energy X-ray Absorptiometry) uses two X-ray beams at different energy levels to measure bone mineral density and body composition.

## Key Principles

The technology works by passing two X-ray beams through the body. Different tissues absorb these beams at different rates:

- **Bone** absorbs the most radiation
- **Fat tissue** absorbs an intermediate amount
- **Lean tissue** absorbs the least

## Measurement Process

1. The patient lies on a padded table
2. A scanning arm passes over the body
3. Detectors measure how much of each beam passes through
4. Software calculates tissue composition

The entire scan takes approximately **6-7 minutes** and involves very low radiation exposure.`,
  },
}

export const WithTable: Story = {
  args: {
    content: `# Body Composition Ranges

| Category | Men | Women |
|----------|-----|-------|
| Essential Fat | 2-5% | 10-13% |
| Athletic | 6-13% | 14-20% |
| Fitness | 14-17% | 21-24% |
| Average | 18-24% | 25-31% |

These ranges are general guidelines and may vary by individual.`,
  },
}

export const WithCallouts: Story = {
  args: {
    content: `# Important Safety Information

:::note
DEXA scans use very low radiation doses, approximately 1/10th of a standard chest X-ray.
:::

## Contraindications

:::warning
DEXA scans should not be performed on pregnant patients. Always verify pregnancy status before scanning.
:::

## Best Practices

:::tip
For the most accurate results, ensure the patient is well-hydrated and has not exercised within 24 hours of the scan.
:::

:::clinical
In clinical settings, serial DEXA measurements should be spaced at least 3 months apart to detect meaningful changes in body composition.
:::`,
  },
}

export const WithCodeBlock: Story = {
  args: {
    content: `# Calculating Body Fat Percentage

The formula used by DEXA software:

\`\`\`
Body Fat % = (Fat Mass / Total Mass) x 100
Lean Mass Index = Lean Mass (kg) / Height (m)^2
\`\`\`

Where \`Total Mass = Fat Mass + Lean Mass + Bone Mineral Content\`.`,
  },
}

export const WithImages: Story = {
  args: {
    content: `# DEXA Report Overview

A typical DEXA report includes several key visualizations and data points.

![DEXA scan example](/placeholder-scan.svg)

The image above shows a whole-body DEXA scan with regional analysis.

## Reading the Report

Each region of interest is color-coded for easy identification.`,
  },
}

export const WithFootnotes: Story = {
  args: {
    content: `# Understanding T-Scores

A T-score compares your bone density to that of a healthy 30-year-old adult[^1]. The World Health Organization defines osteoporosis based on T-score thresholds[^2].

## Classification

- **Normal**: T-score of -1.0 or above
- **Osteopenia**: T-score between -1.0 and -2.5
- **Osteoporosis**: T-score of -2.5 or below

Serial measurements should be compared using the least significant change (LSC) to determine if a real change has occurred[^3].

[^1]: T-scores use the young adult reference population from the NHANES III database.
[^2]: WHO Technical Report Series, No. 921 (2003).
[^3]: The LSC is typically 2-3% for total body composition and 3-5% for regional measurements.`,
  },
}
