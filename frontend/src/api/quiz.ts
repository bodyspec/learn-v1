import { apiClient } from './client'
import type { QuizSubmission, QuizSubmissionResult, QuizAttemptsResponse } from '@/types'

export async function submitQuiz(
  token: string,
  submission: QuizSubmission
): Promise<QuizSubmissionResult> {
  return apiClient.post<QuizSubmissionResult>('/quiz/submit', submission, token)
}

export async function getQuizAttempts(
  token: string,
  moduleId: string
): Promise<QuizAttemptsResponse> {
  return apiClient.get<QuizAttemptsResponse>(`/quiz/attempts/${moduleId}`, token)
}
