import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Home>

export const Default: Story = {}
