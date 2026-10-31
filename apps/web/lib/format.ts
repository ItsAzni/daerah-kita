import type { Indicator, IndicatorCategory } from "@daerah-kita/shared"

import { INDICATORS } from "@/data/indicators"

const numberFormatter = new Intl.NumberFormat("id-ID")
const decimalFormatter = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const oneDecimalFormatter = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export function formatInteger(value: number): string {
  return numberFormatter.format(Math.round(value))
}

export function formatScore(value: number): string {
  return oneDecimalFormatter.format(value)
}

export function formatDecimal(value: number): string {
  return decimalFormatter.format(value)
}

export function formatSignedDecimal(value: number): string {
  const formatted = decimalFormatter.format(Math.abs(value))
  if (value > 0) return `+${formatted}`
  if (value < 0) return `-${formatted}`
  return formatted
}

export function formatPercent(value: number, digits = 1): string {
  return `${new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)}%`
}

/** Nilai indikator mengikuti satuannya, tanpa mengubah presisi sumber. */
export function formatIndicatorValue(value: number, unit: string): string {
  if (unit === "rupiah/tahun")
    return `Rp ${numberFormatter.format(Math.round(value))}`
  if (unit === "%") return `${decimalFormatter.format(value)}%`
  if (unit === "indeks" || unit === "tahun" || unit === "rasio") {
    return decimalFormatter.format(value)
  }
  if (unit === "jiwa/km2") return `${decimalFormatter.format(value)} jiwa/km²`
  if (unit === "jiwa")
    return `${numberFormatter.format(Math.round(value))} jiwa`
  if (unit === "orang")
    return `${numberFormatter.format(Math.round(value))} orang`
  if (unit === "unit")
    return `${numberFormatter.format(Math.round(value))} unit`
  return `${numberFormatter.format(value)} ${unit}`
}

export function formatUnitLabel(unit: string): string {
  if (unit === "rupiah/tahun") return "Rp/tahun"
  if (unit === "jiwa/km2") return "jiwa/km²"
  if (unit === "%") return "persen"
  return unit
}

export function categoryShortLabel(category: IndicatorCategory): string {
  return category
}

export function indicatorByCode(code: string): Indicator | undefined {
  return INDICATORS.find((indicator) => indicator.code === code)
}

/** "3273" -> "32.73" mengikuti penulisan kode BPS di publikasi. */
export function formatRegionCode(code: string): string {
  if (code.length !== 4) return code
  return `${code.slice(0, 2)}.${code.slice(2)}`
}

export function formatDifference(value: number, unit: string): string {
  const magnitude = Math.abs(value)
  if (unit === "%") return `${decimalFormatter.format(magnitude)} poin`
  if (unit === "rupiah/tahun")
    return `Rp ${numberFormatter.format(Math.round(magnitude))}`
  if (unit === "jiwa")
    return `${numberFormatter.format(Math.round(magnitude))} jiwa`
  if (unit === "orang")
    return `${numberFormatter.format(Math.round(magnitude))} orang`
  if (unit === "unit")
    return `${numberFormatter.format(Math.round(magnitude))} unit`
  if (unit === "jiwa/km2")
    return `${decimalFormatter.format(magnitude)} jiwa/km²`
  if (unit === "indeks" || unit === "tahun" || unit === "rasio") {
    return decimalFormatter.format(magnitude)
  }
  return `${decimalFormatter.format(magnitude)} ${unit}`
}

export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return isoDate
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}
