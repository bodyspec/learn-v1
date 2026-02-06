import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import QuizQuestion from './QuizQuestion'
import type { Question } from '@/types'

const sampleQuestion: Question = {
  id: 'q1',
  type: 'multiple_choice',
  text: 'What does DEXA stand for?',
  options: [
    { text: 'Dual-Energy X-ray Absorptiometry', correct: true },
    { text: 'Digital Enhanced X-ray Analysis', correct: false },
    { text: 'Dual-Emission X-ray Assessment', correct: false },
    { text: 'Direct Energy X-ray Absorptiometry', correct: false },
  ],
  explanation: 'DEXA stands for Dual-Energy X-ray Absorptiometry, which uses two X-ray beams at different energy levels.',
}

const scenarioQuestion: Question = {
  id: 'q2',
  type: 'scenario',
  text: 'A 65-year-old postmenopausal woman presents for her first DEXA scan. Her T-score at the lumbar spine is -2.8. Based on WHO criteria, how would you classify this result?',
  options: [
    { text: 'Normal bone density', correct: false },
    { text: 'Osteopenia', correct: false },
    { text: 'Osteoporosis', correct: true },
    { text: 'Severe osteoporosis', correct: false },
  ],
  explanation: 'A T-score of -2.5 or lower indicates osteoporosis according to WHO criteria. This patient\'s T-score of -2.8 falls in the osteoporosis range.',
}

const meta: Meta<typeof QuizQuestion> = {
  title: 'Components/QuizQuestion',
  component: QuizQuestion,
  argTypes: {
    selectedOption: { control: { type: 'number', min: -1, max: 3 } },
    showResult: { control: 'boolean' },
    correctOption: { control: { type: 'number', min: 0, max: 3 } },
  },
  args: {
    onSelectOption: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 700 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof QuizQuestion>

export const Unanswered: Story = {
  args: {
    question: sampleQuestion,
  },
}

export const OptionSelected: Story = {
  args: {
    question: sampleQuestion,
    selectedOption: 0,
  },
}

export const CorrectAnswer: Story = {
  args: {
    question: sampleQuestion,
    selectedOption: 0,
    showResult: true,
    correctOption: 0,
  },
}

export const WrongAnswer: Story = {
  args: {
    question: sampleQuestion,
    selectedOption: 2,
    showResult: true,
    correctOption: 0,
  },
}

export const ScenarioType: Story = {
  args: {
    question: scenarioQuestion,
  },
}

export const ScenarioAnswered: Story = {
  args: {
    question: scenarioQuestion,
    selectedOption: 2,
    showResult: true,
    correctOption: 2,
  },
}
