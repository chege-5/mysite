import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Reveal, Stagger, StaggerItem } from '../motion'

const skills = [
  { name: 'Python', level: 0.95 },
  { name: 'JavaScript', level: 0.92 },
  { name: 'React', level: 0.9 },
  { name: 'Next.js', level: 0.88 },
  { name: 'Node.js', level: 0.9 },
  { name: 'SQL', level: 0.85 },
  { name: 'Git', level: 0.88 },
  { name: 'Linux', level: 0.86 },
  { name: 'Security', level: 0.94 },
  { name: 'APIs', level: 0.92 },
]

function ProgressRing({ name, level }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-20% 0px' })
  const radius = 26
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - level)

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 group" title={`${name} — ${Math.round(level * 100)}%`}>
      <div className="relative h-[64px] w-[64px]">
        <svg className="h-[64px] w-[64px] -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="4"
          />
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00FF88" />
              <stop offset="100%" stopColor="#FF7A18" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-fg tabular-nums">
          {Math.round(level * 100)}
        </div>
      </div>
      <p className="text-[11px] text-fg-subtle text-center leading-tight max-w-[64px]">{name}</p>
    </div>
  )
}

export function Competencies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-10% 0px -8% 0px' })

  return (
    <section id="competencies" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_60%,rgba(255,122,24,0.05),transparent_55%)]" />
      <div className="mx-3 sm:mx-6 lg:mx-10 max-w-6xl relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono text-orange tracking-[0.2em] uppercase"
            >
              02 / Competencies
            </motion.span>
            <Reveal variant="up" delay={0.05}>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-fg leading-[1.1]">
                Core engineering capabilities.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={0.15}>
              <p className="mt-5 text-base text-fg-muted leading-relaxed max-w-lg">
                A decade of focused practice distilled into the skills I rely on daily — from
                backend systems to secure frontend architecture.
              </p>
            </Reveal>
            <Reveal variant="up" delay={0.25}>
              <p className="mt-3 text-xs text-fg-subtle max-w-lg">
                These percentages are presentation indicators of proficiency, not formal
                industry measurements.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-5 sm:grid-cols-10 gap-3 sm:gap-4" delay={0.08}>
            {skills.map((s) => (
              <StaggerItem key={s.name} variant="scale" index={skills.indexOf(s)}>
                <ProgressRing name={s.name} level={s.level} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
