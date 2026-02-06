interface ProgressIndicatorProps {
  progress: number // 0-100
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export default function ProgressIndicator({
  progress,
  size = 'md',
  showLabel = true,
}: ProgressIndicatorProps) {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className="w-full">
      <div className={`bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className="h-full bg-salad-100 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-gray-500 text-right">{Math.round(progress)}% complete</p>
      )}
    </div>
  )
}
