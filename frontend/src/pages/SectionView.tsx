import { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { getModule, getSectionContent, getQuiz } from '@/content'
import SectionContent from '@/components/SectionContent'
import { useProgress, useMarkSectionComplete } from '@/hooks/queries'
import { useAuth } from '@/auth/AuthProvider'
import { NotFound, BackLink, SignInPrompt } from '@/components/common'
import { useSectionReadTracker } from '@/hooks/useSectionReadTracker'

export default function SectionView() {
  const { moduleId, sectionSlug } = useParams<{ moduleId: string; sectionSlug: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { token, isAuthenticated } = useAuth()
  const { progress } = useProgress()
  const markComplete = useMarkSectionComplete()
  const contentRef = useRef<HTMLDivElement>(null)
  const fromTrack = (location.state as { fromTrack?: string })?.fromTrack

  const isComplete = !!progress?.sections_completed.some(
    s => s.module_id === moduleId && s.section_slug === sectionSlug
  )

  useSectionReadTracker(moduleId ?? '', sectionSlug ?? '', contentRef, isComplete)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [sectionSlug])

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

  const content = getSectionContent(moduleId, sectionSlug)
  const quiz = getQuiz(moduleId)

  const nextSection = sectionIndex < module.sections.length - 1 ? module.sections[sectionIndex + 1] : null
  const isLastSection = !nextSection

  const completedSlugs = new Set(
    progress?.sections_completed
      .filter(s => s.module_id === moduleId)
      .map(s => s.section_slug) ?? []
  )

  // All sections will be complete after marking the current one
  const allSectionsWillBeComplete = module.sections.every(s =>
    s.slug === sectionSlug || completedSlugs.has(s.slug)
  )

  const stateForModule = fromTrack ? { fromTrack } : undefined
  const stateForSection = fromTrack ? { fromTrack } : undefined

  const handleContinue = async () => {
    if (token) {
      try {
        await markComplete.mutateAsync({ moduleId, sectionSlug })
      } catch (error) {
        console.error('Failed to mark section complete:', error)
      }
    }

    if (nextSection) {
      navigate(`/module/${moduleId}/${nextSection.slug}`, { state: stateForSection })
    } else if (allSectionsWillBeComplete && quiz) {
      navigate(`/quiz/${moduleId}`, { state: fromTrack ? { fromTrack } : undefined })
    } else {
      navigate(`/module/${moduleId}`, { state: stateForModule })
    }
  }

  return (
    <div>
      <BackLink
        to={`/module/${moduleId}`}
        label={`Back to ${module.title}`}
        state={stateForModule}
        className="mb-8"
      />

      <div ref={contentRef} className="card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Section {sectionIndex + 1} of {module.sections.length}
            </p>
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
            <Link
              to={`/module/${moduleId}`}
              state={stateForModule}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Module
            </Link>

            <button onClick={handleContinue} className="btn-primary inline-flex items-center gap-2">
              {isLastSection && allSectionsWillBeComplete && quiz ? (
                <>
                  Take Quiz
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : isLastSection ? (
                'Finish'
              ) : (
                <>
                  Next Section
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
