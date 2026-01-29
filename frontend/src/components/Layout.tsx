import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} BodySpec. All rights reserved.</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="https://www.bodyspec.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                BodySpec.com
              </a>
              <a href="https://www.bodyspec.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                Privacy
              </a>
              <a href="https://www.bodyspec.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
