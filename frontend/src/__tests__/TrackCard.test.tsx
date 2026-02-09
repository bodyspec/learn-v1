import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Stethoscope } from 'lucide-react'
import TrackCard from '@/components/TrackCard'

describe('TrackCard', () => {
  it('renders title and description', () => {
    render(
      <MemoryRouter>
        <TrackCard id="physician" title="Physicians" description="For MDs" icon={Stethoscope} />
      </MemoryRouter>
    )
    expect(screen.getByText('Physicians')).toBeInTheDocument()
    expect(screen.getByText('For MDs')).toBeInTheDocument()
  })

  it('links to /track/{id}', () => {
    render(
      <MemoryRouter>
        <TrackCard id="physician" title="Physicians" description="For MDs" icon={Stethoscope} />
      </MemoryRouter>
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/track/physician')
  })

  it('shows "Start learning" text', () => {
    render(
      <MemoryRouter>
        <TrackCard id="physician" title="Physicians" description="For MDs" icon={Stethoscope} />
      </MemoryRouter>
    )
    expect(screen.getByText(/Start learning/)).toBeInTheDocument()
  })
})
