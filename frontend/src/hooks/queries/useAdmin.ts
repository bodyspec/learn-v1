import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/auth/AuthProvider'
import {
  getAdminUsers,
  getAdminUserDetail,
  promoteUser,
  demoteUser,
  deleteUser,
  resetProgress,
  type ResetProgressRequest,
} from '@/api/admin'
import { queryKeys } from '@/lib/queryKeys'

const adminKeys = {
  users: (page: number, search: string) => ['admin', 'users', page, search] as const,
  userDetail: (id: string) => ['admin', 'users', id] as const,
}

export function useAdminUsers(page: number = 1, search: string = '') {
  const { token, isAuthenticated, user } = useAuth()

  return useQuery({
    queryKey: adminKeys.users(page, search),
    queryFn: () => getAdminUsers(token!, { page, per_page: 25, search: search || undefined }),
    enabled: isAuthenticated && !!token && !!user?.is_admin,
  })
}

export function useAdminUserDetail(userId: string) {
  const { token, isAuthenticated, user } = useAuth()

  return useQuery({
    queryKey: adminKeys.userDetail(userId),
    queryFn: () => getAdminUserDetail(token!, userId),
    enabled: isAuthenticated && !!token && !!user?.is_admin && !!userId,
  })
}

export function usePromoteUser() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => promoteUser(token!, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] })
    },
  })
}

export function useDemoteUser() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => demoteUser(token!, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] })
    },
  })
}

export function useDeleteUser() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => deleteUser(token!, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] })
    },
  })
}

export function useResetProgress() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ResetProgressRequest) => resetProgress(token!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.all })
    },
  })
}
