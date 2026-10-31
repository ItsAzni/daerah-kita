"use client"

import Link from "next/link"
import * as React from "react"
import { Info } from "lucide-react"

import {
  AnalysisSettings,
  type AnalysisSettingsValue,
} from "@/components/daerah-kembar/analysis-settings"
import { RegionSearch } from "@/components/daerah-kembar/region-search"
import {
  Container,
  DataRow,
  SectionLabel,
} from "@/components/layout-primitives"
import { JabarChoropleth } from "@/components/maps/jabar-choropleth"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { INDICATORS } from "@/data/indicators"
import type { Region } from "@daerah-kita/shared"
import { formatScore } from "@/lib/format"
import {
  DEFAULT_WEIGHTS,
  countDifferentIndicators,
  countMatchedIndicators,
  rankRegions,
} from "@/lib/similarity"
import {
  REGION_COMPLETENESS,
  completenessLabel,
  regionTypeLabel,
} from "@/lib/region-completeness"

const ALL_CODES = INDICATORS.map((indicator) => indicator.code)

export function RankingView({ region }: { region: Region }) {
  const [settings, setSettings] = React.useState<AnalysisSettingsValue>({
    weights: DEFAULT_WEIGHTS,
    activeCodes: ALL_CODES,
  })

  const ranking = React.useMemo(
    () =>
      rankRegions(region.code, {
        weights: settings.weights,
        activeCodes: settings.activeCodes,
      }),
    [region.code, settings]
  )

  const scores = React.useMemo(
    () =>
      Object.fromEntries(
        ranking.map((result) => [result.region.code, result.similarity_score])
      ),
    [ranking]
  )

  const completeness = REGION_COMPLETENESS[region.code]
  const activeCount = settings.activeCodes.length
  const weightTotal = Math.round(
    Object.values(settings.weights).reduce((sum, weight) => sum + weight, 0)
  )
  const topScore = ranking[0]?.similarity_score

  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-12">
      <header className="flex flex-col gap-6 border-b border-border pb-8">
        <SectionLabel index="02">Hasil peringkat</SectionLabel>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Daerah mirip {region.name}
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Diurutkan dari skor kemiripan tertinggi terhadap {region.name}.
              Skor dihitung dari {activeCount} indikator aktif dengan total
              bobot {weightTotal}%.
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span>{regionTypeLabel(region.type)}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Kode BPS {region.code}</span>
              <span aria-hidden="true">·</span>
              <span>{region.province_name}</span>
              {completeness ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    {completeness.available}/{completeness.total}{" "}
                    {completenessLabel(completeness.level).toLowerCase()}
                  </span>
                </>
              ) : null}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <RegionSearch triggerLabel="Ganti wilayah" />
            <AnalysisSettings value={settings} onChange={setSettings} />
          </div>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
        <section
          aria-labelledby="ranking-heading"
          className="flex min-w-0 flex-col gap-4"
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <h2
              id="ranking-heading"
              className="font-heading text-lg font-medium"
            >
              Peringkat kemiripan
            </h2>
            <p className="text-xs text-muted-foreground tabular-nums">
              {ranking.length} wilayah pembanding
            </p>
          </div>

          {ranking.length === 0 ? (
            <Alert>
              <Info />
              <AlertTitle>Tidak ada wilayah yang bisa dibandingkan</AlertTitle>
              <AlertDescription>
                Semua indikator yang dipilih tidak tersedia untuk wilayah ini.
                Aktifkan minimal satu indikator dengan data lengkap.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="flex flex-col gap-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Wilayah</TableHead>
                    <TableHead className="text-right">Skor</TableHead>
                    <TableHead className="hidden text-right sm:table-cell">
                      Cocok
                    </TableHead>
                    <TableHead className="hidden text-right sm:table-cell">
                      Berbeda
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ranking.map((result, index) => (
                    <TableRow key={result.region.code}>
                      <TableCell className="tabular-nums">
                        <span className="text-muted-foreground">
                          {index + 1}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Link
                          className="flex min-h-11 flex-col justify-center underline-offset-4 hover:underline md:min-h-0"
                          href={`/daerah-kembar/${region.code}/${result.region.code}`}
                        >
                          <span className="font-medium">
                            {result.region.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {regionTypeLabel(result.region.type)}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-medium tabular-nums">
                          {formatScore(result.similarity_score)}
                        </span>
                      </TableCell>
                      <TableCell className="hidden text-right tabular-nums sm:table-cell">
                        <span className="text-muted-foreground">
                          {countMatchedIndicators(result.contributions)}
                        </span>
                      </TableCell>
                      <TableCell className="hidden text-right tabular-nums sm:table-cell">
                        <span className="text-muted-foreground">
                          {countDifferentIndicators(result.contributions)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        <aside className="flex min-w-0 flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-base font-medium">Sebaran skor</h2>
            <JabarChoropleth
              scores={scores}
              heightClassName="h-[300px] sm:h-[360px]"
              caption={`Skor ${region.name} terhadap tiap wilayah. Marker menandai wilayah acuan.`}
              reference={{
                code: region.code,
                name: region.name,
                longitude: region.longitude,
                latitude: region.latitude,
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-base font-medium">
              Profil wilayah acuan
            </h2>
            <dl className="flex flex-col divide-y divide-border border-y border-border">
              <DataRow label="Indikator aktif">
                {activeCount} dari {INDICATORS.length}
              </DataRow>
              <DataRow label="Total bobot">{weightTotal}%</DataRow>
              <DataRow label="Skor tertinggi">
                {topScore !== undefined ? formatScore(topScore) : "-"}
              </DataRow>
              <DataRow label="Skor terendah">
                {ranking.at(-1)
                  ? formatScore(ranking.at(-1)!.similarity_score)
                  : "-"}
              </DataRow>
            </dl>
            <p className="pt-2 text-xs text-muted-foreground tabular-nums">
              Koordinat pusat wilayah: {region.latitude}, {region.longitude}
            </p>
            <Button
              variant="link"
              className="h-auto min-h-11 w-fit justify-start p-0 font-normal md:min-h-0"
              render={<Link href="/metodologi" />}
              nativeButton={false}
            >
              Bagaimana skor ini dihitung
            </Button>
          </div>
        </aside>
      </div>
    </Container>
  )
}
