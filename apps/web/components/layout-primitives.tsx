import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Penanda bagian bernomor. Motif identitas yang berulang di seluruh halaman:
 * nomor urut bagian + label singkat, dipisah garis rambut.
 */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs text-muted-foreground",
        className
      )}
    >
      <span className="font-medium text-foreground tabular-nums">{index}</span>
      <span aria-hidden="true" className="h-px w-6 bg-border" />
      <span>{children}</span>
    </p>
  )
}

export function PageHeader({
  label,
  index,
  title,
  description,
  actions,
}: {
  label: string
  index: string
  title: string
  description: ReactNode
  actions?: ReactNode
}) {
  return (
    <header className="flex flex-col gap-6 border-b border-border pb-8">
      <SectionLabel index={index}>{label}</SectionLabel>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            {description}
          </p>
        </div>
        {actions ? (
          <div className="flex flex-wrap gap-2 md:justify-end">{actions}</div>
        ) : null}
      </div>
    </header>
  )
}

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  )
}

export function DataRow({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 py-2.5",
        className
      )}
    >
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-end text-sm tabular-nums">{children}</dd>
    </div>
  )
}
