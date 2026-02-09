import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

let mockProgressState = {
  progress: null as {
    sections_completed: Array<{ module_id: string; section_slug: string }>
    quizzes_passed: Record<string, boolean>
  } | null,
  isAuthenticated: true,
}

vi.mock('@/hooks/queries', () => ({
  useProgress: () => mockProgressState,
}))

const mockGetModule = vi.fn()
const mockGetQuiz = vi.fn()

vi.mock('@/content', () => ({
  getModule: (...args: unknown[]) => mockGetModule(...args),
  getQuiz: (...args: unknown[]) => mockGetQuiz(...args),
}))

vi.mock('@/components/ProgressIndicator', () => ({
  default: ({ progress }: { progress: number }) => (
    <div data-testid="progress-indicator">{Math.round(progress)}%</div>
  ),
}))

vi.mock('@/components/common', () => ({
  NotFound: ({ title }: { title: string }) => <div data-testid="not-found">{title}</div>,
  BackLink: ({ to, label }: { to: string; label: string }) => <a href={to}>{label}</a>,
  SignInPrompt: () => <div data-testid="sign-in-prompt">Sign in prompt</div>,
}))

import ModuleView from '@/pages/ModuleView'

const fakeModule = {
  id: 'core',
  title: 'DEXA Fundamentals',
  description: 'Learn the basics',
  track: 'core',
  estimated_minutes: 30,
  is_deep_dive: false,
  sections: [
    { slug: '01-intro', title: 'Introduction', file: '01-intro.md' },
    { slug: '02-tech', title: 'Technology', file: '02-tech.md' },
  ],
}

const fakeQuiz = {
  module_id: 'core',
  passing_score: 80,
  questions: [{ id: 'q1' }, { id: 'q2' }, { id: 'q3' }],
}

function renderPage(moduleId = 'core') {
  return render(
    <MemoryRouter initialEntries={[`/module/${moduleId}`]}>
      <Routes>
        <Route path="/module/:moduleId" element={<ModuleView />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ModuleView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockProgressState = { progress: null, isAuthenticated: true }
    mockGetModule.mockReturnValue(fakeModule)
    mockGetQuiz.mockReturnValue(fakeQuiz)
  })

  it('shows NotFound for invalid moduleId', () => {
    mockGetModule.mockReturnValue(undefined)
    renderPage('unknown')
    expect(screen.getByTestId('not-found')).toHaveTextContent('Module Not Found')
  })

  it('renders module title, description, time, and section count', () => {
    renderPage()
    expect(screen.getByText('DEXA Fundamentals')).toBeInTheDocument()
    expect(screen.getByText('Learn the basics')).toBeInTheDocument()
    expect(screen.getByText('30 minutes')).toBeInTheDocument()
    expect(screen.getByText('2 sections')).toBeInTheDocument()
  })

  it('lists sections as links', () => {
    renderPage()
    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/module/core/01-intro')
    expect(hrefs).toContain('/module/core/02-tech')
  })

  it('shows progress indicator for authenticated user', () => {
    mockProgressState = {
      progress: { sections_completed: [{ module_id: 'core', section_slug: '01-intro' }], quizzes_passed: {} },
      isAuthenticated: true,
    }
    renderPage()
    expect(screen.getByTestId('progress-indicator')).toHaveTextContent('50%')
  })

  it('hides progress indicator for unauthenticated user', () => {
    mockProgressState = { progress: null, isAuthenticated: false }
    renderPage()
    expect(screen.queryByTestId('progress-indicator')).not.toBeInTheDocument()
  })

  it('shows "Complete" badge when quiz passed', () => {
    mockProgressState = {
      progress: { sections_completed: [], quizzes_passed: { core: true } },
      isAuthenticated: true,
    }
    renderPage()
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('shows "Take Quiz" button when quiz not passed', () => {
    renderPage()
    expect(screen.getByText('Take Quiz')).toBeInTheDocument()
  })

  it('shows "Passed" when quiz passed', () => {
    mockProgressState = {
      progress: { sections_completed: [], quizzes_passed: { core: true } },
      isAuthenticated: true,
    }
    renderPage()
    expect(screen.getByText('Passed')).toBeInTheDocument()
  })

  it('shows "Get Started" when no sections completed', () => {
    renderPage()
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('shows SignInPrompt for unauthenticated users', () => {
    mockProgressState = { progress: null, isAuthenticated: false }
    renderPage()
    expect(screen.getByTestId('sign-in-prompt')).toBeInTheDocument()
  })
})
