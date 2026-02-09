import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from '@/components/common/NotFound'

describe('NotFound', () => {
  it('renders title text', () => {
    render(<MemoryRouter><NotFound title="Page Not Found" /></MemoryRouter>)
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
  })

  it('shows message when provided', () => {
    render(<MemoryRouter><NotFound title="Not Found" message="Sorry, nothing here." /></MemoryRouter>)
    expect(screen.getByText('Sorry, nothing here.')).toBeInTheDocument()
  })

  it('hides message when not provided', () => {
    const { container } = render(<MemoryRouter><NotFound title="Not Found" /></MemoryRouter>)
    expect(container.querySelectorAll('p')).toHaveLength(0)
  })

  it('defaults link to "/" with "Back to Home" label', () => {
    render(<MemoryRouter><NotFound title="Not Found" /></MemoryRouter>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
    expect(link).toHaveTextContent('Back to Home')
  })

  it('uses custom backTo and backLabel', () => {
    render(<MemoryRouter><NotFound title="Not Found" backTo="/dashboard" backLabel="Go to Dashboard" /></MemoryRouter>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/dashboard')
    expect(link).toHaveTextContent('Go to Dashboard')
  })
})
