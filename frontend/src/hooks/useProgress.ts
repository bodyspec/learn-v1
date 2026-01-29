import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import { getProgress } from '@/api/progress'
import type { Progress } from '@/types'

export function useProgress() {
  const { token, isAuthenticated } = useAuth()
  const [progress, setProgress] = useState<Progress | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchProgress = useCallback(async () => {
    if (!token) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await getProgress(token)
      setProgress(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch progress'))
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchProgress()
    } else {
      setProgress(null)
    }
  }, [isAuthenticated, token, fetchProgress])

  return {
    progress,
    isLoading,
    error,
    isAuthenticated,
    refetch: fetchProgress,
  }
}
