import { Network, GraduationCap, ShieldCheck } from 'lucide-react'
import { training } from '../data/highlights'
const education = [{ id: 'university', course: 'Software engineering', provider: 'Zetech University', description: 'Academic foundations in systems design, algorithms, and secure development.', type: 'Academic foundation' }, ...training]
const icons = [GraduationCap, Network, GraduationCap, ShieldCheck]
export function Certifications() {
 return <section id="training" className="section training-section"><div className="container">
  <div className="section-heading"><div><p className="eyebrow"><span className="section-index">05 /</span> FOUNDATIONS & CONTINUED LEARNING</p><h2>Education & technical training<span className="accent">.</span></h2></div><p className="section-description">Software engineering foundations,<br className="desktop-break"/> networking, and applied security.</p></div>
  <ol className="education-timeline">{education.map((item,index) => { const Icon = icons[index]; return <li className="education-stop" key={item.id}><span className="education-dot" aria-hidden="true"/><article className="training-card"><Icon size={28} strokeWidth={1.3}/><span className="training-type">{item.type}</span><h3>{item.course}</h3><p className="training-provider">{item.provider}</p><p>{item.description}</p></article></li> })}</ol>
 </div></section>
}
