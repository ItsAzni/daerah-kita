import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container, SectionLabel } from "@/components/layout-primitives"
import { Button } from "@/components/ui/button"
import { ScoreBar } from "@/components/ui/score-bar"
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
                  <TableHead className="hidden text-right sm:table-cell">
                    Indikator cocok
                  </TableHead>
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
                        className="flex min-h-11 flex-col justify-center underline-offset-4 hover:underline md:min-h-0"
                        href={`/daerah-kembar/${SAMPLE_CODE}/${result.region.code}`}
                      >
                        <span className="font-medium">
                          {result.region.name}
                        </span>
                        <ScoreBar
                          value={result.similarity_score}
                          aria-label={`Skor kemiripan ${result.region.name}: ${formatScore(result.similarity_score)} dari 100`}
                          className="mt-1.5 max-w-[120px]"
                        />
                      </Link>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <span className="font-medium">
                        {formatScore(result.similarity_score)}
                      </span>
                    </TableCell>
                    <TableCell className="hidden text-right tabular-nums sm:table-cell">
                      <span className="text-muted-foreground">
                        {countMatchedIndicators(result.contributions)} dari{" "}
                        {result.matched_indicators}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-base font-medium">
                Cakupan indikator
              </h3>
              <p className="text-sm text-muted-foreground">
                Lima kategori, {INDICATORS.length} indikator, tersedia untuk 27
                wilayah.
              </p>
            </div>

            <dl
              className="flex flex-col gap-2"
              aria-label="Jumlah indikator per kategori"
            >
              {INDICATOR_CATEGORIES.map((category) => {
                const count = INDICATORS.filter(
                  (indicator) => indicator.category === category
                ).length
                const pct = Math.round((count / INDICATORS.length) * 100)
                return (
                  <div key={category} className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-sm">{category}</dt>
                      <dd className="text-xs text-muted-foreground tabular-nums">
                        {count}
                      </dd>
                    </div>
                    <div
                      role="meter"
                      aria-label={`${category}: ${count} indikator`}
                      aria-valuenow={count}
                      aria-valuemin={0}
                      aria-valuemax={INDICATORS.length}
                      className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                    >
                      <div
                        aria-hidden="true"
                        className="h-full rounded-full bg-foreground"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
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
