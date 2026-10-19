import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'
import { Reveal, Stagger, StaggerItem } from '../motion'
import { timeline } from '../data/timeline'

export function Experience() {
  const { ref, isInView } = useInView({ margin: '0px 0px 0px 0px' })

  return (
    <section id="experience" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="mx-3 sm:mx-6 lg:mx-10 max-w-6xl relative">
        <div className="mb-12">
          <span className="text-xs font-mono text-green tracking-[0.2em] uppercase">04 / Journey</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-fg">Milestones</h2>
          <p className="mt-3 text-fg-subtle max-w-2xl">
            The path that shaped how I build, break, and secure systems.
          </p>
        </div>

        <div ref={ref} className={cn('transition-all duration-700 ease-out-expo', isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <ul className="relative ml-3 sm:ml-6 list-none">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-green/40 via-green/20 to-transparent" aria-hidden="true" />
            <Stagger delay={0.08}>
              {timeline.map((item, i) => (
                <StaggerItem key={item.id} variant="left" index={i}>
                  <li>
                    <article className="relative pl-10 sm:pl-14 pb-10">
                      <span
                        className={cn(
                          'absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 bg-bg',
                          i === 0 ? 'bg-green border-green shadow-[0_0_12px_rgba(0,255,136,0.5)]' : 'border-green/40',
                        )}
                        aria-hidden="true"
                      />
                      {i === 0 && (
                        <span className="absolute -left-[5px] top-1 h-5 w-5 rounded-full bg-green/20 blur-sm" aria-hidden="true" />
                      )}
                      <Reveal variant="up" delay={0.05} className="opacity-100 translate-y-0">
                        <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                        {item.institution && <p className="text-sm text-green mt-0.5">{item.institution}</p>}
                        <p className="text-xs text-fg-subtle uppercase tracking-wider mt-1">{item.period}</p>
                        <p className="text-sm text-fg-muted mt-2 max-w-2xl leading-relaxed">{item.description}</p>
                      </Reveal>
                    </article>
                </li>
                </StaggerItem>
              ))}
            </Stagger>
          </ul>
        </div>
      </div>
    </section>
  )
}
