"use client"

import * as React from "react"

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  useMap,
} from "@/components/ui/map"
import type { Region } from "@daerah-kita/shared"
import { cn } from "@/lib/utils"

function FitTwo({ a, b }: { a: Region; b: Region }) {
  const { map, isLoaded } = useMap()

  React.useEffect(() => {
    if (!map || !isLoaded) return
    const container = map.getContainer()

    const fit = () => {
      map.resize()
      const lngs = [a.longitude, b.longitude]
      const lats = [a.latitude, b.latitude]
      map.fitBounds(
        [
          [Math.min(...lngs), Math.min(...lats)],
          [Math.max(...lngs), Math.max(...lats)],
        ],
        {
          padding: { top: 56, bottom: 56, left: 56, right: 56 },
          duration: 0,
          maxZoom: 10,
        }
      )
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(container)
    return () => observer.disconnect()
  }, [map, isLoaded, a, b])

  return null
}

function MarkerDot({ label, filled }: { label: string; filled: boolean }) {
  return (
    <MarkerContent>
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-full border-2 text-xs font-medium",
          filled
            ? "border-background bg-foreground text-background"
            : "border-foreground bg-background text-foreground"
        )}
      >
        {label}
      </span>
    </MarkerContent>
  )
}

/**
 * Peta dua wilayah. Huruf A dan B dipakai selain warna supaya pembeda tetap
 * terbaca tanpa bergantung pada persepsi warna.
 */
export function TwoRegionMap({
  regionA,
  regionB,
  heightClassName = "h-[320px]",
}: {
  regionA: Region
  regionB: Region
  heightClassName?: string
}) {
  return (
    <div
      role="region"
      aria-label={`Peta posisi ${regionA.name} (A) dan ${regionB.name} (B). Nilai indikator kedua wilayah ada pada tabel di halaman ini.`}
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
        <FitTwo a={regionA} b={regionB} />
        <MapMarker longitude={regionA.longitude} latitude={regionA.latitude}>
          <MarkerDot label="A" filled />
          <MarkerPopup closeButton>
            <p className="font-medium">{regionA.name}</p>
            <p className="text-xs text-muted-foreground">Wilayah A</p>
          </MarkerPopup>
        </MapMarker>
        <MapMarker longitude={regionB.longitude} latitude={regionB.latitude}>
          <MarkerDot label="B" filled={false} />
          <MarkerPopup closeButton>
            <p className="font-medium">{regionB.name}</p>
            <p className="text-xs text-muted-foreground">Wilayah B</p>
          </MarkerPopup>
        </MapMarker>
      </Map>
    </div>
  )
}
