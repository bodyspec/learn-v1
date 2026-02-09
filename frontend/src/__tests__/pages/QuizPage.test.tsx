import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const mockGetModule = vi.fn()
const mockGetQuiz = vi.fn()

vi.mock('@/content', () => ({
  getModule: (...args: unknown[]) => mockGetModule(...args),
  getQuiz: (...args: unknown[]) => mockGetQuiz(...args),
}))

vi.mock('@/components/Quiz', () => ({
  default: () => <div data-testid="quiz-component">Quiz rendered</div>,
}))

vi.mock('@/components/common', () => ({
  NotFound: ({ title, message }: { title: string; message?: string }) => (
    <div data-testid="not-found">{title}{message && ` - ${message}`}</div>
  ),
  BackLink: ({ to, label }: { to: string; label: string }) => <a href={to}>{label}</a>,
}))

import QuizPage from '@/pages/QuizPage'

const fakeModule = {
  id: 'core',
  title: 'DEXA Fundamentals',
}

const fakeQuiz = {
  module_id: 'core',
  passing_score: 80,
  questions: [{ id: 'q1' }, { id: 'q2' }, { id: 'q3' }],
}

function renderPage(moduleId = 'core') {
  return render(
    <MemoryRouter initialEntries={[`/quiz/${moduleId}`]}>
      <Routes>
        <Route path="/quiz/:moduleId" element={<QuizPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('QuizPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetModule.mockReturnValue(fakeModule)
    mockGetQuiz.mockReturnValue(fakeQuiz)
  })

  it('shows NotFound for unknown module', () => {
    mockGetModule.mockReturnValue(undefined)
    renderPage('unknown')
    expect(screen.getByTestId('not-found')).toHaveTextContent('Module Not Found')
  })

  it('shows NotFound when module has no quiz', () => {
    mockGetQuiz.mockReturnValue(undefined)
    renderPage()
    expect(screen.getByTestId('not-found')).toHaveTextContent('Quiz Not Found')
    expect(screen.getByTestId('not-found')).toHaveTextContent('This module does not have a quiz')
  })

  it('renders quiz title as "{module.title} Quiz"', () => {
    renderPage()
    expect(screen.getByText('DEXA Fundamentals Quiz')).toBeInTheDocument()
  })

  it('shows question count and passing score', () => {
    renderPage()
    expect(screen.getByText(/3 questions/)).toBeInTheDocument()
    expect(screen.getByText(/80% to pass/)).toBeInTheDocument()
  })

  it('renders Quiz component', () => {
    renderPage()
    expect(screen.getByTestId('quiz-component')).toBeInTheDocument()
  })
})
