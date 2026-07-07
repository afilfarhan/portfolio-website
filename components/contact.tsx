import { Download, Mail, MapPin, Phone } from "lucide-react"
import { GithubIcon } from "@/components/icons/github-icon"
import { SectionHeading } from "@/components/section-heading"
import { contact } from "@/content/resume-data"

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading index="06" title="Contact" />
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-xl">
          <h3 className="text-balance text-2xl font-bold sm:text-3xl">
            Open to AI/ML and Data Engineering roles.
          </h3>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Currently based in {contact.location} and actively looking for the next challenge.
            Reach out directly by email or phone — I&apos;d be glad to talk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email Me
            </a>
            <a
              href={contact.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Download className="size-4" aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </div>

        <ul className="flex w-full max-w-sm flex-col gap-4">
          <li>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4 font-mono text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {contact.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4 font-mono text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {contact.phone}
            </a>
          </li>
          <li>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4 font-mono text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
            >
              <GithubIcon className="size-4 shrink-0 text-primary" />
              github.com/afilfarhan
            </a>
          </li>
          <li className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4 font-mono text-sm text-muted-foreground backdrop-blur-sm">
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {contact.location}
          </li>
        </ul>
      </div>
    </section>
  )
}
