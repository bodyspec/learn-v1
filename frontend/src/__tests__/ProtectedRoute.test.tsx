import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProtectedRoute from '@/auth/ProtectedRoute'

const mockLogin = vi.fn()

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

let mockAuthState: {
  user: unknown
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  login: () => void
  logout: () => void
}

function resetMockAuth() {
  mockLogin.mockReset()
  mockAuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    token: null,
    login: mockLogin,
    logout: vi.fn(),
  }
}

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    resetMockAuth()
  })

  it('shows loading spinner while auth is loading', () => {
    mockAuthState.isLoading = true
    const { container } = renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('shows sign-in prompt when not authenticated', () => {
    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )
    expect(screen.getByText('Please sign in to access this page.')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('calls login when sign-in button is clicked', () => {
    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )
    fireEvent.click(screen.getByText('Sign In'))
    expect(mockLogin).toHaveBeenCalledOnce()
  })

  it('renders children when authenticated', () => {
    mockAuthState.isAuthenticated = true
    mockAuthState.user = { id: '1', email: 'test@test.com', name: 'Test' }
    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })
})
