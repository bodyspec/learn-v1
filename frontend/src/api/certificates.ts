import { apiClient } from './client'
import type { Certificate, CertificateVerification } from '@/types'

export async function getCertificates(token: string): Promise<{ certificates: Certificate[] }> {
  return apiClient.get<{ certificates: Certificate[] }>('/certificates', token)
}

export async function requestCertificate(
  token: string,
  track: string
): Promise<Certificate> {
  return apiClient.post<Certificate>('/certificates', { track }, token)
}

export async function verifyCertificate(
  certificateUid: string
): Promise<CertificateVerification> {
  return apiClient.get<CertificateVerification>(`/verify/${certificateUid}`)
}

export function getCertificatePdfUrl(certificateUid: string): string {
  return `/api/v1/certificates/${certificateUid}/pdf`
}
