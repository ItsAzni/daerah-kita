import type { HTMLAttributes, ReactNode } from "react"

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export function Code({ children, className, ...props }: CodeProps) {
  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

