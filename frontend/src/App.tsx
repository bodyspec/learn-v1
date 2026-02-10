import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ContentLayout from './components/ContentLayout'
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
import AdminUserList from './pages/account/admin/AdminUserList'
import AdminUserDetail from './pages/account/admin/AdminUserDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes - full width (max-w-7xl from Layout) */}
        <Route index element={<Home />} />
        <Route path="verify/:certificateUid" element={<VerifyPage />} />

        {/* Content learning pages - narrower width (max-w-4xl) */}
        <Route element={<ContentLayout />}>
          <Route path="track/:track" element={<ModuleList />} />
          <Route path="module/:moduleId" element={<ModuleView />} />
          <Route path="module/:moduleId/:sectionSlug" element={<SectionView />} />
          <Route path="quiz/:moduleId" element={<QuizPage />} />
        </Route>

        {/* Account portal - protected routes with sidebar layout */}
        <Route path="account" element={<AccountLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin" element={<AdminUserList />} />
          <Route path="admin/users/:userId" element={<AdminUserDetail />} />
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
