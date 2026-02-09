import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

const mockMutateAsync = vi.fn()
let mockProgressState = {
  progress: {
    sections_completed: [{ module_id: 'core', section_slug: '01' }, { module_id: 'core', section_slug: '02' }],
    quizzes_passed: { core: true },
  },
}
let mockCertsState = {
  certificates: [{ id: 'c1' }],
}
let mockResetState = {
  mutateAsync: mockMutateAsync,
  isPending: false,
}

vi.mock('@/hooks/queries', () => ({
  useProgress: () => mockProgressState,
  useCertificates: () => mockCertsState,
  useResetProgress: () => mockResetState,
}))

import ResetProgressModal from '@/pages/account/ResetProgressModal'

function renderModal(onClose = vi.fn()) {
  const result = render(<ResetProgressModal onClose={onClose} />)
  return { ...result, onClose }
}

describe('ResetProgressModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockProgressState = {
      progress: {
        sections_completed: [{ module_id: 'core', section_slug: '01' }, { module_id: 'core', section_slug: '02' }],
        quizzes_passed: { core: true },
      },
    }
    mockCertsState = { certificates: [{ id: 'c1' }] }
    mockResetState = { mutateAsync: mockMutateAsync, isPending: false }
    mockMutateAsync.mockResolvedValue({})
  })

  it('shows three checkboxes with counts', () => {
    renderModal()
    expect(screen.getByText(/2 sections completed/)).toBeInTheDocument()
    expect(screen.getByText(/1 quizzes passed/)).toBeInTheDocument()
    expect(screen.getByText(/1 certificates earned/)).toBeInTheDocument()
  })

  it('submit disabled until checkbox selected and RESET typed', () => {
    renderModal()
    const submitBtn = screen.getByRole('button', { name: 'Reset Progress' })
    expect(submitBtn).toBeDisabled()

    // Check a checkbox
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    expect(submitBtn).toBeDisabled()

    // Type RESET
    const input = screen.getByPlaceholderText('RESET')
    fireEvent.change(input, { target: { value: 'RESET' } })
    expect(submitBtn).not.toBeDisabled()
  })

  it('successful reset calls onClose', async () => {
    const { onClose } = renderModal()
    // Check sections checkbox
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    // Type RESET
    fireEvent.change(screen.getByPlaceholderText('RESET'), { target: { value: 'RESET' } })
    // Submit
    fireEvent.click(screen.getByRole('button', { name: 'Reset Progress' }))

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        sections: true,
        quizzes: false,
        certificates: false,
      })
    })
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('shows error on failure', async () => {
    mockMutateAsync.mockRejectedValue(new Error('fail'))
    renderModal()
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    fireEvent.change(screen.getByPlaceholderText('RESET'), { target: { value: 'RESET' } })
    fireEvent.click(screen.getByRole('button', { name: 'Reset Progress' }))

    await waitFor(() => {
      expect(screen.getByText('Failed to reset progress. Please try again.')).toBeInTheDocument()
    })
  })

  it('Cancel calls onClose', () => {
    const { onClose } = renderModal()
    fireEvent.click(screen.getByText('Cancel'))
    expect(onClose).toHaveBeenCalled()
  })

  it('shows "Resetting..." when pending', () => {
    mockResetState = { mutateAsync: mockMutateAsync, isPending: true }
    renderModal()
    expect(screen.getByText('Resetting...')).toBeInTheDocument()
  })
})
