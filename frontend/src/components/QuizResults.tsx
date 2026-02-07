import { CheckCircle, XCircle, Award, RotateCcw, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Quiz, QuizSubmissionResult } from '@/types'
import { useAuth } from '@/auth/AuthProvider'

interface QuizResultsProps {
  result: QuizSubmissionResult
  quiz: Quiz
  onRetry: () => void
  showSignInPrompt?: boolean
}

export default function QuizResults({ result, quiz, onRetry, showSignInPrompt }: QuizResultsProps) {
  const { login } = useAuth()
  const { score, passed, passing_score, results, certificate_eligible } = result

  return (
    <div className="space-y-8">
      {/* Score Summary */}
      <div className={`card p-8 text-center ${passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <div className="mb-4">
          {passed ? (
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
          )}
        </div>
        <h2 className={`text-3xl font-bold ${passed ? 'text-green-700' : 'text-red-700'}`}>
          {passed ? 'Congratulations!' : 'Keep Learning'}
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          You scored <span className="font-bold">{score}%</span>
          {!passed && ` (${passing_score}% required to pass)`}
        </p>
        {passed && certificate_eligible && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
            <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-gray-700">
              You're eligible for a certificate! Visit your{' '}
              <Link to="/certificates" className="text-salad-100 hover:underline">
                certificates page
              </Link>{' '}
              to claim it.
            </p>
          </div>
        )}
        {!passed && (
          <button onClick={onRetry} className="mt-6 btn-primary inline-flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        )}
        {showSignInPrompt && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <LogIn className="w-6 h-6 text-salad-100 mx-auto mb-2" />
            <p className="text-sm text-gray-700 mb-3">
              Sign in to save your progress and earn certificates.
            </p>
            <button onClick={() => login()} className="btn-secondary text-sm">
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Question Results */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Review Your Answers</h3>
        {results.map((questionResult, index) => {
          const question = quiz.questions.find(q => q.id === questionResult.question_id)
          if (!question) return null

          return (
            <div
              key={questionResult.question_id}
              className={`card p-6 ${questionResult.correct ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}`}
            >
              <div className="flex items-start gap-3 mb-4">
                {questionResult.correct ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium text-gray-900">Question {index + 1}</p>
                  <p className="text-gray-700 whitespace-pre-line">{question.text}</p>
                </div>
              </div>

              <div className="ml-8 space-y-2">
                {question.options.map((option, optIndex) => {
                  const isCorrect = optIndex === questionResult.correct_option
                  const wasSelected = optIndex === questionResult.selected_option
                  const isWrongSelection = wasSelected && !isCorrect

                  return (
                    <div
                      key={optIndex}
                      className={`p-3 rounded-lg ${
                        isCorrect
                          ? 'bg-green-50 border border-green-200'
                          : isWrongSelection
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isCorrect && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {isWrongSelection && <XCircle className="w-4 h-4 text-red-500" />}
                        <span className={isCorrect ? 'text-green-700' : isWrongSelection ? 'text-red-700' : 'text-gray-600'}>
                          {option.text}
                        </span>
                        {wasSelected && <span className="text-xs text-gray-500 ml-auto">(your answer)</span>}
                      </div>
                    </div>
                  )
                })}

                {question.explanation && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-700 mb-1">Explanation:</p>
                    <p className="text-sm text-blue-600 whitespace-pre-line">{question.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
