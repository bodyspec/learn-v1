import { LogIn } from 'lucide-react'
import { useAuth } from '@/auth/AuthProvider'

interface SignInPromptProps {
  message?: string
  compact?: boolean
}

export default function SignInPrompt({
  message = 'Sign in to track your progress and earn certificates.',
  compact = false,
}: SignInPromptProps) {
  const { login } = useAuth()

  if (compact) {
    return (
      <button
        onClick={login}
        className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
      >
        <LogIn className="w-4 h-4" />
        Sign in to save progress
      </button>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
      <p className="text-sm text-blue-700">{message}</p>
      <button onClick={login} className="btn-primary text-sm py-1.5 px-3">
        Sign In
      </button>
    </div>
  )
}
