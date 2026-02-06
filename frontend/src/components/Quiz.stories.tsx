import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import QuizQuestion from './QuizQuestion'
import type { Quiz as QuizType } from '@/types'

/**
 * Quiz component story.
 *
 * Since the actual Quiz component uses useAuth() and the submitQuiz API,
 * we render a self-contained quiz preview that demonstrates the visual
 * behavior and interaction flow.
 */

const sampleQuiz: QuizType = {
  module_id: 'core',
  passing_score: 80,
  randomize_questions: false,
  randomize_options: false,
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      text: 'What does DEXA stand for?',
      options: [
        { text: 'Dual-Energy X-ray Absorptiometry', correct: true },
        { text: 'Digital Enhanced X-ray Analysis', correct: false },
        { text: 'Dual-Emission X-ray Assessment', correct: false },
        { text: 'Direct Energy X-ray Absorptiometry', correct: false },
      ],
      explanation: 'DEXA stands for Dual-Energy X-ray Absorptiometry.',
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      text: 'What three tissue types does DEXA measure?',
      options: [
        { text: 'Muscle, cartilage, and fat', correct: false },
        { text: 'Bone, lean tissue, and fat tissue', correct: true },
        { text: 'Bone, blood, and fat', correct: false },
        { text: 'Skin, muscle, and bone', correct: false },
      ],
      explanation: 'DEXA distinguishes between bone mineral content, lean tissue, and fat tissue.',
    },
    {
      id: 'q3',
      type: 'scenario',
      text: 'A patient has a T-score of -1.5 at the lumbar spine. How do you classify this?',
      options: [
        { text: 'Normal', correct: false },
        { text: 'Osteopenia', correct: true },
        { text: 'Osteoporosis', correct: false },
        { text: 'Severe osteoporosis', correct: false },
      ],
      explanation: 'A T-score between -1.0 and -2.5 indicates osteopenia per WHO criteria.',
    },
  ],
}

function QuizPreview({ quiz }: { quiz: QuizType }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const questions = quiz.questions
  const question = questions[currentQuestion]
  const totalQuestions = questions.length

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: optionIndex }))
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const allAnswered = questions.every(q => answers[q.id] !== undefined)

  return (
    <div className="card p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">
            {Object.keys(answers).length} of {totalQuestions} answered
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-salad-100 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <QuizQuestion
        question={question}
        selectedOption={answers[question.id]}
        onSelectOption={handleAnswer}
      />

      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn-outline disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {currentQuestion < totalQuestions - 1 ? (
            <button onClick={handleNext} className="btn-primary">
              Next
            </button>
          ) : (
            <button
              disabled={!allAnswered}
              className="btn-primary disabled:opacity-50"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof QuizPreview> = {
  title: 'Components/Quiz',
  component: QuizPreview,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 700 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof QuizPreview>

export const Default: Story = {
  args: {
    quiz: sampleQuiz,
  },
}

export const SingleQuestion: Story = {
  args: {
    quiz: {
      ...sampleQuiz,
      questions: [sampleQuiz.questions[0]],
    },
  },
}
