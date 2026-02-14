import { Link } from 'react-router-dom'
import { Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import logo from '@/assets/logo.svg'

export default function Navigation() {
  const { isAuthenticated, login } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-bs-dark15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center no-underline">
              <img src={logo} alt="BodySpec Learn" className="h-7" />
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                to="/track/physician"
                className="text-sm font-medium text-bs-dark hover:text-bs-dark55 no-underline"
              >
                Physicians
              </Link>
              <Link
                to="/track/chiropractor"
                className="text-sm font-medium text-bs-dark hover:text-bs-dark55 no-underline"
              >
                Chiropractors
              </Link>
              <Link
                to="/track/trainer"
                className="text-sm font-medium text-bs-dark hover:text-bs-dark55 no-underline"
              >
                Trainers
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <Link
                to="/account/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-bs-dark hover:text-bs-dark55 no-underline"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Account</span>
              </Link>
            ) : (
              <button onClick={login} className="text-sm font-medium text-bs-dark hover:text-bs-dark55 flex items-center gap-1">
                Sign in <span aria-hidden="true">→</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden ml-4 p-2 text-bs-dark"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-bs-dark15">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/track/physician"
              className="block px-3 py-2 text-base font-medium text-bs-dark hover:bg-bs-dark3 rounded-lg no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Physicians
            </Link>
            <Link
              to="/track/chiropractor"
              className="block px-3 py-2 text-base font-medium text-bs-dark hover:bg-bs-dark3 rounded-lg no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Chiropractors
            </Link>
            <Link
              to="/track/trainer"
              className="block px-3 py-2 text-base font-medium text-bs-dark hover:bg-bs-dark3 rounded-lg no-underline"
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
