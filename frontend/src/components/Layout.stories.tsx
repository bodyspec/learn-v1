import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

/**
 * Layout component story.
 *
 * Since Layout uses Navigation (which uses useAuth) and Outlet (which needs a router),
 * we render a visual replica of the layout shell.
 */

function LayoutPreview({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="bg-white border-b border-bs-dark15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-bs-dark">BodySpec</span>
              <span className="ml-2 text-sm text-bs-dark/60">Learn</span>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                <span className="text-sm font-medium text-bs-dark">Physicians</span>
                <span className="text-sm font-medium text-bs-dark">Chiropractors</span>
                <span className="text-sm font-medium text-bs-dark">Trainers</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-bs-dark">Sign in &rarr;</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children || (
          <div className="text-center py-16">
            <p className="text-bs-dark55">Page content goes here</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-bs-dark mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-white/70 w-full">
            <p>&copy; {new Date().getFullYear()} BodySpec. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="text-white/70 hover:text-white">BodySpec.com</span>
              <span className="text-white/70 hover:text-white">Privacy</span>
              <span className="text-white/70 hover:text-white">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const meta: Meta<typeof LayoutPreview> = {
  title: 'Components/Layout',
  component: LayoutPreview,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof LayoutPreview>

export const Empty: Story = {}

export const WithContent: Story = {
  args: {
    children: React.createElement(
      'div',
      null,
      React.createElement('h1', { className: 'text-3xl font-bold text-bs-dark mb-4' }, 'DEXA Fundamentals'),
      React.createElement('p', { className: 'text-bs-dark55 mb-8' }, 'Learn the core principles of DEXA scanning and body composition analysis.'),
      React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
        React.createElement('div', { className: 'card p-6' },
          React.createElement('h3', { className: 'font-semibold text-bs-dark' }, 'How DEXA Works'),
          React.createElement('p', { className: 'text-sm text-bs-dark55 mt-1' }, 'Understanding the technology behind DEXA scanning.'),
        ),
        React.createElement('div', { className: 'card p-6' },
          React.createElement('h3', { className: 'font-semibold text-bs-dark' }, 'Body Composition'),
          React.createElement('p', { className: 'text-sm text-bs-dark55 mt-1' }, 'Breaking down the components of body composition.'),
        ),
      ),
    ),
  },
}
