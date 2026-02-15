import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const mockLogin = vi.fn()
let mockAuthState = {
  isAuthenticated: false,
  login: mockLogin,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

import Navigation from '@/components/Navigation'

function renderNav() {
  return render(<MemoryRouter><Navigation /></MemoryRouter>)
}

describe('Navigation', () => {
  it('renders BodySpec branding with "/" link', () => {
    renderNav()
    expect(screen.getByAltText('BodySpec Learn')).toBeInTheDocument()
    const link = screen.getAllByRole('link').find(l => l.getAttribute('href') === '/')
    expect(link).toBeDefined()
  })

  it('shows track links with correct hrefs', () => {
    renderNav()
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/track/physician')
    expect(hrefs).toContain('/track/chiropractor')
    expect(hrefs).toContain('/track/trainer')
  })

  it('unauthenticated: shows "Sign in" button', () => {
    mockAuthState = { isAuthenticated: false, login: mockLogin }
    renderNav()
    const signInBtn = screen.getByText(/Sign in/)
    expect(signInBtn).toBeInTheDocument()
  })

  it('unauthenticated: click calls login()', () => {
    mockAuthState = { isAuthenticated: false, login: mockLogin }
    renderNav()
    fireEvent.click(screen.getByText(/Sign in/))
    expect(mockLogin).toHaveBeenCalled()
  })

  it('authenticated: shows Account link', () => {
    mockAuthState = { isAuthenticated: true, login: mockLogin }
    renderNav()
    const accountLink = screen.getAllByRole('link').find(l => l.getAttribute('href') === '/account/dashboard')
    expect(accountLink).toBeDefined()
  })

  it('hamburger toggles mobile menu', () => {
    renderNav()
    // Mobile menu not visible initially (no block-level links)
    const buttons = screen.getAllByRole('button')
    const hamburger = buttons.find(b => b.className.includes('sm:hidden'))
    expect(hamburger).toBeDefined()

    fireEvent.click(hamburger!)
    // After clicking, mobile menu links should appear
    const allLinks = screen.getAllByRole('link')
    const mobilePhysician = allLinks.filter(l => l.getAttribute('href') === '/track/physician')
    // Desktop + mobile = 2 physician links
    expect(mobilePhysician.length).toBe(2)
  })
})
