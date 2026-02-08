import { useQuery } from '@tanstack/react-query'
import { verifyCertificate } from '@/api/certificates'
import { queryKeys } from '@/lib/queryKeys'

export function useVerifyCertificate(uid: string | undefined) {
  return useQuery({
    queryKey: queryKeys.verify.certificate(uid!),
    queryFn: () => verifyCertificate(uid!),
    enabled: !!uid,
  })
}
