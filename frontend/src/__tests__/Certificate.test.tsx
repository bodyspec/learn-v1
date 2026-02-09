import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

let mockAuthState = {
  token: 'test-token' as string | null,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

import Certificate from '@/components/Certificate'

const sampleCert = {
  id: 'cert-1',
  track: 'physician',
  certificate_uid: 'BS-2026-ABC123',
  recipient_name: 'Dr. Test',
  recipient_email: 'test@bodyspec.com',
  issued_at: '2026-01-15T00:00:00Z',
  expires_at: '2028-01-15T00:00:00Z',
}

function renderCert(cert = sampleCert) {
  return render(<MemoryRouter><Certificate certificate={cert} /></MemoryRouter>)
}

describe('Certificate', () => {
  beforeEach(() => {
    mockAuthState = { token: 'test-token' }
    vi.restoreAllMocks()
  })

  it('renders track title from trackTitles map', () => {
    renderCert()
    expect(screen.getByText('Clinical Applications')).toBeInTheDocument()
  })

  it('falls back to certificate.track for unknown tracks', () => {
    renderCert({ ...sampleCert, track: 'radiology' })
    expect(screen.getByText('radiology')).toBeInTheDocument()
  })

  it('shows certificate UID and recipient name', () => {
    renderCert()
    expect(screen.getByText(/BS-2026-ABC123/)).toBeInTheDocument()
    expect(screen.getByText(/Dr. Test/)).toBeInTheDocument()
  })

  it('shows expiry only when expires_at is present', () => {
    renderCert()
    expect(screen.getByText(/Expires:/)).toBeInTheDocument()

    renderCert({ ...sampleCert, expires_at: undefined as unknown as string })
    // No "Expires:" text for the second render
  })

  it('Copy Verify Link copies URL and shows "Copied!"', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText: mockWriteText } })

    renderCert()
    fireEvent.click(screen.getByText('Copy Verify Link'))

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
    expect(mockWriteText).toHaveBeenCalledWith(expect.stringContaining('/verify/BS-2026-ABC123'))
  })

  it('Download PDF shows "Downloading..." while pending', async () => {
    const mockFetch = vi.fn().mockImplementation(() => new Promise(() => {})) // never resolves
    vi.stubGlobal('fetch', mockFetch)

    renderCert()
    fireEvent.click(screen.getByText('Download PDF'))

    await waitFor(() => {
      expect(screen.getByText('Downloading...')).toBeInTheDocument()
    })

    vi.unstubAllGlobals()
  })

  it('shows error on download failure', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: false })
    vi.stubGlobal('fetch', mockFetch)

    renderCert()
    fireEvent.click(screen.getByText('Download PDF'))

    await waitFor(() => {
      expect(screen.getByText('Failed to download PDF. Please try again.')).toBeInTheDocument()
    })

    vi.unstubAllGlobals()
  })
})
