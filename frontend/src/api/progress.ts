import { apiClient } from './client'
import type { Progress, SectionProgress } from '@/types'

export async function getProgress(token: string): Promise<Progress> {
  return apiClient.get<Progress>('/progress', token)
}

export async function markSectionComplete(
  token: string,
  moduleId: string,
  sectionSlug: string
): Promise<SectionProgress> {
  return apiClient.post<SectionProgress>(
    '/progress/section',
    { module_id: moduleId, section_slug: sectionSlug },
    token
  )
}
