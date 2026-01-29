import { CheckCircle } from 'lucide-react'
import type { Question } from '@/types'

interface QuizQuestionProps {
  question: Question
  selectedOption?: number
  onSelectOption: (index: number) => void
  showResult?: boolean
  correctOption?: number
}

export default function QuizQuestion({
  question,
  selectedOption,
  onSelectOption,
  showResult = false,
  correctOption,
}: QuizQuestionProps) {
  return (
    <div>
      <div className="mb-6">
        {question.type === 'scenario' && (
          <span className="inline-block mb-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
            Scenario
          </span>
        )}
        <p className="text-lg font-medium text-gray-900 whitespace-pre-line">{question.text}</p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index
          const isCorrect = showResult && index === correctOption
          const isWrong = showResult && isSelected && index !== correctOption

          let borderColor = 'border-gray-200 hover:border-primary-300'
          let bgColor = 'bg-white'

          if (isSelected && !showResult) {
            borderColor = 'border-primary-500'
            bgColor = 'bg-primary-50'
          } else if (isCorrect) {
            borderColor = 'border-green-500'
            bgColor = 'bg-green-50'
          } else if (isWrong) {
            borderColor = 'border-red-500'
            bgColor = 'bg-red-50'
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && onSelectOption(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${borderColor} ${bgColor} disabled:cursor-default`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <span className="text-gray-700">{option.text}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
