import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import PageHeader from './PageHeader'

const meta: Meta<typeof PageHeader> = {
  title: 'Common/PageHeader',
  component: PageHeader,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    backTo: { control: 'text' },
    backLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    title: 'DEXA Fundamentals',
  },
}

export const WithDescription: Story = {
  args: {
    title: 'Physician Track',
    description: 'Advanced DEXA interpretation for clinical applications.',
  },
}

export const WithBackLink: Story = {
  args: {
    title: 'How DEXA Works',
    description: 'Understanding the physics and technology behind DEXA scanning.',
    backTo: '/modules',
    backLabel: 'Back to Modules',
  },
}

export const WithBadge: Story = {
  args: {
    title: 'DEXA Fundamentals',
    description: 'Core concepts every practitioner should know.',
    badge: React.createElement(
      'span',
      { className: 'px-3 py-1 bg-salad-60 text-bs-dark text-sm font-medium rounded-full' },
      'Core Track',
    ),
  },
}

export const WithChildren: Story = {
  args: {
    title: 'Module Progress',
    description: 'Track your learning journey.',
    children: React.createElement(
      'div',
      { className: 'mt-4 h-2 bg-gray-200 rounded-full overflow-hidden' },
      React.createElement('div', {
        className: 'h-full bg-salad-100 rounded-full',
        style: { width: '60%' },
      }),
    ),
  },
}
