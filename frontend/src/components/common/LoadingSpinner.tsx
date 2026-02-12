interface LoadingSpinnerProps {
  message?: string
  fullHeight?: boolean
}

export default function LoadingSpinner({ message, fullHeight = true }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${fullHeight ? 'min-h-[50vh]' : 'py-8'}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-salad-100" />
      {message && <p className="mt-4 text-bs-dark55">{message}</p>}
    </div>
  )
}
