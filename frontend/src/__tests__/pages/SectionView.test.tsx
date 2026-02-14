import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const mockNavigate = vi.fn()
const mockMarkComplete = { mutateAsync: vi.fn() }
let mockAuthState = { token: 'test-token' as string | null, isAuthenticated: true }
let mockProgressState = {
  progress: null as { sections_completed: Array<{ module_id: string; section_slug: string }> } | null,
  isAuthenticated: true,
}

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/hooks/queries', () => ({
  useProgress: () => mockProgressState,
  useMarkSectionComplete: () => mockMarkComplete,
}))

const mockGetModule = vi.fn()
const mockGetSectionContent = vi.fn()
const mockGetQuiz = vi.fn()

vi.mock('@/content', () => ({
  getModule: (...args: unknown[]) => mockGetModule(...args),
  getSectionContent: (...args: unknown[]) => mockGetSectionContent(...args),
  getQuiz: (...args: unknown[]) => mockGetQuiz(...args),
}))

vi.mock('@/components/SectionContent', () => ({
  default: ({ content }: { content: string }) => <div data-testid="section-content">{content}</div>,
}))

vi.mock('@/components/common', () => ({
  NotFound: ({ title }: { title: string }) => <div data-testid="not-found">{title}</div>,
  BackLink: ({ to, label }: { to: string; label: string }) => <a href={to}>{label}</a>,
  SignInPrompt: () => <div data-testid="sign-in-prompt">Sign in to track progress</div>,
}))

import SectionView from '@/pages/SectionView'

const fakeModule = {
  id: 'core',
  title: 'DEXA Fundamentals',
  track: 'core',
  sections: [
    { slug: '01-intro', title: 'Introduction', file: '01-intro.md' },
    { slug: '02-tech', title: 'Technology', file: '02-tech.md' },
    { slug: '03-metrics', title: 'Key Metrics', file: '03-metrics.md' },
  ],
}

const fakeQuiz = {
  module_id: 'core',
  passing_score: 80,
  questions: [{ id: 'q1', type: 'multiple_choice', text: 'Q?', options: [], explanation: '' }],
}

function renderPage(moduleId = 'core', sectionSlug = '02-tech') {
  return render(
    <MemoryRouter initialEntries={[`/module/${moduleId}/${sectionSlug}`]}>
      <Routes>
        <Route path="/module/:moduleId/:sectionSlug" element={<SectionView />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('SectionView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthState = { token: 'test-token', isAuthenticated: true }
    mockProgressState = { progress: null, isAuthenticated: true }
    mockGetModule.mockReturnValue(fakeModule)
    mockGetSectionContent.mockReturnValue('# Some content')
    mockGetQuiz.mockReturnValue(null)
    mockMarkComplete.mutateAsync.mockResolvedValue({})
  })

  it('shows NotFound for unknown module', () => {
    mockGetModule.mockReturnValue(undefined)
    renderPage('unknown')
    expect(screen.getByTestId('not-found')).toHaveTextContent('Module Not Found')
  })

  it('shows NotFound for unknown section slug', () => {
    renderPage('core', 'nonexistent')
    expect(screen.getByTestId('not-found')).toHaveTextContent('Section Not Found')
  })

  it('renders "Section X of Y"', () => {
    renderPage()
    expect(screen.getByText('Section 2 of 3')).toBeInTheDocument()
  })

  it('shows "Complete" badge for completed sections', () => {
    mockProgressState = {
      progress: { sections_completed: [{ module_id: 'core', section_slug: '02-tech' }] },
      isAuthenticated: true,
    }
    renderPage()
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('renders SectionContent with markdown', () => {
    renderPage()
    expect(screen.getByTestId('section-content')).toHaveTextContent('# Some content')
  })

  it('shows "Content not available" when content is null', () => {
    mockGetSectionContent.mockReturnValue(undefined)
    renderPage()
    expect(screen.getByText('Content not available yet.')).toBeInTheDocument()
  })

  it('always shows "Back to Module" button', () => {
    renderPage('core', '01-intro')
    expect(screen.getByText('Back to Module')).toBeInTheDocument()
  })

  it('authenticated: Next Section calls markComplete then navigates', async () => {
    renderPage()
    fireEvent.click(screen.getByText('Next Section'))

    await waitFor(() => {
      expect(mockMarkComplete.mutateAsync).toHaveBeenCalledWith({
        moduleId: 'core',
        sectionSlug: '02-tech',
      })
    })
    expect(mockNavigate).toHaveBeenCalledWith('/module/core/03-metrics', { state: undefined })
  })

  it('unauthenticated: Next Section just navigates without marking complete', async () => {
    mockAuthState = { token: null, isAuthenticated: false }
    renderPage()
    fireEvent.click(screen.getByText('Next Section'))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/module/core/03-metrics', { state: undefined })
    })
    expect(mockMarkComplete.mutateAsync).not.toHaveBeenCalled()
  })

  it('last section without quiz: shows "Finish" and navigates to module', async () => {
    renderPage('core', '03-metrics')
    expect(screen.getByText('Finish')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Finish'))
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/module/core', { state: undefined })
    })
  })

  it('last section with all sections complete and quiz: shows "Take Quiz"', async () => {
    mockGetQuiz.mockReturnValue(fakeQuiz)
    mockProgressState = {
      progress: {
        sections_completed: [
          { module_id: 'core', section_slug: '01-intro' },
          { module_id: 'core', section_slug: '02-tech' },
        ],
      },
      isAuthenticated: true,
    }
    renderPage('core', '03-metrics')
    expect(screen.getByText('Take Quiz')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Take Quiz'))
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/quiz/core')
    })
  })

  it('last section with incomplete sections: shows "Finish" not "Take Quiz"', () => {
    mockGetQuiz.mockReturnValue(fakeQuiz)
    // Only first section complete, second is not
    mockProgressState = {
      progress: {
        sections_completed: [{ module_id: 'core', section_slug: '01-intro' }],
      },
      isAuthenticated: true,
    }
    renderPage('core', '03-metrics')
    expect(screen.getByText('Finish')).toBeInTheDocument()
    expect(screen.queryByText('Take Quiz')).not.toBeInTheDocument()
  })

  it('shows SignInPrompt for unauthenticated users', () => {
    mockAuthState = { token: null, isAuthenticated: false }
    renderPage()
    expect(screen.getByTestId('sign-in-prompt')).toBeInTheDocument()
  })
})
