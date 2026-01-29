const API_BASE = '/api/v1'

class ApiError extends Error {
  constructor(public status: number, message: string, public data?: unknown) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new ApiError(response.status, response.statusText, data)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

export const apiClient = {
  get<T>(endpoint: string, token?: string | null): Promise<T> {
    return request<T>(endpoint, { method: 'GET' }, token)
  },

  post<T>(endpoint: string, data?: unknown, token?: string | null): Promise<T> {
    return request<T>(
      endpoint,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      token
    )
  },

  put<T>(endpoint: string, data?: unknown, token?: string | null): Promise<T> {
    return request<T>(
      endpoint,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      token
    )
  },

  delete<T>(endpoint: string, token?: string | null): Promise<T> {
    return request<T>(endpoint, { method: 'DELETE' }, token)
  },
}

export { ApiError }
