import { Outlet } from 'react-router-dom'

export default function ContentLayout() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <Outlet />
    </div>
  )
}
