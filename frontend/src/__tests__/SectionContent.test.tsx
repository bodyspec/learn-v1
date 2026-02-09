import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SectionContent from '@/components/SectionContent'

describe('SectionContent', () => {
  it('renders basic markdown headings and paragraphs', () => {
    render(<SectionContent content={'# Heading\n\nA paragraph.'} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading')
    expect(screen.getByText('A paragraph.')).toBeInTheDocument()
  })

  it('processes callout note blocks', () => {
    const content = ':::note\nImportant info\n:::'
    const { container } = render(<SectionContent content={content} />)
    expect(container.querySelector('.callout-note')).toBeInTheDocument()
    expect(screen.getByText('Important info')).toBeInTheDocument()
  })

  it('processes multiple callout types', () => {
    const content = ':::warning\nBe careful\n:::\n\n:::tip\nUseful tip\n:::'
    const { container } = render(<SectionContent content={content} />)
    expect(container.querySelector('.callout-warning')).toBeInTheDocument()
    expect(container.querySelector('.callout-tip')).toBeInTheDocument()
  })

  it('images get rounded-lg shadow-md classes and lazy loading', () => {
    const content = '![Alt text](test.png)'
    const { container } = render(<SectionContent content={content} />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img?.className).toContain('rounded-lg')
    expect(img?.className).toContain('shadow-md')
    expect(img?.getAttribute('loading')).toBe('lazy')
  })

  it('tables wrapped in overflow-x-auto', () => {
    const content = '| Col1 | Col2 |\n|------|------|\n| A | B |'
    const { container } = render(<SectionContent content={content} />)
    expect(container.querySelector('.overflow-x-auto')).toBeInTheDocument()
    expect(container.querySelector('table')).toBeInTheDocument()
  })

  it('renders links from markdown', () => {
    render(<SectionContent content="[Click here](https://example.com)" />)
    expect(screen.getByText('Click here')).toBeInTheDocument()
  })
})
