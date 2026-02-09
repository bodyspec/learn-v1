import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const mockLogout = vi.fn()
let mockAuthState = {
  user: { id: 'u1', name: 'Test User', email: 'test@bodyspec.com', is_admin: false },
  logout: mockLogout,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

import AccountSidebar from '@/pages/account/AccountSidebar'

function renderSidebar(isOpen = false) {
  const onToggle = vi.fn()
  const onClose = vi.fn()
  const result = render(
    <MemoryRouter initialEntries={['/account/dashboard']}>
      <AccountSidebar isOpen={isOpen} onToggle={onToggle} onClose={onClose} />
    </MemoryRouter>
  )
  return { ...result, onToggle, onClose }
}

describe('AccountSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthState = {
      user: { id: 'u1', name: 'Test User', email: 'test@bodyspec.com', is_admin: false },
      logout: mockLogout,
    }
  })

  it('shows user name in header', () => {
    renderSidebar()
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('shows user email', () => {
    renderSidebar()
    expect(screen.getByText('test@bodyspec.com')).toBeInTheDocument()
  })

  it('renders nav links for Dashboard, Certificates, Profile', () => {
    renderSidebar()
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/account/dashboard')
    expect(hrefs).toContain('/account/certificates')
    expect(hrefs).toContain('/account/profile')
  })

  it('hides Admin link for non-admin users', () => {
    renderSidebar()
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).not.toContain('/account/admin')
  })

  it('shows Admin link for admin users', () => {
    mockAuthState = {
      user: { id: 'u1', name: 'Admin', email: 'admin@bodyspec.com', is_admin: true },
      logout: mockLogout,
    }
    renderSidebar()
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/account/admin')
  })

  it('Sign Out calls logout', () => {
    renderSidebar()
    const signOutButtons = screen.getAllByText('Sign Out')
    fireEvent.click(signOutButtons[0])
    expect(mockLogout).toHaveBeenCalled()
  })

  it('mobile hamburger calls onToggle', () => {
    const { onToggle } = renderSidebar()
    const buttons = screen.getAllByRole('button')
    // Find the hamburger button (in the md:hidden container)
    const hamburger = buttons[0]
    fireEvent.click(hamburger)
    expect(onToggle).toHaveBeenCalled()
  })
})
