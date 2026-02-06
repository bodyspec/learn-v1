import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProgressIndicator from '@/components/ProgressIndicator'

describe('ProgressIndicator', () => {
  it('renders progress percentage label', () => {
    render(<ProgressIndicator progress={75} />)
    expect(screen.getByText('75% complete')).toBeInTheDocument()
  })

  it('renders 0% progress', () => {
    render(<ProgressIndicator progress={0} />)
    expect(screen.getByText('0% complete')).toBeInTheDocument()
  })

  it('renders 100% progress', () => {
    render(<ProgressIndicator progress={100} />)
    expect(screen.getByText('100% complete')).toBeInTheDocument()
  })

  it('clamps progress above 100', () => {
    const { container } = render(<ProgressIndicator progress={150} />)
    const bar = container.querySelector('[style]')
    expect(bar?.getAttribute('style')).toContain('width: 100%')
  })

  it('clamps progress below 0', () => {
    const { container } = render(<ProgressIndicator progress={-10} />)
    const bar = container.querySelector('[style]')
    expect(bar?.getAttribute('style')).toContain('width: 0%')
  })

  it('hides label when showLabel is false', () => {
    render(<ProgressIndicator progress={50} showLabel={false} />)
    expect(screen.queryByText('50% complete')).not.toBeInTheDocument()
  })

  it('rounds fractional percentages', () => {
    render(<ProgressIndicator progress={33.333} />)
    expect(screen.getByText('33% complete')).toBeInTheDocument()
  })

  it('applies different size classes', () => {
    const { container: sm } = render(<ProgressIndicator progress={50} size="sm" />)
    const { container: lg } = render(<ProgressIndicator progress={50} size="lg" />)

    expect(sm.querySelector('.h-1')).toBeInTheDocument()
    expect(lg.querySelector('.h-3')).toBeInTheDocument()
  })
})
