"use client"

import { useState } from "react"
import { SectionHeading } from "@/components/section-heading"
import { skillGroups } from "@/content/resume-data"
import { useTilt } from "@/hooks/useTilt"

function SkillCategoryCard({ group }: { group: typeof skillGroups[0] }) {
  const { ref, style, onMouseMove, onMouseEnter, onMouseLeave } = useTilt({
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
      className="relative group rounded-2xl border border-border bg-card/50 p-5 md:p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
    >
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
      <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">
        {group.category}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Skills() {
  const [active, setActive] = useState<string | null>(null)
  const visibleGroups = active ? skillGroups.filter((g) => g.category === active) : skillGroups

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="03" title="Skills" />

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
        {skillGroups.map((group) => (
          <button
            key={group.category}
            type="button"
            onClick={() => setActive(active === group.category ? null : group.category)}
            aria-pressed={active === group.category}
            className={`rounded-full border px-3 py-2 font-mono text-xs transition-colors min-h-[40px] ${
              active === group.category
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
            }`}
          >
            {active === group.category ? `✓ ${group.category}` : group.category}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-pressed={active === null}
          className={`rounded-full border px-3 py-2 font-mono text-xs transition-colors min-h-[40px] ${
            active === null
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
          }`}
        >
          All
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleGroups.map((group) => (
          <SkillCategoryCard key={group.category} group={group} />
        ))}
      </div>
    </section>
  )
}