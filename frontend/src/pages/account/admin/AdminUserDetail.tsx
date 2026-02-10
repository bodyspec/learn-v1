import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Shield, ShieldOff, Trash2 } from 'lucide-react'
import { useAuth } from '@/auth/AuthProvider'
import { useAdminUserDetail, usePromoteUser, useDemoteUser, useDeleteUser } from '@/hooks/queries'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminUserDetail() {
  const { userId } = useParams<{ userId: string }>()
  const { user: currentUser } = useAuth()
  const navigate = useNavigate()
  const { data: user, isLoading } = useAdminUserDetail(userId!)
  const promote = usePromoteUser()
  const demote = useDemoteUser()
  const deleteUser = useDeleteUser()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-salad-100" />
      </div>
    )
  }

  if (!user) {
    return <p className="text-bs-dark55">User not found.</p>
  }

  const handleDelete = async () => {
    await deleteUser.mutateAsync(user.id)
    navigate('/account/admin')
  }

  return (
    <div>
      <Link to="/account/admin" className="inline-flex items-center gap-1 text-sm text-bs-dark55 hover:text-bs-dark no-underline mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to users
      </Link>

      {/* Header */}
      <div className="card p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user.name || 'Unnamed User'}
              {user.is_admin && <span className="ml-3 text-sm bg-salad-60 text-bs-dark px-2 py-1 rounded">Admin</span>}
            </h1>
            <p className="text-bs-dark55 mt-1">{user.email}</p>
            <div className="flex gap-4 mt-2 text-sm text-bs-dark55">
              {user.role_type && <span className="capitalize">{user.role_type}</span>}
              <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
              {user.last_login && <span>Last login {new Date(user.last_login).toLocaleDateString()}</span>}
            </div>
          </div>
          <div className="flex gap-2">
            {user.is_admin ? (
              user.id !== currentUser?.id && (
                <button
                  onClick={() => demote.mutate(user.id)}
                  disabled={demote.isPending}
                  className="btn-outline inline-flex items-center gap-2 text-sm"
                >
                  <ShieldOff className="h-4 w-4" /> Demote
                </button>
              )
            ) : (
              <>
                {user.email.endsWith('@bodyspec.com') && (
                  <button
                    onClick={() => promote.mutate(user.id)}
                    disabled={promote.isPending}
                    className="btn-primary inline-flex items-center gap-2 text-sm"
                  >
                    <Shield className="h-4 w-4" /> Promote to Admin
                  </button>
                )}
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 inline-flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-bs-dark3 rounded-lg">
            <p className="text-2xl font-bold text-bs-dark">{user.sections_completed}</p>
            <p className="text-xs text-bs-dark55">Sections completed</p>
          </div>
          <div className="text-center p-3 bg-bs-dark3 rounded-lg">
            <p className="text-2xl font-bold text-bs-dark">{user.quizzes_passed}</p>
            <p className="text-xs text-bs-dark55">Quizzes passed</p>
          </div>
          <div className="text-center p-3 bg-bs-dark3 rounded-lg">
            <p className="text-2xl font-bold text-bs-dark">{user.certificates_count}</p>
            <p className="text-xs text-bs-dark55">Certificates</p>
          </div>
        </div>
      </div>

      {/* Module Progress */}
      {user.module_progress.length > 0 && (
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-bs-dark mb-4">Module Progress</h2>
          <div className="space-y-3">
            {user.module_progress.map((mp) => (
              <div key={mp.module_id} className="flex justify-between items-center">
                <span className="text-sm text-bs-dark capitalize">{mp.module_id}</span>
                <span className="text-sm text-bs-dark55">{mp.sections_completed} sections</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Attempts */}
      {user.quiz_attempts.length > 0 && (
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-bs-dark mb-4">Quiz Attempts</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bs-dark15 text-left text-bs-dark55">
                <th className="pb-2 font-medium">Module</th>
                <th className="pb-2 font-medium text-right">Score</th>
                <th className="pb-2 font-medium text-right">Result</th>
                <th className="pb-2 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {user.quiz_attempts.map((qa) => (
                <tr key={qa.id} className="border-b border-bs-dark15">
                  <td className="py-2 capitalize">{qa.module_id}</td>
                  <td className="py-2 text-right">{qa.score}%</td>
                  <td className="py-2 text-right">
                    <span className={qa.passed ? 'text-green-600' : 'text-red-600'}>
                      {qa.passed ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                  <td className="py-2 text-right text-bs-dark55">
                    {new Date(qa.attempted_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Certificates */}
      {user.certificates.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-bs-dark mb-4">Certificates</h2>
          <div className="space-y-3">
            {user.certificates.map((cert) => (
              <div key={cert.id} className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-bs-dark capitalize">{cert.track}</span>
                  <span className="ml-2 text-xs text-bs-dark55">{cert.certificate_uid}</span>
                </div>
                <span className="text-sm text-bs-dark55">
                  {new Date(cert.issued_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-bs-dark mb-2">Delete User</h3>
            <p className="text-sm text-bs-dark55 mb-4">
              Are you sure you want to permanently delete <strong>{user.name || user.email}</strong>?
              This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowDeleteModal(false)} className="btn-outline text-sm">Cancel</button>
              <button
                onClick={handleDelete}
                disabled={deleteUser.isPending}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
              >
                {deleteUser.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
