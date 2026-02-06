import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import ModuleCard from './ModuleCard'
import type { Module } from '@/types'

const baseModule: Module = {
  id: 'core',
  title: 'DEXA Fundamentals',
  description: 'Learn the core principles of DEXA scanning, body composition analysis, and how to interpret results.',
  track: 'core',
  is_deep_dive: false,
  estimated_minutes: 45,
  required_for_certificate: true,
  sort_order: 1,
  sections: [
    { slug: '01-how-dexa-works', file: '01-how-dexa-works.md', title: 'How DEXA Works' },
    { slug: '02-body-composition', file: '02-body-composition.md', title: 'Body Composition Basics' },
    { slug: '03-reading-reports', file: '03-reading-reports.md', title: 'Reading DEXA Reports' },
    { slug: '04-clinical-applications', file: '04-clinical-applications.md', title: 'Clinical Applications' },
  ],
}

const meta: Meta<typeof ModuleCard> = {
  title: 'Components/ModuleCard',
  component: ModuleCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: 600 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    isComplete: { control: 'boolean' },
    sectionsComplete: { control: { type: 'range', min: 0, max: 4, step: 1 } },
  },
}

export default meta
type Story = StoryObj<typeof ModuleCard>

export const Default: Story = {
  args: {
    module: baseModule,
  },
}

export const InProgress: Story = {
  args: {
    module: baseModule,
    sectionsComplete: 2,
  },
}

export const Completed: Story = {
  args: {
    module: baseModule,
    isComplete: true,
    sectionsComplete: 4,
  },
}

export const DeepDive: Story = {
  args: {
    module: {
      ...baseModule,
      id: 'bone-density-deep-dive',
      title: 'Bone Density Deep Dive',
      description: 'Advanced analysis of bone mineral density patterns and their clinical significance.',
      is_deep_dive: true,
      estimated_minutes: 30,
      required_for_certificate: false,
    },
  },
}

export const NoDescription: Story = {
  args: {
    module: {
      ...baseModule,
      description: undefined,
    },
  },
}

export const LongModule: Story = {
  args: {
    module: {
      ...baseModule,
      title: 'Advanced Body Composition Analysis and Clinical Interpretation',
      description: 'This comprehensive module covers advanced techniques in body composition analysis including regional measurements, visceral adipose tissue quantification, appendicular lean mass indexing, and longitudinal tracking methodologies.',
      estimated_minutes: 120,
      sections: [
        ...baseModule.sections,
        { slug: '05-regional', file: '05-regional.md', title: 'Regional Analysis' },
        { slug: '06-vat', file: '06-vat.md', title: 'Visceral Adipose Tissue' },
        { slug: '07-almi', file: '07-almi.md', title: 'Appendicular Lean Mass' },
        { slug: '08-tracking', file: '08-tracking.md', title: 'Longitudinal Tracking' },
      ],
    },
    sectionsComplete: 3,
  },
}
