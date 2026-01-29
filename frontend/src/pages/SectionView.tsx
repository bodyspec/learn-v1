import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { getModule, getSectionContent } from '@/content'
import SectionContent from '@/components/SectionContent'
import { useProgress } from '@/hooks/useProgress'
import { useAuth } from '@/auth/AuthProvider'
import { markSectionComplete } from '@/api/progress'
import { NotFound, BackLink, SignInPrompt } from '@/components/common'

export default function SectionView() {
  const { moduleId, sectionSlug } = useParams<{ moduleId: string; sectionSlug: string }>()
  const navigate = useNavigate()
  const { token, isAuthenticated } = useAuth()
  const { progress, refetch } = useProgress()

  if (!moduleId || !sectionSlug) {
    return <NotFound title="Section Not Found" />
  }

  const module = getModule(moduleId)
  if (!module) {
    return <NotFound title="Module Not Found" />
  }

  const sectionIndex = module.sections.findIndex(s => s.slug === sectionSlug)
  if (sectionIndex === -1) {
    return (
      <NotFound
        title="Section Not Found"
        backTo={`/module/${moduleId}`}
        backLabel="Back to Module"
      />
    )
  }

  const section = module.sections[sectionIndex]
  const content = getSectionContent(moduleId, sectionSlug)

  const prevSection = sectionIndex > 0 ? module.sections[sectionIndex - 1] : null
  const nextSection = sectionIndex < module.sections.length - 1 ? module.sections[sectionIndex + 1] : null
  const isLastSection = !nextSection

  const isComplete = progress?.sections_completed.some(
    s => s.module_id === moduleId && s.section_slug === sectionSlug
  )

  const handleContinue = async () => {
    // If authenticated, mark section complete
    if (token) {
      try {
        await markSectionComplete(token, moduleId, sectionSlug)
        await refetch()
      } catch (error) {
        console.error('Failed to mark section complete:', error)
      }
    }

    // Navigate regardless of auth status
    if (nextSection) {
      navigate(`/module/${moduleId}/${nextSection.slug}`)
    } else {
      navigate(`/module/${moduleId}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <BackLink to={`/module/${moduleId}`} label={`Back to ${module.title}`} className="mb-8" />

      <div className="card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Section {sectionIndex + 1} of {module.sections.length}
            </p>
            <h1 className="text-2xl font-bold text-gray-900">{section.title}</h1>
          </div>
          {isComplete && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              <CheckCircle className="w-4 h-4" />
              Complete
            </div>
          )}
        </div>

        {content ? (
          <SectionContent content={content} />
        ) : (
          <div className="py-12 text-center text-gray-500">
            Content not available yet.
          </div>
        )}

        {/* Sign in prompt for unauthenticated users - subtle, non-blocking */}
        {!isAuthenticated && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <SignInPrompt />
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              {prevSection ? (
                <Link
                  to={`/module/${moduleId}/${prevSection.slug}`}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <span />
              )}
            </div>

            <button onClick={handleContinue} className="btn-primary inline-flex items-center gap-2">
              {isLastSection ? (
                'Finish & View Module'
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
