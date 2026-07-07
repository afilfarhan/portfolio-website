import { SectionHeading } from "@/components/section-heading"
import { summary } from "@/content/resume-data"

const stats = [
  { value: "MSc AI", label: "Heriot-Watt University, Merit" },
  { value: "BCA", label: "Cloud Tech & InfoSec, 8.6 CGPA" },
  { value: "3", label: "Roles across UK, KSA & India" },
  { value: "6", label: "Featured shipped projects" },
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="01" title="About" />
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <p className="max-w-3xl flex-1 text-pretty leading-relaxed text-muted-foreground">
          {summary}
        </p>
        <dl className="grid flex-1 grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm"
            >
              <dt className="order-2 mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="order-1 text-xl font-bold text-primary">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
