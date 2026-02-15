import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const mockLogin = vi.fn()

let mockAuthState = {
  isAuthenticated: true,
  isLoading: false,
  sessionExpired: false,
  login: mockLogin,
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
    mockLogin.mockReset()
    mockAuthState = { isAuthenticated: true, isLoading: false, sessionExpired: false, login: mockLogin }
  })

  it('shows loading spinner when auth is loading', () => {
    mockAuthState = { ...mockAuthState, isAuthenticated: false, isLoading: true }
    const { container } = renderPage()
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('triggers login redirect when unauthenticated', () => {
    mockAuthState = { ...mockAuthState, isAuthenticated: false, isLoading: false }
    renderPage()
    expect(mockLogin).toHaveBeenCalledOnce()
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument()
  })

  it('renders sidebar when authenticated', () => {
    renderPage()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
})
