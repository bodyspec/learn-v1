import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getProgress, markSectionComplete } from '@/api/progress'

describe('progress API', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getProgress', () => {
    it('calls GET /progress with auth token', async () => {
      const progressData = {
        sections_completed: [
          { module_id: 'core', section_slug: '01-how-dexa-works', completed_at: '2024-01-01' },
        ],
        modules_completed: ['core'],
        quizzes_passed: { core: { score: 90, passed_at: '2024-01-01' } },
      }
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(progressData),
      })

      const result = await getProgress('test-token')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/progress',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      )
      expect(result).toEqual(progressData)
    })
  })

  describe('markSectionComplete', () => {
    it('calls POST /progress/section with module and section data', async () => {
      const responseData = {
        module_id: 'core',
        section_slug: '01-how-dexa-works',
        completed_at: '2024-01-01T00:00:00Z',
      }
      mockFetch.mockResolvedValue({
        ok: true,
        status: 201,
        json: vi.fn().mockResolvedValue(responseData),
      })

      const result = await markSectionComplete('test-token', 'core', '01-how-dexa-works')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/progress/section',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            module_id: 'core',
            section_slug: '01-how-dexa-works',
          }),
        })
      )
      expect(result).toEqual(responseData)
    })
  })
})
