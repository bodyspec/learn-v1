import { Link } from 'react-router-dom'
import { BookOpen, Award, CheckCircle } from 'lucide-react'
import { useAuth } from '@/auth/AuthProvider'
import { useProgress } from '@/hooks/useProgress'
import { useCertificates } from '@/hooks/useCertificates'
import { getModules, getTrackInfo } from '@/content'
import ProgressIndicator from '@/components/ProgressIndicator'
import { LoadingSpinner } from '@/components/common'

export default function Dashboard() {
  const { user } = useAuth()
  const { progress, isLoading: progressLoading } = useProgress()
  const { certificates, isLoading: certsLoading } = useCertificates()

  const modules = getModules()

  const getTrackProgress = (track: string) => {
    const trackModules = modules.filter(m => m.track === track || m.track === 'core')
    const completedModules = trackModules.filter(m => progress?.quizzes_passed[m.id])
    return {
      total: trackModules.length,
      completed: completedModules.length,
      percent: trackModules.length > 0 ? (completedModules.length / trackModules.length) * 100 : 0,
    }
  }

  const tracks: Array<'physician' | 'chiropractor' | 'trainer'> = ['physician', 'chiropractor', 'trainer']

  if (progressLoading || certsLoading) {
    return <LoadingSpinner fullHeight />
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || user?.email}
        </h1>
        <p className="mt-2 text-gray-600">
          Track your learning progress and manage your certificates.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {progress?.sections_completed.length || 0}
              </p>
              <p className="text-sm text-gray-500">Sections completed</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Object.keys(progress?.quizzes_passed || {}).length}
              </p>
              <p className="text-sm text-gray-500">Quizzes passed</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {certificates.length}
              </p>
              <p className="text-sm text-gray-500">Certificates earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Track Progress */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Track Progress</h2>
        <div className="space-y-6">
          {tracks.map(track => {
            const trackProgress = getTrackProgress(track)
            const trackInfo = getTrackInfo(track)
            const hasCertificate = certificates.some(c => c.track === track)

            return (
              <div key={track} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{trackInfo.title}</h3>
                    <p className="text-sm text-gray-500">
                      {trackProgress.completed} of {trackProgress.total} modules complete
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {hasCertificate && (
                      <span className="flex items-center gap-1 text-sm text-green-600">
                        <Award className="w-4 h-4" />
                        Certified
                      </span>
                    )}
                    <Link
                      to={`/track/${track}`}
                      className="text-sm text-primary-600 hover:underline"
                    >
                      Continue →
                    </Link>
                  </div>
                </div>
                <ProgressIndicator progress={trackProgress.percent} showLabel={false} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {progress && progress.sections_completed.length > 0 && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {progress.sections_completed.slice(-5).reverse().map((section, idx) => {
              const module = modules.find(m => m.id === section.module_id)
              const sectionInfo = module?.sections.find(s => s.slug === section.section_slug)

              return (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-900">
                    Completed "{sectionInfo?.title || section.section_slug}"
                  </span>
                  <span className="text-gray-400">
                    {new Date(section.completed_at).toLocaleDateString()}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Certificates CTA */}
      {certificates.length > 0 && (
        <div className="card p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                You have {certificates.length} certificate{certificates.length > 1 ? 's' : ''}!
              </h3>
              <p className="text-sm text-gray-600">
                Download and share your achievements.
              </p>
            </div>
            <Link to="/certificates" className="btn-primary">
              View Certificates
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
