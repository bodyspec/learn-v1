import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/auth/AuthProvider'
import { apiClient } from '@/api/client'
import type { User } from '@/types'

interface ProfileUpdate {
  name: string | null
  role_type: string | null
  organization: string | null
}

export function useUpdateProfile() {
  const { token } = useAuth()

  return useMutation({
    mutationFn: (data: ProfileUpdate) => apiClient.put<User>('/users/me', data, token),
  })
}
