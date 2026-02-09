import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

let mockProgressState = {
  progress: null as {
    sections_completed: Array<{ module_id: string; section_slug: string }>
    quizzes_passed: Record<string, boolean>
  } | null,
  isLoading: false,
}

vi.mock('@/hooks/queries', () => ({
  useProgress: () => mockProgressState,
}))

vi.mock('@/content', () => ({
  getModulesByTrack: (track: string) => {
    if (track === 'physician') {
      return [
        { id: 'core', track: 'core', title: 'Core Module', sections: [{ slug: '01' }] },
        { id: 'physician', track: 'physician', title: 'Physician Module', sections: [{ slug: '01' }] },
      ]
    }
    return []
  },
  getTrackInfo: (track: string) => ({
    physician: { title: 'Clinical Applications', description: 'For medical professionals' },
    chiropractor: { title: 'Body Composition in Practice', description: 'For chiropractors' },
    trainer: { title: 'Programming with DEXA Data', description: 'For trainers' },
  }[track] || { title: track, description: '' }),
}))

vi.mock('@/components/ModuleCard', () => ({
  default: ({ module, isComplete }: { module: { title: string }; isComplete: boolean }) => (
    <div data-testid="module-card">{module.title}{isComplete ? ' ✓' : ''}</div>
  ),
}))

vi.mock('@/components/common', () => ({
  NotFound: ({ title }: { title: string }) => <div data-testid="not-found">{title}</div>,
  BackLink: ({ to, label }: { to: string; label: string }) => <a href={to}>{label}</a>,
  LoadingSpinner: ({ message }: { message?: string }) => <div data-testid="loading-spinner">{message}</div>,
}))

import ModuleList from '@/pages/ModuleList'

function renderPage(track = 'physician') {
  return render(
    <MemoryRouter initialEntries={[`/track/${track}`]}>
      <Routes>
        <Route path="/track/:track" element={<ModuleList />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ModuleList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockProgressState = { progress: null, isLoading: false }
  })

  it('shows NotFound for invalid track', () => {
    renderPage('invalid')
    expect(screen.getByTestId('not-found')).toHaveTextContent('Track Not Found')
  })

  it('renders track title and description', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Clinical Applications')
    expect(screen.getByText('For medical professionals')).toBeInTheDocument()
  })

  it('separates core and track-specific modules', () => {
    renderPage()
    expect(screen.getByText('Core Fundamentals')).toBeInTheDocument()
    expect(screen.getByText('Clinical Applications', { selector: 'h2' })).toBeInTheDocument()
  })

  it('renders ModuleCard components', () => {
    renderPage()
    const cards = screen.getAllByTestId('module-card')
    expect(cards.length).toBe(2)
    expect(cards[0]).toHaveTextContent('Core Module')
    expect(cards[1]).toHaveTextContent('Physician Module')
  })

  it('shows loading spinner while progress loads', () => {
    mockProgressState = { progress: null, isLoading: true }
    renderPage()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('works without progress (unauthenticated)', () => {
    mockProgressState = { progress: null, isLoading: false }
    renderPage()
    expect(screen.getByText('Core Module')).toBeInTheDocument()
  })

  it('shows back link to home', () => {
    renderPage()
    expect(screen.getByText('Back to Home')).toBeInTheDocument()
  })
})
