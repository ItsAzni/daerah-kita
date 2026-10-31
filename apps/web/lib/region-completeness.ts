import type { Region, RegionCompleteness } from "@daerah-kita/shared"

import { INDICATORS } from "@/data/indicators"
import { REGIONS } from "@/data/regions"
import { getValue } from "@/lib/similarity"

const TOTAL_INDICATORS = INDICATORS.length

export function getCompleteness(region: Region): RegionCompleteness {
  const available = INDICATORS.filter(
    (indicator) => getValue(region.code, indicator.code) !== undefined
  ).length
  const percentage = (available / TOTAL_INDICATORS) * 100
  return {
    region_code: region.code,
    available,
    total: TOTAL_INDICATORS,
    percentage,
    level:
      percentage >= 80 ? "lengkap" : percentage >= 50 ? "sebagian" : "kurang",
  }
}

export const REGION_COMPLETENESS: Record<string, RegionCompleteness> =
  Object.fromEntries(
    REGIONS.map((region) => [region.code, getCompleteness(region)])
  )

export function completenessVariant(
  level: RegionCompleteness["level"]
): "secondary" | "outline" | "destructive" {
  if (level === "lengkap") return "secondary"
  if (level === "sebagian") return "outline"
  return "destructive"
}

export function completenessLabel(level: RegionCompleteness["level"]): string {
  if (level === "lengkap") return "Data lengkap"
  if (level === "sebagian") return "Data sebagian"
  return "Data kurang"
}

export function regionTypeLabel(type: Region["type"]): string {
  return type === "kota" ? "Kota" : "Kabupaten"
}
