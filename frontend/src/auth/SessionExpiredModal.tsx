import { LogIn } from 'lucide-react'

interface SessionExpiredModalProps {
  onSignIn: () => void
}

export default function SessionExpiredModal({ onSignIn }: SessionExpiredModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 text-center">
        <LogIn className="h-10 w-10 text-bs-navy mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-bs-dark mb-2">Session Expired</h3>
        <p className="text-sm text-bs-dark55 mb-6">
          Your session has expired. Please sign in again to continue.
        </p>
        <button onClick={onSignIn} className="btn-primary w-full">
          Sign in again
        </button>
      </div>
    </div>
  )
}
