import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ModuleList from './pages/ModuleList'
import ModuleView from './pages/ModuleView'
import SectionView from './pages/SectionView'
import QuizPage from './pages/QuizPage'
import VerifyPage from './pages/VerifyPage'
import AccountLayout from './pages/account/AccountLayout'
import Dashboard from './pages/Dashboard'
import CertificatesPage from './pages/CertificatesPage'
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

        {/* Account portal - protected routes with sidebar layout */}
        <Route path="account" element={<AccountLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin" element={<div className="text-bs-dark55">Admin panel — coming soon</div>} />
          <Route path="admin/users/:userId" element={<div className="text-bs-dark55">User detail — coming soon</div>} />
        </Route>

        {/* Redirects from old routes */}
        <Route path="dashboard" element={<Navigate to="/account/dashboard" replace />} />
        <Route path="certificates" element={<Navigate to="/account/certificates" replace />} />
        <Route path="profile" element={<Navigate to="/account/profile" replace />} />
      </Route>
    </Routes>
  )
}

export default App
