/**
 * Tipe bersama untuk frontend Phase 1 dan API Phase 2.
 *
 * Catatan Phase 1: dataset BPS masih statis, jadi `region_id` dan
 * `indicator_id` berisi kode BPS (mis. "3273" dan "ipm"). Saat database
 * NeonDB dipakai di Phase 2, kolom yang sama akan berisi UUID.
 */

export type RegionType = "kabupaten" | "kota"

export type Region = {
  id: string
  code: string
  name: string
  type: RegionType
  province_code: string
  province_name: string
  latitude: number
  longitude: number
}

export type IndicatorCategory =
  "Demografi" | "Ekonomi" | "Pendidikan" | "Kesehatan" | "Infrastruktur"

export type IndicatorDirection = "normal" | "reverse"

export type Indicator = {
  id: string
  code: string
  name: string
  description: string
  category: IndicatorCategory
  unit: string
  direction: IndicatorDirection
  is_active: boolean
  period: number
  source_name: string
  bps_table: string
}

export type IndicatorValue = {
  id: string
  region_id: string
  indicator_id: string
  value: number
  period: number
}

export type DataSource = {
  id: string
  name: string
  publisher: string
  url: string
  description: string
  publication_title: string
  publication_date: string
  accessed_at: string
  indicators_covered: string[]
}

export type Contribution = {
  indicator_code: string
  indicator_name: string
  category: IndicatorCategory
  /** Nilai ternormalisasi wilayah acuan. */
  normalized_a: number
  /** Nilai ternormalisasi wilayah pembanding. */
  normalized_b: number
  /** w_i * (A_i' - B_i')^2, penyumbang jarak. */
  weighted_difference: number
  /** Porsi kontribusi terhadap total jarak, 0 sampai 1. */
  share: number
}

export type SimilarityResult = {
  region: Region
  similarity_score: number
  matched_indicators: number
  contributions: Contribution[]
}

export type SimilarityMethod = "weighted-euclidean-minmax"

export type AnalysisConfig = {
  indicators: { code: string; weight: number }[]
  period: number
  limit: number
}

export type AnalysisResponse = {
  region: Region
  method: SimilarityMethod
  dataset_version: string
  results: SimilarityResult[]
}

export type ComparisonIndicatorRow = {
  indicator: Indicator
  value_a: number
  value_b: number
  /** value_a - value_b */
  difference: number
  /** difference / value_b, 0 bila value_b = 0. */
  relative_difference: number
}

export type ComparisonResult = {
  region_a: Region
  region_b: Region
  indicators: ComparisonIndicatorRow[]
}

export type CompletenessLevel = "lengkap" | "sebagian" | "kurang"

export type RegionCompleteness = {
  region_code: string
  available: number
  total: number
  percentage: number
  level: CompletenessLevel
}
