import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'

describe('PageHeader', () => {
  it('renders title as h1', () => {
    render(<MemoryRouter><PageHeader title="Test Title" /></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title')
  })

  it('shows description when provided', () => {
    render(<MemoryRouter><PageHeader title="Test" description="A description" /></MemoryRouter>)
    expect(screen.getByText('A description')).toBeInTheDocument()
  })

  it('shows BackLink when backTo and backLabel provided', () => {
    render(<MemoryRouter><PageHeader title="Test" backTo="/" backLabel="Back" /></MemoryRouter>)
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })

  it('renders badge and children', () => {
    render(
      <MemoryRouter>
        <PageHeader title="Test" badge={<span>Badge</span>}>
          <p>Child content</p>
        </PageHeader>
      </MemoryRouter>
    )
    expect(screen.getByText('Badge')).toBeInTheDocument()
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })
})
