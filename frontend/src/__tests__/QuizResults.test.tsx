import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import QuizResults from '@/components/QuizResults'
import type { Quiz, QuizSubmissionResult } from '@/types'

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    token: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}))

const sampleQuiz: Quiz = {
  module_id: 'core',
  passing_score: 80,
  randomize_questions: false,
  randomize_options: false,
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      text: 'Question 1?',
      options: [
        { text: 'Wrong', correct: false },
        { text: 'Right', correct: true },
      ],
      explanation: 'Explanation for Q1',
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      text: 'Question 2?',
      options: [
        { text: 'Right', correct: true },
        { text: 'Wrong', correct: false },
      ],
      explanation: 'Explanation for Q2',
    },
  ],
}

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('QuizResults', () => {
  it('shows passing result with congratulations', () => {
    const result: QuizSubmissionResult = {
      score: 100,
      passed: true,
      passing_score: 80,
      results: [
        { question_id: 'q1', correct: true, selected_option: 1, correct_option: 1, explanation: 'Explanation for Q1' },
        { question_id: 'q2', correct: true, selected_option: 0, correct_option: 0, explanation: 'Explanation for Q2' },
      ],
      certificate_eligible: false,
    }
    renderWithRouter(
      <QuizResults result={result} quiz={sampleQuiz} onRetry={vi.fn()} />
    )

    expect(screen.getByText('Congratulations!')).toBeInTheDocument()
    expect(screen.getByText(/100%/)).toBeInTheDocument()
  })

  it('shows failing result with "Keep Learning"', () => {
    const result: QuizSubmissionResult = {
      score: 50,
      passed: false,
      passing_score: 80,
      results: [
        { question_id: 'q1', correct: true, selected_option: 1, correct_option: 1, explanation: 'Explanation for Q1' },
        { question_id: 'q2', correct: false, selected_option: 1, correct_option: 0, explanation: 'Explanation for Q2' },
      ],
      certificate_eligible: false,
    }
    renderWithRouter(
      <QuizResults result={result} quiz={sampleQuiz} onRetry={vi.fn()} />
    )

    expect(screen.getByText('Keep Learning')).toBeInTheDocument()
    expect(screen.getByText(/50%/)).toBeInTheDocument()
  })

  it('calls onRetry when Try Again button is clicked', () => {
    const onRetry = vi.fn()
    const result: QuizSubmissionResult = {
      score: 40,
      passed: false,
      passing_score: 80,
      results: [
        { question_id: 'q1', correct: false, selected_option: 0, correct_option: 1, explanation: '' },
        { question_id: 'q2', correct: false, selected_option: 1, correct_option: 0, explanation: '' },
      ],
      certificate_eligible: false,
    }
    renderWithRouter(
      <QuizResults result={result} quiz={sampleQuiz} onRetry={onRetry} />
    )

    // Find the button containing "Try Again" text
    const buttons = screen.getAllByRole('button')
    const retryBtn = buttons.find(btn => btn.textContent?.includes('Try Again'))
    expect(retryBtn).toBeTruthy()
    fireEvent.click(retryBtn!)
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('shows certificate link when eligible', () => {
    const result: QuizSubmissionResult = {
      score: 100,
      passed: true,
      passing_score: 80,
      results: [
        { question_id: 'q1', correct: true, selected_option: 1, correct_option: 1, explanation: '' },
        { question_id: 'q2', correct: true, selected_option: 0, correct_option: 0, explanation: '' },
      ],
      certificate_eligible: true,
    }
    renderWithRouter(
      <QuizResults result={result} quiz={sampleQuiz} onRetry={vi.fn()} />
    )

    expect(screen.getByText('certificates page')).toBeInTheDocument()
  })

  it('shows sign-in prompt when showSignInPrompt is true', () => {
    const result: QuizSubmissionResult = {
      score: 100,
      passed: true,
      passing_score: 80,
      results: [
        { question_id: 'q1', correct: true, selected_option: 1, correct_option: 1, explanation: '' },
        { question_id: 'q2', correct: true, selected_option: 0, correct_option: 0, explanation: '' },
      ],
      certificate_eligible: false,
    }
    renderWithRouter(
      <QuizResults
        result={result}
        quiz={sampleQuiz}
        onRetry={vi.fn()}
        showSignInPrompt={true}
      />
    )

    expect(screen.getByText(/Sign in to save your progress/)).toBeInTheDocument()
  })

  it('renders question review section', () => {
    const result: QuizSubmissionResult = {
      score: 100,
      passed: true,
      passing_score: 80,
      results: [
        { question_id: 'q1', correct: true, selected_option: 1, correct_option: 1, explanation: 'Explanation for Q1' },
        { question_id: 'q2', correct: true, selected_option: 0, correct_option: 0, explanation: 'Explanation for Q2' },
      ],
      certificate_eligible: false,
    }
    renderWithRouter(
      <QuizResults result={result} quiz={sampleQuiz} onRetry={vi.fn()} />
    )

    expect(screen.getByText('Review Your Answers')).toBeInTheDocument()
    expect(screen.getByText('Question 1')).toBeInTheDocument()
    expect(screen.getByText('Question 2')).toBeInTheDocument()
  })
})
