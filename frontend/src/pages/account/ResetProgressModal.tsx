import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useResetProgress } from '@/hooks/queries'
import { useProgress, useCertificates } from '@/hooks/queries'

interface ResetProgressModalProps {
  onClose: () => void
}

export default function ResetProgressModal({ onClose }: ResetProgressModalProps) {
  const { progress } = useProgress()
  const { certificates } = useCertificates()
  const resetProgress = useResetProgress()

  const [sections, setSections] = useState(false)
  const [quizzes, setQuizzes] = useState(false)
  const [certs, setCerts] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const sectionsCount = progress?.sections_completed?.length ?? 0
  const quizzesCount = Object.keys(progress?.quizzes_passed ?? {}).length
  const certsCount = certificates?.length ?? 0

  const anySelected = sections || quizzes || certs
  const confirmed = confirmText === 'RESET'
  const canSubmit = anySelected && confirmed && !resetProgress.isPending

  const handleSubmit = async () => {
    setError(null)
    try {
      await resetProgress.mutateAsync({ sections, quizzes, certificates: certs })
      onClose()
    } catch {
      setError('Failed to reset progress. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
          <h3 className="text-lg font-semibold text-bs-dark">Reset Progress</h3>
        </div>

        <p className="text-sm text-bs-dark55 mb-4">
          This action cannot be undone. All selected progress will be permanently deleted.
        </p>

        <div className="space-y-3 mb-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={sections} onChange={(e) => setSections(e.target.checked)} className="rounded" />
            <span className="text-sm text-bs-dark">
              Section progress <span className="text-bs-dark55">({sectionsCount} sections completed)</span>
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={quizzes} onChange={(e) => setQuizzes(e.target.checked)} className="rounded" />
            <span className="text-sm text-bs-dark">
              Quiz attempts <span className="text-bs-dark55">({quizzesCount} quizzes passed)</span>
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={certs} onChange={(e) => setCerts(e.target.checked)} className="rounded" />
            <span className="text-sm text-bs-dark">
              Certificates <span className="text-bs-dark55">({certsCount} certificates earned)</span>
            </span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-bs-dark55 mb-1">Type RESET to confirm</label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="RESET"
            className="w-full px-3 py-2 border border-bs-dark15 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="btn-outline text-sm">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resetProgress.isPending ? 'Resetting...' : 'Reset Progress'}
          </button>
        </div>
      </div>
    </div>
  )
}
