import { z } from "zod"

export const regionTypeSchema = z.enum(["kabupaten", "kota"])

export const regionSchema = z.object({
  id: z.string().min(1),
  code: z.string().regex(/^\d{4}$/, "Kode wilayah BPS harus 4 digit"),
  name: z.string().min(1),
  type: regionTypeSchema,
  province_code: z.string().min(2),
  province_name: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
})

export const indicatorCategorySchema = z.enum([
  "Demografi",
  "Ekonomi",
  "Pendidikan",
  "Kesehatan",
  "Infrastruktur",
])

export const indicatorDirectionSchema = z.enum(["normal", "reverse"])

export const indicatorSchema = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  category: indicatorCategorySchema,
  unit: z.string().min(1),
  direction: indicatorDirectionSchema,
  is_active: z.boolean(),
  period: z.number().int().min(2000).max(2100),
  source_name: z.string().min(1),
  bps_table: z.string().min(1),
})

export const indicatorValueSchema = z.object({
  id: z.string().min(1),
  region_id: z.string().min(1),
  indicator_id: z.string().min(1),
  value: z.number().finite(),
  period: z.number().int().min(2000).max(2100),
})

export const indicatorWeightSchema = z.object({
  code: z.string().min(1),
  weight: z.number().min(0).max(1),
})

export const analysisConfigSchema = z
  .object({
    indicators: z
      .array(indicatorWeightSchema)
      .min(1, "Pilih minimal satu indikator"),
    period: z.number().int().min(2000).max(2100),
    limit: z.number().int().positive().max(27),
  })
  .refine(
    (config) =>
      Math.abs(
        config.indicators.reduce((total, item) => total + item.weight, 0) - 1
      ) < 0.0001,
    {
      message: "Total bobot indikator harus 100%",
      path: ["indicators"],
    }
  )
  .refine(
    (config) =>
      new Set(config.indicators.map((item) => item.code)).size ===
      config.indicators.length,
    {
      message: "Indikator tidak boleh duplikat",
      path: ["indicators"],
    }
  )

export const similarityRequestSchema = z.object({
  region_code: z.string().regex(/^\d{4}$/),
  config: analysisConfigSchema,
})

export const comparisonRequestSchema = z.object({
  region_a: z.string().regex(/^\d{4}$/),
  region_b: z.string().regex(/^\d{4}$/),
})

export type AnalysisConfigInput = z.infer<typeof analysisConfigSchema>
export type SimilarityRequestInput = z.infer<typeof similarityRequestSchema>
export type ComparisonRequestInput = z.infer<typeof comparisonRequestSchema>
