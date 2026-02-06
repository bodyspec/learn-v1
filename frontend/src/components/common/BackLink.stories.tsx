import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import BackLink from './BackLink'

const meta: Meta<typeof BackLink> = {
  title: 'Common/BackLink',
  component: BackLink,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    to: { control: 'text' },
    label: { control: 'text' },
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof BackLink>

export const Default: Story = {
  args: {
    to: '/modules',
    label: 'Back to Modules',
  },
}

export const BackToHome: Story = {
  args: {
    to: '/',
    label: 'Back to Home',
  },
}

export const CustomClass: Story = {
  args: {
    to: '/dashboard',
    label: 'Back to Dashboard',
    className: 'mb-2',
  },
}
