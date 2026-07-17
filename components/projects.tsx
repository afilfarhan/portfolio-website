"use client"

import { ExternalLink } from "lucide-react"
import { GithubIcon } from "@/components/icons/github-icon"
import { SectionHeading } from "@/components/section-heading"
import { projects, type Project } from "@/content/resume-data"
import { useTilt } from "@/hooks/useTilt"

function TiltCard({ project }: { project: Project }) {
  const { ref, style, isHovered, onMouseMove, onMouseEnter, onMouseLeave } = useTilt({
    maxTilt: 8,
    perspective: 1000,
    scale: 1.03,
  })

  return (
    <article
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative group flex flex-col rounded-2xl border bg-card/50 p-5 md:p-6 backdrop-blur-sm transition-all duration-300 ease-out ${
        isHovered
          ? "border-primary/50 shadow-[0_35px_70px_-15px_rgba(62,207,255,0.3)]"
          : "border-border hover:border-primary/40 hover:shadow-[0_25px_50px_-12px_rgba(62,207,255,0.2)] active:border-primary/40"
      }`}
    >
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg md:text-xl font-semibold">{project.title}</h3>
        {project.badge && (
          <span className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary transition-all duration-200 group-hover:bg-primary/20 group-hover:border-primary/60">
            {project.badge}
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center gap-4">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <GithubIcon className="size-3.5" />
            GitHub
            <span className="sr-only">{` repository for ${project.title}`}</span>
          </a>
        ) : (
          !project.live && (
            <span className="font-mono text-xs text-muted-foreground/60">
              private / available on request
            </span>
          )
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <ExternalLink className="size-3.5" aria-hidden="true" />
            Live
            <span className="sr-only">{` site for ${project.title}`}</span>
          </a>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="04" title="Featured Projects" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <TiltCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}