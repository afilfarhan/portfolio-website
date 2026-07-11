"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { GithubIcon } from "@/components/icons/github-icon"
import { SectionHeading } from "@/components/section-heading"
import { projects, type Project } from "@/content/resume-data"

function useIsTouchDevice() {
const [isTouch, setIsTouch] = useState(false)
useEffect(() => {
const mq = window.matchMedia("(pointer: coarse)")
setIsTouch(mq.matches)
const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches)
mq.addEventListener("change", handler)
return () => mq.removeEventListener("change", handler)
}, [])
return isTouch
}

function TiltCard({ project }: { project: Project }) {
const cardRef = useRef<HTMLElement>(null)
const prefersReducedMotion = useReducedMotion()
const isTouch = useIsTouchDevice()
const [transform, setTransform] = useState("")
const handleMove = useCallback(
(e: React.MouseEvent) => {
if (prefersReducedMotion || isTouch || !cardRef.current) return
const rect = cardRef.current.getBoundingClientRect()
const x = (e.clientX - rect.left) / rect.width - 0.5
const y = (e.clientY - rect.top) / rect.height - 0.5
setTransform(
`perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateZ(4px)`,
)
},
[prefersReducedMotion, isTouch],
)
const handleLeave = useCallback(() => setTransform(""), [])

return (
<article
ref={cardRef}
onMouseMove={handleMove}
onMouseLeave={handleLeave}
style={{ transform, transformStyle: "preserve-3d" }}
className="group flex flex-col rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-[border-color] duration-200 ease-out active:border-primary/40 hover:border-primary/40"
>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        {project.badge && (
          <span className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
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
            className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
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
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <TiltCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
