import type { SVGProps } from "react"

/**
 * Simbol Daerah Kita: Iris Kemiripan Data (Concept C).
 * Memakai `currentColor` agar otomatis beradaptasi dengan mode terang/gelap
 * tanpa melanggar aturan token warna.
 */
export function BrandSymbol({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M116 32 A96 96 0 0 0 32 128 A96 96 0 0 0 116 224 V192 A64 64 0 0 1 64 128 A64 64 0 0 1 116 64 Z" />
      <path d="M140 32 V64 A64 64 0 0 1 192 128 A64 64 0 0 1 140 192 V224 A96 96 0 0 0 224 128 A96 96 0 0 0 140 32 Z" />
      <rect x="96" y="106" width="64" height="16" rx="4" />
      <rect x="96" y="134" width="64" height="16" rx="4" />
    </svg>
  )
}
