import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { renderHookWithProviders, mockResponse } from '../test-utils'

let mockAuthState = {
  token: null as string | null,
  isAuthenticated: false,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/api/progress', () => ({
  getProgress: vi.fn(),
  markSectionComplete: vi.fn(),
}))

import { useProgress, useMarkSectionComplete } from '@/hooks/queries/useProgress'
import { getProgress, markSectionComplete } from '@/api/progress'

describe('useProgress', () => {
  beforeEach(() => {
    mockAuthState = { token: null, isAuthenticated: false }
    vi.mocked(getProgress).mockReset()
  })

  it('returns null progress when not authenticated', () => {
    const { result } = renderHookWithProviders(() => useProgress())
    expect(result.current.progress).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('returns null progress when token is missing', () => {
    mockAuthState = { token: null, isAuthenticated: true }
    const { result } = renderHookWithProviders(() => useProgress())
    expect(result.current.progress).toBeNull()
  })

  it('fetches progress when authenticated', async () => {
    mockAuthState = { token: 'test-token', isAuthenticated: true }
    const progressData = { modules: { core: { sections_complete: ['01-intro'] } } }
    vi.mocked(getProgress).mockResolvedValue(progressData)

    const { result } = renderHookWithProviders(() => useProgress())

    await waitFor(() => {
      expect(result.current.progress).toEqual(progressData)
    })
    expect(getProgress).toHaveBeenCalledWith('test-token')
  })
})

describe('useMarkSectionComplete', () => {
  beforeEach(() => {
    mockAuthState = { token: 'test-token', isAuthenticated: true }
    vi.mocked(markSectionComplete).mockReset()
  })

  it('calls API with correct params', async () => {
    vi.mocked(markSectionComplete).mockResolvedValue({})

    const { result } = renderHookWithProviders(() => useMarkSectionComplete())

    await result.current.mutateAsync({ moduleId: 'core', sectionSlug: '01-intro' })
    expect(markSectionComplete).toHaveBeenCalledWith('test-token', 'core', '01-intro')
  })
})
