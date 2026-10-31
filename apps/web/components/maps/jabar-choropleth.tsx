"use client"

import Link from "next/link"
import * as React from "react"
import { useTheme } from "next-themes"

import {
  Map,
  MapControls,
  MapGeoJSON,
  MapMarker,
  MapPopup,
  MarkerContent,
  useMap,
  type MapGeoJSONProps,
} from "@/components/ui/map"
import { JABAR_GEOJSON, type RegionProperties } from "@/data/geojson"
import { formatScore } from "@/lib/format"
import { cn } from "@/lib/utils"

type FillPaint = Exclude<
  NonNullable<MapGeoJSONProps<RegionProperties>["fillPaint"]>,
  false
>

const BOUNDS: [[number, number], [number, number]] = [
  [106.3, -7.95],
  [108.9, -5.85],
]

/** Skala netral hangat: rendah = permukaan, tinggi = tinta. */
const RAMPS = {
  light: { low: "#e7e5e4", high: "#1c1917", stroke: "#ffffff" },
  dark: { low: "#292524", high: "#fafaf9", stroke: "#0a0a0a" },
} as const

/**
 * Camera di-fit setelah container punya ukuran akhir. Tanpa ini peta dirender
 * pada lebar nol saat hidrasi dan pulau tampak mengecil di satu sudut.
 */
function FitJabar() {
  const { map, isLoaded } = useMap()

  React.useEffect(() => {
    if (!map || !isLoaded) return
    const container = map.getContainer()

    const fit = () => {
      map.resize()
      map.fitBounds(BOUNDS, { padding: 20, duration: 0 })
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(container)
    return () => observer.disconnect()
  }, [map, isLoaded])

  return null
}

function scoreExpression(
  ramp: { low: string; high: string },
  domain: { min: number; max: number }
) {
  return [
    "interpolate",
    ["linear"],
    ["coalesce", ["get", "score"], -1],
    -1,
    ramp.low,
    domain.min,
    ramp.low,
    domain.max,
    ramp.high,
  ]
}

/**
 * Peta choropleth 27 kabupaten/kota Jawa Barat.
 *
 * Warna mengikuti skor 0 sampai 100 pada skala netral, jadi perbedaan tetap
 * terbaca tanpa bergantung pada hue. Wilayah tanpa skor memakai warna
 * permukaan, bukan nol, supaya tidak salah baca.
 */
export function JabarChoropleth({
  scores,
  heightClassName = "h-[420px]",
  onSelect,
  caption,
  reference,
}: {
  scores?: Record<string, number>
  heightClassName?: string
  onSelect?: (code: string) => void
  caption?: string
  /** Wilayah acuan: ditandai marker karena tidak punya skor terhadap dirinya sendiri. */
  reference?: {
    code: string
    name: string
    longitude: number
    latitude: number
  }
}) {
  const { resolvedTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const [selected, setSelected] = React.useState<{
    code: string
    name: string
    type: string
    longitude: number
    latitude: number
  } | null>(null)

  // Sebelum mount, pakai ramp terang agar markup server dan klien sama.
  const ramp = mounted && resolvedTheme === "dark" ? RAMPS.dark : RAMPS.light

  // Skala mengikuti rentang skor yang benar-benar ada, supaya perbedaan kecil
  // tetap terbaca. Tanpa skor, domain jatuh ke 0 sampai 100.
  const domain = React.useMemo(() => {
    const values = Object.values(scores ?? {}).filter((value) =>
      Number.isFinite(value)
    )
    if (values.length === 0) return { min: 0, max: 100 }
    const min = Math.floor(Math.min(...values))
    const max = Math.ceil(Math.max(...values))
    return min === max ? { min: min - 1, max: max + 1 } : { min, max }
  }, [scores])

  const data = React.useMemo(
    () => ({
      ...JABAR_GEOJSON,
      features: JABAR_GEOJSON.features.map((feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          score: scores?.[feature.properties.code] ?? null,
        },
      })),
    }),
    [scores]
  ) as typeof JABAR_GEOJSON

  const fillPaint = React.useMemo(
    () =>
      ({
        "fill-color": scoreExpression(ramp, domain),
        "fill-opacity": 0.95,
      }) as unknown as FillPaint,
    [ramp, domain]
  )

  const hoverPaint = React.useMemo(
    () =>
      ({
        "fill-opacity": 1,
        "fill-color": scoreExpression(ramp, domain),
      }) as unknown as FillPaint,
    [ramp, domain]
  )

  return (
    <figure className="flex flex-col gap-3">
      <div
        role="region"
        aria-label={
          scores
            ? "Peta 27 kabupaten/kota Jawa Barat. Warna menunjukkan skor kemiripan; nilai lengkap ada pada tabel di halaman ini."
            : "Peta 27 kabupaten/kota Jawa Barat."
        }
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-border bg-muted/30",
          heightClassName
        )}
      >
        <Map
          blank
          center={[107.6191, -6.9175]}
          zoom={7.2}
          scrollZoom={false}
          dragRotate={false}
          pitchWithRotate={false}
          touchPitch={false}
        >
          <FitJabar />
          <MapGeoJSON
            data={data}
            promoteId="code"
            fillPaint={fillPaint}
            fillHoverPaint={hoverPaint}
            linePaint={{ "line-color": ramp.stroke, "line-width": 1 }}
            interactive
            onClick={(event) => {
              const properties = event.feature.properties
              if (!properties) return
              setSelected({
                code: properties.code,
                name: properties.name,
                type: properties.type,
                longitude: event.longitude,
                latitude: event.latitude,
              })
              onSelect?.(properties.code)
            }}
          />
          {reference ? (
            <MapMarker
              longitude={reference.longitude}
              latitude={reference.latitude}
            >
              <MarkerContent>
                <span className="flex size-4 items-center justify-center rounded-full border-2 border-background bg-foreground" />
                <span className="sr-only">Wilayah acuan: {reference.name}</span>
              </MarkerContent>
            </MapMarker>
          ) : null}
          {selected ? (
            <MapPopup
              longitude={selected.longitude}
              latitude={selected.latitude}
              closeButton
              onClose={() => setSelected(null)}
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium">{selected.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selected.type === "kota" ? "Kota" : "Kabupaten"}
                  {scores?.[selected.code] !== undefined
                    ? ` · skor ${formatScore(scores[selected.code])}`
                    : ""}
                </p>
                <Link
                  className="text-xs underline underline-offset-4"
                  href={`/daerah-kembar/${selected.code}`}
                >
                  Buka analisis wilayah
                </Link>
              </div>
            </MapPopup>
          ) : null}
          {onSelect ? <MapControls position="top-right" showZoom /> : null}
        </Map>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Skor</span>
          <span className="tabular-nums">{scores ? domain.min : 0}</span>
          <span
            aria-hidden="true"
            className="h-1.5 w-20"
            style={{
              backgroundImage: `linear-gradient(to right, ${ramp.low}, ${ramp.high})`,
            }}
          />
          <span className="tabular-nums">{scores ? domain.max : 100}</span>
        </span>
        {caption ? (
          <span className="max-w-md text-xs text-muted-foreground">
            {caption}
          </span>
        ) : null}
      </figcaption>
    </figure>
  )
}
