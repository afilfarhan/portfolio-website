"use client"

import { useEffect, useState } from "react"
import { contact } from "@/content/resume-data"

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a href="#top" className="font-mono text-sm font-semibold tracking-wider text-primary">
          {"afil.farhan"}
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={contact.resumePdf}
          download
          className="rounded-md border border-primary/40 px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary/10"
        >
          resume.pdf
        </a>
      </nav>
    </header>
  )
}
