"use client"

import Link from "next/link"
import * as React from "react"
import { Info, Minus, Plus } from "lucide-react"

import {
  CategoryRadarChart,
  ContributionBarChart,
} from "@/components/charts/indicator-charts"
import { TwoRegionMap } from "@/components/maps/two-region-map"
import { Container, SectionLabel } from "@/components/layout-primitives"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Region } from "@daerah-kita/shared"
import { INDICATORS } from "@/data/indicators"
import {
  categoryProfile,
  countDifferentIndicators,
  countMatchedIndicators,
  describeSimilarity,
  getSimilarityBetween,
  getValue,
} from "@/lib/similarity"
import {
  formatDifference,
  formatIndicatorValue,
  formatScore,
  formatUnitLabel,
} from "@/lib/format"
import { regionTypeLabel } from "@/lib/region-completeness"

export function DetailView({
  regionA,
  regionB,
}: {
  regionA: Region
  regionB: Region
}) {
  const pair = React.useMemo(
    () => getSimilarityBetween(regionA.code, regionB.code),
    [regionA.code, regionB.code]
  )

  const profileA = React.useMemo(
    () => categoryProfile(regionA.code),
    [regionA.code]
  )
  const profileB = React.useMemo(
    () => categoryProfile(regionB.code),
    [regionB.code]
  )

  const radarData = profileA.map((entry, index) => ({
    category: entry.category,
    a: Math.round(entry.value * 10) / 10,
    b: Math.round((profileB[index]?.value ?? 0) * 10) / 10,
  }))

  if (!pair) {
    return (
      <Container className="py-12">
        <Alert>
          <Info />
          <AlertTitle>Data tidak cukup untuk membandingkan</AlertTitle>
          <AlertDescription>
            Kedua wilayah tidak memiliki indikator yang bisa dibandingkan.
          </AlertDescription>
        </Alert>
      </Container>
    )
  }

  const interpretation = describeSimilarity(pair.similarity_score)
  const matched = countMatchedIndicators(pair.contributions)
  const different = countDifferentIndicators(pair.contributions)
  const topContributions = pair.contributions
    .slice(0, 5)
    .map((contribution) => ({
      name: contribution.indicator_name,
      value: contribution.share,
    }))

  return (
    <Container className="flex flex-col gap-10 py-10 sm:py-12">
      <header className="flex flex-col gap-6 border-b border-border pb-8">
        <SectionLabel index="03">Detail kemiripan</SectionLabel>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              <Link
                className="underline-offset-4 hover:text-foreground hover:underline"
                href={`/daerah-kembar/${regionA.code}`}
              >
                {regionA.name}
              </Link>{" "}
              dibandingkan dengan
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {regionB.name}
            </h1>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span>{interpretation.label}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {matched} indikator cocok, {different} berbeda
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {pair.matched_indicators} indikator dihitung
              </span>
            </p>
          </div>

          <div className="flex items-baseline gap-2 lg:flex-col lg:items-end lg:gap-1">
            <span className="font-heading text-5xl font-semibold tabular-nums sm:text-6xl">
              {formatScore(pair.similarity_score)}
            </span>
            <span className="text-xs text-muted-foreground">dari 100</span>
          </div>
        </div>
      </header>

      <dl className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2">
        {[regionA, regionB].map((region, index) => (
          <div
            key={region.code}
            className="flex flex-col gap-1 bg-background px-5 py-4"
          >
            <dt className="flex items-baseline gap-2">
              <span className="text-xs text-muted-foreground tabular-nums">
                {index === 0 ? "A" : "B"}
              </span>
              <span className="font-heading text-base font-medium">
                {region.name}
              </span>
            </dt>
            <dd className="text-xs text-muted-foreground">
              {regionTypeLabel(region.type)} · Kode BPS {region.code} ·{" "}
              {region.province_name}
            </dd>
            <dd className="text-xs text-muted-foreground tabular-nums">
              {region.latitude}, {region.longitude}
            </dd>
          </div>
        ))}
      </dl>

      <section
        aria-labelledby="compare-table"
        className="flex min-w-0 flex-col gap-4"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
          <h2 id="compare-table" className="font-heading text-lg font-medium">
            Perbandingan indikator
          </h2>
          <p className="text-xs text-muted-foreground">
            Selisih = {regionA.name} dikurangi {regionB.name}
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indikator</TableHead>
              <TableHead className="text-right">{regionA.name}</TableHead>
              <TableHead className="text-right">{regionB.name}</TableHead>
              <TableHead className="text-right">Selisih</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pair.contributions.map((contribution) => {
              const indicator = INDICATORS.find(
                (item) => item.code === contribution.indicator_code
              )
              if (!indicator) return null
              const valueA = getValue(regionA.code, indicator.code)
              const valueB = getValue(regionB.code, indicator.code)
              if (valueA === undefined || valueB === undefined) return null
              const difference = valueA - valueB

              return (
                <TableRow key={indicator.code}>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{indicator.name}</span>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              aria-label={`Sumber ${indicator.name}`}
                            />
                          }
                        >
                          <Info />
                        </TooltipTrigger>
                        <TooltipContent>
                          {indicator.source_name}, {indicator.bps_table},
                          periode {indicator.period}. Satuan{" "}
                          {formatUnitLabel(indicator.unit)}.
                        </TooltipContent>
                      </Tooltip>
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {indicator.category}
                    </p>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatIndicatorValue(valueA, indicator.unit)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatIndicatorValue(valueB, indicator.unit)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <span className="inline-flex items-center justify-end gap-1">
                      {difference === 0 ? (
                        <Minus
                          className="size-3 text-muted-foreground"
                          aria-hidden="true"
                        />
                      ) : difference > 0 ? (
                        <Plus className="size-3" aria-hidden="true" />
                      ) : (
                        <Minus className="size-3" aria-hidden="true" />
                      )}
                      {formatDifference(difference, indicator.unit)}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <p className="text-xs text-muted-foreground">
          Sumber: BPS Provinsi Jawa Barat (2025/2026). Tanda plus dan minus
          hanya menunjukkan arah selisih, bukan penilaian lebih baik atau lebih
          buruk.
        </p>
      </section>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <section
          aria-labelledby="radar-heading"
          className="flex flex-col gap-3"
        >
          <h2 id="radar-heading" className="font-heading text-base font-medium">
            Profil lima kategori
          </h2>
          <p className="text-sm text-muted-foreground">
            Rata-rata nilai ternormalisasi indikator per kategori, skala 0
            sampai 100.
          </p>
          <CategoryRadarChart
            data={radarData}
            labelA={regionA.name}
            labelB={regionB.name}
          />
          <ul className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-0.5 w-4 bg-foreground" />
              {regionA.name}
            </li>
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-4 border-t border-dashed border-muted-foreground"
              />
              {regionB.name}
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="contribution-heading"
          className="flex flex-col gap-3"
        >
          <h2
            id="contribution-heading"
            className="font-heading text-base font-medium"
          >
            Kontribusi perbedaan
          </h2>
          <p className="text-sm text-muted-foreground">
            Lima indikator dengan pengaruh terbesar terhadap jarak kedua
            wilayah.
          </p>
          <ContributionBarChart data={topContributions} />
        </section>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-base font-medium">
            Posisi kedua wilayah
          </h2>
          <TwoRegionMap
            regionA={regionA}
            regionB={regionB}
            heightClassName="h-[320px]"
          />
        </div>

        <section
          aria-labelledby="reading-heading"
          className="flex flex-col gap-4"
        >
          <h2
            id="reading-heading"
            className="font-heading text-base font-medium"
          >
            Bagaimana membaca skor ini
          </h2>
          <div className="flex flex-col gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
            <p>
              Skor {formatScore(pair.similarity_score)} berarti kedua wilayah
              berada pada kategori {interpretation.label.toLowerCase()} secara
              statistik.
            </p>
            <p>
              Dari {pair.matched_indicators} indikator yang dihitung, {matched}{" "}
              indikator selisihnya kecil dan {different} indikator cukup
              berbeda.
            </p>
            <p>
              Skor ini bukan peringkat kualitas pembangunan. Perbedaan tahun
              data dan pilihan bobot ikut memengaruhi hasil.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="min-h-11 md:min-h-9"
              render={<Link href={`/daerah-kembar/${regionA.code}`} />}
              nativeButton={false}
            >
              Kembali ke peringkat {regionA.name}
            </Button>
            <Button
              variant="ghost"
              className="min-h-11 md:min-h-9"
              render={
                <Link href={`/komparasi?a=${regionA.code}&b=${regionB.code}`} />
              }
              nativeButton={false}
            >
              Buka di komparasi
            </Button>
          </div>
        </section>
      </div>
    </Container>
  )
}
