import type {
  AnalysisConfig,
  ComparisonResult,
  Contribution,
  Indicator,
  IndicatorCategory,
  Region,
  SimilarityResult,
} from "@daerah-kita/shared"

import { INDICATORS } from "@/data/indicators"
import { INDICATOR_VALUES } from "@/data/indicator-values"
import { REGIONS } from "@/data/regions"

/**
 * Perhitungan kemiripan sisi klien untuk Phase 1.
 *
 * Metode: Min-Max normalization, lalu Weighted Euclidean Distance, lalu
 * dikonversi ke skor 0 sampai 100. Phase 2 memindahkan logika ini ke
 * packages/domain tanpa mengubah rumus.
 */

export const DATASET_VERSION = "bps-jabar-2026"
export const DATASET_LABEL = "BPS Provinsi Jawa Barat, 2025/2026"

/** Ambang selisih ternormalisasi untuk kolom "indikator cocok". */
const MATCH_THRESHOLD = 0.1

const valueLookup = new Map<string, number>(
  INDICATOR_VALUES.map((entry) => [
    `${entry.region_id}:${entry.indicator_id}`,
    entry.value,
  ])
)

/** Nilai mentah semua wilayah untuk satu indikator, urut REGIONS. */
const rawByIndicator = new Map<string, number[]>(
  INDICATORS.map((indicator) => [
    indicator.code,
    REGIONS.map(
      (region) =>
        valueLookup.get(`${region.code}:${indicator.code}`) ?? Number.NaN
    ),
  ])
)

/** Nilai ternormalisasi 0 sampai 1, arah reverse sudah dibalik. */
const normalizedLookup = new Map<string, number>()

for (const indicator of INDICATORS) {
  const raw = rawByIndicator.get(indicator.code) ?? []
  const minMax = normalizeMinMax(raw)
  // Indikator reverse (pengangguran, kemiskinan) dibalik agar nilai kecil
  // terbaca sebagai kondisi lebih baik, sesuai PRD 5.2.
  const normalized =
    indicator.direction === "reverse" ? reverseNormalize(minMax) : minMax
  REGIONS.forEach((region, index) => {
    const value = normalized[index]
    if (typeof value === "number" && Number.isFinite(value)) {
      normalizedLookup.set(`${region.code}:${indicator.code}`, value)
    }
  })
}

export function normalizeMinMax(values: number[]): number[] {
  const finite = values.filter((value) => Number.isFinite(value))
  if (finite.length === 0) return values.map(() => Number.NaN)
  const min = Math.min(...finite)
  const max = Math.max(...finite)
  return values.map((value) => {
    if (!Number.isFinite(value)) return Number.NaN
    if (max === min) return 0.5
    return (value - min) / (max - min)
  })
}

export function reverseNormalize(values: number[]): number[] {
  return values.map((value) => (Number.isFinite(value) ? 1 - value : value))
}

export function weightedEuclideanDistance(
  a: number[],
  b: number[],
  weights: number[]
): number {
  let total = 0
  for (let index = 0; index < a.length; index += 1) {
    const left = a[index]
    const right = b[index]
    const weight = weights[index] ?? 0
    if (!Number.isFinite(left) || !Number.isFinite(right)) continue
    const delta = (left as number) - (right as number)
    total += weight * delta * delta
  }
  return Math.sqrt(total)
}

export function calculateMaxDistance(weights: number[]): number {
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  return Math.sqrt(total)
}

export function calculateSimilarityScore(
  distance: number,
  maxDistance: number
): number {
  if (maxDistance <= 0) return 0
  const ratio = Math.min(1, distance / maxDistance)
  return 100 * (1 - ratio)
}

export function getValue(
  regionCode: string,
  indicatorCode: string
): number | undefined {
  return valueLookup.get(`${regionCode}:${indicatorCode}`)
}

/** Rentang nilai mentah satu indikator di seluruh 27 wilayah. */
export function getIndicatorRange(
  indicatorCode: string
): { min: number; max: number } | null {
  const values = (rawByIndicator.get(indicatorCode) ?? []).filter((value) =>
    Number.isFinite(value)
  )
  if (values.length === 0) return null
  return { min: Math.min(...values), max: Math.max(...values) }
}

