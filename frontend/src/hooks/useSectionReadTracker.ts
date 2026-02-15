import { useEffect, useRef, type RefObject } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import { useMarkSectionComplete } from '@/hooks/queries'

const SETTLE_MS = 1_500 // Ignore scroll events during smooth-scroll-to-top animation
const MIN_TIME_MS = 10_000 // Minimum time on page before auto-marking
const MIN_SCROLL_DEPTH = 0.75 // Fraction of content scrolled through
const CHECK_INTERVAL_MS = 2_000 // How often to evaluate thresholds

export function useSectionReadTracker(
  moduleId: string,
  sectionSlug: string,
  contentRef: RefObject<HTMLElement | null>,
  isComplete: boolean,
) {
  const { token } = useAuth()
  const markComplete = useMarkSectionComplete()
  const firedRef = useRef(false)
  const mountTimeRef = useRef(Date.now())
  const maxScrollYRef = useRef(0)

  // Reset when section changes
  useEffect(() => {
    firedRef.current = false
    mountTimeRef.current = Date.now()
    maxScrollYRef.current = 0
  }, [sectionSlug])

  useEffect(() => {
    if (isComplete) return

    const onScroll = () => {
      // Ignore scroll events during the smooth-scroll-to-top settle period
      // (scroll-behavior: smooth causes scrollTo(0,0) to animate, firing
      // intermediate events at the previous section's scroll position)
      if (Date.now() - mountTimeRef.current < SETTLE_MS) return
      maxScrollYRef.current = Math.max(maxScrollYRef.current, window.scrollY)
    }

    const checkAndMark = () => {
      if (firedRef.current || !token || !contentRef.current) return

      const elapsed = Date.now() - mountTimeRef.current
      if (elapsed < MIN_TIME_MS) return

      if (maxScrollYRef.current === 0) return

      const rect = contentRef.current.getBoundingClientRect()
      const contentTop = rect.top + window.scrollY
      const contentHeight = rect.height
      if (contentHeight === 0) return

      const scrollDepth = Math.min(
        1,
        Math.max(0, (maxScrollYRef.current + window.innerHeight - contentTop) / contentHeight),
      )

      if (scrollDepth >= MIN_SCROLL_DEPTH) {
        firedRef.current = true
        markComplete.mutateAsync({ moduleId, sectionSlug }).catch((err) => {
          console.error('Auto-mark section complete failed:', err)
          firedRef.current = false
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Check periodically for the time threshold (user may have already scrolled enough)
    const interval = setInterval(checkAndMark, CHECK_INTERVAL_MS)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(interval)
    }
  }, [sectionSlug, moduleId, token, isComplete, contentRef, markComplete])
}
