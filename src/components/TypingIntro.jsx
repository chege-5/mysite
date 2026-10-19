import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const name = 'Jimmy Chege.'

export function TypingIntro() {
  const ref = useRef(null)
  const visible = useInView(ref, { amount: 0.2 })
  const reduced = useReducedMotionPreference()
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (reduced) return
    if (!visible) { setLength(0); return }
    const timer = window.setInterval(() => setLength(value => {
      if (value >= name.length) { window.clearInterval(timer); return value }
      return value + 1
    }), 105)
    return () => window.clearInterval(timer)
  }, [visible, reduced])

  return (
    <h1 ref={ref} className="intro-heading" aria-label={`Hi, I’m ${name}`}>
      <span className="intro-greeting" aria-hidden="true">Hi, I’m</span>
      <span className="intro-name" aria-hidden="true">
        <span className="typing-reserve">{name}</span>
        <span className="typing-copy">{reduced ? name : name.slice(0, length)}<span className="typing-caret"/></span>
      </span>
    </h1>
  )
}
