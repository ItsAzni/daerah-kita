"use client"

import * as React from "react"
import Link from "next/link"

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  useMap,
} from "@/components/ui/map"
import { REGIONS } from "@/data/regions"
import { REGION_COMPLETENESS, regionTypeLabel } from "@/lib/region-completeness"
import { formatScore } from "@/lib/format"
import { cn } from "@/lib/utils"

const BOUNDS: [[number, number], [number, number]] = [
  [106.3, -7.95],
  [108.9, -5.85],
]

function FitJabar() {
  const { map, isLoaded } = useMap()

  React.useEffect(() => {
    if (!map || !isLoaded) return
    const container = map.getContainer()
    const fit = () => {
      map.resize()
      map.fitBounds(BOUNDS, { padding: 24, duration: 0 })
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(container)
    return () => observer.disconnect()
  }, [map, isLoaded])

  return null
}

function completenessLine(code: string): string {
  const completeness = REGION_COMPLETENESS[code]
  if (!completeness) return ""
  return `${completeness.available} dari ${completeness.total} indikator`
}

/**
 * Peta sebaran 27 kabupaten/kota Jawa Barat.
 * Setiap marker memiliki area klik yang mudah diakses dan langsung membuka popup
 * informasi serta tautan menuju analisis wilayah.
 */
export function RegionMarkerMap({
  scores,
  heightClassName = "h-[360px]",
  selectedCode,
}: {
  scores?: Record<string, number>
  heightClassName?: string
  selectedCode?: string
}) {
  return (
    <div
      role="region"
      aria-label="Peta sebaran 27 kabupaten/kota Jawa Barat. Daftar wilayah lengkap tersedia sebagai tabel di halaman ini."
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border",
        heightClassName
      )}
    >
      <Map
        center={[107.6191, -6.9175]}
        zoom={7.2}
        scrollZoom={false}
        dragRotate={false}
        pitchWithRotate={false}
        touchPitch={false}
      >
        <FitJabar />
        {REGIONS.map((region) => {
          const isSelected = selectedCode === region.code
          return (
            <MapMarker
              key={region.code}
              longitude={region.longitude}
              latitude={region.latitude}
            >
              <MarkerContent>
                <div
                  role="button"
                  tabIndex={0}
                  className="flex size-8 cursor-pointer items-center justify-center"
                  aria-label={region.name}
                >
                  <span
                    className={cn(
                      "block size-3.5 rounded-full border-2 border-background shadow-xs transition-transform hover:scale-125",
                      isSelected
                        ? "bg-foreground ring-2 ring-foreground/40"
                        : "bg-muted-foreground hover:bg-foreground"
                    )}
                  />
                  <span className="sr-only">{region.name}</span>
                </div>
              </MarkerContent>
              <MarkerPopup closeButton>
                <div className="flex flex-col gap-1 p-0.5">
                  <p className="font-heading text-sm font-semibold">
                    {region.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {regionTypeLabel(region.type)} · Kode BPS {region.code}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {completenessLine(region.code)}
                    {scores?.[region.code] !== undefined
                      ? ` · skor ${formatScore(scores[region.code])}`
                      : ""}
                  </p>
                  <div className="mt-2 border-t border-border/60 pt-2">
                    <Link
                      href={`/daerah-kembar/${region.code}`}
                      className="inline-flex min-h-8 items-center text-xs font-medium text-foreground underline underline-offset-4 hover:text-primary"
                    >
                      Buka analisis wilayah →
                    </Link>
                  </div>
                </div>
              </MarkerPopup>
            </MapMarker>
          )
        })}
      </Map>
    </div>
  )
}
