import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'
import { ShieldCheck, ScanLine, Layers, Database, Search, Check, LockKeyhole, Network } from 'lucide-react'
import { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog'
import { GitHubIcon } from '../components/icons'
import { projects } from '../data/projects'
import { personal } from '../data/config'
import { RollingNumber } from '../components/RollingNumber'
import { ProjectMedia } from '../components/ProjectMedia'
import { ProjectArtwork, getProjectImage } from '../components/ProjectArtwork'

const presentation = Object.fromEntries(projects.map((project,index) => [project.id, { category: project.category, label: project.label, title: project.cardTitle || project.title, color: 'navy', number: String(index+1).padStart(2,'0'), intro: project.description }]))

function ProjectPreview({ project }) {
  if (!['security','financial','automotive'].includes(project.visualType)) {
    const steps = Array.isArray(project.architecture) ? project.architecture : Object.values(project.architecture || {})
    return <div className="workflow-concept"><div className="workflow-concept-title"><span>{project.cardTitle || project.title}</span><span>{project.status || 'WORKFLOW CONCEPT'}</span></div><div className="workflow-concept-steps">{steps.slice(0,5).map((step,index) => <div key={step}><span>{String(index+1).padStart(2,'0')}</span><strong>{step}</strong></div>)}</div></div>
  }
  if (project.visualType === 'security') return (
    <div className="preview-app security-app">
      <div className="app-sidebar"><ShieldCheck size={19}/><span className="sidebar-mark active"><Layers size={13}/></span><ScanLine size={13}/><Database size={13}/><LockKeyhole size={13}/></div>
      <div className="app-main">
        <div className="app-heading"><span>VulNexus<span className="app-subtitle">Security audit workspace</span></span><span className="app-badge"><span className="status-dot"/> AUDIT PIPELINE</span></div>
        <div className="audit-steps"><span><ScanLine size={15}/> Discover</span><span><ShieldCheck size={15}/> Analyze</span><span><Check size={15}/> Remediate</span></div>
        <div className="audit-panel"><span className="app-label">DEFENSE IN DEPTH</span><div className="audit-chart">{Array.from({length:18}, (_, index) => <span key={index}/>)}</div><div className="chart-labels"><span>Discovery</span><span>Intelligence</span><span>Mitigation</span></div></div>
        <div className="app-status"><span><span className="status-dot"/> TLS / HTTPS</span><span>CVE / CWE</span><span>AI-assisted guidance </span></div>
      </div>
    </div>
  )
  if (project.visualType === 'financial') return (
    <div className="preview-app finance-app">
      <div className="app-heading"><span className="finance-brand"><span className="mini-monogram">T.</span> Transwest<span className="app-subtitle">SACCO management</span></span><span className="app-badge">WORKSPACE</span></div>
      <div className="finance-tabs"><span className="selected">Overview</span><span>Members</span><span>Loans</span><span>Ledger</span></div>
      <div className="finance-panels"><div><span className="app-label">MEMBER ACCOUNTS</span><div className="donut-chart"><span><LockKeyhole size={19}/></span></div><span className="chart-note">Role-based access</span></div><div><span className="app-label">CONNECTED WORKFLOWS</span>{['Member onboarding', 'Loan management', 'Transaction records'].map(label => <div key={label} className="workflow-row"><span className="workflow-icon"><Check size={11}/></span>{label}</div>)}</div></div>
    </div>
  )
  if (project.visualType === 'enterprise') return (
    <div className="preview-app enterprise-app">
      <div className="app-heading"><span>transwest<span className="app-subtitle">Application architecture</span></span><Network size={18}/></div>
      <div className="architecture-flow"><div><Layers size={23}/><strong>React</strong><span>Presentation</span></div><span className="flow-line"/><div><Network size={23}/><strong>.NET</strong><span>REST API</span></div><span className="flow-line"/><div><Database size={23}/><strong>SQL Server</strong><span>Persistence</span></div></div>
      <div className="code-line"><span>GET</span><code>/api/resources</code><span className="code-response">JSON response </span></div>
    </div>
  )
  return (
    <div className="preview-app catalog-app">
      <div className="app-heading"><span>mastered seed<span className="app-subtitle">Automotive parts intelligence</span></span><span className="app-badge">CATALOG</span></div>
      <div className="catalog-search"><Search size={13}/><span>Discover. Normalize. Match.</span><span className="search-key">⌘ K</span></div>
      <div className="catalog-sources">{['KE', 'JP', 'US', 'UK', 'CN'].map(region => <span key={region}>{region}</span>)}<span className="source-caption">Connected sources</span></div>
      <div className="catalog-pipeline">{[{ icon: Database, title: 'Collect', text: 'Regional sources' }, { icon: Layers, title: 'Normalize', text: 'Structured records' }, { icon: Check, title: 'Match', text: 'Unified catalog' }].map(({icon: Icon, title, text}) => <div key={title}><Icon size={17}/><strong>{title}</strong><span>{text}</span></div>)}</div>
    </div>
  )
}

function ProjectCard({ project }) {
  const meta = presentation[project.id]
  const triggerRef = useRef(null)
  const reduced = useReducedMotionPreference()
  const expandFromCard = useCallback(node => {
    if (!node || reduced || !triggerRef.current) return
    const from = triggerRef.current.getBoundingClientRect()
    const to = node.getBoundingClientRect()
    const x = from.left + from.width / 2 - (to.left + to.width / 2)
    const y = from.top + from.height / 2 - (to.top + to.height / 2)
    node.animate([
      { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${Math.min(from.width / to.width, 0.9)})`, opacity: 0 },
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
    ], { duration: 440, easing: 'cubic-bezier(.16,1,.3,1)' })
  }, [reduced])
  return (
    <li className="project-stop">
      <span className="project-waypoint" aria-hidden="true">{meta.number}</span>
      <article className={`project-card project-${meta.color}`} style={{ viewTransitionName: `project-${project.id}` }}>
      <Dialog>
        <DialogTrigger asChild>
          <button ref={triggerRef} className="project-trigger" aria-label={`Read ${meta.title} case study`}>
            <div className="project-visual"><ProjectArtwork project={project}/><span className="preview-number">{meta.number} / {meta.label}</span><span className="preview-disclaimer">PROJECT ARTWORK</span><span className="project-open">View project</span></div>
            <div className="project-info"><div className="project-category">{meta.label}</div>{(project.badges?.length || project.status) && <div className="project-badges">{project.badges?.map(label => <span key={label}>{label}</span>)}{project.status && <span>{project.status}</span>}</div>}<h3>{meta.title}</h3><p>{meta.intro}</p><div className="tech-tags">{project.technologies.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div><span className="case-study-link">Explore case study </span></div>
          </button>
        </DialogTrigger>
        <DialogContent className="case-dialog" ref={expandFromCard}>
          <DialogHeader><span className="eyebrow">{meta.label} / {meta.number}</span><DialogTitle className="case-title">{project.title}</DialogTitle><DialogDescription>{project.subtitle}</DialogDescription>{project.status && <span className="project-status">{project.status}</span>}</DialogHeader>
          <ProjectMedia image={getProjectImage(project)} artwork={<ProjectArtwork project={project}/>} color={meta.color} conceptLabel={getProjectImage(project) ? 'INTERFACE CONCEPT' : 'WORKFLOW CONCEPT'}><ProjectPreview project={project}/></ProjectMedia>
          <p className="case-summary">{project.summary}</p>
          <div className="case-columns"><div><h3>The challenge</h3><p>{project.challenge}</p></div><div><h3>The approach</h3><p>{project.solution}</p></div></div>
          <div className="case-architecture"><h3>System architecture</h3>{Array.isArray(project.architecture) ? <ol className="architecture-steps">{project.architecture.map(step => <li key={step}>{step}</li>)}</ol> : <dl>{Object.entries(project.architecture).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>}</div>
          <div><h3>What it covers</h3><ul className="case-features">{project.features.map(feature => <li key={feature}><Check size={14}/>{feature}</li>)}</ul></div>
          <div className="tech-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
          <div className="case-links">{project.github && <a className="button button-outline" href={project.github} target="_blank" rel="noreferrer"><GitHubIcon className="social-icon"/> Repository </a>}{project.demo && <a className="button button-primary" href={project.demo} target="_blank" rel="noreferrer">Live demo </a>}<DialogClose asChild><a href="#contact" className="case-contact">Discuss this project </a></DialogClose></div>
        </DialogContent>
      </Dialog>
      <a className="project-github" href={project.github} target="_blank" rel="noreferrer" aria-label={`${meta.title} on GitHub`} title={`${meta.title} on GitHub`}><GitHubIcon className="social-icon"/></a>
      </article>
    </li>
  )
}

export function Projects() {
  const [filter, setFilter] = useState('All work')
  const reduced = useReducedMotionPreference()
  const transition = useRef(null)
  const journey = useRef(null)
  const [path, setPath] = useState({ d: '', width: 1, height: 1 })
  useLayoutEffect(() => {
    const element = journey.current
    let frame
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect()
        const points = [...element.querySelectorAll('.project-waypoint')].map(dot => {
          const rect = dot.getBoundingClientRect()
          return `${rect.left + rect.width / 2 - bounds.left},${rect.top + rect.height / 2 - bounds.top}`
        })
        setPath({ d: points.length ? `M${points.join(' L')}` : '', width: bounds.width, height: bounds.height })
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    element.querySelectorAll('.project-stop').forEach(stop => observer.observe(stop))
    measure()
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [filter])
  const changeFilter = label => {
    if (filter === label) return
    transition.current?.skipTransition()
    if (!reduced && document.startViewTransition) {
      transition.current = document.startViewTransition(() => flushSync(() => setFilter(label)))
      transition.current.finished.catch(() => {})
    } else setFilter(label)
  }
  const filtered = projects.filter(project => filter === 'All work' || presentation[project.id].category === filter)
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow"><span className="section-index">01 /</span> SELECTED WORK</p><h2>Built with purpose<span className="accent">.</span></h2></div><p className="section-description">A few things I’ve built. Different domains,<br className="desktop-break"/> the same care for the details.</p></div>
        <div className="project-toolbar"><div className="project-filters" aria-label="Filter projects">{['All work', 'Full-stack', 'Security', 'AI & data', 'Data & automation'].map(label => <button key={label} aria-pressed={filter === label} onClick={() => changeFilter(label)}>{label}{label === 'All work' && <span>{projects.length.toString().padStart(2, '0')}</span>}</button>)}</div><span className="results-count" role="status"><RollingNumber value={filtered.length}/> PROJECTS</span></div>
        <div className="project-journey-shell" ref={journey}><svg className="project-journey-path" viewBox={`0 0 ${path.width} ${path.height}`} preserveAspectRatio="none" aria-hidden="true"><path d={path.d}/></svg><ul className="projects-grid project-journey" aria-label="Project case studies">{filtered.map(project => <ProjectCard key={project.id} project={project}/>)}</ul></div>
        <div className="projects-bottom"><span>Curious about the code behind the work?</span><a href={personal.github} target="_blank" rel="noreferrer">Find me on GitHub </a></div>
      </div>
    </section>
  )
}
