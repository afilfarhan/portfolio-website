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
<div className="flex flex-col gap-8 lg:flex-row lg:items-start">
<p className="max-w-3xl flex-1 text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
{summary}
</p>
<dl className="grid flex-1 grid-cols-2 gap-3 sm:gap-4">
{stats.map((stat) => (
<div
key={stat.label}
className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm"
>
<dt className="order-2 mt-1 font-mono text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
{stat.label}
</dt>
<dd className="order-1 text-lg font-bold text-primary sm:text-xl">{stat.value}</dd>
</div>
))}
</dl>
</div>
    </section>
  )
}
