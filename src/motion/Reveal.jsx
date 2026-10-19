import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../lib/utils'

const transition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] }

const variants = {
  up: {
    hidden: { opacity: 0, y: 55, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  down: {
    hidden: { opacity: 0, y: -45, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -70, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  right: {
    hidden: { opacity: 0, x: 70, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  clip: {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
  },
  flip: {
    hidden: { opacity: 0, rotateX: 28, y: 40, scale: 0.95 },
    visible: { opacity: 1, rotateX: 0, y: 0, scale: 1 },
  },
}

export function Reveal({ children, className, variant = 'up', delay = 0, transitionOverride, ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-10% 0px -8% 0px' })
  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ ...transition, ...transitionOverride, delay }}
      className={cn('will-change-[transform,opacity]', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

Reveal.displayName = 'Reveal'
