import { MapPin, BriefcaseBusiness } from 'lucide-react'
import { personal } from '../data/config'
import { timeline } from '../data/timeline'
import { ProfileAvatar } from '../components/ProfileAvatar'

const milestones = ['education', 'fullstack', 'professional'].map(id => timeline.find(item => item.id === id))

export function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <div className="about-copy"><div className="about-identity"><ProfileAvatar className="about-avatar"/><div><strong>Kihara Jimmy Chege</strong><span>Software engineer · Nairobi</span></div></div><p className="eyebrow"><span className="section-index">04 /</span> A LITTLE ABOUT ME</p><h2>Curiosity drives me.<br/><span className="muted-heading">Craft keeps me going.</span></h2><p className="about-lead">I’m Kihara Jimmy Chege, a software engineer based in Nairobi, building secure full-stack applications and reliable systems.</p><p>I’m curious about how systems are built, why they fail, and how to make them better. That curiosity has taken me from building full-stack applications to exploring web security, vulnerability analysis, and AI-assisted development.</p><p>I enjoy the whole process: untangling a problem, designing the architecture, getting the details right, and learning something new along the way.</p><a href="/cv.html" target="_blank" rel="noreferrer" className="text-link">Get the full picture — view my résumé </a><div className="about-meta"><span><MapPin size={14}/>{personal.location}</span><span><BriefcaseBusiness size={16}/>Software engineer</span></div></div>
        <div className="journey-panel"><div className="journey-heading"><span className="eyebrow">LEARNING. BUILDING. EVOLVING.</span></div><ol className="journey-list">{milestones.map(item => <li key={item.id}><span className="journey-dot"/><span className="journey-period">{item.period}</span><h3>{item.id === 'education' ? 'The foundation' : item.id === 'fullstack' ? 'From ideas to applications' : 'Engineering in practice'}</h3><p>{item.description}</p>{item.institution && <span className="journey-institution">{item.institution}</span>}</li>)}</ol><a href="#projects" className="journey-footer">See what I’ve been building </a></div>
      </div>
    </section>
  )
}
