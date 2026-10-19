import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog'
import { FileText, Download, ExternalLink } from 'lucide-react'
import { personal } from '../data/config'
import { TextReveal } from '../motion'

export function CV() {
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <section id="cv" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,255,136,0.05),transparent_55%)]" />
      <div className="mx-3 sm:mx-6 lg:mx-10 max-w-6xl relative">
        <div>
          <span className="text-xs font-mono text-green tracking-[0.2em] uppercase">06 / CV</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-fg">Curriculum Vitae</h2>
          <p className="text-fg-muted max-w-2xl mt-3">
            A printable overview of education, skills, projects, and focus areas.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 glass-card rounded-2xl p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-fg">{personal.name}</h3>
                <p className="text-sm text-green mt-1">{personal.title}</p>
                <p className="text-sm text-fg-subtle mt-1">{personal.location}</p>
              </div>
              <div className="sm:text-right text-sm text-fg-muted space-y-1">
                <p>Zetech University — BSc Software Engineering</p>
                <p>Professional focus: full-stack & security</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-fg mb-2">Professional Summary</h4>
              <p className="text-sm text-fg-subtle leading-relaxed">
                Practical software engineer with hands-on experience building and testing full-stack web applications, REST APIs and database-driven systems. Strong experience with C#/.NET, JavaScript/React, Python/FastAPI, PostgreSQL/MySQL and modern development tooling, with a growing specialization in cybersecurity, secure development and vulnerability research.
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-fg mb-2">Core Skills</h4>
              <p className="text-sm text-fg-muted">
                C#, JavaScript, Python, SQL, React, ASP.NET Core, .NET, FastAPI, Node.js, Express.js, REST APIs, PostgreSQL, MySQL, MongoDB, Redis, Prisma, Entity Framework Core, Git, GitHub, Cybersecurity, Web Security, API Security, SAST, DAST.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="default" size="lg" asChild>
                <a href={personal.cvPath} download><Download className="h-4 w-4 mr-2" /> Download CV</a>
              </Button>
              <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" asChild><span><FileText className="h-4 w-4 mr-2" /> Preview</span></Button>
                </DialogTrigger>
                <DialogContent className="max-w-none w-full max-h-[90vh] p-0 sm:p-0 sm:max-w-5xl" onInteractOutside={() => setPreviewOpen(false)}>
                  <DialogHeader className="px-6 pt-6 pb-3 flex-row items-center justify-between">
                    <div>
                      <DialogTitle>CV Preview</DialogTitle>
                      <DialogDescription>{personal.name} — printable overview</DialogDescription>
                    </div>
                    <a href={personal.cvPath} target="_blank" rel="noreferrer" className="text-sm text-green hover:underline flex items-center gap-1">
                      Open full page <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </DialogHeader>
                  <div className="px-2 pb-2 text-center py-12">
                    <FileText className="h-12 w-12 text-fg-muted mx-auto mb-4" />
                    <p className="text-fg mb-2">CV Preview</p>
                    <p className="text-sm text-fg-subtle mb-4">Open the full CV page for a detailed view.</p>
                    <Button variant="default" size="default" asChild>
                      <a href={personal.cvPath} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4 mr-2" /> Open CV</a>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="lg" asChild>
                <a href={personal.github} target="_blank" rel="noreferrer">GitHub Profile</a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <TextReveal as="div" className="block">
              <div className="glass-card rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-fg mb-2">Quick facts</h4>
                <ul className="text-sm text-fg-muted space-y-2">
                  <li className="flex justify-between"><span>Education</span><span className="text-fg">Software engineering</span></li>
                  <li className="flex justify-between"><span>Focus</span><span className="text-fg">Security + Full-stack</span></li>
                  <li className="flex justify-between"><span>Location</span><span className="text-fg">Nairobi</span></li>
                  <li className="flex justify-between"><span>Availability</span><span className="text-green">Open</span></li>
                </ul>
              </div>
            </TextReveal>
            <div className="glass-card rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-fg mb-2">Why hire me</h4>
              <p className="text-sm text-fg-muted leading-relaxed">
                I combine engineering discipline with a security mindset — building systems that are correct, maintainable, and resilient by design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
