"use client"

import { useState } from "react"
import { SectionHeading } from "@/components/section-heading"
import { skillGroups } from "@/content/resume-data"

export function Skills() {
  const [active, setActive] = useState<string | null>(null)
  const visibleGroups = active ? skillGroups.filter((g) => g.category === active) : skillGroups

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="03" title="Skills" />

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-pressed={active === null}
          className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
            active === null
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
          }`}
        >
          All
        </button>
        {skillGroups.map((group) => (
          <button
            key={group.category}
            type="button"
            onClick={() => setActive(active === group.category ? null : group.category)}
            aria-pressed={active === group.category}
            className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
              active === group.category
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
            }`}
          >
            {group.category}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleGroups.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm"
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
