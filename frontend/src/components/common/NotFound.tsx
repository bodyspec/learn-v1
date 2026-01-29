import { Link } from 'react-router-dom'

interface NotFoundProps {
  title: string
  message?: string
  backTo?: string
  backLabel?: string
}

export default function NotFound({
  title,
  message,
  backTo = '/',
  backLabel = 'Back to Home',
}: NotFoundProps) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {message && <p className="mt-2 text-gray-600">{message}</p>}
      <Link to={backTo} className="mt-4 btn-primary inline-block">
        {backLabel}
      </Link>
    </div>
  )
}
