"use client"

import { Download, Mail, MapPin, Phone } from "lucide-react"
import { GithubIcon } from "@/components/icons/github-icon"
import { SectionHeading } from "@/components/section-heading"
import { contact } from "@/content/resume-data"
import { useTilt } from "@/hooks/useTilt"

const contactItems = [
  {
    icon: Mail,
    label: contact.email,
    href: `mailto:${contact.email}`,
    type: "link",
  },
  {
    icon: Phone,
    label: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
    type: "link",
  },
  {
    icon: GithubIcon,
    label: "github.com/afilfarhan",
    href: contact.github,
    type: "external",
  },
  {
    icon: MapPin,
    label: contact.location,
    type: "text",
  },
] as const

function ContactCard({ item, index }: { item: typeof contactItems[0]; index: number }) {
  const { ref, style, isHovered, onMouseMove, onMouseEnter, onMouseLeave } = useTilt({
    maxTilt: 4,
    perspective: 800,
    scale: 1.015,
  })

  if (item.type === "text") {
    return (
      <div
        ref={ref}
        style={style}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`relative group rounded-2xl border bg-card/50 p-4 md:p-5 backdrop-blur-sm transition-all duration-300 ease-out flex items-center gap-3 ${
          isHovered
            ? "border-primary/50 shadow-[0_25px_50px_-12px_rgba(62,207,255,0.2)]"
            : "border-border hover:border-primary/40 hover:shadow-[0_15px_30px_-10px_rgba(62,207,255,0.1)] active:border-primary/40"
        }`}
      >
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />
        <item.icon className="size-5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        <span className="font-mono text-sm text-muted-foreground">{item.label}</span>
      </div>
    )
  }

  return (
    <a
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={item.href}
      target={item.type === "external" ? "_blank" : undefined}
      rel={item.type === "external" ? "noopener noreferrer" : undefined}
      className={`relative group rounded-2xl border bg-card/50 p-4 md:p-5 backdrop-blur-sm transition-all duration-300 ease-out flex items-center gap-3 ${
        isHovered
          ? "border-primary/50 shadow-[0_25px_50px_-12px_rgba(62,207,255,0.2)]"
          : "border-border hover:border-primary/40 hover:shadow-[0_15px_30px_-10px_rgba(62,207,255,0.1)] active:border-primary/40"
      }`}
    >
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
      <item.icon className="size-5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
      <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary">{item.label}</span>
    </a>
  )
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="06" title="Contact" />
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-xl">
          <h3 className="text-balance text-2xl font-bold sm:text-3xl md:text-4xl">
            Open to AI/ML and Data Engineering roles.
          </h3>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Currently based in {contact.location} and actively looking for the next challenge.
            Reach out directly by email or phone — I&apos;d be glad to talk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_10px_30px_-5px_rgba(62,207,255,0.4)] active:scale-[0.98]"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email Me
            </a>
            <a
              href={contact.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:text-primary hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] active:scale-[0.98]"
            >
              <Download className="size-4" aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </div>

        <ul className="flex w-full max-w-sm flex-col gap-3">
          {contactItems.map((item, i) => (
            <li key={item.label}>
              <ContactCard item={item} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}