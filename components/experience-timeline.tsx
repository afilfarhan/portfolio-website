"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { experience } from "@/content/resume-data"
import { useTilt } from "@/hooks/useTilt"

function ExperienceCard({ job, index }: { job: typeof experience[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, style, isHovered, onMouseMove, onMouseEnter, onMouseLeave } = useTilt({
    maxTilt: 6,
    perspective: 900,
    scale: 1.02,
  })

  return (
    <motion.li
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 70, damping: 18, delay: index * 0.05 }}
      className="relative pl-8 md:pl-12"
    >
      <div className="absolute -left-[0.3rem] top-1.5 md:-left-[3.05rem] md:top-1.5">
        <span className="block size-3 rounded-full border-2 border-primary bg-background" aria-hidden="true" />
      </div>
      <article
        className={`group relative rounded-2xl border bg-card/50 p-5 md:p-6 backdrop-blur-sm transition-all duration-300 ease-out ${
          isHovered
            ? "border-primary/50 shadow-[0_30px_60px_-12px_rgba(62,207,255,0.25)]"
            : "border-border hover:border-primary/40 hover:shadow-[0_20px_40px_-12px_rgba(62,207,255,0.15)] active:border-primary/40"
        }`}
      >
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg md:text-xl font-semibold">
            {job.role} <span className="text-primary">· {job.company}</span>
          </h3>
          <p className="font-mono text-xs text-muted-foreground shrink-0">{job.period}</p>
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{job.location}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {job.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </article>
    </motion.li>
  )
}

export function ExperienceTimeline() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="02" title="Experience" />
      <ol className="relative flex flex-col gap-6 md:gap-8 border-l border-primary/20 pl-8 md:pl-12">
        <div
          className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-primary/70 via-primary/25 to-transparent"
          aria-hidden="true"
        />
        {experience.map((job, i) => (
          <ExperienceCard key={job.company} job={job} index={i} />
        ))}
      </ol>
    </section>
  )
}