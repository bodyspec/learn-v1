import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const mockLogin = vi.fn()

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => ({ login: mockLogin }),
}))

import SignInPrompt from '@/components/common/SignInPrompt'

describe('SignInPrompt', () => {
  it('renders default message', () => {
    render(<SignInPrompt />)
    expect(screen.getByText('Sign in to track your progress and earn certificates.')).toBeInTheDocument()
  })

  it('renders custom message', () => {
    render(<SignInPrompt message="Please sign in first." />)
    expect(screen.getByText('Please sign in first.')).toBeInTheDocument()
  })

  it('renders compact mode with inline button', () => {
    render(<SignInPrompt compact />)
    expect(screen.getByText('Sign in to save progress')).toBeInTheDocument()
  })

  it('clicking button calls login()', () => {
    render(<SignInPrompt />)
    fireEvent.click(screen.getByText('Sign In'))
    expect(mockLogin).toHaveBeenCalled()
  })
})