export function getNormalizedValue(
  regionCode: string,
  indicatorCode: string
): number | undefined {
  return normalizedLookup.get(`${regionCode}:${indicatorCode}`)
}

/** Bobot setara dalam persen bulat yang selalu berjumlah 100. */
export function equalWeightPercentages(
  codes: string[]
): Record<string, number> {
  const result: Record<string, number> = {}
  if (codes.length === 0) return result
  const base = Math.floor(100 / codes.length)
  let remainder = 100 - base * codes.length
  codes.forEach((code) => {
    result[code] = base + (remainder > 0 ? 1 : 0)
    if (remainder > 0) remainder -= 1
  })
  return result
}

export const DEFAULT_WEIGHTS: Record<string, number> = equalWeightPercentages(
  INDICATORS.map((indicator) => indicator.code)
)

export type SimilarityOptions = {
  /** Bobot dalam persen, jumlahnya 100. Kode yang tidak ada dianggap 0. */
  weights?: Record<string, number>
  /** Indikator yang dipakai. Default: semua indikator aktif. */
  activeCodes?: string[]
}

type PairComputation = {
  score: number
  matched: number
  contributions: Contribution[]
}

function computePair(
  referenceCode: string,
  compareCode: string,
  activeIndicators: Indicator[],
  weights: Record<string, number>
): PairComputation | null {
  const usable: Indicator[] = []
  const a: number[] = []
  const b: number[] = []
  const rawWeights: number[] = []

  for (const indicator of activeIndicators) {
    const left = getNormalizedValue(referenceCode, indicator.code)
    const right = getNormalizedValue(compareCode, indicator.code)
    const weight = (weights[indicator.code] ?? 0) / 100
    if (left === undefined || right === undefined || weight <= 0) continue
    usable.push(indicator)
    a.push(left)
    b.push(right)
    rawWeights.push(weight)
  }

  if (usable.length === 0) return null

  // Bobot dinormalisasi ulang bila ada indikator yang gugur.
  const weightSum = rawWeights.reduce((sum, weight) => sum + weight, 0)
  const normalizedWeights = rawWeights.map((weight) => weight / weightSum)
  const distance = weightedEuclideanDistance(a, b, normalizedWeights)
  const score = calculateSimilarityScore(
    distance,
    calculateMaxDistance(normalizedWeights)
  )
  const contributions = calculateContributions(a, b, normalizedWeights, usable)

  return { score, matched: usable.length, contributions }
}

export function calculateContributions(
  a: number[],
  b: number[],
  weights: number[],
  indicators: Indicator[]
): Contribution[] {
  const parts = indicators.map((indicator, index) => {
    const left = a[index] ?? Number.NaN
    const right = b[index] ?? Number.NaN
    const weight = weights[index] ?? 0
    const delta = left - right
    const weighted = Number.isFinite(delta) ? weight * delta * delta : 0
    return {
      indicator_code: indicator.code,
      indicator_name: indicator.name,
      category: indicator.category,
      normalized_a: left,
      normalized_b: right,
      weighted_difference: weighted,
      share: 0,
    }
  })
  const total = parts.reduce((sum, part) => sum + part.weighted_difference, 0)
  return parts
    .map((part) => ({
      ...part,
      share: total > 0 ? part.weighted_difference / total : 0,
    }))
    .sort((left, right) => right.weighted_difference - left.weighted_difference)
}

export function getActiveIndicators(activeCodes?: string[]): Indicator[] {
  if (!activeCodes || activeCodes.length === 0) {
    return INDICATORS.filter((indicator) => indicator.is_active)
  }
  const allowed = new Set(activeCodes)
  return INDICATORS.filter(
    (indicator) => indicator.is_active && allowed.has(indicator.code)
  )
}

export function rankRegions(
  referenceCode: string,
  options: SimilarityOptions = {}
): SimilarityResult[] {
  const weights = options.weights ?? DEFAULT_WEIGHTS
  const activeIndicators = getActiveIndicators(options.activeCodes)
  const results: SimilarityResult[] = []

  for (const region of REGIONS) {
    if (region.code === referenceCode) continue
    const pair = computePair(
      referenceCode,
      region.code,
      activeIndicators,
      weights
    )
    if (!pair) continue
    results.push({
      region,
      similarity_score: pair.score,
      matched_indicators: pair.matched,
      contributions: pair.contributions,
    })
  }

  return results.sort(
    (left, right) => right.similarity_score - left.similarity_score
  )
}

