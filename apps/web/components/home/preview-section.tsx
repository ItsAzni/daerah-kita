import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container, SectionLabel } from "@/components/layout-primitives"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { INDICATORS, INDICATOR_CATEGORIES } from "@/data/indicators"
import { REGIONS } from "@/data/regions"
import { formatScore } from "@/lib/format"
import { countMatchedIndicators, rankRegions } from "@/lib/similarity"

const SAMPLE_CODE = "3273"
const sampleRegion = REGIONS.find((region) => region.code === SAMPLE_CODE)
const sampleRanking = rankRegions(SAMPLE_CODE).slice(0, 5)

export function PreviewSection() {
  if (!sampleRegion) return null

  return (
    <section
      aria-labelledby="preview-heading"
      className="border-b border-border"
    >
      <Container className="flex flex-col gap-10 py-16">
        <div className="flex flex-col gap-4">
          <SectionLabel index="02">Contoh hasil</SectionLabel>
          <h2
            id="preview-heading"
            className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            Lima wilayah terdekat dari {sampleRegion.name}
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Diambil langsung dari dataset resmi. Angka di bawah bukan ilustrasi,
            melainkan hasil perhitungan 15 indikator dengan bobot setara.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>Wilayah</TableHead>
                  <TableHead className="text-right">Skor</TableHead>
                  <TableHead className="text-right">Indikator cocok</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleRanking.map((result, index) => (
                  <TableRow key={result.region.code}>
                    <TableCell className="tabular-nums">
                      <span className="text-muted-foreground">{index + 1}</span>
                    </TableCell>
                    <TableCell>
                      <Link
                        className="flex min-h-11 items-center font-medium underline-offset-4 hover:underline md:min-h-0"
                        href={`/daerah-kembar/${SAMPLE_CODE}/${result.region.code}`}
                      >
                        {result.region.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <span className="font-medium">
                        {formatScore(result.similarity_score)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <span className="text-muted-foreground">
                        {countMatchedIndicators(result.contributions)} dari{" "}
                        {result.matched_indicators}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground">
              Sumber: BPS Provinsi Jawa Barat (2025/2026). Skor bukan peringkat
              kualitas daerah.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-base font-medium">
                Cakupan indikator
              </h3>
              <p className="text-sm text-muted-foreground">
                Lima kategori, tiga indikator per kategori, terisi lengkap untuk
                27 wilayah.
              </p>
            </div>
            <dl className="flex flex-col border-t border-border">
              {INDICATOR_CATEGORIES.map((category) => {
                const indicators = INDICATORS.filter(
                  (indicator) => indicator.category === category
                )
                return (
                  <div
                    key={category}
                    className="flex items-baseline justify-between gap-4 border-b border-border py-3"
                  >
                    <dt className="text-sm">{category}</dt>
                    <dd className="text-xs text-muted-foreground tabular-nums">
                      {indicators.length} indikator
                    </dd>
                  </div>
                )
              })}
            </dl>
            <Button
              variant="outline"
              className="min-h-11 w-fit md:min-h-9"
              render={<Link href={`/daerah-kembar/${SAMPLE_CODE}`} />}
              nativeButton={false}
            >
              Lihat peringkat lengkap
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
