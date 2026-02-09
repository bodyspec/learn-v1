import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHookWithProviders } from '../test-utils'

let mockAuthState = {
  token: 'test-token' as string | null,
  isAuthenticated: true,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/api/quiz', () => ({
  submitQuiz: vi.fn(),
}))

import { useSubmitQuiz } from '@/hooks/queries/useQuiz'
import { submitQuiz } from '@/api/quiz'

describe('useSubmitQuiz', () => {
  beforeEach(() => {
    mockAuthState = { token: 'test-token', isAuthenticated: true }
    vi.mocked(submitQuiz).mockReset()
  })

  it('calls submitQuiz with token and submission', async () => {
    vi.mocked(submitQuiz).mockResolvedValue({ score: 90, passed: true })

    const { result } = renderHookWithProviders(() => useSubmitQuiz())

    const submission = { module_id: 'core', answers: { q1: 1 } }
    await result.current.mutateAsync(submission)

    expect(submitQuiz).toHaveBeenCalledWith('test-token', submission)
  })
})
