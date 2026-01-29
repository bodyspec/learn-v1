export type Track = 'core' | 'physician' | 'chiropractor' | 'trainer'
export type RoleType = 'physician' | 'chiropractor' | 'trainer' | 'other'

export interface Module {
  id: string
  title: string
  description?: string
  track: Track
  is_deep_dive: boolean
  parent_module?: string
  estimated_minutes: number
  required_for_certificate: boolean
  sort_order: number
  sections: Section[]
}

export interface Section {
  slug: string
  file: string
  title: string
}

export interface Quiz {
  module_id: string
  passing_score: number
  max_attempts?: number
  randomize_questions: boolean
  randomize_options: boolean
  questions: Question[]
}

export interface Question {
  id: string
  type: 'multiple_choice' | 'scenario'
  text: string
  options: QuestionOption[]
  explanation: string
}

export interface QuestionOption {
  text: string
  correct: boolean
}

export interface User {
  id: string
  email: string
  name: string | null
  role_type: RoleType | null
  organization: string | null
}

export interface Progress {
  sections_completed: SectionProgress[]
  modules_completed: string[]
  quizzes_passed: Record<string, QuizResult>
}

export interface SectionProgress {
  module_id: string
  section_slug: string
  completed_at: string
}

export interface QuizResult {
  score: number
  passed_at: string
}

export interface Certificate {
  id: string
  track: string
  certificate_uid: string
  recipient_name: string
  issued_at: string
  expires_at?: string
}

export interface QuizSubmission {
  module_id: string
  answers: Record<string, number>
  time_spent_seconds?: number
}

export interface QuizSubmissionResult {
  score: number
  passed: boolean
  passing_score: number
  results: QuestionResult[]
  certificate_eligible: boolean
}

export interface QuestionResult {
  question_id: string
  correct: boolean
  selected_option: number
  correct_option: number
  explanation: string
}

export interface QuizAttempt {
  id: string
  score: number
  passed: boolean
  attempted_at: string
}

export interface QuizAttemptsResponse {
  attempts: QuizAttempt[]
  best_score: number | null
  passed: boolean
}

export interface CertificateVerification {
  valid: boolean
  certificate_uid?: string
  recipient_name?: string
  track?: string
  track_title?: string
  issued_at?: string
  expires_at?: string
  reason?: 'not_found' | 'revoked' | 'expired'
  revoked_at?: string
}
