import { cn } from "@/lib/utils"

/**
 * Bar skor sederhana — track abu + fill foreground, skala 0-100.
 * Pakai CSS variables agar kontras di mode terang dan gelap.
 */
export function ScoreBar({
  value,
  max = 100,
  className,
  "aria-label": ariaLabel,
}: {
  value: number
  max?: number
  className?: string
  "aria-label"?: string
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <span
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      className={cn("block h-1 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <span
        aria-hidden="true"
        className="block h-full rounded-full bg-foreground"
        style={{ width: `${pct}%` }}
      />
    </span>
  )
}

/**
 * Bar bifurkasi untuk selisih ternormalisasi (−1 sampai +1).
 * Tengah = 0. Kiri (negatif) merah tonal, kanan (positif) foreground.
 */
export function DifferenceBar({
  value,
  max = 1,
  className,
  "aria-label": ariaLabel,
}: {
  value: number
  max?: number
  className?: string
  "aria-label"?: string
}) {
  const clamped = Math.min(max, Math.max(-max, value))
  const pct = Math.abs(clamped / max) * 50

  return (
    <span
      role="meter"
      aria-valuenow={value}
      aria-valuemin={-max}
      aria-valuemax={max}
      aria-label={ariaLabel}
      className={cn("relative block h-1 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 w-px -translate-x-px bg-border"
      />
      {clamped < 0 ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 bg-destructive/60"
          style={{ right: "50%", width: `${pct}%` }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 bg-foreground"
          style={{ left: "50%", width: `${pct}%` }}
        />
      )}
    </span>
  )
}
