import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Education } from "@/components/education"
import { Contact } from "@/components/contact"
import { contact } from "@/content/resume-data"

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <ExperienceTimeline />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-8">
          <p className="font-mono text-xs text-muted-foreground">
            {contact.name} — {contact.title}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with Next.js, React Three Fiber & Tailwind
          </p>
        </div>
      </footer>
    </>
  )
}
