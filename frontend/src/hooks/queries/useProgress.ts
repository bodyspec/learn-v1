import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/auth/AuthProvider'
import { getProgress, markSectionComplete } from '@/api/progress'
import { queryKeys } from '@/lib/queryKeys'

export function useProgress() {
  const { token, isAuthenticated } = useAuth()

  const { data: progress = null, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.progress.all,
    queryFn: () => getProgress(token!),
    enabled: isAuthenticated && !!token,
  })

  return {
    progress,
    isLoading,
    error,
    isAuthenticated,
    refetch,
  }
}

export function useMarkSectionComplete() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ moduleId, sectionSlug }: { moduleId: string; sectionSlug: string }) =>
      markSectionComplete(token!, moduleId, sectionSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all })
    },
  })
}
