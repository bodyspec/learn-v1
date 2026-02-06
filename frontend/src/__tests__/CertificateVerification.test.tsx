import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CertificateVerification from '@/components/CertificateVerification'
import type { CertificateVerification as CertVerificationType } from '@/types'

describe('CertificateVerification', () => {
  it('renders valid certificate details', () => {
    const verification: CertVerificationType = {
      valid: true,
      certificate_uid: 'BS-2024-ABC123',
      recipient_name: 'Dr. Jane Smith',
      track: 'physician',
      track_title: 'Clinical Applications',
      issued_at: '2024-06-15T00:00:00Z',
    }
    render(<CertificateVerification verification={verification} />)

    expect(screen.getByText('Valid Certificate')).toBeInTheDocument()
    expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Clinical Applications')).toBeInTheDocument()
    expect(screen.getByText('BS-2024-ABC123')).toBeInTheDocument()
  })

  it('renders not_found state', () => {
    const verification: CertVerificationType = {
      valid: false,
      reason: 'not_found',
    }
    render(<CertificateVerification verification={verification} />)

    expect(screen.getByText('Certificate Not Found')).toBeInTheDocument()
  })

  it('renders revoked state', () => {
    const verification: CertVerificationType = {
      valid: false,
      certificate_uid: 'BS-2024-REVOKED',
      recipient_name: 'John Doe',
      track: 'trainer',
      reason: 'revoked',
      revoked_at: '2024-03-01T00:00:00Z',
    }
    render(<CertificateVerification verification={verification} />)

    expect(screen.getByText('Certificate Revoked')).toBeInTheDocument()
  })

  it('renders expired state', () => {
    const verification: CertVerificationType = {
      valid: false,
      certificate_uid: 'BS-2023-EXPIRED',
      recipient_name: 'Jane Doe',
      track: 'chiropractor',
      reason: 'expired',
      expires_at: '2023-12-31T00:00:00Z',
    }
    render(<CertificateVerification verification={verification} />)

    expect(screen.getByText('Certificate Expired')).toBeInTheDocument()
  })

  it('shows expiration date for valid certificate with expiry', () => {
    const verification: CertVerificationType = {
      valid: true,
      certificate_uid: 'BS-2024-EXPIRY',
      recipient_name: 'Test User',
      track: 'physician',
      track_title: 'Clinical Applications',
      issued_at: '2024-01-01T00:00:00Z',
      expires_at: '2025-01-01T00:00:00Z',
    }
    render(<CertificateVerification verification={verification} />)

    expect(screen.getByText('Expires:')).toBeInTheDocument()
  })

  it('shows verified badge for valid certificate', () => {
    const verification: CertVerificationType = {
      valid: true,
      certificate_uid: 'BS-2024-TEST1',
      recipient_name: 'Test User',
      track: 'trainer',
      track_title: 'Programming with DEXA Data',
      issued_at: '2024-01-01T00:00:00Z',
    }
    render(<CertificateVerification verification={verification} />)

    expect(screen.getByText(/Verified by BodySpec/)).toBeInTheDocument()
  })
})
