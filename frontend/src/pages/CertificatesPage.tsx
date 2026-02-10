import { Award, Plus } from 'lucide-react'
import { useCertificates, useRequestCertificate, useProgress } from '@/hooks/queries'
import Certificate from '@/components/Certificate'

const TRACKS = [
  { id: 'physician', title: 'Clinical Applications', requiredModules: ['core', 'physician'] },
  { id: 'chiropractor', title: 'Body Composition in Practice', requiredModules: ['core', 'chiropractor'] },
  { id: 'trainer', title: 'Programming with DEXA Data', requiredModules: ['core', 'trainer'] },
]

export default function CertificatesPage() {
  const { certificates, isLoading } = useCertificates()
  const { progress } = useProgress()
  const requestCert = useRequestCertificate()

  const isEligible = (trackId: string) => {
    const track = TRACKS.find(t => t.id === trackId)
    if (!track || !progress) return false
    return track.requiredModules.every(m => progress.quizzes_passed[m])
  }

  const hasCertificate = (trackId: string) => {
    return certificates.some(c => c.track === trackId)
  }

  const handleRequestCertificate = (trackId: string) => {
    requestCert.mutate(trackId)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-salad-100"></div>
      </div>
    )
  }

  const error = requestCert.error as (Error & { data?: { message?: string } }) | null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Certificates</h1>
        <p className="mt-2 text-gray-600">
          Earn certificates by completing all modules and passing quizzes in a track.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error.data?.message || 'Failed to request certificate'}
        </div>
      )}

      {/* Earned Certificates */}
      {certificates.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Earned Certificates</h2>
          <div className="space-y-4">
            {certificates.map(cert => (
              <Certificate key={cert.id} certificate={cert} />
            ))}
          </div>
        </div>
      )}

      {/* Available Certificates */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {certificates.length > 0 ? 'Other Tracks' : 'Available Tracks'}
        </h2>
        <div className="space-y-4">
          {TRACKS.filter(track => !hasCertificate(track.id)).map(track => {
            const eligible = isEligible(track.id)
            const isRequesting = requestCert.isPending && requestCert.variables === track.id

            return (
              <div key={track.id} className="card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${eligible ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Award className={`w-6 h-6 ${eligible ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{track.title}</h3>
                      <p className="text-sm text-gray-500">
                        {eligible
                          ? 'You are eligible for this certificate!'
                          : `Complete ${track.requiredModules.join(' and ')} modules to earn`}
                      </p>
                    </div>
                  </div>

                  {eligible && (
                    <button
                      onClick={() => handleRequestCertificate(track.id)}
                      disabled={isRequesting}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      {isRequesting ? (
                        'Processing...'
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Claim Certificate
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {certificates.length === 0 && TRACKS.every(t => !isEligible(t.id)) && (
        <div className="text-center py-12 text-gray-500">
          <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>Complete a learning track to earn your first certificate.</p>
        </div>
      )}
    </div>
  )
}
