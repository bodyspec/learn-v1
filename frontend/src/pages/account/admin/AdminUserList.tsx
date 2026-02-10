import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, ShieldOff, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '@/auth/AuthProvider'
import { useAdminUsers, usePromoteUser, useDemoteUser, useDeleteUser } from '@/hooks/queries'
import type { AdminUserSummary } from '@/api/admin'

export default function AdminUserList() {
  const { user: currentUser } = useAuth()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<AdminUserSummary | null>(null)

  const { data, isLoading } = useAdminUsers(page, search)
  const promote = usePromoteUser()
  const demote = useDemoteUser()
  const deleteUser = useDeleteUser()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteUser.mutateAsync(deleteTarget.id)
    setDeleteTarget(null)
  }

  const totalPages = data ? Math.ceil(data.total / data.per_page) : 0

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bs-dark55" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-bs-dark15 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-salad-100"
          />
        </div>
        <button type="submit" className="btn-primary text-sm">Search</button>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-salad-100" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bs-dark15 text-left text-bs-dark55">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium text-right">Progress</th>
                  <th className="pb-3 font-medium text-right">Certs</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.users.map((u) => (
                  <tr key={u.id} className="border-b border-bs-dark15 hover:bg-bs-dark3">
                    <td className="py-3">
                      <Link to={`/account/admin/users/${u.id}`} className="text-bs-dark hover:text-salad-100 no-underline font-medium">
                        {u.name || '—'}
                        {u.is_admin && <span className="ml-2 text-xs bg-salad-60 text-bs-dark px-1.5 py-0.5 rounded">Admin</span>}
                      </Link>
                    </td>
                    <td className="py-3 text-bs-dark55">{u.email}</td>
                    <td className="py-3 text-bs-dark55 capitalize">{u.role_type || '—'}</td>
                    <td className="py-3 text-right text-bs-dark55">{u.sections_completed} sections</td>
                    <td className="py-3 text-right text-bs-dark55">{u.certificates_count}</td>
                    <td className="py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        {u.is_admin ? (
                          u.id !== currentUser?.id && (
                            <button
                              onClick={() => demote.mutate(u.id)}
                              disabled={demote.isPending}
                              className="p-1.5 text-bs-dark55 hover:text-orange-600 rounded"
                              title="Demote admin"
                            >
                              <ShieldOff className="h-4 w-4" />
                            </button>
                          )
                        ) : (
                          <>
                            {u.email.endsWith('@bodyspec.com') && (
                              <button
                                onClick={() => promote.mutate(u.id)}
                                disabled={promote.isPending}
                                className="p-1.5 text-bs-dark55 hover:text-salad-100 rounded"
                                title="Promote to admin"
                              >
                                <Shield className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => setDeleteTarget(u)}
                              className="p-1.5 text-bs-dark55 hover:text-red-600 rounded"
                              title="Delete user"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-bs-dark55">{data?.total} users total</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-2 border border-bs-dark15 rounded disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="flex items-center text-sm text-bs-dark55">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-2 border border-bs-dark15 rounded disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-bs-dark mb-2">Delete User</h3>
            <p className="text-sm text-bs-dark55 mb-4">
              Are you sure you want to permanently delete <strong>{deleteTarget.name || deleteTarget.email}</strong>?
              This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteTarget(null)} className="btn-outline text-sm">Cancel</button>
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
