import { proficiencyGroups } from '../data/highlights'
import { RollingNumber } from '../components/RollingNumber'

export function Proficiency() {
  return <div id="toolkit" className="proficiency-section">
    <div className="proficiency-heading"><div><p className="eyebrow">THE TOOLS I WORK WITH</p><h3>Languages & frameworks</h3></div><p>Self-assessed proficiency · 80–94%</p></div>
    <div className="proficiency-grid">{proficiencyGroups.map(group => <article className="proficiency-card" key={group.title}>
      <h4>{group.title}</h4>{group.items.map(item => <div className="proficiency-item" key={item.name}>
        <div className="proficiency-label"><span>{item.name}</span><span><RollingNumber value={item.percent}/>%</span></div>
        <div className="proficiency-track" role="meter" aria-label={item.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.percent} aria-valuetext={`${item.percent}% self-assessed proficiency`}><span style={{ '--proficiency': `${item.percent}%`, '--skill-color': item.color }}/></div>
      </div>)}
    </article>)}</div>
  </div>
}
