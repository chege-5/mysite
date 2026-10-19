import { Component, Suspense, lazy } from 'react'
import { MapPin } from 'lucide-react'
import { personal, availability } from '../data/config'
import { GitHubIcon, LinkedInIcon } from '../components/icons'
import { RollingNumber } from '../components/RollingNumber'
import { projects } from '../data/projects'
import { TypingIntro } from '../components/TypingIntro'
import { portraitUrl } from '../data/portrait'

const HeroScene = lazy(() => import('../three/HeroScene'))

function SceneArtwork() {
  return (
    <div className="hero-scene-frame scene-loading">
      <img className="scene-fallback-image" src={portraitUrl} alt="Kihara Jimmy Chege"/>
      <div className="scene-topline"><span><span className="status-dot"/> JIMMY CHEGE</span><span>SECURE BY DESIGN</span></div>
    </div>
  )
}

class HeroSceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <SceneArtwork/> : this.props.children }
}

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-aurora" aria-hidden="true"/>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="availability"><span className="status-dot"/>{availability.label}</div>
            <p className="eyebrow hero-intro">SOFTWARE ENGINEER · SECURITY-MINDED BUILDER</p>
            <TypingIntro />
            <p className="hero-tagline">Thoughtful code. Resilient systems.</p>
            <p className="hero-description">I build full-stack applications with security at their core. From the first interface to the last API endpoint, I care about how it works — and how it holds up.</p>
            <div className="hero-actions">
              <a href="#projects" className="button button-primary">Explore my work</a>
              <a href="#contact" className="button button-outline">Get in touch</a>
            </div>
            <div className="hero-socials">
              <a href={personal.github} target="_blank" rel="noreferrer"><GitHubIcon className="social-icon"/>GitHub</a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon className="social-icon"/>LinkedIn</a>
              <span className="hero-location"><MapPin size={13}/>{personal.location}</span>
            </div>
            <div className="hero-stats" aria-label="Portfolio at a glance">
              <a href="#projects"><RollingNumber value={projects.length}/><span>Selected projects</span></a>
              <a href="#skills"><RollingNumber value={3}/><span>Core disciplines</span></a>
              <div><span className="stat-location">NBO<span className="status-dot"/></span><span>Based in Nairobi</span></div>
            </div>
          </div>
          {import.meta.env.SSR ? <SceneArtwork/> : <HeroSceneBoundary><Suspense fallback={<SceneArtwork/>}><HeroScene/></Suspense></HeroSceneBoundary>}
        </div>
        <div className="hero-bottom"><span>FULL-STACK DEVELOPMENT <span className="separator">/</span> API ENGINEERING <span className="separator">/</span> CYBERSECURITY</span><a href="#projects"><span className="scroll-cue" aria-hidden="true"/>SCROLL TO EXPLORE</a></div>
      </div>
    </section>
  )
}
