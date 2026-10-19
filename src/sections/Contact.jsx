import { useState } from 'react'
import { Mail, Check, Copy } from 'lucide-react'
import { personal, contactForm } from '../data/config'
import { GitHubIcon, LinkedInIcon } from '../components/icons'
import { Celebration } from '../components/Celebration'

export function Contact() {
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const hasEndpoint = Boolean(contactForm.endpoint)

  const handleChange = event => {
    setForm(previous => ({ ...previous, [event.target.name]: event.target.value }))
    setStatus('idle')
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!hasEndpoint) {
      const body = `${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
      setStatus('draft')
      return
    }
    setStatus('sending')
    try {
      const response = await fetch(contactForm.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error('Message could not be sent')
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(personal.email); setCopied(true) } catch { setCopied(false) }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-grid">
        <div className="contact-copy"><p className="eyebrow"><span className="section-index">06 /</span> LET’S MAKE SOMETHING GOOD</p><h2>Have something<br/><span className="accent">in mind?</span></h2><p>A project, an opportunity, or just a good conversation. I’d love to hear from you.</p><div className="contact-email"><a href={`mailto:${personal.email}`}>{personal.email}</a><button onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'}>{copied ? <Check size={16}/> : <Copy size={16}/>}</button></div><span className="copy-feedback" role="status">{copied ? 'Email address copied.' : ''}</span><div className="contact-socials"><a href={personal.github} target="_blank" rel="noreferrer"><GitHubIcon className="social-icon"/>GitHub</a><a href={personal.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon className="social-icon"/>LinkedIn</a><a href={personal.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div><div className="contact-availability"><span className="status-dot"/> Open to opportunities & collaborations</div></div>
        <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
          <div className="form-heading"><Mail size={19}/><span>Start a conversation</span></div>
          <div className="form-row"><label>Your name<input autoComplete="name" name="name" value={form.name} onChange={handleChange} required maxLength={100} placeholder="Alex Morgan"/></label><label>Email address<input autoComplete="email" name="email" type="email" value={form.email} onChange={handleChange} required maxLength={254} placeholder="alex@company.com"/></label></div>
          <label>What’s it about?<input name="subject" value={form.subject} onChange={handleChange} required maxLength={200} placeholder="A project, role, or collaboration…"/></label>
          <label>Your message<textarea name="message" value={form.message} onChange={handleChange} required maxLength={5000} rows={4} placeholder="Tell me a little about what you have in mind."/></label>
          <div className="form-bottom"><button className={`button button-primary progress-button ${status}`} type="submit" disabled={status === 'sending'}><span className="progress-button-label">{status === 'sending' ? <><span className="button-loader" aria-hidden="true"/>Sending…</> : status === 'sent' ? <><Check size={16} aria-hidden="true"/>Message sent</> : hasEndpoint ? 'Send message' : 'Open email app'}</span></button><span>{hasEndpoint ? 'Straight to my inbox.' : 'Opens a draft in your email app.'}</span></div>
          {status === 'sent' && <Celebration/>}
          <div className="form-status" role={status === 'error' ? 'alert' : 'status'}>{status === 'sent' && 'Message sent. Thanks for reaching out!'}{status === 'draft' && 'Your draft is ready for your email app. Send it there to get in touch, or email me directly using the address above.'}{status === 'error' && <span>Couldn’t send your message. Your text is still here — try again or <a href={`mailto:${personal.email}`}>email me directly</a>.</span>}</div>
        </form>
      </div>
    </section>
  )
}
