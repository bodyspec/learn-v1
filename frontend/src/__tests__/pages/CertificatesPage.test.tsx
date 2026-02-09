import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const mockMutate = vi.fn()
let mockCertsState = {
  certificates: [] as Array<{ id: string; track: string; certificate_uid: string }>,
  isLoading: false,
}
let mockProgressState = {
  progress: null as { quizzes_passed: Record<string, boolean> } | null,
}
let mockRequestCertState = {
  mutate: mockMutate,
  isPending: false,
  error: null as Error | null,
  variables: undefined as string | undefined,
}

vi.mock('@/hooks/queries', () => ({
  useCertificates: () => mockCertsState,
  useProgress: () => mockProgressState,
  useRequestCertificate: () => mockRequestCertState,
}))

vi.mock('@/components/Certificate', () => ({
  default: ({ certificate }: { certificate: { track: string; certificate_uid: string } }) => (
    <div data-testid="certificate">{certificate.track} - {certificate.certificate_uid}</div>
  ),
}))

import CertificatesPage from '@/pages/CertificatesPage'

function renderPage() {
  return render(<MemoryRouter><CertificatesPage /></MemoryRouter>)
}

describe('CertificatesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCertsState = { certificates: [], isLoading: false }
    mockProgressState = { progress: null }
    mockRequestCertState = { mutate: mockMutate, isPending: false, error: null, variables: undefined }
  })

  it('shows loading spinner', () => {
    mockCertsState = { certificates: [], isLoading: true }
    const { container } = renderPage()
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('renders earned certificates', () => {
    mockCertsState = {
      certificates: [{ id: '1', track: 'physician', certificate_uid: 'BS-001' }],
      isLoading: false,
    }
    renderPage()
    expect(screen.getByTestId('certificate')).toHaveTextContent('physician - BS-001')
  })

  it('shows "Earned Certificates" heading when certs exist', () => {
    mockCertsState = {
      certificates: [{ id: '1', track: 'physician', certificate_uid: 'BS-001' }],
      isLoading: false,
    }
    renderPage()
    expect(screen.getByText('Earned Certificates')).toBeInTheDocument()
  })

  it('shows eligibility message for ineligible tracks', () => {
    renderPage()
    expect(screen.getByText(/Complete core and physician modules to earn/)).toBeInTheDocument()
  })

  it('shows "Claim Certificate" for eligible tracks', () => {
    mockProgressState = {
      progress: { quizzes_passed: { core: true, physician: true } },
    }
    renderPage()
    const claimButtons = screen.getAllByText('Claim Certificate')
    expect(claimButtons.length).toBeGreaterThan(0)
  })

  it('calls mutate when "Claim Certificate" clicked', () => {
    mockProgressState = {
      progress: { quizzes_passed: { core: true, physician: true } },
    }
    renderPage()
    fireEvent.click(screen.getAllByText('Claim Certificate')[0])
    expect(mockMutate).toHaveBeenCalledWith('physician')
  })

  it('shows "Processing..." while pending', () => {
    mockProgressState = {
      progress: { quizzes_passed: { core: true, physician: true } },
    }
    mockRequestCertState = { mutate: mockMutate, isPending: true, error: null, variables: 'physician' }
    renderPage()
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })

  it('shows error message on failed request', () => {
    const err = new Error('fail') as Error & { data?: { message?: string } }
    err.data = { message: 'Already exists' }
    mockRequestCertState = { mutate: mockMutate, isPending: false, error: err, variables: undefined }
    renderPage()
    expect(screen.getByText('Already exists')).toBeInTheDocument()
  })
})
