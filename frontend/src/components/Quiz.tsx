import { useState } from 'react'
import type { Quiz as QuizType, QuizSubmissionResult } from '@/types'
import QuizQuestion from './QuizQuestion'
import QuizResults from './QuizResults'
import { useAuth } from '@/auth/AuthProvider'
import { useSubmitQuiz } from '@/hooks/queries'

interface QuizProps {
  quiz: QuizType
  onComplete?: (result: QuizSubmissionResult) => void
}

export default function Quiz({ quiz, onComplete }: QuizProps) {
  const { token, isAuthenticated } = useAuth()
  const submitQuizMutation = useSubmitQuiz()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<QuizSubmissionResult | null>(null)
  const [startTime] = useState(Date.now())
  const [showLocalResults, setShowLocalResults] = useState(false)

  const questions = quiz.questions
  const question = questions[currentQuestion]
  const totalQuestions = questions.length

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: optionIndex,
    }))
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

  // Calculate local result for unauthenticated users
  const calculateLocalResult = (): QuizSubmissionResult => {
    let correctCount = 0

    const questionResults = questions.map(q => {
      const selectedIndex = answers[q.id] ?? -1
      const correctIndex = q.options.findIndex(opt => opt.correct)
      const isCorrect = selectedIndex === correctIndex

      if (isCorrect) correctCount++

      return {
        question_id: q.id,
        selected_option: selectedIndex,
        correct_option: correctIndex,
        correct: isCorrect,
        explanation: q.explanation,
      }
    })

    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= quiz.passing_score

    return {
      score,
      passed,
      passing_score: quiz.passing_score,
      results: questionResults,
      certificate_eligible: false, // Can't earn certificate without signing in
    }
  }

  const handleSubmit = async () => {
    // For unauthenticated users, calculate results locally
    if (!token) {
      const localResult = calculateLocalResult()
      setResult(localResult)
      setShowLocalResults(true)
      onComplete?.(localResult)
      return
    }

    try {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      const submissionResult = await submitQuizMutation.mutateAsync({
        module_id: quiz.module_id,
        answers,
        time_spent_seconds: timeSpent,
      })
      setResult(submissionResult)
      onComplete?.(submissionResult)
    } catch (error) {
      console.error('Failed to submit quiz:', error)
    }
  }

  const handleRetry = () => {
    setAnswers({})
    setResult(null)
    setCurrentQuestion(0)
    setShowLocalResults(false)
  }

  if (result) {
    return (
      <QuizResults
        result={result}
        quiz={quiz}
        onRetry={handleRetry}
        showSignInPrompt={showLocalResults && !isAuthenticated}
      />
    )
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
          className="btn-secondary disabled:opacity-50"
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
              onClick={handleSubmit}
              disabled={!allAnswered || submitQuizMutation.isPending}
              className="btn-primary disabled:opacity-50"
            >
              {submitQuizMutation.isPending ? 'Submitting...' : 'Submit Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
