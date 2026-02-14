import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import Keycloak from 'keycloak-js'
import type { User } from '@/types'
import { apiClient } from '@/api/client'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
})

// Guard against React 19 StrictMode double-mount. Both keycloak.init() and
// the /auth/me fetch are shared at module level so the second mount joins
// the in-flight request instead of firing a new one.
let authInitPromise: Promise<{ token: string; user: User | null } | null> | null = null

function initAuth(): Promise<{ token: string; user: User | null } | null> {
  if (!authInitPromise) {
    authInitPromise = (async () => {
      // Disable PKCE on insecure (HTTP) contexts where crypto.subtle is unavailable
      const initOptions: Parameters<typeof keycloak.init>[0] = {
        onLoad: 'check-sso',
        ...(!window.isSecureContext && { pkceMethod: false as const }),
      }
      const authenticated = await keycloak.init(initOptions)
      if (!authenticated || !keycloak.token) return null
      try {
        const user = await apiClient.get<User>('/auth/me', keycloak.token)
        return { token: keycloak.token, user }
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
        return { token: keycloak.token, user: null }
      }
    })()
  }
  return authInitPromise
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    initAuth().then((result) => {
      if (cancelled) return
      if (result) {
        setToken(result.token)
        if (result.user) setUser(result.user)
      }
      setIsLoading(false)
    }).catch((error) => {
      console.error('Keycloak init failed:', error)
      if (!cancelled) setIsLoading(false)
    })

    // Set up token refresh
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).then((refreshed) => {
        if (refreshed && keycloak.token) {
          setToken(keycloak.token)
        }
      }).catch(() => {
        console.error('Token refresh failed')
        logout()
      })
    }

    return () => { cancelled = true }
  }, [])

  const login = () => {
    keycloak.login()
  }

  const logout = () => {
    keycloak.logout()
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
