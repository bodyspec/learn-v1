import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface BackLinkProps {
  to: string
  label: string
  className?: string
}

export default function BackLink({ to, label, className = 'mb-6' }: BackLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 text-bs-dark55 hover:text-bs-dark ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Link>
  )
}
