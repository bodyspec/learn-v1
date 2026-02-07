import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { HeartPulse, Bone, Users } from 'lucide-react'
import TrackCard from './TrackCard'

const meta: Meta<typeof TrackCard> = {
  title: 'Components/TrackCard',
  component: TrackCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: 400 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TrackCard>

export const Default: Story = {
  args: {
    id: 'physician',
    title: 'Physicians',
    description: 'Clinical applications of DEXA body composition analysis for medical professionals',
    icon: HeartPulse,
  },
}

export const Chiropractor: Story = {
  args: {
    id: 'chiropractor',
    title: 'Chiropractors',
    description: 'Integrating body composition data into chiropractic assessment and patient care',
    icon: Bone,
  },
}

export const Trainer: Story = {
  args: {
    id: 'trainer',
    title: 'Trainers',
    description: 'Using DEXA data for fitness programming and client body composition management',
    icon: Users,
  },
}
