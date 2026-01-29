import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CertificateVerification from '@/components/CertificateVerification'
import { verifyCertificate } from '@/api/certificates'
import type { CertificateVerification as CertificateVerificationType } from '@/types'

export default function VerifyPage() {
  const { certificateUid } = useParams<{ certificateUid: string }>()
  const [verification, setVerification] = useState<CertificateVerificationType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!certificateUid) return

    const verify = async () => {
      try {
        const result = await verifyCertificate(certificateUid)
        setVerification(result)
      } catch (err) {
        setError('Failed to verify certificate')
      } finally {
        setIsLoading(false)
      }
    }

    verify()
  }, [certificateUid])

  if (!certificateUid) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">No Certificate ID Provided</h2>
        <p className="mt-2 text-gray-600">
          Please provide a valid certificate ID in the URL.
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Verifying certificate...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-red-700">Verification Failed</h2>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
        Certificate Verification
      </h1>
      {verification && <CertificateVerification verification={verification} />}
    </div>
  )
}
