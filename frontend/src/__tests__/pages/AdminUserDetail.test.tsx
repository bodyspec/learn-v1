import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const mockNavigate = vi.fn()
const mockPromoteMutate = vi.fn()
const mockDemoteMutate = vi.fn()
const mockDeleteMutateAsync = vi.fn()

let mockAuthState = {
  user: { id: 'admin-1', email: 'admin@bodyspec.com', name: 'Admin', is_admin: true },
}
let mockUserDetailState = {
  data: null as {
    id: string; name: string | null; email: string; role_type: string | null
    is_admin: boolean; created_at: string; last_login: string | null
    sections_completed: number; quizzes_passed: number; certificates_count: number
    module_progress: Array<{ module_id: string; sections_completed: number }>
    quiz_attempts: Array<{ id: string; module_id: string; score: number; passed: boolean; attempted_at: string }>
    certificates: Array<{ id: string; track: string; certificate_uid: string; issued_at: string }>
  } | null,
  isLoading: false,
}

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/hooks/queries', () => ({
  useAdminUserDetail: () => mockUserDetailState,
  usePromoteUser: () => ({ mutate: mockPromoteMutate, isPending: false }),
  useDemoteUser: () => ({ mutate: mockDemoteMutate, isPending: false }),
  useDeleteUser: () => ({ mutateAsync: mockDeleteMutateAsync, isPending: false }),
}))

import AdminUserDetail from '@/pages/account/admin/AdminUserDetail'

const sampleUser = {
  id: 'u1',
  name: 'Alice Smith',
  email: 'alice@bodyspec.com',
  role_type: 'physician',
  is_admin: false,
  created_at: '2026-01-01T00:00:00Z',
  last_login: '2026-02-01T00:00:00Z',
  sections_completed: 5,
  quizzes_passed: 2,
  certificates_count: 1,
  module_progress: [{ module_id: 'core', sections_completed: 3 }],
  quiz_attempts: [{ id: 'qa1', module_id: 'core', score: 90, passed: true, attempted_at: '2026-01-15T00:00:00Z' }],
  certificates: [{ id: 'c1', track: 'physician', certificate_uid: 'BS-001', issued_at: '2026-01-20T00:00:00Z' }],
}

function renderPage(userId = 'u1') {
  return render(
    <MemoryRouter initialEntries={[`/account/admin/users/${userId}`]}>
      <Routes>
        <Route path="/account/admin/users/:userId" element={<AdminUserDetail />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('AdminUserDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthState = { user: { id: 'admin-1', email: 'admin@bodyspec.com', name: 'Admin', is_admin: true } }
    mockUserDetailState = { data: sampleUser, isLoading: false }
    mockDeleteMutateAsync.mockResolvedValue({})
  })

  it('shows loading state', () => {
    mockUserDetailState = { data: null, isLoading: true }
    const { container } = renderPage()
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('shows "User not found" when no data', () => {
    mockUserDetailState = { data: null, isLoading: false }
    renderPage()
    expect(screen.getByText('User not found.')).toBeInTheDocument()
  })

  it('renders user info', () => {
    renderPage()
    expect(screen.getByText('Alice Smith')).toBeInTheDocument()
    expect(screen.getByText('alice@bodyspec.com')).toBeInTheDocument()
  })

  it('renders stats grid', () => {
    renderPage()
    expect(screen.getByText('5')).toBeInTheDocument() // sections
    expect(screen.getByText('2')).toBeInTheDocument() // quizzes passed
  })

  it('renders module progress', () => {
    renderPage()
    expect(screen.getByText('Module Progress')).toBeInTheDocument()
    // "core" appears in both module progress and quiz attempts
    const coreElements = screen.getAllByText('core')
    expect(coreElements.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('3 sections')).toBeInTheDocument()
  })

  it('renders quiz attempts', () => {
    renderPage()
    expect(screen.getByText('Quiz Attempts')).toBeInTheDocument()
    expect(screen.getByText('90%')).toBeInTheDocument()
    expect(screen.getByText('Passed')).toBeInTheDocument()
  })

  it('renders certificates', () => {
    renderPage()
    expect(screen.getByText('BS-001')).toBeInTheDocument()
  })

  it('shows "Promote to Admin" for @bodyspec.com non-admin user', () => {
    renderPage()
    expect(screen.getByText('Promote to Admin')).toBeInTheDocument()
  })

  it('shows back link to admin list', () => {
    renderPage()
    expect(screen.getByText('Back to users')).toBeInTheDocument()
  })

  it('delete navigates back to admin', async () => {
    renderPage()
    // Click the Delete button (the one with Trash2 icon in header actions)
    const deleteButtons = screen.getAllByRole('button').filter(
      btn => btn.textContent?.includes('Delete')
    )
    fireEvent.click(deleteButtons[0])

    // Confirmation modal appears
    expect(screen.getByText('Delete User')).toBeInTheDocument()

    // Click the red confirm Delete button in the modal
    const modalDeleteBtn = screen.getAllByRole('button').find(
      btn => btn.textContent === 'Delete' && btn.className.includes('bg-red-600')
    )
    fireEvent.click(modalDeleteBtn!)

    await waitFor(() => {
      expect(mockDeleteMutateAsync).toHaveBeenCalledWith('u1')
    })
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/account/admin')
    })
  })
})
