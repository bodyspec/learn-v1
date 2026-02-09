import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getAdminUsers,
  getAdminUserDetail,
  promoteUser,
  demoteUser,
  deleteUser,
  resetProgress,
} from '@/api/admin'

describe('admin API', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function mockResponse(status: number, data: unknown) {
    return {
      ok: status >= 200 && status < 300,
      status,
      statusText: status === 200 ? 'OK' : 'Error',
      json: vi.fn().mockResolvedValue(data),
    }
  }

  describe('getAdminUsers', () => {
    it('fetches users with auth token', async () => {
      const data = { users: [], total: 0, page: 1, per_page: 25 }
      mockFetch.mockResolvedValue(mockResponse(200, data))

      const result = await getAdminUsers('test-token')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/admin/users',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      )
      expect(result.total).toBe(0)
    })

    it('passes search and page params as query string', async () => {
      const data = { users: [], total: 0, page: 2, per_page: 25 }
      mockFetch.mockResolvedValue(mockResponse(200, data))

      await getAdminUsers('test-token', { page: 2, search: 'test' })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2'),
        expect.any(Object)
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=test'),
        expect.any(Object)
      )
    })
  })

  describe('getAdminUserDetail', () => {
    it('fetches user detail by ID', async () => {
      const data = { id: 'user-1', email: 'test@test.com', module_progress: [] }
      mockFetch.mockResolvedValue(mockResponse(200, data))

      const result = await getAdminUserDetail('test-token', 'user-1')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/admin/users/user-1',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      )
      expect(result.id).toBe('user-1')
    })
  })

  describe('promoteUser', () => {
    it('sends PUT to promote endpoint', async () => {
      mockFetch.mockResolvedValue(mockResponse(200, { is_admin: true }))

      await promoteUser('test-token', 'user-1')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/admin/users/user-1/promote',
        expect.objectContaining({ method: 'PUT' })
      )
    })
  })

  describe('demoteUser', () => {
    it('sends PUT to demote endpoint', async () => {
      mockFetch.mockResolvedValue(mockResponse(200, { is_admin: false }))

      await demoteUser('test-token', 'user-1')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/admin/users/user-1/demote',
        expect.objectContaining({ method: 'PUT' })
      )
    })
  })

  describe('deleteUser', () => {
    it('sends DELETE request', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 204,
        statusText: 'No Content',
        json: vi.fn().mockResolvedValue(null),
      })

      await deleteUser('test-token', 'user-1')

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/admin/users/user-1',
        expect.objectContaining({ method: 'DELETE' })
      )
    })
  })

  describe('resetProgress', () => {
    it('posts reset request with correct body', async () => {
      const responseData = { sections_deleted: 5, quizzes_deleted: 2, certificates_deleted: 1 }
      mockFetch.mockResolvedValue(mockResponse(200, responseData))

      const result = await resetProgress('test-token', {
        sections: true,
        quizzes: true,
        certificates: false,
      })

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/v1/users/me/reset-progress',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ sections: true, quizzes: true, certificates: false }),
        })
      )
      expect(result.sections_deleted).toBe(5)
    })
  })

  describe('error handling', () => {
    it('throws on 401 unauthorized', async () => {
      mockFetch.mockResolvedValue(mockResponse(401, { detail: 'Not authenticated' }))

      await expect(getAdminUsers('bad-token')).rejects.toThrow()
    })

    it('throws on 404 not found', async () => {
      mockFetch.mockResolvedValue(mockResponse(404, { detail: 'Not found' }))

      await expect(getAdminUserDetail('test-token', 'nonexistent')).rejects.toThrow()
    })
  })
})
