import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import NotFound from './NotFound'

const meta: Meta<typeof NotFound> = {
  title: 'Common/NotFound',
  component: NotFound,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    backTo: { control: 'text' },
    backLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof NotFound>

export const Default: Story = {
  args: {
    title: 'Page Not Found',
  },
}

export const WithMessage: Story = {
  args: {
    title: 'Module Not Found',
    message: 'The module you are looking for does not exist or has been removed.',
  },
}

export const CustomBackLink: Story = {
  args: {
    title: 'Section Not Found',
    message: 'This section could not be loaded.',
    backTo: '/modules',
    backLabel: 'Back to Modules',
  },
}
