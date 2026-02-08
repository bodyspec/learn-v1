import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/auth/AuthProvider'
import { submitQuiz } from '@/api/quiz'
import { queryKeys } from '@/lib/queryKeys'
import type { QuizSubmission } from '@/types'

export function useSubmitQuiz() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (submission: QuizSubmission) => submitQuiz(token!, submission),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all })
      queryClient.invalidateQueries({
        queryKey: queryKeys.quiz.attempts(variables.module_id),
      })
    },
  })
}
