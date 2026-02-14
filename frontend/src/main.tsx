// Polyfill crypto.randomUUID for insecure (HTTP) contexts where it's unavailable.
// Must run before keycloak-js is imported since it uses crypto.randomUUID at init time.
if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'undefined' && typeof crypto.getRandomValues === 'function') {
  crypto.randomUUID = function randomUUID() {
    const bytes = crypto.getRandomValues(new Uint8Array(16))
    bytes[6] = (bytes[6] & 0x0f) | 0x40  // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80  // variant 10
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}` as `${string}-${string}-${string}-${string}-${string}`
  }
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App'
import { AuthProvider } from './auth/AuthProvider'
import { queryClient } from './lib/queryClient'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
