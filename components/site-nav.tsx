"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { contact } from "@/content/resume-data"
import { cn } from "@/lib/utils"

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
const [menuOpen, setMenuOpen] = useState(false)

useEffect(() => {
const onScroll = () => setScrolled(window.scrollY > 24)
onScroll()
window.addEventListener("scroll", onScroll, { passive: true })
return () => window.removeEventListener("scroll", onScroll)
}, [])

useEffect(() => {
if (!menuOpen) return
const onKey = (e: KeyboardEvent) => {
if (e.key === "Escape") setMenuOpen(false)
}
document.addEventListener("keydown", onKey)
return () => document.removeEventListener("keydown", onKey)
}, [menuOpen])

return (
<header
className={cn(
"fixed inset-x-0 top-0 z-50 transition-colors",
scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-transparent"
)}
>
<nav
aria-label="Main navigation"
className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
>
<a href="#top" className="font-mono text-sm font-semibold tracking-wider text-primary">
{"afil.farhan"}
</a>

<button
type="button"
aria-expanded={menuOpen}
aria-controls="mobile-menu"
aria-label={menuOpen ? "Close menu" : "Open menu"}
onClick={() => setMenuOpen((open) => !open)}
className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-primary/40 hover:text-primary md:hidden"
>
{menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
</button>

<ul className="hidden items-center gap-6 md:flex">
{links.map((link) => (
<li key={link.href}>
<a
href={link.href}
onClick={() => setMenuOpen(false)}
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
className="hidden md:inline-flex rounded-md border border-primary/40 px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary/10"
>
resume.pdf
</a>
</nav>

{menuOpen && (
<div
id="mobile-menu"
ref={menuRef}
role="dialog"
aria-modal="true"
aria-label="Mobile navigation"
className="fixed inset-x-0 top-[57px] z-40 border-b border-border bg-background/95 px-6 pb-6 backdrop-blur-md md:hidden"
>
<div className="flex flex-col gap-1">
{links.map((link, i) => (
<a
key={link.href}
href={link.href}
onClick={() => setMenuOpen(false)}
className="block rounded-lg px-4 py-3 font-mono text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
>
<span className="mr-3 text-xs text-muted-foreground">0{i + 1}</span>
{link.label}
</a>
))}
<a
href={contact.resumePdf}
download
className="mt-3 block rounded-lg border border-primary/40 px-4 py-3 font-mono text-sm text-center text-primary transition-colors hover:bg-primary/10"
>
resume.pdf
</a>
</div>
</div>
)}
</header>
)
}
