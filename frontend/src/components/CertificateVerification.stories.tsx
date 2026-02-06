import type { Meta, StoryObj } from '@storybook/react-vite'
import CertificateVerification from './CertificateVerification'
import type { CertificateVerification as CertVerificationType } from '@/types'

const meta: Meta<typeof CertificateVerification> = {
  title: 'Components/CertificateVerification',
  component: CertificateVerification,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CertificateVerification>

const validVerification: CertVerificationType = {
  valid: true,
  certificate_uid: 'CERT-2024-PHY-A1B2C3',
  recipient_name: 'Dr. Sarah Smith',
  track: 'physician',
  track_title: 'Clinical Applications',
  issued_at: '2024-06-15T10:30:00Z',
  expires_at: '2026-06-15T10:30:00Z',
}

export const Valid: Story = {
  args: {
    verification: validVerification,
  },
}

export const ValidNoExpiry: Story = {
  args: {
    verification: {
      ...validVerification,
      expires_at: undefined,
    },
  },
}

export const NotFound: Story = {
  args: {
    verification: {
      valid: false,
      reason: 'not_found',
    },
  },
}

export const Revoked: Story = {
  args: {
    verification: {
      valid: false,
      reason: 'revoked',
      certificate_uid: 'CERT-2024-PHY-X9Y8Z7',
      recipient_name: 'John Doe',
      track: 'physician',
      revoked_at: '2024-09-01T00:00:00Z',
    },
  },
}

export const Expired: Story = {
  args: {
    verification: {
      valid: false,
      reason: 'expired',
      certificate_uid: 'CERT-2023-TRN-M4N5O6',
      recipient_name: 'Jane Trainer',
      track: 'trainer',
      expires_at: '2024-01-01T00:00:00Z',
    },
  },
}
