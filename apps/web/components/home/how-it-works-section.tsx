import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container, SectionLabel } from "@/components/layout-primitives"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { formatDecimal, formatScore } from "@/lib/format"
import {
  getIndicatorRange,
  getNormalizedValue,
  getSimilarityBetween,
  getValue,
} from "@/lib/similarity"

const IPM_RANGE = getIndicatorRange("ipm")
const bandungIpmRaw = getValue("3273", "ipm")
const bekasiIpmRaw = getValue("3275", "ipm")
const bandungIpm = getNormalizedValue("3273", "ipm")
const bekasiIpm = getNormalizedValue("3275", "ipm")
const pair = getSimilarityBetween("3273", "3275")

export function HowItWorksSection() {
  return (
    <section aria-labelledby="how-heading">
      <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-4">
          <SectionLabel index="03">Cara menghitung</SectionLabel>
          <h2
            id="how-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            Skor 0 sampai 100, dan asal angkanya
          </h2>
          <p className="text-sm text-muted-foreground">
            Tidak ada angka yang muncul tanpa perhitungan. Alur di samping
            menjelaskan jalur dari tabel BPS sampai skor yang kamu lihat.
          </p>
          <Button
            variant="outline"
            className="min-h-11 w-fit md:min-h-9"
            render={<Link href="/metodologi" />}
            nativeButton={false}
          >
            Metodologi lengkap
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <Accordion defaultValue={["data"]}>
          <AccordionItem value="data">
            <AccordionTrigger>
              Data dikumpulkan dari publikasi resmi
            </AccordionTrigger>
            <AccordionContent>
              <p>
                15 indikator untuk 27 kabupaten/kota diambil dari Provinsi Jawa
                Barat Dalam Angka 2026 (BPS), ditambah rekapitulasi fasilitas
                kesehatan Dinas Kesehatan Jawa Barat. Setiap nilai menyimpan
                nama tabel rujukan dan periodenya.
              </p>
              <p>
                Periode data mengikuti publikasi: indikator kependudukan memakai
                angka 2026, indikator sosial ekonomi memakai 2025.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="normalisasi">
            <AccordionTrigger>
              Dinormalisasi, lalu dibandingkan
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Setiap indikator punya satuan berbeda, jadi nilainya dipetakan
                ke rentang 0 sampai 1 dengan Min-Max. Indikator yang arahnya
                berlawanan, seperti tingkat pengangguran dan kemiskinan, dibalik
                agar nilai kecil dianggap lebih baik.
              </p>
              {IPM_RANGE &&
              bandungIpm !== undefined &&
              bekasiIpm !== undefined ? (
                <dl className="flex flex-col border-t border-border text-sm">
                  <div className="flex items-baseline justify-between gap-4 py-2">
                    <dt className="text-muted-foreground">Rentang IPM</dt>
                    <dd className="tabular-nums">
                      {formatDecimal(IPM_RANGE.min)} sampai{" "}
                      {formatDecimal(IPM_RANGE.max)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-border py-2">
                    <dt className="text-muted-foreground">
                      Kota Bandung
                      {bandungIpmRaw !== undefined
                        ? `, ${formatDecimal(bandungIpmRaw)}`
                        : ""}
                    </dt>
                    <dd className="tabular-nums">
                      {formatDecimal(bandungIpm)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-border py-2">
                    <dt className="text-muted-foreground">
                      Kota Bekasi
                      {bekasiIpmRaw !== undefined
                        ? `, ${formatDecimal(bekasiIpmRaw)}`
                        : ""}
                    </dt>
                    <dd className="tabular-nums">{formatDecimal(bekasiIpm)}</dd>
                  </div>
                </dl>
              ) : null}
              <p>
                Setelah itu jarak dihitung dengan Weighted Euclidean Distance,
                memakai bobot tiap indikator. Bobot setara berarti setiap
                indikator menyumbang 1/15.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="skor">
            <AccordionTrigger>
              Jarak diubah menjadi skor kemiripan
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Jarak 0 berarti seluruh indikator identik dan menghasilkan skor
                100. Jarak maksimum menghasilkan skor 0. Nilai di antaranya
                dipetakan secara linear.
              </p>
              {pair ? (
                <p>
                  Dengan bobot setara, Kota Bandung dan Kota Bekasi memperoleh
                  skor{" "}
                  <span className="font-medium text-foreground tabular-nums">
                    {formatScore(pair.similarity_score)}
                  </span>{" "}
                  dari {pair.matched_indicators} indikator. Selisih terbesar ada
                  pada {pair.contributions[0]?.indicator_name.toLowerCase()}.
                </p>
              ) : null}
              <p>
                Skor tinggi berarti karakteristik statistiknya dekat, bukan
                berarti salah satu wilayah lebih baik.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="kontribusi">
            <AccordionTrigger>
              Kontribusi indikator dapat ditelusuri
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Setiap indikator menyimpan bobot dan kuadrat selisihnya. Kamu
                bisa langsung melihat sektor mana yang paling membedakan kedua
                wilayah atau aspek apa yang membuat keduanya mirip.
              </p>
              <p>
                Transparansi ini memastikan skor bukan kotak hitam, melainkan
                ringkasan terukur dari 15 indikator nyata.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Container>
    </section>
  )
}
