import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'
import { Reveal, Stagger } from '../motion'
import { motion } from 'framer-motion'
import { Shield, Lock, Key, Scan, FileWarning, Activity } from 'lucide-react'

const defenses = [
  { label: 'Authentication', x: 200, y: 40, icon: Lock, desc: 'Strong, verifiable identity and session control.' },
  { label: 'Authorization / RBAC', x: 260, y: 75, icon: Key, desc: 'Least-privilege access for every role.' },
  { label: 'TLS / HTTPS', x: 280, y: 125, icon: Shield, desc: 'Encrypted transport everywhere.' },
  { label: 'Input Validation', x: 250, y: 175, icon: Scan, desc: 'Never trust the client.' },
  { label: 'SAST / DAST', x: 200, y: 210, icon: Activity, desc: 'Static and dynamic security testing.' },
  { label: 'Monitoring', x: 140, y: 210, icon: FileWarning, desc: 'Detect anomalies before they become breaches.' },
]

function SecurityDiagram() {
  return (
    <svg viewBox="0 0 360 250" className="w-full h-auto" aria-label="Security attack and defense layers">
      <defs>
        <linearGradient id="attackGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF7A18" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF7A18" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF7A18" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="50" y1="30" x2="50" y2="210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="20" y1="30" x2="340" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="20" y1="210" x2="340" y2="210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {defenses.map((d, i) => (
        <g key={d.label}>
          <circle cx={d.x} cy={d.y} r="22" fill="rgba(0,255,136,0.06)" stroke="rgba(0,255,136,0.35)" strokeWidth="1" />
          <text x={d.x} y={d.y + 4} textAnchor="middle" fill="#00FF88" fontSize="9" fontWeight="600" fontFamily="monospace">{d.label}</text>
        </g>
      ))}

      {['USER', 'APPLICATION', 'API', 'DATABASE'].map((label, i, arr) => {
        const y = 30 + i * 60
        return (
          <g key={label}>
            <circle cx="120" cy={y} r="16" fill="rgba(255,122,24,0.08)" stroke="rgba(255,122,24,0.5)" strokeWidth="1" />
            <text x="120" y={y + 3} textAnchor="middle" fill="#FF7A18" fontSize="9" fontWeight="600" fontFamily="monospace">{label}</text>
          </g>
        )
      })}

      {[0, 1, 2].map(i => (
        <line key={`attack-${i}`} x1="120" y1={30 + i * 60 + 16} x2="120" y2={90 + i * 60 - 16} stroke="url(#attackGrad)" strokeWidth="2" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
        </line>
      ))}
      {defenses.map((d, i) => (
        <line key={`conn-${i}`} x1={d.x > 120 ? 136 : d.x - 16} y1={d.y} x2={d.x > 120 ? 136 : 104} y2={d.y} stroke="rgba(0,255,136,0.12)" strokeWidth="1" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="3s" repeatCount="indefinite" />
        </line>
      ))}
    </svg>
  )
}

export function Security() {
  const { ref, isInView } = useInView({ margin: '0px 0px 0px 0px' })

  return (
    <section id="security" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="mx-3 sm:mx-6 lg:mx-10 max-w-6xl relative">
        <div ref={ref} className={cn('transition-all duration-700 ease-out-expo', isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="text-xs font-mono text-orange tracking-[0.2em] uppercase">
            03 / Security Lab
          </motion.span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-fg">
            Engineering with an adversarial mindset.
          </h2>
          <p className="text-fg-muted max-w-3xl leading-relaxed mt-6 mb-10">
            Software should not only work under expected conditions — it should survive unexpected and malicious inputs.
            Security is not an afterthought; it is a design constraint woven into architecture, code, and review.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <Reveal variant="left" delay={0.1} className="lg:col-span-3">
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-mono text-green tracking-wider">ATTACK_SURFACE.DEFENSE_LAYERS</h3>
                <span className="text-[10px] text-fg-subtle font-mono">v1.2</span>
              </div>
              <SecurityDiagram />
              <p className="text-xs text-fg-subtle mt-4 text-center">
                Attack path through an application, surrounded by defensive layers.
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            {defenses.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} variant="right" delay={0.05 * i}>
                  <div className="group p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-green/20 transition-all duration-300 h-full">
                    <Icon className="h-5 w-5 text-green mb-2 group-hover:drop-shadow-[0_0_8px_rgba(0,255,136,0.5)] transition-all duration-300" />
                    <h4 className="text-sm font-semibold text-fg">{item.title}</h4>
                    <p className="text-xs text-fg-subtle mt-1">{item.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
