"use client"

import Link from "next/link"
import * as React from "react"

import { RegionSearch } from "@/components/daerah-kembar/region-search"
import { Container, PageHeader } from "@/components/layout-primitives"
import { RegionMarkerMap } from "@/components/maps/region-marker-map"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { REGIONS } from "@/data/regions"
import { regionTypeLabel } from "@/lib/region-completeness"

const FILTERS = [
  { value: "semua", label: "Semua" },
  { value: "kabupaten", label: "Kabupaten" },
  { value: "kota", label: "Kota" },
]

export function RegionPicker() {
  const [filter, setFilter] = React.useState<string[]>(["semua"])
  const activeFilter = filter[0] ?? "semua"

  const visibleRegions = REGIONS.filter((region) => {
    if (activeFilter === "semua") return true
    return region.type === activeFilter
  })

  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-12">
      <PageHeader
        index="01"
        label="Pilih wilayah acuan"
        title="Wilayah mana yang ingin kamu baca?"
        description="Pilih satu kabupaten atau kota. Sistem akan membandingkan 15 indikatornya dengan 26 wilayah lain di Jawa Barat."
        actions={<RegionSearch triggerLabel="Cari wilayah" />}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ToggleGroup
              aria-label="Filter tipe wilayah"
              value={filter}
              onValueChange={(next) => {
                if (next.length > 0) setFilter(next)
              }}
              size="sm"
            >
              {FILTERS.map((item) => (
                <ToggleGroupItem key={item.value} value={item.value}>
                  {item.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <p className="text-xs text-muted-foreground">
              {visibleRegions.length} dari {REGIONS.length} wilayah
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wilayah</TableHead>
                <TableHead className="hidden sm:table-cell">Tipe</TableHead>
                <TableHead className="text-right">Kode BPS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRegions.map((region) => (
                <TableRow key={region.code}>
                  <TableCell>
                    <Link
                      href={`/daerah-kembar/${region.code}`}
                      className="flex min-h-11 items-center font-medium underline-offset-4 hover:underline md:min-h-0"
                    >
                      {region.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {regionTypeLabel(region.type)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {region.code}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <aside className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-heading text-base font-medium">
            Sebaran wilayah
          </h2>
          <RegionMarkerMap heightClassName="h-[360px]" />
          <p className="text-xs text-muted-foreground">
            Klik marker untuk membuka analisis wilayah. Batas wilayah: Open Data
            Jabar.
          </p>
        </aside>
      </div>
    </Container>
  )
}
