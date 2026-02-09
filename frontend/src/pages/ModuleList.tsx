import { useParams } from 'react-router-dom'
import ModuleCard from '@/components/ModuleCard'
import { getModulesByTrack, getTrackInfo } from '@/content'
import { useProgress } from '@/hooks/queries'
import { NotFound, BackLink, LoadingSpinner } from '@/components/common'
import type { Track } from '@/types'

export default function ModuleList() {
  const { track } = useParams<{ track: Track }>()
  const { progress, isLoading } = useProgress()

  const validTracks: Track[] = ['physician', 'chiropractor', 'trainer']

  if (!track || !validTracks.includes(track as Track)) {
    return <NotFound title="Track Not Found" />
  }

  const modules = getModulesByTrack(track)
  const trackInfo = getTrackInfo(track)

  // Separate core and track-specific modules
  const coreModules = modules.filter(m => m.track === 'core')
  const trackModules = modules.filter(m => m.track === track)

  const getModuleProgress = (moduleId: string) => {
    if (!progress) return { isComplete: false, sectionsComplete: 0 }
    const completedSections = progress.sections_completed.filter(s => s.module_id === moduleId)
    const hasPassed = progress.quizzes_passed[moduleId] !== undefined
    return {
      isComplete: hasPassed,
      sectionsComplete: completedSections.length,
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <BackLink to="/" label="Back to Home" className="mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">{trackInfo.title}</h1>
        <p className="mt-2 text-lg text-gray-600">{trackInfo.description}</p>
      </div>

      {coreModules.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Fundamentals</h2>
          <p className="text-gray-600 mb-4">
            Start here to learn the basics of DEXA body composition analysis.
          </p>
          <div className="space-y-4">
            {coreModules.map(module => {
              const { isComplete, sectionsComplete } = getModuleProgress(module.id)
              return (
                <ModuleCard
                  key={module.id}
                  module={module}
                  isComplete={isComplete}
                  sectionsComplete={sectionsComplete}
                  fromTrack={track}
                />
              )
            })}
          </div>
        </div>
      )}

      {trackModules.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {track === 'physician' && 'Clinical Applications'}
            {track === 'chiropractor' && 'Practice Integration'}
            {track === 'trainer' && 'Training Applications'}
          </h2>
          <p className="text-gray-600 mb-4">
            Specialized content for your professional context.
          </p>
          <div className="space-y-4">
            {trackModules.map(module => {
              const { isComplete, sectionsComplete } = getModuleProgress(module.id)
              return (
                <ModuleCard
                  key={module.id}
                  module={module}
                  isComplete={isComplete}
                  sectionsComplete={sectionsComplete}
                  fromTrack={track}
                />
              )
            })}
          </div>
        </div>
      )}

      {isLoading && <LoadingSpinner message="Loading progress..." />}
    </div>
  )
}
