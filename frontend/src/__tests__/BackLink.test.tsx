import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BackLink from '@/components/common/BackLink'

describe('BackLink', () => {
  it('renders link with correct href', () => {
    render(<MemoryRouter><BackLink to="/test" label="Go back" /></MemoryRouter>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })

  it('displays label text', () => {
    render(<MemoryRouter><BackLink to="/" label="Back to Home" /></MemoryRouter>)
    expect(screen.getByText('Back to Home')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<MemoryRouter><BackLink to="/" label="Back" className="mt-4" /></MemoryRouter>)
    expect(container.querySelector('a')?.className).toContain('mt-4')
  })
})
