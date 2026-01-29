import { Link } from 'react-router-dom'
import { Menu, X, User, LogOut, LayoutDashboard, Award, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/auth/AuthProvider'

export default function Navigation() {
  const { user, isAuthenticated, login, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-bodyspec-blue">BodySpec</span>
              <span className="ml-2 text-sm text-gray-500">Learn</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <Link
                to="/track/physician"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Physicians
              </Link>
              <Link
                to="/track/chiropractor"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Chiropractors
              </Link>
              <Link
                to="/track/trainer"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Trainers
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{user?.name || user?.email}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      to="/certificates"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Award className="h-4 w-4" />
                      Certificates
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        logout()
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={login} className="btn-primary">
                Sign In
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden ml-4 p-2 text-gray-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/track/physician"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Physicians
            </Link>
            <Link
              to="/track/chiropractor"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Chiropractors
            </Link>
            <Link
              to="/track/trainer"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trainers
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
