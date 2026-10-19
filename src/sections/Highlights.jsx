import { Award, MapPinned } from 'lucide-react'
import { achievements } from '../data/highlights'
import certificateUrl from '../assets/certificate.jpeg'
import epraPhoto from '../assets/epra.webp'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../components/ui/dialog'

export function Highlights() {
  return <section id="highlights" className="section highlights-section"><div className="container">
    <div className="section-heading"><div><p className="eyebrow"><span className="section-index">02 /</span> BEYOND THE BUILD</p><h2>Ideas put to the test<span className="accent">.</span></h2></div><p className="section-description">Hackathons, data challenges,<br className="desktop-break"/> and the lessons that stay with me.</p></div>
    <div className="highlights-grid">{achievements.map((item,index) => {
      const Icon = index === 0 ? Award : MapPinned
      return <article className="highlight-card" key={item.id}>
        <div className={`highlight-media ${item.id === 'epra' ? 'event-photo' : 'document-photo'}`}><img src={item.id === 'epra' ? epraPhoto : certificateUrl} alt={item.id === 'epra' ? 'Jimmy and fellow participants at the EPRA hackathon recognition event' : 'GeoML Datathon certificate of participation'} loading="eager" width={item.id === 'epra' ? 1280 : 1080} height={item.id === 'epra' ? 853 : 774}/></div>
        <div className="highlight-top"><Icon size={27} strokeWidth={1.3}/><span>{item.event}</span></div>
        <div className="achievement-badges">{item.distinctions.map(label => <span key={label}>{label}</span>)}</div>
        <h3>{item.title}</h3><p>{item.description}</p><p className="highlight-takeaway">{item.takeaway}</p>
        {item.projectId && <a className="text-link" href="#projects">Explore FairGrid in my work</a>}
        {item.id === 'zetech-datathon' && <Dialog><DialogTrigger asChild><button type="button" className="text-link certificate-trigger">View participation certificate</button></DialogTrigger><DialogContent className="certificate-dialog"><DialogTitle>GeoML Datathon · Certificate of participation</DialogTitle><DialogDescription>12-hour sprint · Zetech Technology Park · 11 July 2026</DialogDescription><img className="certificate-preview" src={certificateUrl} alt="Certificate awarded to Jimmy Kihara Chege for building and shipping a project at the GeoML Datathon on 11 July 2026" width="1080" height="774"/></DialogContent></Dialog>}
      </article>
    })}</div>
  </div></section>
}
