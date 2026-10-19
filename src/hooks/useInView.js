import { useEffect, useRef, useState } from 'react'

/**
 * Reusable in-view detector using a raw DOM IntersectionObserver.
 * Tracks visibility state so animations re-trigger when scrolling up/down.
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1, ...options },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isInView }
}
