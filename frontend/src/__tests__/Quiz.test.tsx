import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { Quiz as QuizType } from '@/types'

const mockMutateAsync = vi.fn()
let mockAuthState = {
  token: 'test-token' as string | null,
  isAuthenticated: true,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/hooks/queries', () => ({
  useSubmitQuiz: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  }),
}))

import Quiz from '@/components/Quiz'

const sampleQuiz: QuizType = {
  module_id: 'test-module',
  passing_score: 80,
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      text: 'Question 1?',
      options: [
        { text: 'Wrong A', correct: false },
        { text: 'Correct A', correct: true },
      ],
      explanation: 'Explanation 1',
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      text: 'Question 2?',
      options: [
        { text: 'Wrong B', correct: false },
        { text: 'Correct B', correct: true },
      ],
      explanation: 'Explanation 2',
    },
  ],
}

function renderQuiz(onComplete = vi.fn()) {
  return render(
    <MemoryRouter>
      <Quiz quiz={sampleQuiz} onComplete={onComplete} />
    </MemoryRouter>
  )
}

describe('Quiz', () => {
  beforeEach(() => {
    mockAuthState = { token: 'test-token', isAuthenticated: true }
    mockMutateAsync.mockReset()
  })

  it('renders first question with "Question 1 of N"', () => {
    renderQuiz()
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
    expect(screen.getByText('Question 1?')).toBeInTheDocument()
  })

  it('shows "0 of N answered" initially', () => {
    renderQuiz()
    expect(screen.getByText('0 of 2 answered')).toBeInTheDocument()
  })

  it('clicking option updates answer count', () => {
    renderQuiz()
    fireEvent.click(screen.getByText('Correct A'))
    expect(screen.getByText('1 of 2 answered')).toBeInTheDocument()
  })

  it('Next button advances to next question', () => {
    renderQuiz()
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument()
  })

  it('Previous button disabled on first question', () => {
    renderQuiz()
    expect(screen.getByText('Previous')).toBeDisabled()
  })

  it('Submit button appears only on last question', () => {
    renderQuiz()
    expect(screen.queryByText('Submit Quiz')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Submit Quiz')).toBeInTheDocument()
  })

  it('Submit button disabled until all questions answered', () => {
    renderQuiz()
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Submit Quiz')).toBeDisabled()
  })

  it('authenticated: calls submitQuizMutation.mutateAsync', async () => {
    const onComplete = vi.fn()
    mockMutateAsync.mockResolvedValue({
      score: 100, passed: true, passing_score: 80,
      results: [], certificate_eligible: true,
    })

    renderQuiz(onComplete)
    // Answer both questions
    fireEvent.click(screen.getByText('Correct A'))
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Correct B'))
    fireEvent.click(screen.getByText('Submit Quiz'))

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          module_id: 'test-module',
          answers: { q1: 1, q2: 1 },
        })
      )
    })
  })

  it('unauthenticated: calculates results locally with certificate_eligible=false', async () => {
    mockAuthState = { token: null, isAuthenticated: false }
    const onComplete = vi.fn()

    renderQuiz(onComplete)
    fireEvent.click(screen.getByText('Correct A'))
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Correct B'))
    fireEvent.click(screen.getByText('Submit Quiz'))

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith(
        expect.objectContaining({
          score: 100,
          passed: true,
          certificate_eligible: false,
        })
      )
    })
    expect(mockMutateAsync).not.toHaveBeenCalled()
  })

  it('after submission renders QuizResults', async () => {
    mockMutateAsync.mockResolvedValue({
      score: 100, passed: true, passing_score: 80,
      results: [
        { question_id: 'q1', selected_option: 1, correct_option: 1, correct: true, explanation: 'E1' },
        { question_id: 'q2', selected_option: 1, correct_option: 1, correct: true, explanation: 'E2' },
      ],
      certificate_eligible: true,
    })

    renderQuiz()
    fireEvent.click(screen.getByText('Correct A'))
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Correct B'))
    fireEvent.click(screen.getByText('Submit Quiz'))

    await waitFor(() => {
      expect(screen.getByText(/Congratulations/)).toBeInTheDocument()
    })
  })

  it('onComplete callback called with result', async () => {
    const onComplete = vi.fn()
    const mockResult = {
      score: 100, passed: true, passing_score: 80,
      results: [], certificate_eligible: true,
    }
    mockMutateAsync.mockResolvedValue(mockResult)

    renderQuiz(onComplete)
    fireEvent.click(screen.getByText('Correct A'))
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Correct B'))
    fireEvent.click(screen.getByText('Submit Quiz'))

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith(mockResult)
    })
  })
})
