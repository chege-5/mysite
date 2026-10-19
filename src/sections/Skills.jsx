import { Code2, Database, ShieldCheck, Terminal } from 'lucide-react'
import { techCategories } from '../data/technologies'
import { Proficiency } from './Proficiency'

const capabilities = [
  { icon: Code2, number: '01', title: 'Full-stack development', description: 'Interfaces that feel intuitive. APIs that stay predictable. I connect the two with clear contracts and maintainable code.', categories: ['frontend', 'backend'], skills: ['C# / .NET', 'Python', 'FastAPI', 'JavaScript', 'Node.js', 'React'], project: 'React interfaces, Transwest, Kodisha, and Node.js services.' },
  { icon: ShieldCheck, number: '02', title: 'Security-minded engineering', description: 'Authentication, access control, and input validation belong in the design. I think about the failure cases alongside the happy path.', categories: ['security'], skills: ['JWT', 'RBAC', 'API security', 'SAST / DAST', 'CVE / CWE'], project: 'Applied in VulNexus, HashX, and Transwest; advancing through SentinelX.' },
  { icon: Database, number: '03', title: 'Data & infrastructure', description: 'Reliable persistence, background processing, and useful automation. I turn scattered data into systems you can work with.', categories: ['database', 'tools'], skills: ['PostgreSQL', 'SQL Server', 'Redis', 'Celery', 'Git', 'Linux'], project: 'FairGrid forecasts, financial records, and catalog matching.' },
]

export function Skills() {
  return (
    <section id="skills" className="section expertise-section">
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow"><span className="section-index">03 /</span> HOW I CAN HELP</p><h2>Across the stack.<br/><span className="muted-heading">With security in mind.</span></h2></div><p className="section-description">The tools matter. Knowing how to put<br className="desktop-break"/> them together matters more.</p></div>
        <div className="expertise-grid">{capabilities.map(({icon: Icon, number, title, description, skills, categories, project}) => (
          <article className="expertise-item" key={number}>
            <div className="expertise-top"><Icon size={25} strokeWidth={1.4}/><span>{number}</span></div>
            <h3>{title}</h3><p>{description}</p><div className="expertise-tags">{skills.map(skill => <span key={skill}>{skill}</span>)}</div><p className="expertise-evidence">{project}</p>
            <details className="stack-details"><summary>Explore the toolkit <span>+</span></summary><div>{techCategories.filter(category => categories.includes(category.id)).map(category => <div key={category.id}><h4>{category.label}</h4><ul>{category.technologies.map(tech => <li key={tech.name}><strong>{tech.name}</strong><span>{tech.detail}</span></li>)}</ul></div>)}</div></details>
          </article>
        ))}</div>
        <div className="working-note"><Terminal size={17}/><span>My approach</span><p>Understand the problem. Design deliberately. Build, test, and improve.</p></div>
        <Proficiency />
      </div>
    </section>
  )
}
