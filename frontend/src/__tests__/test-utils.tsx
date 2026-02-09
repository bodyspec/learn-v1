import React, { type ReactElement } from 'react'
import { render, renderHook, type RenderOptions, type RenderHookOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'
import { vi } from 'vitest'

/**
 * Create a fresh QueryClient configured for testing.
 * Disables retries and sets stale time to 0.
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
      mutations: { retry: false },
    },
  })
}

/**
 * Factory for mock auth state objects.
 */
export function createMockAuthState(overrides: Partial<MockAuthState> = {}): MockAuthState {
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn(),
    ...overrides,
  }
}

export interface MockAuthState {
  user: { id: string; email: string; name: string | null; role_type: string | null; is_admin: boolean } | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: ReturnType<typeof vi.fn>
  logout: ReturnType<typeof vi.fn>
}

export function createAuthenticatedState(overrides: Partial<MockAuthState> = {}): MockAuthState {
  return createMockAuthState({
    user: { id: 'user-1', email: 'test@bodyspec.com', name: 'Test User', role_type: 'physician', is_admin: false },
    token: 'test-token',
    isAuthenticated: true,
    ...overrides,
  })
}

export function createAdminState(overrides: Partial<MockAuthState> = {}): MockAuthState {
  return createAuthenticatedState({
    user: { id: 'admin-1', email: 'admin@bodyspec.com', name: 'Admin User', role_type: 'physician', is_admin: true },
    ...overrides,
  })
}

/**
 * Wrapper that provides QueryClient + MemoryRouter for rendering pages.
 */
interface WrapperProps {
  children: React.ReactNode
}

export function createWrapper(routerProps?: MemoryRouterProps) {
  const queryClient = createTestQueryClient()
  return function Wrapper({ children }: WrapperProps) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter {...routerProps}>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    )
  }
}

/**
 * Render a component with QueryClient + MemoryRouter providers.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: RenderOptions & { routerProps?: MemoryRouterProps },
) {
  const { routerProps, ...renderOptions } = options ?? {}
  return render(ui, {
    wrapper: createWrapper(routerProps),
    ...renderOptions,
  })
}

/**
 * Render a hook with QueryClient provider.
 */
export function renderHookWithProviders<TResult, TProps>(
  hook: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>,
) {
  const queryClient = createTestQueryClient()
  return renderHook(hook, {
    wrapper: ({ children }: WrapperProps) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    ),
    ...options,
  })
}

/**
 * Mock fetch response helper.
 */
export function mockResponse(status: number, data: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: vi.fn().mockResolvedValue(data),
  }
}
