import { CheckCircle, XCircle, AlertTriangle, Award } from 'lucide-react'
import type { CertificateVerification as CertificateVerificationType } from '@/types'

interface CertificateVerificationProps {
  verification: CertificateVerificationType
}

export default function CertificateVerification({ verification }: CertificateVerificationProps) {
  if (verification.valid) {
    return (
      <div className="card p-8 text-center bg-green-50 border-green-200">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-700">Valid Certificate</h2>

        <div className="mt-6 space-y-2 text-gray-700">
          <p>
            <span className="text-gray-500">Recipient:</span>{' '}
            <span className="font-semibold">{verification.recipient_name}</span>
          </p>
          <p>
            <span className="text-gray-500">Track:</span>{' '}
            <span className="font-semibold">{verification.track_title}</span>
          </p>
          <p>
            <span className="text-gray-500">Certificate ID:</span>{' '}
            <span className="font-mono">{verification.certificate_uid}</span>
          </p>
          <p>
            <span className="text-gray-500">Issued:</span>{' '}
            {new Date(verification.issued_at!).toLocaleDateString()}
          </p>
          {verification.expires_at && (
            <p>
              <span className="text-gray-500">Expires:</span>{' '}
              {new Date(verification.expires_at).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Award className="w-4 h-4" />
          <span>Verified by BodySpec Learn</span>
        </div>
      </div>
    )
  }

  // Invalid certificate
  const getInvalidContent = () => {
    switch (verification.reason) {
      case 'not_found':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />,
          title: 'Certificate Not Found',
          message: 'This certificate ID does not exist in our records.',
          bgClass: 'bg-red-50 border-red-200',
          titleClass: 'text-red-700',
        }
      case 'revoked':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />,
          title: 'Certificate Revoked',
          message: `This certificate was revoked on ${new Date(verification.revoked_at!).toLocaleDateString()}.`,
          bgClass: 'bg-red-50 border-red-200',
          titleClass: 'text-red-700',
        }
      case 'expired':
        return {
          icon: <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />,
          title: 'Certificate Expired',
          message: `This certificate expired on ${new Date(verification.expires_at!).toLocaleDateString()}.`,
          bgClass: 'bg-amber-50 border-amber-200',
          titleClass: 'text-amber-700',
        }
      default:
        return {
          icon: <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />,
          title: 'Invalid Certificate',
          message: 'This certificate could not be verified.',
          bgClass: 'bg-red-50 border-red-200',
          titleClass: 'text-red-700',
        }
    }
  }

  const content = getInvalidContent()

  return (
    <div className={`card p-8 text-center ${content.bgClass}`}>
      {content.icon}
      <h2 className={`text-2xl font-bold ${content.titleClass}`}>{content.title}</h2>
      <p className="mt-4 text-gray-600">{content.message}</p>

      {verification.recipient_name && (
        <div className="mt-6 text-sm text-gray-500">
          <p>Original recipient: {verification.recipient_name}</p>
          {verification.track && <p>Track: {verification.track}</p>}
        </div>
      )}
    </div>
  )
}
