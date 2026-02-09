import { apiClient } from './client'

export interface AdminUserSummary {
  id: string
  email: string
  name: string | null
  role_type: string | null
  is_admin: boolean
  last_login: string | null
  created_at: string
  sections_completed: number
  quizzes_passed: number
  certificates_count: number
}

export interface AdminUserListResponse {
  users: AdminUserSummary[]
  total: number
  page: number
  per_page: number
}

export interface ModuleProgressDetail {
  module_id: string
  sections_completed: number
}

export interface QuizAttemptDetail {
  id: string
  module_id: string
  score: number
  passed: boolean
  attempted_at: string
}

export interface CertificateDetail {
  id: string
  track: string
  certificate_uid: string
  issued_at: string
}

export interface AdminUserDetail extends AdminUserSummary {
  module_progress: ModuleProgressDetail[]
  quiz_attempts: QuizAttemptDetail[]
  certificates: CertificateDetail[]
}

export async function getAdminUsers(
  token: string,
  params: { page?: number; per_page?: number; search?: string } = {},
): Promise<AdminUserListResponse> {
  const searchParams = new URLSearchParams()
  if (params.page) searchParams.set('page', String(params.page))
  if (params.per_page) searchParams.set('per_page', String(params.per_page))
  if (params.search) searchParams.set('search', params.search)
  const qs = searchParams.toString()
  return apiClient.get<AdminUserListResponse>(`/admin/users${qs ? `?${qs}` : ''}`, token)
}

export async function getAdminUserDetail(token: string, userId: string): Promise<AdminUserDetail> {
  return apiClient.get<AdminUserDetail>(`/admin/users/${userId}`, token)
}

export async function promoteUser(token: string, userId: string) {
  return apiClient.put(`/admin/users/${userId}/promote`, undefined, token)
}

export async function demoteUser(token: string, userId: string) {
  return apiClient.put(`/admin/users/${userId}/demote`, undefined, token)
}

export async function deleteUser(token: string, userId: string) {
  return apiClient.delete(`/admin/users/${userId}`, token)
}

export interface ResetProgressRequest {
  sections: boolean
  quizzes: boolean
  certificates: boolean
}

export interface ResetProgressResponse {
  sections_deleted: number
  quizzes_deleted: number
  certificates_deleted: number
}

export async function resetProgress(
  token: string,
  data: ResetProgressRequest,
): Promise<ResetProgressResponse> {
  return apiClient.post<ResetProgressResponse>('/users/me/reset-progress', data, token)
}
