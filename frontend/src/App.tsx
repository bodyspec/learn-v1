import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './auth/ProtectedRoute'
import Home from './pages/Home'
import ModuleList from './pages/ModuleList'
import ModuleView from './pages/ModuleView'
import SectionView from './pages/SectionView'
import QuizPage from './pages/QuizPage'
import Dashboard from './pages/Dashboard'
import CertificatesPage from './pages/CertificatesPage'
import VerifyPage from './pages/VerifyPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes - all content is freely accessible */}
        <Route index element={<Home />} />
        <Route path="track/:track" element={<ModuleList />} />
        <Route path="module/:moduleId" element={<ModuleView />} />
        <Route path="module/:moduleId/:sectionSlug" element={<SectionView />} />
        <Route path="quiz/:moduleId" element={<QuizPage />} />
        <Route path="verify/:certificateUid" element={<VerifyPage />} />

        {/* Protected routes - require authentication */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="certificates" element={
          <ProtectedRoute>
            <CertificatesPage />
          </ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App
