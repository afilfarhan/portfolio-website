"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { experience } from "@/content/resume-data"

export function ExperienceTimeline() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="02" title="Experience" />
      <ol className="relative flex flex-col gap-12 border-l border-primary/20 pl-8 md:pl-12">
        {/* animated gradient connector */}
        <div
          className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-primary/70 via-primary/25 to-transparent"
          aria-hidden="true"
        />
        {experience.map((job, i) => (
          <motion.li
            key={job.company}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: i * 0.05 }}
            className="relative"
          >
            <span
              className="absolute -left-[2.35rem] top-1.5 size-3 rounded-full border-2 border-primary bg-background md:-left-[3.35rem]"
              aria-hidden="true"
            />
            <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">
                  {job.role} <span className="text-primary">· {job.company}</span>
                </h3>
                <p className="font-mono text-xs text-muted-foreground">{job.period}</p>
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
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
