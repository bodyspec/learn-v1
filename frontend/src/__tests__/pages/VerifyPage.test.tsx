import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

let mockVerifyState = {
  data: null as { valid: boolean; certificate_uid: string } | null,
  isLoading: false,
  error: null as Error | null,
}

vi.mock('@/hooks/queries', () => ({
  useVerifyCertificate: () => mockVerifyState,
}))

vi.mock('@/components/CertificateVerification', () => ({
  default: ({ verification }: { verification: { certificate_uid: string } }) => (
    <div data-testid="cert-verification">{verification.certificate_uid}</div>
  ),
}))

import VerifyPage from '@/pages/VerifyPage'

function renderPage(uid?: string) {
  const path = uid ? `/verify/${uid}` : '/verify'
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/verify/:certificateUid" element={<VerifyPage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('VerifyPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockVerifyState = { data: null, isLoading: false, error: null }
  })

  it('shows message when no certificate UID provided', () => {
    renderPage()
    expect(screen.getByText('No Certificate ID Provided')).toBeInTheDocument()
  })

  it('shows loading spinner when verifying', () => {
    mockVerifyState = { data: null, isLoading: true, error: null }
    const { container } = renderPage('BS-001')
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
    expect(screen.getByText('Verifying certificate...')).toBeInTheDocument()
  })

  it('shows error state', () => {
    mockVerifyState = { data: null, isLoading: false, error: new Error('fail') }
    renderPage('BS-001')
    expect(screen.getByText('Verification Failed')).toBeInTheDocument()
  })

  it('renders CertificateVerification on success', () => {
    mockVerifyState = {
      data: { valid: true, certificate_uid: 'BS-001' },
      isLoading: false,
      error: null,
    }
    renderPage('BS-001')
    expect(screen.getByTestId('cert-verification')).toHaveTextContent('BS-001')
  })
})
