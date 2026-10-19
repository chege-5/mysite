import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { cn } from '../lib/utils'

export function Parallax({ children, className, factor = 0.18, offset = 'top', ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${offset} end`, `end ${offset}`],
  })
  const y = useTransform(scrollYProgress, [0, 1], [factor * 120, -factor * 120])
  return (
    <motion.div
      ref={ref}
      className={cn('will-change-[transform]', className)}
      style={{ y: isInView ? y : undefined, ...props }}
    >
      {children}
    </motion.div>
  )
}

Parallax.displayName = 'Parallax'
