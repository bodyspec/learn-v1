import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SessionExpiredModal from '@/auth/SessionExpiredModal'

describe('SessionExpiredModal', () => {
  it('renders heading and message', () => {
    render(<SessionExpiredModal onSignIn={vi.fn()} />)
    expect(screen.getByText('Session Expired')).toBeInTheDocument()
    expect(screen.getByText(/your session has expired/i)).toBeInTheDocument()
  })

  it('calls onSignIn when button clicked', () => {
    const onSignIn = vi.fn()
    render(<SessionExpiredModal onSignIn={onSignIn} />)
    fireEvent.click(screen.getByRole('button', { name: /sign in again/i }))
    expect(onSignIn).toHaveBeenCalledOnce()
  })

  it('renders as a fixed overlay', () => {
    const { container } = render(<SessionExpiredModal onSignIn={vi.fn()} />)
    const overlay = container.firstElementChild as HTMLElement
    expect(overlay.className).toContain('fixed')
    expect(overlay.className).toContain('inset-0')
    expect(overlay.className).toContain('z-50')
  })
})