export function getSimilarityBetween(
  referenceCode: string,
  compareCode: string,
  options: SimilarityOptions = {}
): SimilarityResult | null {
  const weights = options.weights ?? DEFAULT_WEIGHTS
  const activeIndicators = getActiveIndicators(options.activeCodes)
  const region = REGIONS.find((item) => item.code === compareCode)
  if (!region) return null
  const pair = computePair(
    referenceCode,
    compareCode,
    activeIndicators,
    weights
  )
  if (!pair) return null
  return {
    region,
    similarity_score: pair.score,
    matched_indicators: pair.matched,
    contributions: pair.contributions,
  }
}

/** Rata-rata skor kemiripan satu wilayah terhadap seluruh wilayah lain. */
export function averageSimilarityByRegion(
  options: SimilarityOptions = {}
): Record<string, number> {
  const result: Record<string, number> = {}
  for (const region of REGIONS) {
    const ranking = rankRegions(region.code, options)
    if (ranking.length === 0) continue
    const total = ranking.reduce((sum, item) => sum + item.similarity_score, 0)
    result[region.code] = total / ranking.length
  }
  return result
}

export function buildComparison(
  codeA: string,
  codeB: string,
  activeCodes?: string[]
): ComparisonResult | null {
  const regionA = REGIONS.find((region) => region.code === codeA)
  const regionB = REGIONS.find((region) => region.code === codeB)
  if (!regionA || !regionB) return null
  const indicators = getActiveIndicators(activeCodes)

  return {
    region_a: regionA,
    region_b: regionB,
    indicators: indicators.flatMap((indicator) => {
      const valueA = getValue(codeA, indicator.code)
      const valueB = getValue(codeB, indicator.code)
      if (valueA === undefined || valueB === undefined) return []
      const difference = valueA - valueB
      return [
        {
          indicator,
          value_a: valueA,
          value_b: valueB,
          difference,
          relative_difference: valueB === 0 ? 0 : difference / valueB,
        },
      ]
    }),
  }
}

/** Profil 5 kategori untuk radar chart, skala 0 sampai 100. */
export function categoryProfile(
  regionCode: string
): { category: IndicatorCategory; value: number }[] {
  const categories: IndicatorCategory[] = [
    "Demografi",
    "Ekonomi",
    "Pendidikan",
    "Kesehatan",
    "Infrastruktur",
  ]
  return categories.map((category) => {
    const codes = INDICATORS.filter(
      (indicator) => indicator.category === category
    )
    const values = codes
      .map((indicator) => getNormalizedValue(regionCode, indicator.code))
      .filter((value): value is number => value !== undefined)
    const average =
      values.length > 0
        ? values.reduce((sum, value) => sum + value, 0) / values.length
        : 0
    return { category, value: average * 100 }
  })
}

/** Jumlah indikator yang selisih ternormalisasinya di bawah ambang. */
export function countMatchedIndicators(contributions: Contribution[]): number {
  return contributions.filter((item) => {
    const delta = Math.abs(item.normalized_a - item.normalized_b)
    return Number.isFinite(delta) && delta < MATCH_THRESHOLD
  }).length
}

export function countDifferentIndicators(
  contributions: Contribution[]
): number {
  return contributions.length - countMatchedIndicators(contributions)
}

export function describeSimilarity(score: number): {
  label: string
  variant: "default" | "secondary" | "outline"
} {
  if (score >= 90) return { label: "Sangat mirip", variant: "default" }
  if (score >= 75) return { label: "Mirip", variant: "default" }
  if (score >= 60) return { label: "Cukup mirip", variant: "secondary" }
  return { label: "Berbeda", variant: "outline" }
}

/** Konfigurasi analisis untuk validasi Zod di panel pengaturan. */
export function toAnalysisConfig(
  weights: Record<string, number>,
  activeCodes: string[]
): AnalysisConfig {
  const active = activeCodes.length > 0 ? activeCodes : Object.keys(weights)
  return {
    indicators: active.map((code) => ({
      code,
      weight: (weights[code] ?? 0) / 100,
    })),
    period: 2026,
    limit: REGIONS.length - 1,
  }
}

export type { Region }
