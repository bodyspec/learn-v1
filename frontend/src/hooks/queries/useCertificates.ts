import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/auth/AuthProvider'
import { getCertificates, requestCertificate } from '@/api/certificates'
import { queryKeys } from '@/lib/queryKeys'

export function useCertificates() {
  const { token, isAuthenticated } = useAuth()

  const { data: certificates = [], isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.certificates.all,
    queryFn: async () => {
      const data = await getCertificates(token!)
      return data.certificates
    },
    enabled: isAuthenticated && !!token,
  })

  return {
    certificates,
    isLoading,
    error,
    refetch,
  }
}

export function useRequestCertificate() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (track: string) => requestCertificate(token!, track),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.all })
    },
  })
}
