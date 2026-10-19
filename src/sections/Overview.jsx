import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Reveal, Stagger, StaggerItem, TextReveal } from '../motion'
import { Layers, Shield, Code2 } from 'lucide-react'

const capabilities = [
  { icon: Layers, title: 'Scalable Design', text: 'Fault-tolerant architecture that grows with demand.' },
  { icon: Shield, title: 'Threat Mitigation', text: 'Security modeled from the first diagram.' },
  { icon: Code2, title: 'Full-Stack Engineering', text: 'End-to-end systems across frontend, API and data.' },
]

export function Overview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-10% 0px -8% 0px' })

  return (
    <section id="overview" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(0,255,136,0.06),transparent_55%)]" />
      <div className="mx-3 sm:mx-6 lg:mx-10 max-w-6xl relative">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div ref={ref}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono text-green tracking-[0.2em] uppercase"
            >
              01 / Overview
            </motion.span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-fg leading-[1.1]">
              <TextReveal as="span">Systems</TextReveal>{' '}
              <TextReveal as="span">&amp;</ TextReveal>{' '}
              <TextReveal as="span">Strategy</TextReveal>
            </h2>
            <p className="mt-6 text-xl sm:text-2xl text-fg leading-snug max-w-xl">
              Building the foundations of secure digital products.
            </p>
            <p className="mt-6 text-base text-fg-muted leading-relaxed max-w-xl">
              I specialize in architecting highly scalable, fault-tolerant systems where
              top-tier performance intersects with uncompromising security. By combining
              full-stack engineering with security-focused thinking, I build digital
              infrastructure designed for resilience, maintainability, and performance.
            </p>
            <p className="mt-4 text-base text-fg-subtle leading-relaxed max-w-xl">
              My methodology relies on clean architecture, rigorous testing, structured
              debugging, documentation, and proactive vulnerability modeling.
            </p>
          </div>

          <div className="lg:pt-12">
            <Stagger className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4" delay={0.12}>
              {capabilities.map(({ icon: Icon, title, text }) => (
                <StaggerItem key={title} variant="up">
                  <div className="group p-6 rounded-2xl border border-white/8 bg-white/[0.025] hover:bg-white/[0.05] hover:border-green/20 transition-all duration-300">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green/10 text-green group-hover:shadow-[0_0_22px_rgba(0,255,136,0.25)] transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-fg">{title}</h3>
                    <p className="mt-1.5 text-sm text-fg-subtle leading-relaxed">{text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal variant="scale" delay={0.4} className="mt-8">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
                  <span className="text-xs font-mono text-green tracking-wider">SYSTEM.STATUS</span>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed">
                  Every system I ship is designed with observability, failover, and upgrade
                  paths in mind — so the infrastructure outlives any single release.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
