import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

let mockAuthState = {
  user: { id: 'u1', email: 'test@bodyspec.com', name: 'Test User', role_type: 'physician', is_admin: false },
}
let mockProgressState = {
  progress: null as {
    sections_completed: Array<{ module_id: string; section_slug: string; completed_at: string }>
    quizzes_passed: Record<string, boolean>
  } | null,
  isLoading: false,
}
let mockCertsState = {
  certificates: [] as Array<{ id: string; track: string }>,
  isLoading: false,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/hooks/queries', () => ({
  useProgress: () => mockProgressState,
  useCertificates: () => mockCertsState,
}))

vi.mock('@/content', () => ({
  getModules: () => [
    { id: 'core', track: 'core', title: 'Core', sections: [{ slug: '01', title: 'Intro' }] },
    { id: 'physician', track: 'physician', title: 'Physician', sections: [{ slug: '01', title: 'Clin' }] },
  ],
  getTrackInfo: (track: string) => ({
    physician: { title: 'Clinical Applications', description: '' },
    chiropractor: { title: 'Body Composition in Practice', description: '' },
    trainer: { title: 'Programming with DEXA Data', description: '' },
  }[track] || { title: track, description: '' }),
}))

vi.mock('@/components/ProgressIndicator', () => ({
  default: () => <div data-testid="progress-indicator" />,
}))

vi.mock('@/components/common', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner" />,
}))

import Dashboard from '@/pages/Dashboard'

function renderPage() {
  return render(<MemoryRouter><Dashboard /></MemoryRouter>)
}

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthState = {
      user: { id: 'u1', email: 'test@bodyspec.com', name: 'Test User', role_type: 'physician', is_admin: false },
    }
    mockProgressState = { progress: null, isLoading: false }
    mockCertsState = { certificates: [], isLoading: false }
  })

  it('shows loading spinner when data is loading', () => {
    mockProgressState = { progress: null, isLoading: true }
    renderPage()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('shows welcome message with user name', () => {
    renderPage()
    expect(screen.getByText(/Welcome back, Test User/)).toBeInTheDocument()
  })

  it('falls back to email when name is missing', () => {
    mockAuthState = {
      user: { id: 'u1', email: 'test@bodyspec.com', name: null, role_type: null, is_admin: false },
    }
    renderPage()
    expect(screen.getByText(/Welcome back, test@bodyspec.com/)).toBeInTheDocument()
  })

  it('shows quick stats with correct counts', () => {
    mockProgressState = {
      progress: {
        sections_completed: [
          { module_id: 'core', section_slug: '01', completed_at: '2026-01-01' },
          { module_id: 'core', section_slug: '02', completed_at: '2026-01-02' },
        ],
        quizzes_passed: { core: true },
      },
      isLoading: false,
    }
    mockCertsState = { certificates: [{ id: 'c1', track: 'physician' }], isLoading: false }
    renderPage()
    expect(screen.getByText('Sections completed')).toBeInTheDocument()
    expect(screen.getByText('Quizzes passed')).toBeInTheDocument()
    expect(screen.getByText('Certificates earned')).toBeInTheDocument()
    // Verify the bold stat numbers exist (multiple '1' values so use getAllByText)
    const boldStats = screen.getAllByText('2')
    expect(boldStats.length).toBeGreaterThan(0)
  })

  it('shows track progress with Continue links', () => {
    renderPage()
    const links = screen.getAllByText('Continue →')
    expect(links.length).toBe(3)
  })

  it('shows "Certified" badge for tracks with certificates', () => {
    mockCertsState = { certificates: [{ id: 'c1', track: 'physician' }], isLoading: false }
    renderPage()
    expect(screen.getByText('Certified')).toBeInTheDocument()
  })

  it('shows certificates CTA when certificates exist', () => {
    mockCertsState = { certificates: [{ id: 'c1', track: 'physician' }], isLoading: false }
    renderPage()
    expect(screen.getByText('View Certificates')).toBeInTheDocument()
  })
})
