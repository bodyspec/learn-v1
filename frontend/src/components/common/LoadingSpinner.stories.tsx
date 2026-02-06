import type { Meta, StoryObj } from '@storybook/react-vite'
import LoadingSpinner from './LoadingSpinner'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Common/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    message: { control: 'text' },
    fullHeight: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof LoadingSpinner>

export const Default: Story = {}

export const WithMessage: Story = {
  args: {
    message: 'Loading your content...',
  },
}

export const Compact: Story = {
  args: {
    fullHeight: false,
    message: 'Loading...',
  },
}

export const CompactNoMessage: Story = {
  args: {
    fullHeight: false,
  },
}
