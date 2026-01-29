import { Link } from 'react-router-dom'
import { Stethoscope, Activity, Dumbbell, BookOpen, Award, Clock } from 'lucide-react'

const tracks = [
  {
    id: 'physician',
    title: 'Physicians',
    description: 'Clinical applications of DEXA body composition analysis for medical professionals',
    icon: Stethoscope,
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    iconColor: 'text-blue-600',
  },
  {
    id: 'chiropractor',
    title: 'Chiropractors',
    description: 'Integrating body composition data into chiropractic assessment and patient care',
    icon: Activity,
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconColor: 'text-green-600',
  },
  {
    id: 'trainer',
    title: 'Trainers',
    description: 'Using DEXA data for fitness programming and client body composition management',
    icon: Dumbbell,
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    iconColor: 'text-purple-600',
  },
]

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          DEXA Education for<br />Healthcare Professionals
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Free, comprehensive training on DEXA body composition scanning.
          Learn how to interpret results, counsel patients, and integrate
          data into your practice.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <BookOpen className="w-5 h-5" />
            <span>Self-paced learning</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>~2 hours total</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Award className="w-5 h-5" />
            <span>Certificate on completion</span>
          </div>
        </div>
      </div>

      {/* Track Selection */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Choose Your Track
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <Link
              key={track.id}
              to={`/track/${track.id}`}
              className={`card p-6 border-2 transition-all ${track.color}`}
            >
              <track.icon className={`w-12 h-12 ${track.iconColor} mb-4`} />
              <h3 className="text-xl font-semibold text-gray-900">{track.title}</h3>
              <p className="mt-2 text-gray-600">{track.description}</p>
              <div className="mt-4 text-primary-600 font-medium">
                Start learning →
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          What You'll Learn
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900">DEXA Technology</h3>
            <p className="text-sm text-gray-600 mt-1">
              How DEXA works and why it's the gold standard
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900">Key Metrics</h3>
            <p className="text-sm text-gray-600 mt-1">
              Body fat %, lean mass, VAT, and regional analysis
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="font-semibold text-gray-900">Report Reading</h3>
            <p className="text-sm text-gray-600 mt-1">
              Interpret BodySpec reports with confidence
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="font-semibold text-gray-900">Patient Communication</h3>
            <p className="text-sm text-gray-600 mt-1">
              Discuss results effectively with clients
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          All content is free and publicly accessible. Sign in to track your progress and earn certificates.
        </p>
        <Link to="/track/physician" className="btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  )
}
