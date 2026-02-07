import { useState } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import { apiClient } from '@/api/client'
import type { RoleType, User } from '@/types'

export default function ProfilePage() {
  const { user, token } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [roleType, setRoleType] = useState<RoleType | ''>(user?.role_type || '')
  const [organization, setOrganization] = useState(user?.organization || '')
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    setIsSaving(true)
    setMessage(null)

    try {
      await apiClient.put<User>(
        '/users/me',
        {
          name: name || null,
          role_type: roleType || null,
          organization: organization || null,
        },
        token
      )
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user?.email || ''}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Email is managed by your identity provider and cannot be changed here.
            </p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-salad-100 focus:border-salad-100"
              placeholder="Dr. Jane Smith"
            />
            <p className="mt-1 text-xs text-gray-500">
              This name will appear on your certificates.
            </p>
          </div>

          <div>
            <label htmlFor="roleType" className="block text-sm font-medium text-gray-700">
              Professional Role
            </label>
            <select
              id="roleType"
              value={roleType}
              onChange={e => setRoleType(e.target.value as RoleType | '')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-salad-100 focus:border-salad-100"
            >
              <option value="">Select your role...</option>
              <option value="physician">Physician (MD, DO, NP, PA)</option>
              <option value="chiropractor">Chiropractor (DC)</option>
              <option value="trainer">Personal Trainer / Coach</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
              Organization / Practice
            </label>
            <input
              type="text"
              id="organization"
              value={organization}
              onChange={e => setOrganization(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-salad-100 focus:border-salad-100"
              placeholder="Acme Health Clinic"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md ${
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
            disabled={isSaving}
            className="w-full btn-primary disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
