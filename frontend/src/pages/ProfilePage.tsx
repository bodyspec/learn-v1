import { useState } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import { useUpdateProfile } from '@/hooks/queries'
import type { RoleType } from '@/types'
import ResetProgressModal from './account/ResetProgressModal'

export default function ProfilePage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [roleType, setRoleType] = useState<RoleType | ''>(user?.role_type || '')
  const [organization, setOrganization] = useState(user?.organization || '')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [showReset, setShowReset] = useState(false)
  const updateProfile = useUpdateProfile()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    try {
      await updateProfile.mutateAsync({
        name: name || null,
        role_type: roleType || null,
        organization: organization || null,
      })
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch {
      setMessage({ type: 'error', text: 'Failed to update profile' })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-bs-dark">Profile Settings</h1>

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-bs-dark">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user?.email || ''}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-bs-dark15 rounded-lg bg-bs-dark3 text-bs-dark55"
            />
            <p className="mt-1 text-xs text-bs-dark55">
              Email is managed by your identity provider and cannot be changed here.
            </p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-bs-dark">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-bs-dark15 rounded-lg focus:ring-salad-100 focus:border-salad-100"
              placeholder="Dr. Jane Smith"
            />
            <p className="mt-1 text-xs text-bs-dark55">
              This name will appear on your certificates.
            </p>
          </div>

          <div>
            <label htmlFor="roleType" className="block text-sm font-medium text-bs-dark">
              Professional Role
            </label>
            <select
              id="roleType"
              value={roleType}
              onChange={e => setRoleType(e.target.value as RoleType | '')}
              className="mt-1 block w-full px-3 py-2 border border-bs-dark15 rounded-lg focus:ring-salad-100 focus:border-salad-100"
            >
              <option value="">Select your role...</option>
              <option value="physician">Physician (MD, DO, NP, PA)</option>
              <option value="chiropractor">Chiropractor (DC)</option>
              <option value="trainer">Personal Trainer / Coach</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-bs-dark">
              Organization / Practice
            </label>
            <input
              type="text"
              id="organization"
              value={organization}
              onChange={e => setOrganization(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-bs-dark15 rounded-lg focus:ring-salad-100 focus:border-salad-100"
              placeholder="Acme Health Clinic"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={updateProfile.isPending}
            className="w-full btn-primary disabled:opacity-50"
          >
            {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
      {/* Danger Zone */}
      <div className="card p-6 border-red-200">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
        <p className="text-sm text-bs-dark55 mb-4">
          Reset your learning progress. This action cannot be undone.
        </p>
        <button
          onClick={() => setShowReset(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
        >
          Reset Progress...
        </button>
      </div>

      {showReset && <ResetProgressModal onClose={() => setShowReset(false)} />}
    </div>
  )
}
