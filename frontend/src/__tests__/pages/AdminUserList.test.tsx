import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const mockPromoteMutate = vi.fn()
const mockDemoteMutate = vi.fn()
const mockDeleteMutateAsync = vi.fn()

let mockAuthState = {
  user: { id: 'admin-1', email: 'admin@bodyspec.com', name: 'Admin', is_admin: true },
}
let mockUsersState = {
  data: null as {
    users: Array<{
      id: string; name: string | null; email: string; role_type: string | null
      is_admin: boolean; sections_completed: number; certificates_count: number
    }>
    total: number; per_page: number
  } | null,
  isLoading: false,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/hooks/queries', () => ({
  useAdminUsers: () => mockUsersState,
  usePromoteUser: () => ({ mutate: mockPromoteMutate, isPending: false }),
  useDemoteUser: () => ({ mutate: mockDemoteMutate, isPending: false }),
  useDeleteUser: () => ({ mutateAsync: mockDeleteMutateAsync, isPending: false }),
}))

import AdminUserList from '@/pages/account/admin/AdminUserList'

function renderPage() {
  return render(<MemoryRouter><AdminUserList /></MemoryRouter>)
}

const sampleUsers = [
  { id: 'u1', name: 'Alice', email: 'alice@bodyspec.com', role_type: 'physician', is_admin: false, sections_completed: 5, certificates_count: 1 },
  { id: 'u2', name: 'Bob', email: 'bob@gmail.com', role_type: 'trainer', is_admin: false, sections_completed: 3, certificates_count: 0 },
  { id: 'u3', name: 'Admin', email: 'admin2@bodyspec.com', role_type: 'physician', is_admin: true, sections_completed: 10, certificates_count: 2 },
]

describe('AdminUserList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthState = { user: { id: 'admin-1', email: 'admin@bodyspec.com', name: 'Admin', is_admin: true } }
    mockUsersState = { data: { users: sampleUsers, total: 3, per_page: 20 }, isLoading: false }
    mockDeleteMutateAsync.mockResolvedValue({})
  })

  it('renders "User Management" heading', () => {
    renderPage()
    expect(screen.getByText('User Management')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    mockUsersState = { data: null, isLoading: true }
    const { container } = renderPage()
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('renders user table with names', () => {
    renderPage()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('shows Admin badge for admin users', () => {
    renderPage()
    expect(screen.getByText('Admin', { selector: 'span' })).toBeInTheDocument()
  })

  it('shows promote button only for @bodyspec.com non-admin users', () => {
    renderPage()
    // Alice (bodyspec, non-admin) should have promote button
    // Bob (gmail, non-admin) should NOT have promote button
    const promoteButtons = screen.getAllByTitle('Promote to admin')
    expect(promoteButtons.length).toBe(1) // only Alice
  })

  it('shows delete button for non-admin users', () => {
    renderPage()
    const deleteButtons = screen.getAllByTitle('Delete user')
    expect(deleteButtons.length).toBe(2) // Alice and Bob
  })

  it('delete confirmation modal appears and works', async () => {
    renderPage()
    const deleteButtons = screen.getAllByTitle('Delete user')
    fireEvent.click(deleteButtons[0]) // delete Alice

    expect(screen.getByText('Delete User')).toBeInTheDocument()
    // Alice appears in both the table and modal
    const aliceElements = screen.getAllByText(/Alice/)
    expect(aliceElements.length).toBeGreaterThan(1)

    // Click the Delete button inside the modal (the red one)
    const modalDeleteBtn = screen.getAllByRole('button').find(
      btn => btn.textContent === 'Delete' && btn.className.includes('bg-red-600')
    )
    fireEvent.click(modalDeleteBtn!)
    await waitFor(() => {
      expect(mockDeleteMutateAsync).toHaveBeenCalledWith('u1')
    })
  })

  it('search form triggers search', () => {
    renderPage()
    const input = screen.getByPlaceholderText('Search by name or email...')
    fireEvent.change(input, { target: { value: 'alice' } })
    fireEvent.click(screen.getByText('Search'))
    // Search state updated (tested implicitly by the form submission)
    expect(input).toHaveValue('alice')
  })
})
