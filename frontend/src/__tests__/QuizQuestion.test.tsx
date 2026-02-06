import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuizQuestion from '@/components/QuizQuestion'
import type { Question } from '@/types'

const sampleQuestion: Question = {
  id: 'test-q1',
  type: 'multiple_choice',
  text: 'What does DEXA stand for?',
  options: [
    { text: 'Dual-Energy X-ray Absorptiometry', correct: true },
    { text: 'Digital Electronic X-ray Analysis', correct: false },
    { text: 'Dense Energy X-ray Assessment', correct: false },
  ],
  explanation: 'DEXA stands for Dual-Energy X-ray Absorptiometry.',
}

const scenarioQuestion: Question = {
  id: 'test-scenario',
  type: 'scenario',
  text: 'A patient comes in with a BMI of 25. What should you do?',
  options: [
    { text: 'Option A', correct: false },
    { text: 'Option B', correct: true },
  ],
  explanation: 'Explanation here.',
}

describe('QuizQuestion', () => {
  it('renders question text', () => {
    render(
      <QuizQuestion
        question={sampleQuestion}
        onSelectOption={() => {}}
      />
    )
    expect(screen.getByText('What does DEXA stand for?')).toBeInTheDocument()
  })

  it('renders all option texts', () => {
    render(
      <QuizQuestion
        question={sampleQuestion}
        onSelectOption={() => {}}
      />
    )
    expect(screen.getByText('Dual-Energy X-ray Absorptiometry')).toBeInTheDocument()
    expect(screen.getByText('Digital Electronic X-ray Analysis')).toBeInTheDocument()
    expect(screen.getByText('Dense Energy X-ray Assessment')).toBeInTheDocument()
  })

  it('calls onSelectOption when option button is clicked', () => {
    const onSelect = vi.fn()
    render(
      <QuizQuestion
        question={sampleQuestion}
        onSelectOption={onSelect}
      />
    )
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[1])
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('highlights selected option', () => {
    const { container } = render(
      <QuizQuestion
        question={sampleQuestion}
        selectedOption={0}
        onSelectOption={() => {}}
      />
    )
    const buttons = container.querySelectorAll('button')
    expect(buttons[0].className).toContain('border-primary-500')
  })

  it('disables options in result mode', () => {
    const onSelect = vi.fn()
    const { container } = render(
      <QuizQuestion
        question={sampleQuestion}
        selectedOption={1}
        onSelectOption={onSelect}
        showResult={true}
        correctOption={0}
      />
    )
    const buttons = container.querySelectorAll('button')
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled()
    })
  })

  it('shows correct option in green in result mode', () => {
    const { container } = render(
      <QuizQuestion
        question={sampleQuestion}
        selectedOption={1}
        onSelectOption={() => {}}
        showResult={true}
        correctOption={0}
      />
    )
    const buttons = container.querySelectorAll('button')
    expect(buttons[0].className).toContain('border-green-500')
  })

  it('shows wrong selection in red in result mode', () => {
    const { container } = render(
      <QuizQuestion
        question={sampleQuestion}
        selectedOption={1}
        onSelectOption={() => {}}
        showResult={true}
        correctOption={0}
      />
    )
    const buttons = container.querySelectorAll('button')
    expect(buttons[1].className).toContain('border-red-500')
  })

  it('shows scenario badge for scenario type questions', () => {
    render(
      <QuizQuestion
        question={scenarioQuestion}
        onSelectOption={() => {}}
      />
    )
    expect(screen.getByText('Scenario')).toBeInTheDocument()
  })

  it('does not show scenario badge for multiple_choice type', () => {
    render(
      <QuizQuestion
        question={sampleQuestion}
        onSelectOption={() => {}}
      />
    )
    expect(screen.queryByText('Scenario')).not.toBeInTheDocument()
  })
})
