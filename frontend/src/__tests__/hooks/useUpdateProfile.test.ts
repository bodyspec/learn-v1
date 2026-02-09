import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHookWithProviders } from '../test-utils'

let mockAuthState = {
  token: 'test-token' as string | null,
  isAuthenticated: true,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

const mockPut = vi.fn()
vi.mock('@/api/client', () => ({
  apiClient: { put: (...args: unknown[]) => mockPut(...args) },
}))

import { useUpdateProfile } from '@/hooks/queries/useUpdateProfile'

describe('useUpdateProfile', () => {
  beforeEach(() => {
    mockAuthState = { token: 'test-token', isAuthenticated: true }
    mockPut.mockReset()
  })

  it('calls PUT /users/me with data and token', async () => {
    mockPut.mockResolvedValue({ id: 'user-1', name: 'Updated' })

    const { result } = renderHookWithProviders(() => useUpdateProfile())
    const data = { name: 'Updated', role_type: 'physician', organization: null }
    await result.current.mutateAsync(data)

    expect(mockPut).toHaveBeenCalledWith('/users/me', data, 'test-token')
  })
})
