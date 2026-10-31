import type { AnchorHTMLAttributes, ReactNode } from "react"

export interface CardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string
  children: ReactNode
  href: string
}

export function Card({
  title,
  children,
  href,
  className,
  ...props
}: CardProps) {
  return (
    <a className={className} href={href} {...props}>
      <h2>{title}</h2>
      <p>{children}</p>
    </a>
  )
}

