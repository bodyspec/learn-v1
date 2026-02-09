import { describe, it, expect, vi, beforeEach } from 'vitest'
import { waitFor } from '@testing-library/react'
import { renderHookWithProviders } from '../test-utils'

let mockAuthState: Record<string, unknown> = {
  token: null,
  isAuthenticated: false,
  user: null,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/api/admin', () => ({
  getAdminUsers: vi.fn(),
  getAdminUserDetail: vi.fn(),
  promoteUser: vi.fn(),
  demoteUser: vi.fn(),
  deleteUser: vi.fn(),
  resetProgress: vi.fn(),
}))

import {
  useAdminUsers,
  usePromoteUser,
  useDemoteUser,
  useDeleteUser,
  useResetProgress,
} from '@/hooks/queries/useAdmin'
import {
  getAdminUsers,
  promoteUser,
  demoteUser,
  deleteUser,
  resetProgress,
} from '@/api/admin'

describe('useAdminUsers', () => {
  beforeEach(() => {
    vi.mocked(getAdminUsers).mockReset()
  })

  it('query disabled for non-admin users', () => {
    mockAuthState = {
      token: 'test-token',
      isAuthenticated: true,
      user: { id: 'u1', is_admin: false },
    }
    const { result } = renderHookWithProviders(() => useAdminUsers())
    expect(result.current.isFetching).toBe(false)
    expect(getAdminUsers).not.toHaveBeenCalled()
  })

  it('query disabled when not authenticated', () => {
    mockAuthState = { token: null, isAuthenticated: false, user: null }
    const { result } = renderHookWithProviders(() => useAdminUsers())
    expect(result.current.isFetching).toBe(false)
  })

  it('fetches users for admin', async () => {
    mockAuthState = {
      token: 'admin-token',
      isAuthenticated: true,
      user: { id: 'a1', is_admin: true },
    }
    vi.mocked(getAdminUsers).mockResolvedValue({ users: [], total: 0, page: 1, per_page: 25 })

    const { result } = renderHookWithProviders(() => useAdminUsers(1, 'test'))

    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })
    expect(getAdminUsers).toHaveBeenCalledWith('admin-token', { page: 1, per_page: 25, search: 'test' })
  })
})

describe('usePromoteUser', () => {
  beforeEach(() => {
    mockAuthState = { token: 'admin-token', isAuthenticated: true, user: { id: 'a1', is_admin: true } }
    vi.mocked(promoteUser).mockReset()
  })

  it('calls promoteUser API', async () => {
    vi.mocked(promoteUser).mockResolvedValue({ is_admin: true })

    const { result } = renderHookWithProviders(() => usePromoteUser())
    await result.current.mutateAsync('user-1')

    expect(promoteUser).toHaveBeenCalledWith('admin-token', 'user-1')
  })
})

describe('useDemoteUser', () => {
  beforeEach(() => {
    mockAuthState = { token: 'admin-token', isAuthenticated: true, user: { id: 'a1', is_admin: true } }
    vi.mocked(demoteUser).mockReset()
  })

  it('calls demoteUser API', async () => {
    vi.mocked(demoteUser).mockResolvedValue({ is_admin: false })

    const { result } = renderHookWithProviders(() => useDemoteUser())
    await result.current.mutateAsync('user-1')

    expect(demoteUser).toHaveBeenCalledWith('admin-token', 'user-1')
  })
})

describe('useDeleteUser', () => {
  beforeEach(() => {
    mockAuthState = { token: 'admin-token', isAuthenticated: true, user: { id: 'a1', is_admin: true } }
    vi.mocked(deleteUser).mockReset()
  })

  it('calls deleteUser API', async () => {
    vi.mocked(deleteUser).mockResolvedValue(undefined)

    const { result } = renderHookWithProviders(() => useDeleteUser())
    await result.current.mutateAsync('user-1')

    expect(deleteUser).toHaveBeenCalledWith('admin-token', 'user-1')
  })
})

describe('useResetProgress', () => {
  beforeEach(() => {
    mockAuthState = { token: 'test-token', isAuthenticated: true, user: { id: 'u1', is_admin: false } }
    vi.mocked(resetProgress).mockReset()
  })

  it('calls resetProgress with correct data', async () => {
    vi.mocked(resetProgress).mockResolvedValue({ sections_deleted: 5, quizzes_deleted: 2, certificates_deleted: 1 })

    const { result } = renderHookWithProviders(() => useResetProgress())
    await result.current.mutateAsync({ sections: true, quizzes: true, certificates: false })

    expect(resetProgress).toHaveBeenCalledWith('test-token', { sections: true, quizzes: true, certificates: false })
  })
})
