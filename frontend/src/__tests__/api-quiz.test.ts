import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { submitQuiz, getQuizAttempts } from '@/api/quiz'

describe('quiz API', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('submitQuiz', () => {
    it('posts quiz submission and returns graded result', async () => {
      const submissionResult = {
        score: 80,
        passed: true,
        passing_score: 80,
        results: [],
        certificate_eligible: true,
      }
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(submissionResult),
      })

      const submission = {
        module_id: 'core',
        answers: { 'core-q1': 1, 'core-q2': 1 },
        time_spent_seconds: 120,
      }
      const result = await submitQuiz('test-token', submission)

      const call = mockFetch.mock.calls[0]
      expect(call[0]).toBe('/api/v1/quiz/submit')
      expect(call[1].method).toBe('POST')
      expect(JSON.parse(call[1].body)).toEqual(submission)
      expect(result).toEqual(submissionResult)
    })
  })

  describe('getQuizAttempts', () => {
    it('fetches attempts for specific module', async () => {
      const attemptsData = {
        attempts: [
          { id: '123', score: 80, passed: true, attempted_at: '2024-01-01' },
        ],
        best_score: 80,
        passed: true,
      }
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(attemptsData),
      })

      const result = await getQuizAttempts('test-token', 'core')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/quiz/attempts/core',
        expect.objectContaining({ method: 'GET' })
      )
      expect(result).toEqual(attemptsData)
    })
  })
})
