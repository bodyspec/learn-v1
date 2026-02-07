import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

interface TrackCardProps {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export default function TrackCard({ id, title, description, icon: Icon }: TrackCardProps) {
  return (
    <Link to={`/track/${id}`} className="card-hover block p-6 no-underline hover:no-underline group">
      <Icon className="w-8 h-8 text-bs-dark mb-4" />
      <h3 className="text-lg font-semibold text-bs-dark group-hover:underline">{title}</h3>
      <p className="mt-2 text-bs-dark/80 text-sm group-hover:underline">{description}</p>
      <div className="mt-4 text-sm font-medium text-salad-100">
        Start learning →
      </div>
    </Link>
  )
}
