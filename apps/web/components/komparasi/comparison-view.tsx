"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeftRight } from "lucide-react"

import {
  CategoryBarChart,
  ContributionBarChart,
} from "@/components/charts/indicator-charts"
import { RegionSearch } from "@/components/daerah-kembar/region-search"
import { TwoRegionMap } from "@/components/maps/two-region-map"
import { Container, SectionLabel } from "@/components/layout-primitives"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { REGIONS } from "@/data/regions"
import { INDICATOR_CATEGORIES } from "@/data/indicators"
import {
  buildComparison,
  categoryProfile,
  describeSimilarity,
  getSimilarityBetween,
} from "@/lib/similarity"
import {
  formatDifference,
  formatIndicatorValue,
  formatScore,
  formatSignedDecimal,
} from "@/lib/format"
import type { Region } from "@daerah-kita/shared"

function RegionField({
  label,
  region,
  onSelect,
}: {
  label: string
  region: Region | null
  onSelect: (code: string) => void
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <RegionSearch
        triggerLabel={region?.name ?? "Pilih wilayah"}
        onSelect={onSelect}
        triggerClassName="min-h-11 w-full justify-start overflow-hidden md:min-h-9"
      />
    </div>
  )
}

export function ComparisonView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialA = searchParams.get("a")
  const initialB = searchParams.get("b")

  const [codeA, setCodeA] = React.useState<string | null>(
    initialA && REGIONS.some((region) => region.code === initialA)
      ? initialA
      : null
  )
  const [codeB, setCodeB] = React.useState<string | null>(
    initialB && REGIONS.some((region) => region.code === initialB)
      ? initialB
      : null
  )

  const regionA = REGIONS.find((region) => region.code === codeA) ?? null
  const regionB = REGIONS.find((region) => region.code === codeB) ?? null
  const comparison =
    regionA && regionB ? buildComparison(regionA.code, regionB.code) : null
  const pair =
    regionA && regionB ? getSimilarityBetween(regionA.code, regionB.code) : null

  // categoryProfile hanya membaca dataset statis, jadi aman dipanggil langsung.
  const profileA = regionA ? categoryProfile(regionA.code) : []
  const profileB = regionB ? categoryProfile(regionB.code) : []
  const chartData = profileA.map((entry, index) => ({
    category: entry.category,
    a: Math.round(entry.value * 10) / 10,
    b: Math.round((profileB[index]?.value ?? 0) * 10) / 10,
  }))

  function commit(nextA: string | null, nextB: string | null) {
    setCodeA(nextA)
    setCodeB(nextB)
    const params = new URLSearchParams()
    if (nextA) params.set("a", nextA)
    if (nextB) params.set("b", nextB)
    router.replace(
      `/komparasi${params.size > 0 ? `?${params.toString()}` : ""}`,
      { scroll: false }
    )
  }

  function pickA(code: string) {
    commit(code, codeB === code ? null : codeB)
  }

  function pickB(code: string) {
    commit(codeA === code ? null : codeA, code)
  }

  const rowsByCategory = INDICATOR_CATEGORIES.map((category) => ({
    category,
    rows:
      comparison?.indicators.filter(
        (row) => row.indicator.category === category
      ) ?? [],
  })).filter((group) => group.rows.length > 0)

  const interpretation = pair ? describeSimilarity(pair.similarity_score) : null
  const topContributions = pair
    ? pair.contributions
        .slice()
        .sort((left, right) => right.share - left.share)
        .slice(0, 5)
        .map((contribution) => ({
          name: contribution.indicator_name,
          value: contribution.share,
        }))
    : []

  return (
    <Container className="flex flex-col gap-10 py-10 sm:py-12">
      <header className="flex flex-col gap-6 border-b border-border pb-8">
        <SectionLabel index="04">Komparasi</SectionLabel>
        <div className="grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] sm:gap-4">
          <RegionField label="Wilayah A" region={regionA} onSelect={pickA} />
          <Button
            variant="outline"
            size="icon"
            className="hidden size-9 sm:flex"
            aria-label="Tukar wilayah A dan B"
            disabled={!regionA && !regionB}
            onClick={() => commit(codeB, codeA)}
          >
            <ArrowLeftRight />
          </Button>
          <RegionField label="Wilayah B" region={regionB} onSelect={pickB} />
          <Button
            variant="ghost"
            className="min-h-11 justify-start text-muted-foreground sm:min-h-9 sm:justify-center"
            disabled={!regionA && !regionB}
            onClick={() => commit(null, null)}
          >
            Hapus
          </Button>
        </div>
      </header>

      {!regionA || !regionB ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Pilih dua wilayah untuk dibandingkan</EmptyTitle>
            <EmptyDescription>
              Pilih wilayah A dan wilayah B di atas. Tabel dan grafik akan
              muncul setelah keduanya terisi.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : !comparison || !pair || !interpretation ? (
        <Alert variant="destructive">
          <AlertTitle>Data tidak cukup</AlertTitle>
          <AlertDescription>
            Salah satu wilayah tidak memiliki nilai indikator yang bisa
            dibandingkan.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <section className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
            <div className="flex flex-col gap-3">
              <TwoRegionMap
                regionA={regionA}
                regionB={regionB}
                heightClassName="h-[300px]"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 border-b border-border pb-4">
                <p className="text-sm text-muted-foreground">
                  {regionA.name} dan {regionB.name}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-5xl font-semibold tabular-nums">
                    {formatScore(pair.similarity_score)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    dari 100 · {interpretation.label.toLowerCase()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground tabular-nums">
                  {pair.matched_indicators} indikator dihitung
                </p>
              </div>
              <CategoryBarChart
                data={chartData}
                labelA={regionA.name}
                labelB={regionB.name}
              />
              <ul className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 bg-foreground" />
                  {regionA.name}
                </li>
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="size-2 bg-muted-foreground"
                  />
                  {regionB.name}
                </li>
              </ul>
            </div>
          </section>

          <section className="flex min-w-0 flex-col gap-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
              <h2 className="font-heading text-lg font-medium">
                Seluruh indikator
              </h2>
              <p className="text-xs text-muted-foreground">
                A = {regionA.name} · B = {regionB.name}
              </p>
            </div>
            <Tabs defaultValue={rowsByCategory[0]?.category}>
              <TabsList
                variant="line"
                className="flex h-10 w-full [scrollbar-width:none] flex-nowrap items-center justify-start gap-6 overflow-x-auto border-b border-border bg-transparent px-0 py-0 [&::-webkit-scrollbar]:hidden"
              >
                {rowsByCategory.map((group) => (
                  <TabsTrigger
                    key={group.category}
                    value={group.category}
                    className="relative inline-flex h-full flex-none items-center justify-center px-1 text-xs font-medium whitespace-nowrap text-muted-foreground transition-colors data-active:text-foreground data-active:after:absolute data-active:after:inset-x-0 data-active:after:bottom-0 data-active:after:h-0.5 data-active:after:bg-foreground"
                  >
                    {group.category}
                  </TabsTrigger>
                ))}
              </TabsList>
              {rowsByCategory.map((group) => (
                <TabsContent
                  key={group.category}
                  value={group.category}
                  className="pt-4"
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Indikator</TableHead>
                        <TableHead className="text-right">A</TableHead>
                        <TableHead className="text-right">B</TableHead>
                        <TableHead className="text-right">Selisih</TableHead>
                        <TableHead className="hidden text-right sm:table-cell">
                          Relatif
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.rows.map((row) => (
                        <TableRow key={row.indicator.code}>
                          <TableCell>
                            <span className="font-medium">
                              {row.indicator.name}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {row.indicator.unit} · {row.indicator.period}
                            </p>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatIndicatorValue(
                              row.value_a,
                              row.indicator.unit
                            )}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatIndicatorValue(
                              row.value_b,
                              row.indicator.unit
                            )}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatDifference(
                              row.difference,
                              row.indicator.unit
                            )}
                          </TableCell>
                          <TableCell className="hidden text-right tabular-nums sm:table-cell">
                            <span className="text-muted-foreground">
                              {formatSignedDecimal(
                                row.relative_difference * 100
                              )}
                              %
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <section className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-12">
            <div className="flex min-w-0 flex-col gap-3">
              <h2 className="font-heading text-base font-medium">
                Kontribusi perbedaan
              </h2>
              <p className="text-sm text-muted-foreground">
                Lima indikator dengan pengaruh terbesar terhadap jarak kedua
                wilayah.
              </p>
              <ContributionBarChart data={topContributions} />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-base font-medium">
                Identitas wilayah
              </h2>
              <dl className="flex flex-col divide-y divide-border border-y border-border text-sm">
                {[regionA, regionB].map((region) => (
                  <div key={region.code} className="flex flex-col gap-1 py-3">
                    <dt className="font-medium">{region.name}</dt>
                    <dd className="text-xs text-muted-foreground tabular-nums">
                      Kode BPS {region.code} · {region.latitude},{" "}
                      {region.longitude}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </>
      )}
    </Container>
  )
}
