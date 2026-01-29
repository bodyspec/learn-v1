import { Link } from 'react-router-dom'
import { HeartPulse, Bone, Users, BookOpen, Award, Clock, BarChart3, Target, FileText, MessageCircle } from 'lucide-react'

const tracks = [
  {
    id: 'physician',
    title: 'Physicians',
    description: 'Clinical applications of DEXA body composition analysis for medical professionals',
    icon: HeartPulse,
  },
  {
    id: 'chiropractor',
    title: 'Chiropractors',
    description: 'Integrating body composition data into chiropractic assessment and patient care',
    icon: Bone,
  },
  {
    id: 'trainer',
    title: 'Trainers',
    description: 'Using DEXA data for fitness programming and client body composition management',
    icon: Users,
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center pt-12 pb-12">
        <h1 className="text-4xl font-bold text-bs-dark sm:text-5xl">
          DEXA Education for<br />
          Healthcare Professionals
        </h1>
        <p className="mt-6 text-lg text-bs-dark max-w-3xl mx-auto">
          Free, comprehensive training on DEXA body composition scanning.
          Learn how to interpret results, counsel patients, and integrate
          data into your practice.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-bs-dark/80 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Self-paced learning</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>~2 hours total</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Certificate on completion</span>
          </div>
        </div>
        <div className="mt-10">
          <Link to="/track/physician" className="btn-light">
            Get started
          </Link>
        </div>
      </div>

      {/* Track Selection */}
      <div className="py-16 bg-bs-dark3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-bs-dark text-center mb-10">
            Choose Your Track
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <Link
                key={track.id}
                to={`/track/${track.id}`}
                className="bg-white border border-bs-dark15 rounded-lg p-6 hover:border-bs-dark55 hover:shadow-sm transition-all no-underline"
              >
                <track.icon className="w-8 h-8 text-bs-dark mb-4" />
                <h3 className="text-lg font-semibold text-bs-dark">{track.title}</h3>
                <p className="mt-2 text-bs-dark/80 text-sm">{track.description}</p>
                <div className="mt-4 text-sm font-medium text-salad-100">
                  Start learning →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="py-16">
        <h2 className="text-2xl font-bold text-bs-dark text-center mb-10">
          What You'll Learn
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-10 h-10 bg-salad-60 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-5 h-5 text-bs-dark" />
            </div>
            <h3 className="font-semibold text-bs-dark">DEXA Technology</h3>
            <p className="text-sm text-bs-dark/80 mt-1">
              How DEXA works and why it's the gold standard
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-salad-60 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-5 h-5 text-bs-dark" />
            </div>
            <h3 className="font-semibold text-bs-dark">Key Metrics</h3>
            <p className="text-sm text-bs-dark/80 mt-1">
              Body fat %, lean mass, VAT, and regional analysis
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-salad-60 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-5 h-5 text-bs-dark" />
            </div>
            <h3 className="font-semibold text-bs-dark">Report Reading</h3>
            <p className="text-sm text-bs-dark/80 mt-1">
              Interpret BodySpec reports with confidence
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-salad-60 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-5 h-5 text-bs-dark" />
            </div>
            <h3 className="font-semibold text-bs-dark">Patient Communication</h3>
            <p className="text-sm text-bs-dark/80 mt-1">
              Discuss results effectively with clients
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-12 bg-bs-dark3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <p className="text-bs-dark/80 mb-6">
          All content is free and publicly accessible. Sign in to track your progress and earn certificates.
        </p>
        <Link to="/track/physician" className="btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  )
}
