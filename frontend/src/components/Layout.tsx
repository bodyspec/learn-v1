import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <main className="flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>
      <footer className="bg-bs-dark mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-white/70 w-full">
            <p>&copy; {new Date().getFullYear()} BodySpec. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.bodyspec.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white no-underline">
                BodySpec.com
              </a>
              <a href="https://www.bodyspec.com/privacy" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white no-underline">
                Privacy
              </a>
              <a href="https://www.bodyspec.com/terms" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white no-underline">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
