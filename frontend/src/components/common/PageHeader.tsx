import { ReactNode } from 'react'
import BackLink from './BackLink'

interface PageHeaderProps {
  title: string
  description?: string
  backTo?: string
  backLabel?: string
  badge?: ReactNode
  children?: ReactNode
}

export default function PageHeader({
  title,
  description,
  backTo,
  backLabel,
  badge,
  children,
}: PageHeaderProps) {
  return (
    <div>
      {backTo && backLabel && <BackLink to={backTo} label={backLabel} className="mb-4" />}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-bs-dark">{title}</h1>
          {description && <p className="mt-2 text-bs-dark55">{description}</p>}
        </div>
        {badge}
      </div>
      {children}
    </div>
  )
}
