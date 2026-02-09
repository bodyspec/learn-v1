import { describe, it, expect, vi, beforeEach } from 'vitest'
import { waitFor } from '@testing-library/react'
import { renderHookWithProviders } from '../test-utils'

vi.mock('@/api/certificates', () => ({
  verifyCertificate: vi.fn(),
}))

import { useVerifyCertificate } from '@/hooks/queries/useVerifyCertificate'
import { verifyCertificate } from '@/api/certificates'

describe('useVerifyCertificate', () => {
  beforeEach(() => {
    vi.mocked(verifyCertificate).mockReset()
  })

  it('does not fetch when uid is undefined', () => {
    const { result } = renderHookWithProviders(() => useVerifyCertificate(undefined))
    expect(result.current.isFetching).toBe(false)
    expect(verifyCertificate).not.toHaveBeenCalled()
  })

  it('fetches verification data when uid is provided', async () => {
    vi.mocked(verifyCertificate).mockResolvedValue({ valid: true, certificate_uid: 'BS-2026-TEST' })

    const { result } = renderHookWithProviders(() => useVerifyCertificate('BS-2026-TEST'))

    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })
    expect(result.current.data?.valid).toBe(true)
    expect(verifyCertificate).toHaveBeenCalledWith('BS-2026-TEST')
  })
})
