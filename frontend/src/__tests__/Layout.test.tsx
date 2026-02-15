import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => ({ isAuthenticated: false, login: vi.fn() }),
}))

import Layout from '@/components/Layout'

describe('Layout', () => {
  it('renders Navigation component', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Test child</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByAltText('BodySpec Learn')).toBeInTheDocument()
  })

  it('renders footer with current year', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders child route content via Outlet', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Outlet content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('Outlet content')).toBeInTheDocument()
  })

  it('footer has external links', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('BodySpec.com')).toHaveAttribute('href', 'https://www.bodyspec.com')
    expect(screen.getByText('Privacy')).toHaveAttribute('target', '_blank')
    expect(screen.getByText('Terms')).toHaveAttribute('target', '_blank')
  })
})
