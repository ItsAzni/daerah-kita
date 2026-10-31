import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { RegionSearch } from "@/components/daerah-kembar/region-search"
import { JabarChoropleth } from "@/components/maps/jabar-choropleth"
import { Button } from "@/components/ui/button"
import { averageSimilarityByRegion } from "@/lib/similarity"

const averageScores = averageSimilarityByRegion()

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-6">
          <h1
            id="hero-heading"
            className="max-w-[13ch] font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]"
          >
            Temukan daerah kembarmu
          </h1>

          <p className="max-w-md text-base text-muted-foreground sm:text-lg">
            Bandingkan karakteristik 27 kabupaten/kota di Jawa Barat berdasarkan
            data, bukan asumsi.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="min-h-11 w-full sm:w-auto"
              render={<Link href="/daerah-kembar" />}
              nativeButton={false}
            >
              Mulai analisis wilayah
              <ArrowRight data-icon="inline-end" />
            </Button>
            <RegionSearch
              triggerLabel="Cari wilayah"
              triggerSize="lg"
              triggerClassName="min-h-11 w-full justify-start sm:w-auto"
            />
          </div>

          <p className="max-w-md border-t border-border pt-4 text-xs text-muted-foreground">
            Skor kemiripan menunjukkan kedekatan karakteristik statistik, bukan
            peringkat kualitas pembangunan.
          </p>
        </div>

        <JabarChoropleth
          scores={averageScores}
          heightClassName="h-[360px] sm:h-[460px] lg:h-[540px]"
          caption="Rata-rata skor kemiripan tiap wilayah terhadap 26 wilayah lain."
        />
      </div>
    </section>
  )
}
