import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiClient, ApiError } from '@/api/client'

describe('apiClient', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    mockFetch.mockReset()
    vi.stubGlobal('fetch', mockFetch)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function mockResponse(status: number, data: unknown, ok = true) {
    return {
      ok,
      status,
      statusText: status === 200 ? 'OK' : 'Error',
      json: vi.fn().mockResolvedValue(data),
    }
  }

  describe('get', () => {
    it('sends GET request to correct URL', async () => {
      mockFetch.mockResolvedValue(mockResponse(200, { id: 1 }))
      await apiClient.get('/test')
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('includes Authorization header when token provided', async () => {
      mockFetch.mockResolvedValue(mockResponse(200, {}))
      await apiClient.get('/test', 'my-token')
      const call = mockFetch.mock.calls[0]
      expect(call[1].headers['Authorization']).toBe('Bearer my-token')
    })

    it('does not include Authorization header without token', async () => {
      mockFetch.mockResolvedValue(mockResponse(200, {}))
      await apiClient.get('/test')
      const call = mockFetch.mock.calls[0]
      expect(call[1].headers['Authorization']).toBeUndefined()
    })

    it('returns parsed JSON response', async () => {
      const data = { name: 'Test', score: 90 }
      mockFetch.mockResolvedValue(mockResponse(200, data))
      const result = await apiClient.get('/test')
      expect(result).toEqual(data)
    })

    it('throws ApiError on non-ok response', async () => {
      mockFetch.mockResolvedValue(mockResponse(401, { detail: 'Unauthorized' }, false))
      await expect(apiClient.get('/test')).rejects.toThrow(ApiError)
    })

    it('ApiError includes status code', async () => {
      mockFetch.mockResolvedValue(mockResponse(404, null, false))
      try {
        await apiClient.get('/test')
        expect.fail('should throw')
      } catch (err) {
        expect(err).toBeInstanceOf(ApiError)
        expect((err as ApiError).status).toBe(404)
      }
    })
  })

  describe('post', () => {
    it('sends POST request with JSON body', async () => {
      mockFetch.mockResolvedValue(mockResponse(200, {}))
      const body = { module_id: 'core', answers: { q1: 1 } }
      await apiClient.post('/quiz/submit', body, 'token')
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/quiz/submit',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
        })
      )
    })

    it('sends POST without body when data is undefined', async () => {
      mockFetch.mockResolvedValue(mockResponse(200, {}))
      await apiClient.post('/auth/logout')
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/auth/logout',
        expect.objectContaining({
          method: 'POST',
        })
      )
    })

    it('sets Content-Type to application/json', async () => {
      mockFetch.mockResolvedValue(mockResponse(200, {}))
      await apiClient.post('/test', { key: 'value' })
      const call = mockFetch.mock.calls[0]
      expect(call[1].headers['Content-Type']).toBe('application/json')
    })
  })

  describe('put', () => {
    it('sends PUT request with JSON body', async () => {
      mockFetch.mockResolvedValue(mockResponse(200, {}))
      await apiClient.put('/users/me', { name: 'New Name' }, 'token')
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/users/me',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ name: 'New Name' }),
        })
      )
    })
  })

  describe('delete', () => {
    it('sends DELETE request', async () => {
      mockFetch.mockResolvedValue(mockResponse(200, {}))
      await apiClient.delete('/test/1', 'token')
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/test/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      )
    })
  })

  describe('204 No Content', () => {
    it('returns undefined for 204 responses', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 204,
        statusText: 'No Content',
        json: vi.fn(),
      })
      const result = await apiClient.delete('/test/1')
      expect(result).toBeUndefined()
    })
  })
})
