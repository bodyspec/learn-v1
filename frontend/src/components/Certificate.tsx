import { Download, ExternalLink, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import type { Certificate as CertificateType } from '@/types'
import { getCertificatePdfUrl } from '@/api/certificates'

interface CertificateProps {
  certificate: CertificateType
}

const trackTitles: Record<string, string> = {
  physician: 'Clinical Applications',
  chiropractor: 'Body Composition in Practice',
  trainer: 'Programming with DEXA Data',
}

export default function Certificate({ certificate }: CertificateProps) {
  const [copied, setCopied] = useState(false)
  const verifyUrl = `${window.location.origin}/verify/${certificate.certificate_uid}`

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
          <a
            href={getCertificatePdfUrl(certificate.certificate_uid)}
            className="btn-primary inline-flex items-center gap-2"
            download
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
          <button
            onClick={handleCopyLink}
            className="btn-secondary inline-flex items-center gap-2"
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
