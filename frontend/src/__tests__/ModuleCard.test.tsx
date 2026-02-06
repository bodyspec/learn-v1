import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ModuleCard from '@/components/ModuleCard'
import type { Module } from '@/types'

const sampleModule: Module = {
  id: 'core',
  title: 'DEXA Fundamentals',
  description: 'Learn the basics of DEXA technology',
  track: 'core',
  is_deep_dive: false,
  estimated_minutes: 30,
  required_for_certificate: true,
  sort_order: 1,
  sections: [
    { slug: '01-how-dexa-works', file: '01-how-dexa-works.md', title: 'How DEXA Works' },
    { slug: '02-what-dexa-measures', file: '02-what-dexa-measures.md', title: 'What DEXA Measures' },
    { slug: '03-reading-your-report', file: '03-reading-your-report.md', title: 'Reading Your Report' },
  ],
}

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('ModuleCard', () => {
  it('renders module title', () => {
    renderWithRouter(<ModuleCard module={sampleModule} />)
    expect(screen.getByText('DEXA Fundamentals')).toBeInTheDocument()
  })

  it('renders module description', () => {
    renderWithRouter(<ModuleCard module={sampleModule} />)
    expect(screen.getByText('Learn the basics of DEXA technology')).toBeInTheDocument()
  })

  it('shows estimated time', () => {
    renderWithRouter(<ModuleCard module={sampleModule} />)
    expect(screen.getByText(/30 min/)).toBeInTheDocument()
  })

  it('shows section count', () => {
    renderWithRouter(<ModuleCard module={sampleModule} />)
    expect(screen.getByText(/3 sections/)).toBeInTheDocument()
  })

  it('links to module page', () => {
    renderWithRouter(<ModuleCard module={sampleModule} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/module/core')
  })

  it('shows progress bar when partially complete', () => {
    renderWithRouter(
      <ModuleCard module={sampleModule} sectionsComplete={1} />
    )
    expect(screen.getByText(/1 of 3 sections complete/)).toBeInTheDocument()
  })

  it('hides progress bar when no sections complete', () => {
    renderWithRouter(<ModuleCard module={sampleModule} sectionsComplete={0} />)
    expect(screen.queryByText(/sections complete/)).not.toBeInTheDocument()
  })

  it('shows Deep Dive badge for deep dive modules', () => {
    const deepDive: Module = { ...sampleModule, is_deep_dive: true }
    renderWithRouter(<ModuleCard module={deepDive} />)
    expect(screen.getByText('Deep Dive')).toBeInTheDocument()
  })

  it('does not show Deep Dive badge for regular modules', () => {
    renderWithRouter(<ModuleCard module={sampleModule} />)
    expect(screen.queryByText('Deep Dive')).not.toBeInTheDocument()
  })
})
