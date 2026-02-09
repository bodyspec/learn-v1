import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '@/components/common/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders spinner element', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('shows message when provided', () => {
    render(<LoadingSpinner message="Loading data..." />)
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('hides message when not provided', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.querySelector('p')).toBeNull()
  })

  it('uses min-h-[50vh] when fullHeight is true (default)', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.firstElementChild?.className).toContain('min-h-[50vh]')
  })

  it('uses py-8 when fullHeight is false', () => {
    const { container } = render(<LoadingSpinner fullHeight={false} />)
    expect(container.firstElementChild?.className).toContain('py-8')
  })
})
