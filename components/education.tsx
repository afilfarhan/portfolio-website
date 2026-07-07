import { GraduationCap } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { education } from "@/content/resume-data"

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="05" title="Education" />
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((edu) => (
          <div
            key={edu.degree}
            className="flex gap-4 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
              <GraduationCap className="size-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-balance font-semibold leading-snug">{edu.degree}</h3>
              <p className="text-sm text-muted-foreground">
                {edu.institution}, {edu.location}
              </p>
              <p className="font-mono text-xs text-muted-foreground">{edu.period}</p>
              <p className="mt-1 font-mono text-xs text-primary">{edu.result}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
