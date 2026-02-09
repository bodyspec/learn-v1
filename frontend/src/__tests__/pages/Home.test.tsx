import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '@/pages/Home'

function renderPage() {
  return render(<MemoryRouter><Home /></MemoryRouter>)
}

describe('Home', () => {
  it('renders hero title', () => {
    renderPage()
    expect(screen.getByText(/DEXA Education for/)).toBeInTheDocument()
    expect(screen.getByText(/Healthcare Professionals/)).toBeInTheDocument()
  })

  it('shows three track cards', () => {
    renderPage()
    expect(screen.getByText('Physicians')).toBeInTheDocument()
    expect(screen.getByText('Chiropractors')).toBeInTheDocument()
    expect(screen.getByText('Trainers')).toBeInTheDocument()
  })

  it('shows "What You\'ll Learn" section', () => {
    renderPage()
    expect(screen.getByText("What You'll Learn")).toBeInTheDocument()
    expect(screen.getByText('DEXA Technology')).toBeInTheDocument()
    expect(screen.getByText('Key Metrics')).toBeInTheDocument()
    expect(screen.getByText('Report Reading')).toBeInTheDocument()
    expect(screen.getByText('Patient Communication')).toBeInTheDocument()
  })

  it('shows "Get started" CTA link', () => {
    renderPage()
    const links = screen.getAllByRole('link')
    const getStarted = links.filter(l => l.textContent?.includes('Get started') || l.textContent?.includes('Get Started'))
    expect(getStarted.length).toBeGreaterThan(0)
  })

  it('has "Choose Your Track" heading', () => {
    renderPage()
    expect(screen.getByText('Choose Your Track')).toBeInTheDocument()
  })
})
