import { Download, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import type { Certificate as CertificateType } from '@/types'
import { useAuth } from '@/auth/AuthProvider'

interface CertificateProps {
  certificate: CertificateType
}

const trackTitles: Record<string, string> = {
  physician: 'Clinical Applications',
  chiropractor: 'Body Composition in Practice',
  trainer: 'Programming with DEXA Data',
}

export default function Certificate({ certificate }: CertificateProps) {
  const { token } = useAuth()
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)
  const verifyUrl = `${window.location.origin}/verify/${certificate.certificate_uid}`

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(verifyUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPdf = async () => {
    if (!token) return
    setDownloading(true)
    setDownloadError(null)
    try {
      const response = await fetch(`/api/v1/certificates/${certificate.certificate_uid}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error('Download failed')
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `certificate-${certificate.certificate_uid}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setDownloadError('Failed to download PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="card p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-bs-dark">
            {trackTitles[certificate.track] || certificate.track}
          </h3>
          <p className="text-sm text-bs-dark55 mt-1">
            Certificate ID: {certificate.certificate_uid}
          </p>
          <p className="text-sm text-bs-dark55">
            Issued to: {certificate.recipient_name}
          </p>
          <p className="text-sm text-bs-dark55">
            Issued: {new Date(certificate.issued_at).toLocaleDateString()}
          </p>
          {certificate.expires_at && (
            <p className="text-sm text-bs-dark55">
              Expires: {new Date(certificate.expires_at).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Downloading...' : 'Download PDF'}
          </button>
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
          {downloadError && (
            <p className="text-xs text-red-500">{downloadError}</p>
          )}
        </div>
      </div>
    </div>
  )
}
