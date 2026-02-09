import type { Meta, StoryObj } from '@storybook/react-vite'
import { Download, Copy, Check } from 'lucide-react'
import React, { useState } from 'react'
import type { Certificate as CertificateType } from '@/types'

/**
 * Certificate display component story.
 *
 * Renders a self-contained version of the Certificate component
 * to avoid needing the API client import.
 */

const trackTitles: Record<string, string> = {
  physician: 'Clinical Applications',
  chiropractor: 'Body Composition in Practice',
  trainer: 'Programming with DEXA Data',
}

function CertificatePreview({ certificate }: { certificate: CertificateType }) {
  const [copied, setCopied] = useState(false)
  const verifyUrl = `https://learn.bodyspec.com/verify/${certificate.certificate_uid}`

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(verifyUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {trackTitles[certificate.track] || certificate.track}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Certificate ID: {certificate.certificate_uid}
          </p>
          <p className="text-sm text-gray-500">
            Issued to: {certificate.recipient_name}
          </p>
          <p className="text-sm text-gray-500">
            Issued: {new Date(certificate.issued_at).toLocaleDateString()}
          </p>
          {certificate.expires_at && (
            <p className="text-sm text-gray-500">
              Expires: {new Date(certificate.expires_at).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button className="btn-primary inline-flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={handleCopyLink}
            className="btn-outline inline-flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Verify Link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof CertificatePreview> = {
  title: 'Components/Certificate',
  component: CertificatePreview,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 700 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CertificatePreview>

export const PhysicianCertificate: Story = {
  args: {
    certificate: {
      id: '1',
      track: 'physician',
      certificate_uid: 'CERT-2024-PHY-A1B2C3',
      recipient_name: 'Dr. Sarah Smith',
      issued_at: '2024-06-15T10:30:00Z',
      expires_at: '2026-06-15T10:30:00Z',
    },
  },
}

export const ChiropractorCertificate: Story = {
  args: {
    certificate: {
      id: '2',
      track: 'chiropractor',
      certificate_uid: 'CERT-2024-CHR-D4E5F6',
      recipient_name: 'Dr. Mike Johnson, DC',
      issued_at: '2024-08-20T14:00:00Z',
    },
  },
}

export const TrainerCertificate: Story = {
  args: {
    certificate: {
      id: '3',
      track: 'trainer',
      certificate_uid: 'CERT-2024-TRN-G7H8I9',
      recipient_name: 'Alex Rivera, CSCS',
      issued_at: '2024-09-10T09:15:00Z',
      expires_at: '2025-09-10T09:15:00Z',
    },
  },
}
