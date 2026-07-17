"use client"

import { SectionHeading } from "@/components/section-heading"
import { summary } from "@/content/resume-data"
import { useTilt } from "@/hooks/useTilt"

const stats = [
  { value: "MSc AI", label: "Heriot-Watt University, Merit" },
  { value: "BCA", label: "Cloud Tech & InfoSec, 8.6 CGPA" },
  { value: "3", label: "Roles across UK, KSA & India" },
  { value: "6", label: "Featured shipped projects" },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, style, isHovered, onMouseMove, onMouseEnter, onMouseLeave } = useTilt({
    maxTilt: 6,
    perspective: 900,
    scale: 1.03,
  })

  return (
    <article
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative group rounded-2xl border bg-card/50 p-4 md:p-6 backdrop-blur-sm transition-all duration-300 ease-out ${
        isHovered
          ? "border-primary/50 shadow-[0_30px_60px_-12px_rgba(62,207,255,0.3)]"
          : "border-border hover:border-primary/40 hover:shadow-[0_20px_40px_-12px_rgba(62,207,255,0.15)] active:border-primary/40"
      }`}
    >
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
      <dl className="flex flex-col items-center text-center">
        <dt className="order-2 mt-1 font-mono text-[11px] md:text-xs leading-relaxed text-muted-foreground">
          {stat.label}
        </dt>
        <dd className="order-1 text-2xl md:text-3xl lg:text-4xl font-bold text-primary font-mono tracking-tight">
          {stat.value}
        </dd>
      </dl>
    </article>
  )
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="01" title="About" />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <p className="max-w-3xl flex-1 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg lg:pr-8">
          {summary}
        </p>
        <dl className="grid flex-1 grid-cols-2 gap-4 sm:gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </dl>
      </div>
    </section>
  )
}