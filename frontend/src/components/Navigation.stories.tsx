import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { Menu, X, User, LogOut, LayoutDashboard, Award, BookOpen } from 'lucide-react'
import React, { useState } from 'react'

/**
 * Navigation component story.
 *
 * Since Navigation uses useAuth() internally, we recreate
 * the visual structure here to demonstrate the component states
 * without requiring the auth provider.
 */

function NavigationPreview({ isAuthenticated = false, userName = 'Dr. Sarah Smith' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-bs-dark15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center no-underline">
              <span className="text-xl font-bold text-bs-dark">BodySpec</span>
              <span className="ml-2 text-sm text-bs-dark/60">Learn</span>
            </a>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <a href="/track/physician" className="text-sm font-medium text-bs-dark hover:text-bs-dark55 no-underline">
                Physicians
              </a>
              <a href="/track/chiropractor" className="text-sm font-medium text-bs-dark hover:text-bs-dark55 no-underline">
                Chiropractors
              </a>
              <a href="/track/trainer" className="text-sm font-medium text-bs-dark hover:text-bs-dark55 no-underline">
                Trainers
              </a>
            </div>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-bs-dark hover:text-bs-dark55"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{userName}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-bs-dark15">
                    <a href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-bs-dark hover:bg-bs-dark3 no-underline">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </a>
                    <a href="/certificates" className="flex items-center gap-2 px-4 py-2 text-sm text-bs-dark hover:bg-bs-dark3 no-underline">
                      <Award className="h-4 w-4" />
                      Certificates
                    </a>
                    <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-bs-dark hover:bg-bs-dark3 no-underline">
                      <User className="h-4 w-4" />
                      Profile
                    </a>
                    <hr className="my-1 border-bs-dark15" />
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-bs-dark hover:bg-bs-dark3">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="text-sm font-medium text-bs-dark hover:text-bs-dark55 flex items-center gap-1">
                Sign in <span aria-hidden="true">&rarr;</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden ml-4 p-2 text-bs-dark"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-bs-dark15">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/track/physician" className="block px-3 py-2 text-base font-medium text-bs-dark hover:bg-bs-dark3 rounded-lg no-underline">
              Physicians
            </a>
            <a href="/track/chiropractor" className="block px-3 py-2 text-base font-medium text-bs-dark hover:bg-bs-dark3 rounded-lg no-underline">
              Chiropractors
            </a>
            <a href="/track/trainer" className="block px-3 py-2 text-base font-medium text-bs-dark hover:bg-bs-dark3 rounded-lg no-underline">
              Trainers
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

const meta: Meta<typeof NavigationPreview> = {
  title: 'Components/Navigation',
  component: NavigationPreview,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isAuthenticated: { control: 'boolean' },
    userName: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof NavigationPreview>

export const LoggedOut: Story = {
  args: {
    isAuthenticated: false,
  },
}

export const LoggedIn: Story = {
  args: {
    isAuthenticated: true,
    userName: 'Dr. Sarah Smith',
  },
}

export const LoggedInMenuOpen: Story = {
  args: {
    isAuthenticated: true,
    userName: 'Dr. Sarah Smith',
  },
}
