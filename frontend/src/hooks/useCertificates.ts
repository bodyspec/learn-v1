import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import { getCertificates } from '@/api/certificates'
import type { Certificate } from '@/types'

export function useCertificates() {
  const { token, isAuthenticated } = useAuth()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchCertificates = useCallback(async () => {
    if (!token) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await getCertificates(token)
      setCertificates(data.certificates)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch certificates'))
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCertificates()
    } else {
      setCertificates([])
    }
  }, [isAuthenticated, token, fetchCertificates])

  return {
    certificates,
    isLoading,
    error,
    refetch: fetchCertificates,
  }
}
