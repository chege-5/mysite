import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function RollingNumber({ value, pad = 2 }) {
  const ref = useRef(null)
  const visible = useInView(ref)
  const reduced = useReducedMotionPreference()
  const digits = String(value).padStart(pad, '0')

  return (
    <span ref={ref} className="rolling-number" aria-label={String(value)}>
      <span className="rolling-digits" aria-hidden="true">
        {Array.from(digits, (digit, index) => (
          <span className="digit-window" key={`${digits.length}-${index}`}>
            <motion.span className="digit-reel" initial={false}
              animate={{ y: `-${visible || reduced ? Number(digit) : 0}em` }}
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 65, damping: 18, delay: index * 0.05 }}>
              {Array.from({ length: 10 }, (_, number) => <span key={number}>{number}</span>)}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  )
}
