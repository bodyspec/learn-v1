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

vi.mock('@/content', () => ({
  getModules: () => [
    { id: 'core', required_for_certificate: ['*'] },
    { id: 'physician', required_for_certificate: ['physician'] },
    { id: 'chiropractor', required_for_certificate: ['chiropractor'] },
    { id: 'trainer', required_for_certificate: ['trainer'] },
    { id: 'sarcopenia', required_for_certificate: ['*'] },
    { id: 'bone-health', required_for_certificate: ['*'] },
    { id: 'visceral-fat', required_for_certificate: ['*'] },
    { id: 'glp1-monitoring', required_for_certificate: ['physician'] },
  ],
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
    const messages = screen.getAllByText(/Pass all required quizzes to earn this certificate/)
    expect(messages.length).toBe(3)
  })

  it('shows "Claim certificate" for eligible tracks', () => {
    mockProgressState = {
      progress: { quizzes_passed: {
        core: true, physician: true, sarcopenia: true,
        'bone-health': true, 'visceral-fat': true, 'glp1-monitoring': true,
      } },
    }
    renderPage()
    const claimButtons = screen.getAllByText('Claim certificate')
    expect(claimButtons.length).toBeGreaterThan(0)
  })

  it('calls mutate when "Claim certificate" clicked', () => {
    mockProgressState = {
      progress: { quizzes_passed: {
        core: true, physician: true, sarcopenia: true,
        'bone-health': true, 'visceral-fat': true, 'glp1-monitoring': true,
      } },
    }
    renderPage()
    fireEvent.click(screen.getAllByText('Claim certificate')[0])
    expect(mockMutate).toHaveBeenCalledWith('physician')
  })

  it('shows "Processing..." while pending', () => {
    mockProgressState = {
      progress: { quizzes_passed: {
        core: true, physician: true, sarcopenia: true,
        'bone-health': true, 'visceral-fat': true, 'glp1-monitoring': true,
      } },
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
