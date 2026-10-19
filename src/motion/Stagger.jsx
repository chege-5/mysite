import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../lib/utils'

const itemVariants = {
  up: { hidden: { opacity: 0, y: 38, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } },
  down: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -45 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 45 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
}

export function Stagger({ children, className, delay = 0.09, variant = 'up', ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-10% 0px -8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
        hidden: {},
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, variant = 'up', index, ...props }) {
  return (
    <motion.div
      variants={itemVariants[variant]}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index ? index * 0.08 : 0 }}
      className={cn('will-change-[transform,opacity]', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

Stagger.displayName = 'Stagger'
StaggerItem.displayName = 'StaggerItem'
