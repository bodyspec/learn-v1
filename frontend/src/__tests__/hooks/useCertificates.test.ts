import { describe, it, expect, vi, beforeEach } from 'vitest'
import { waitFor } from '@testing-library/react'
import { renderHookWithProviders } from '../test-utils'

let mockAuthState = {
  token: null as string | null,
  isAuthenticated: false,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/api/certificates', () => ({
  getCertificates: vi.fn(),
  requestCertificate: vi.fn(),
}))

import { useCertificates, useRequestCertificate } from '@/hooks/queries/useCertificates'
import { getCertificates, requestCertificate } from '@/api/certificates'

describe('useCertificates', () => {
  beforeEach(() => {
    mockAuthState = { token: null, isAuthenticated: false }
    vi.mocked(getCertificates).mockReset()
  })

  it('returns empty array when not authenticated', () => {
    const { result } = renderHookWithProviders(() => useCertificates())
    expect(result.current.certificates).toEqual([])
  })

  it('extracts .certificates from API response', async () => {
    mockAuthState = { token: 'test-token', isAuthenticated: true }
    vi.mocked(getCertificates).mockResolvedValue({
      certificates: [{ id: 'cert-1', track: 'physician' }],
    })

    const { result } = renderHookWithProviders(() => useCertificates())

    await waitFor(() => {
      expect(result.current.certificates).toHaveLength(1)
    })
    expect(result.current.certificates[0].track).toBe('physician')
  })
})

describe('useRequestCertificate', () => {
  beforeEach(() => {
    mockAuthState = { token: 'test-token', isAuthenticated: true }
    vi.mocked(requestCertificate).mockReset()
  })

  it('sends track parameter', async () => {
    vi.mocked(requestCertificate).mockResolvedValue({ id: 'new-cert', track: 'physician' })

    const { result } = renderHookWithProviders(() => useRequestCertificate())
    await result.current.mutateAsync('physician')

    expect(requestCertificate).toHaveBeenCalledWith('test-token', 'physician')
  })
})
