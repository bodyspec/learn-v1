import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getCertificates,
  requestCertificate,
  verifyCertificate,
} from '@/api/certificates'

describe('certificates API', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getCertificates', () => {
    it('fetches user certificates with auth token', async () => {
      const data = {
        certificates: [
          {
            id: 'cert-1',
            track: 'physician',
            certificate_uid: 'BS-2024-ABC123',
            recipient_name: 'Dr. Test',
            issued_at: '2024-01-01',
          },
        ],
      }
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(data),
      })

      const result = await getCertificates('test-token')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/certificates',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      )
      expect(result.certificates).toHaveLength(1)
      expect(result.certificates[0].certificate_uid).toBe('BS-2024-ABC123')
    })
  })

  describe('requestCertificate', () => {
    it('posts certificate request for a track', async () => {
      const certData = {
        id: 'cert-2',
        track: 'physician',
        certificate_uid: 'BS-2024-NEW123',
        recipient_name: 'Dr. Test',
        issued_at: '2024-01-01',
      }
      mockFetch.mockResolvedValue({
        ok: true,
        status: 201,
        json: vi.fn().mockResolvedValue(certData),
      })

      const result = await requestCertificate('test-token', 'physician')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/certificates',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ track: 'physician' }),
        })
      )
      expect(result.certificate_uid).toBe('BS-2024-NEW123')
    })
  })

  describe('verifyCertificate', () => {
    it('fetches verification without auth token', async () => {
      const verification = {
        valid: true,
        certificate_uid: 'BS-2024-ABC123',
        recipient_name: 'Dr. Test',
        track: 'physician',
        track_title: 'Clinical Applications',
        issued_at: '2024-01-01',
      }
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(verification),
      })

      const result = await verifyCertificate('BS-2024-ABC123')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/verify/BS-2024-ABC123',
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'Authorization': expect.any(String),
          }),
        })
      )
      expect(result.valid).toBe(true)
    })

    it('returns not_found for unknown certificates', async () => {
      const verification = { valid: false, reason: 'not_found' }
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(verification),
      })

      const result = await verifyCertificate('BS-9999-INVALID')
      expect(result.valid).toBe(false)
      expect(result.reason).toBe('not_found')
    })
  })

})
