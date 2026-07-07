export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="font-mono text-sm text-primary">{index}</span>
      <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <div className="hidden h-px flex-1 bg-border sm:block" aria-hidden="true" />
    </div>
  )
}
