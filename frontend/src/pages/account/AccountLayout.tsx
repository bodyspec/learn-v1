import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider'
import AccountSidebar from './AccountSidebar'

export default function AccountLayout() {
  const { isAuthenticated, isLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-salad-100"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 min-h-0">
      <AccountSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(false)} />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-5xl w-full">
        <Outlet />
      </main>
    </div>
  )
}
