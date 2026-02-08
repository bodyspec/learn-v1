import { useParams, useNavigate, Link } from 'react-router-dom'
import { Clock, CheckCircle, Circle, FileQuestion } from 'lucide-react'
import { getModule, getQuiz } from '@/content'
import { useProgress } from '@/hooks/queries'
import ProgressIndicator from '@/components/ProgressIndicator'
import { NotFound, BackLink, SignInPrompt } from '@/components/common'

export default function ModuleView() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const { progress, isAuthenticated } = useProgress()

  if (!moduleId) {
    return <NotFound title="Module Not Found" />
  }

  const module = getModule(moduleId)
  const quiz = getQuiz(moduleId)

  if (!module) {
    return <NotFound title="Module Not Found" />
  }

  const completedSections = progress?.sections_completed.filter(s => s.module_id === moduleId) || []
  const completedSlugs = new Set(completedSections.map(s => s.section_slug))
  const progressPercent = module.sections.length > 0
    ? (completedSections.length / module.sections.length) * 100
    : 0

  const hasPassed = progress?.quizzes_passed[moduleId] !== undefined

  const trackLabel = module.track === 'core' ? 'Core Track' : `${module.track.charAt(0).toUpperCase() + module.track.slice(1)} Track`

  return (
    <div className="max-w-4xl mx-auto">
      <BackLink to={`/track/${module.track}`} label={`Back to ${trackLabel}`} className="mb-6" />

      <div className="card p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
            {module.description && (
              <p className="mt-2 text-lg text-gray-600">{module.description}</p>
            )}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {module.estimated_minutes} minutes
              </span>
              <span>{module.sections.length} sections</span>
              {module.is_deep_dive && (
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                  Deep Dive
                </span>
              )}
            </div>
          </div>
          {hasPassed && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              <CheckCircle className="w-4 h-4" />
              Complete
            </div>
          )}
        </div>

        {isAuthenticated && (
          <div className="mt-6">
            <ProgressIndicator progress={progressPercent} />
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sections</h2>
          <div className="space-y-2">
            {module.sections.map((section, index) => {
              const isComplete = completedSlugs.has(section.slug)
              return (
                <Link
                  key={section.slug}
                  to={`/module/${moduleId}/${section.slug}`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-salad-80 hover:bg-gray-50 transition-colors"
                >
                  {isComplete ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                  )}
                  <span className="text-gray-500 text-sm w-6">{index + 1}.</span>
                  <span className="text-gray-900">{section.title}</span>
                </Link>
              )
            })}
          </div>
          {(() => {
            const allComplete = module.sections.length > 0 && module.sections.every(s => completedSlugs.has(s.slug))
            if (allComplete) return null
            const firstIncomplete = module.sections.find(s => !completedSlugs.has(s.slug))
            const target = firstIncomplete || module.sections[0]
            const hasStarted = completedSections.length > 0
            return (
              <Link
                to={`/module/${moduleId}/${target.slug}`}
                className="mt-6 btn-primary inline-block text-center"
              >
                {hasStarted ? 'Continue' : 'Get Started'}
              </Link>
            )
          })()}
        </div>

        {quiz && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileQuestion className="w-6 h-6 text-salad-100" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Module Quiz</h2>
                  <p className="text-sm text-gray-600">
                    {quiz.questions.length} questions • {quiz.passing_score}% to pass
                  </p>
                </div>
              </div>
              {hasPassed ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Passed
                </span>
              ) : (
                <button
                  onClick={() => navigate(`/quiz/${moduleId}`)}
                  className="btn-primary"
                >
                  Take Quiz
                </button>
              )}
            </div>
          </div>
        )}

        {/* Sign in prompt for unauthenticated users - subtle, non-blocking */}
        {!isAuthenticated && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <SignInPrompt />
          </div>
        )}
      </div>
    </div>
  )
}
