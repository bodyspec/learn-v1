import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

let mockAuthState = {
  isAuthenticated: true,
  isLoading: false,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/pages/account/AccountSidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}))

import AccountLayout from '@/pages/account/AccountLayout'

function renderPage() {
  return render(<MemoryRouter><AccountLayout /></MemoryRouter>)
}

describe('AccountLayout', () => {
  beforeEach(() => {
    mockAuthState = { isAuthenticated: true, isLoading: false }
  })

  it('shows loading spinner when auth is loading', () => {
    mockAuthState = { isAuthenticated: false, isLoading: true }
    const { container } = renderPage()
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('redirects when unauthenticated', () => {
    mockAuthState = { isAuthenticated: false, isLoading: false }
    renderPage()
    // Navigate component renders nothing visible
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument()
  })

  it('renders sidebar when authenticated', () => {
    renderPage()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
})
