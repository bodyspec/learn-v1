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

// Guard against React 19 StrictMode double-mount calling init() twice.
// The second init() would fail because keycloak-js only allows one init(),
// and during auth redirects the auth code gets consumed by the first call.
let keycloakInitPromise: Promise<boolean> | null = null

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!keycloakInitPromise) {
      keycloakInitPromise = keycloak.init({ onLoad: 'check-sso' })
    }

    keycloakInitPromise.then(async (authenticated) => {
      if (authenticated && keycloak.token) {
        setToken(keycloak.token)
        try {
          const userProfile = await apiClient.get<User>('/auth/me', keycloak.token)
          setUser(userProfile)
        } catch (error) {
          console.error('Failed to fetch user profile:', error)
        }
      }
      setIsLoading(false)
    }).catch((error) => {
      console.error('Keycloak init failed:', error)
      setIsLoading(false)
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
