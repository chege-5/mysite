import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { VisualEffects } from './components/VisualEffects'
import { AmbientBackground } from './components/AmbientBackground'
import { Highlights } from './sections/Highlights'
import { Certifications } from './sections/Certifications'
import { ProfileIcon } from './components/ProfileAvatar'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <AmbientBackground />
      <ProfileIcon />
      <Navbar />
      <VisualEffects />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <Highlights />
        <Skills />
        <About />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
