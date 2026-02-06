import { Link } from 'react-router-dom'
import { Clock, CheckCircle, Circle } from 'lucide-react'
import type { Module } from '@/types'

interface ModuleCardProps {
  module: Module
  isComplete?: boolean
  sectionsComplete?: number
}

export default function ModuleCard({ module, isComplete, sectionsComplete = 0 }: ModuleCardProps) {
  const totalSections = module.sections.length
  const progress = totalSections > 0 ? (sectionsComplete / totalSections) * 100 : 0

  return (
    <Link to={`/module/${module.id}`} className="card-hover block p-6 no-underline hover:no-underline group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {isComplete ? (
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
            )}
            <h3 className="text-lg font-semibold text-gray-900 group-hover:underline">{module.title}</h3>
          </div>
          {module.description && (
            <p className="mt-2 text-sm text-gray-600 group-hover:underline">{module.description}</p>
          )}
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {module.estimated_minutes} min
            </span>
            <span>{totalSections} sections</span>
            {module.is_deep_dive && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                Deep Dive
              </span>
            )}
          </div>
        </div>
      </div>
      {progress > 0 && progress < 100 && (
        <div className="mt-4">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-salad-100 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {sectionsComplete} of {totalSections} sections complete
          </p>
        </div>
      )}
    </Link>
  )
}
