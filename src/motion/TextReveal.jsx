import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../lib/utils'

const charTransition = (i) => ({
  duration: 0.5,
  delay: i * 0.028,
  ease: [0.16, 1, 0.3, 1],
})

/**
 * Character-level heading reveal. Children should be a plain string for the
 * stagger effect; JSX children render as-is without character splitting.
 */
export function TextReveal({ children, className, as: Tag = 'span', ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-10% 0px -8% 0px' })
  const text = typeof children === 'string' ? children : null

  if (!text) {
    return (
      <Tag ref={ref} className={cn('inline-block', className)} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} className={cn('inline-block', className)} {...props}>
      {text.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} className="inline-block">&nbsp;</span>
        ) : (
          <motion.span
            key={i}
            className="inline-block"
            style={{ willChange: 'transform,opacity' }}
            initial={{ opacity: 0, y: '120%' }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={charTransition(i)}
          >
            {char}
          </motion.span>
        ),
      )}
    </Tag>
  )
}

TextReveal.displayName = 'TextReveal'
