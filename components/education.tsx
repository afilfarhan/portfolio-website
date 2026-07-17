"use client"

import { GraduationCap } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { education } from "@/content/resume-data"
import { useTilt } from "@/hooks/useTilt"
import { useReducedMotion } from "framer-motion"

function EducationCard({ edu }: { edu: typeof education[0] }) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, style, isHovered, onMouseMove, onMouseEnter, onMouseLeave } = useTilt({
    maxTilt: 5,
    perspective: 800,
    scale: 1.02,
  })

  return (
    <article
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative group rounded-2xl border bg-card/50 p-5 md:p-6 backdrop-blur-sm transition-all duration-300 ease-out flex gap-4 ${
        isHovered
          ? "border-primary/50 shadow-[0_30px_60px_-12px_rgba(62,207,255,0.25)]"
          : "border-border hover:border-primary/40 hover:shadow-[0_20px_40px_-12px_rgba(62,207,255,0.15)] active:border-primary/40"
      }`}
    >
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/20">
        <GraduationCap className="size-6 text-primary" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="text-balance font-semibold leading-snug text-lg md:text-xl">{edu.degree}</h3>
        <p className="text-sm text-muted-foreground">
          {edu.institution}, {edu.location}
        </p>
        <p className="font-mono text-xs text-muted-foreground">{edu.period}</p>
        <p className="mt-1 font-mono text-xs text-primary">{edu.result}</p>
      </div>
    </article>
  )
}

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="05" title="Education" />
      <div className="grid gap-5 sm:grid-cols-2">
        {education.map((edu) => (
          <EducationCard key={edu.degree} edu={edu} />
        ))}
      </div>
    </section>
  )
}