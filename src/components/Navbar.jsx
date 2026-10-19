import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog'
import { ProfileAvatar } from './ProfileAvatar'

const links = [
  { id: 'projects', label: 'Work' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'skills', label: 'Expertise' },
  { id: 'about', label: 'About' },
]

export function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    }, { rootMargin: '-15% 0px -65% 0px' })
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header">
      <nav className="container nav-inner" aria-label="Main navigation">
        <a className="wordmark" href="#home" aria-label="Jimmy Chege, home">
          <ProfileAvatar className="header-avatar"/>
          <span>Jimmy Chege<span className="wordmark-caption">Software engineer</span></span>
        </a>
        <div className="desktop-nav">
          {links.map(({ id, label }) => <a key={id} href={`#${id}`} className={active === id ? 'nav-link active' : 'nav-link'} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
          <a href="/cv.html" target="_blank" rel="noreferrer" className="nav-link">Résumé </a>
        </div>
        <a className="nav-contact" href="#contact">Let’s talk </a>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button className="mobile-menu-button" aria-label="Open navigation"><Menu size={22} /></button></DialogTrigger>
          <DialogContent className="mobile-nav-dialog">
            <DialogTitle>Explore</DialogTitle>
            <DialogDescription>Work, background, and ways to get in touch.</DialogDescription>
            {[...links, { id: 'contact', label: 'Let’s talk' }].map(({ id, label }) => <DialogClose asChild key={id}><a href={`#${id}`} className="mobile-nav-link">{label}</a></DialogClose>)}
            <a href="/cv.html" target="_blank" rel="noreferrer" className="mobile-nav-link" onClick={() => setOpen(false)}>Résumé</a>
          </DialogContent>
        </Dialog>
      </nav>
    </header>
  )
}
