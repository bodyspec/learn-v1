import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Award, User, Shield, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '@/auth/AuthProvider'

interface AccountSidebarProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

const navItems = [
  { to: '/account/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/account/certificates', label: 'Certificates', icon: Award },
  { to: '/account/profile', label: 'Profile', icon: User },
]

export default function AccountSidebar({ isOpen, onToggle, onClose }: AccountSidebarProps) {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  const linkClasses = (path: string) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-medium no-underline transition-colors ${
      isActive(path)
        ? 'border-l-3 border-salad-100 bg-bs-dark3 text-bs-dark'
        : 'border-l-3 border-transparent text-bs-dark55 hover:bg-bs-dark3 hover:text-bs-dark'
    }`

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-bs-dark15">
        <p className="text-sm font-semibold text-bs-dark truncate">{user?.name || 'Account'}</p>
        <p className="text-xs text-bs-dark55 truncate">{user?.email}</p>
      </div>

      <nav className="flex-1 py-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className={linkClasses(to)} onClick={onClose}>
            <Icon className="h-5 w-5 flex-shrink-0" />
            {label}
          </Link>
        ))}
        {user?.is_admin && (
          <Link to="/account/admin" className={linkClasses('/account/admin')} onClick={onClose}>
            <Shield className="h-5 w-5 flex-shrink-0" />
            Admin
          </Link>
        )}
      </nav>

      <div className="border-t border-bs-dark15 py-2">
        <button
          onClick={() => { onClose(); logout() }}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-bs-dark55 hover:bg-bs-dark3 hover:text-bs-dark transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="md:hidden flex items-center px-4 py-3 border-b border-bs-dark15 bg-white">
        <button onClick={onToggle} className="p-1 text-bs-dark">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <span className="ml-3 text-sm font-semibold text-bs-dark">Account</span>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-bs-dark15 bg-white">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white z-50 md:hidden shadow-lg">
            {sidebar}
          </aside>
        </>
      )}
    </>
  )
}
