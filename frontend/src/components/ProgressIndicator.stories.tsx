import type { Meta, StoryObj } from '@storybook/react-vite'
import ProgressIndicator from './ProgressIndicator'

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showLabel: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProgressIndicator>

export const Default: Story = {
  args: {
    progress: 50,
  },
}

export const Empty: Story = {
  args: {
    progress: 0,
  },
}

export const Complete: Story = {
  args: {
    progress: 100,
  },
}

export const SmallSize: Story = {
  args: {
    progress: 75,
    size: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    progress: 30,
    size: 'lg',
  },
}

export const NoLabel: Story = {
  args: {
    progress: 65,
    showLabel: false,
  },
}

export const QuarterProgress: Story = {
  args: {
    progress: 25,
    size: 'md',
  },
}
