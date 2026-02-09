import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const mockMutateAsync = vi.fn()
let mockAuthState = {
  user: { id: 'u1', email: 'test@bodyspec.com', name: 'Test User', role_type: 'physician', organization: 'Acme' },
}
let mockUpdateProfileState = {
  mutateAsync: mockMutateAsync,
  isPending: false,
}

vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

vi.mock('@/hooks/queries', () => ({
  useUpdateProfile: () => mockUpdateProfileState,
  useProgress: () => ({ progress: null }),
  useCertificates: () => ({ certificates: [] }),
  useResetProgress: () => ({ mutateAsync: vi.fn(), isPending: false }),
}))

vi.mock('@/pages/account/ResetProgressModal', () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="reset-modal"><button onClick={onClose}>Close</button></div>
  ),
}))

import ProfilePage from '@/pages/ProfilePage'

function renderPage() {
  return render(<MemoryRouter><ProfilePage /></MemoryRouter>)
}

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthState = {
      user: { id: 'u1', email: 'test@bodyspec.com', name: 'Test User', role_type: 'physician', organization: 'Acme' },
    }
    mockUpdateProfileState = { mutateAsync: mockMutateAsync, isPending: false }
    mockMutateAsync.mockResolvedValue({})
  })

  it('pre-fills form with user data', () => {
    renderPage()
    expect(screen.getByLabelText('Full Name')).toHaveValue('Test User')
    expect(screen.getByLabelText('Professional Role')).toHaveValue('physician')
    expect(screen.getByLabelText('Organization / Practice')).toHaveValue('Acme')
  })

  it('email field is disabled', () => {
    renderPage()
    expect(screen.getByLabelText('Email')).toBeDisabled()
  })

  it('form submission calls mutateAsync with data', async () => {
    renderPage()
    fireEvent.click(screen.getByText('Save Changes'))
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        name: 'Test User',
        role_type: 'physician',
        organization: 'Acme',
      })
    })
  })

  it('shows success message on save', async () => {
    renderPage()
    fireEvent.click(screen.getByText('Save Changes'))
    await waitFor(() => {
      expect(screen.getByText('Profile updated successfully!')).toBeInTheDocument()
    })
  })

  it('shows error message on failure', async () => {
    mockMutateAsync.mockRejectedValue(new Error('fail'))
    renderPage()
    fireEvent.click(screen.getByText('Save Changes'))
    await waitFor(() => {
      expect(screen.getByText('Failed to update profile')).toBeInTheDocument()
    })
  })

  it('shows "Saving..." when pending', () => {
    mockUpdateProfileState = { mutateAsync: mockMutateAsync, isPending: true }
    renderPage()
    expect(screen.getByText('Saving...')).toBeInTheDocument()
  })

  it('Reset Progress button opens modal', () => {
    renderPage()
    fireEvent.click(screen.getByText('Reset Progress...'))
    expect(screen.getByTestId('reset-modal')).toBeInTheDocument()
  })

  it('sends null for empty fields', async () => {
    mockAuthState = {
      user: { id: 'u1', email: 'test@bodyspec.com', name: '', role_type: '', organization: '' },
    }
    renderPage()
    fireEvent.click(screen.getByText('Save Changes'))
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        name: null,
        role_type: null,
        organization: null,
      })
    })
  })
})
