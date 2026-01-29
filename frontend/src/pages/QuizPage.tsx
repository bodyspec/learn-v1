import { useParams } from 'react-router-dom'
import { getModule, getQuiz } from '@/content'
import Quiz from '@/components/Quiz'
import { NotFound, BackLink } from '@/components/common'

export default function QuizPage() {
  const { moduleId } = useParams<{ moduleId: string }>()

  if (!moduleId) {
    return <NotFound title="Quiz Not Found" />
  }

  const module = getModule(moduleId)
  const quiz = getQuiz(moduleId)

  if (!module) {
    return <NotFound title="Module Not Found" />
  }

  if (!quiz) {
    return (
      <NotFound
        title="Quiz Not Found"
        message="This module does not have a quiz."
        backTo={`/module/${moduleId}`}
        backLabel="Back to Module"
      />
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <BackLink to={`/module/${moduleId}`} label={`Back to ${module.title}`} className="mb-6" />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{module.title} Quiz</h1>
        <p className="mt-2 text-gray-600">
          Test your knowledge with {quiz.questions.length} questions.
          You need {quiz.passing_score}% to pass.
        </p>
      </div>

      <Quiz quiz={quiz} />
    </div>
  )
}
