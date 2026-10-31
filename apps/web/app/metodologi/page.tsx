import Link from "next/link"
import type { Metadata } from "next"

import {
  Container,
  DataRow,
  PageHeader,
  SectionLabel,
} from "@/components/layout-primitives"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { INDICATORS, INDICATOR_CATEGORIES } from "@/data/indicators"
import { formatDecimal, formatScore, formatUnitLabel } from "@/lib/format"
import { getIndicatorRange, getSimilarityBetween } from "@/lib/similarity"

export const metadata: Metadata = {
  title: "Metodologi",
  description:
    "Cara Daerah Kita menormalkan data BPS, menghitung jarak antarwilayah, dan mengubahnya menjadi skor kemiripan 0 sampai 100.",
}

const SANITASI_RANGE = getIndicatorRange("akses_sanitasi")
const BANDUNG_BEKASI = getSimilarityBetween("3273", "3275")

const SANITASI_BANDUNG = 56.5
const SANITASI_BEKASI = 97.93

const STEPS = [
  {
    title: "Pilih wilayah acuan dan indikator",
    body: "Wilayah acuan dibandingkan dengan 26 wilayah lain. Indikator yang tidak aktif atau tidak punya nilai di salah satu wilayah dikeluarkan.",
  },
  {
    title: "Normalisasi Min-Max",
    body: "Setiap indikator dipetakan ke rentang 0 sampai 1 memakai nilai minimum dan maksimum di 27 wilayah.",
  },
  {
    title: "Balik arah bila perlu",
    body: "Indikator bertanda reverse, seperti pengangguran dan kemiskinan, dibalik dengan 1 - X' agar nilai kecil terbaca sebagai kondisi lebih baik.",
  },
  {
    title: "Hitung jarak berbobot",
    body: "Weighted Euclidean Distance menjumlahkan selisih kuadrat tiap indikator, dikali bobotnya, lalu diakarkan.",
  },
  {
    title: "Ubah jarak menjadi skor",
    body: "Jarak 0 menjadi skor 100, jarak maksimum teoretis menjadi skor 0. Nilai di antaranya dipetakan linear.",
  },
  {
    title: "Uraikan kontribusi",
    body: "Setiap indikator menyimpan sumbangan kuadrat selisihnya, sehingga kamu bisa melihat apa yang membuat dua wilayah berbeda.",
  },
]

const SCORE_BANDS = [
  { label: "Sangat mirip", range: "90 sampai 100" },
  { label: "Mirip", range: "75 sampai 89,9" },
  { label: "Cukup mirip", range: "60 sampai 74,9" },
  { label: "Berbeda", range: "di bawah 60" },
]

const LIMITS = [
  "Kemiripan statistik tidak membuktikan kesamaan seluruh kondisi daerah.",
  "Hasil dipengaruhi pilihan indikator, periode data, normalisasi, dan bobot.",
  "Perbedaan tahun pengukuran dapat memengaruhi hasil.",
  "Korelasi antarindikator dapat membuat satu aspek terhitung berulang.",
  "Skor tidak membuktikan hubungan sebab-akibat.",
  "Skor bukan peringkat kualitas pembangunan dan bukan dasar penilaian kinerja.",
]

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed tabular-nums">
      {children}
    </div>
  )
}

function MethodSection({
  index,
  label,
  title,
  description,
  children,
}: {
  index: string
  label: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-6 border-t border-border pt-8">
      <div className="flex flex-col gap-2">
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">{children}</div>
    </section>
  )
}

export default function MetodologiPage() {
  const bandungNormalized =
    SANITASI_RANGE && SANITASI_RANGE.max !== SANITASI_RANGE.min
      ? (SANITASI_BANDUNG - SANITASI_RANGE.min) /
        (SANITASI_RANGE.max - SANITASI_RANGE.min)
      : 0
  const bekasiNormalized =
    SANITASI_RANGE && SANITASI_RANGE.max !== SANITASI_RANGE.min
      ? (SANITASI_BEKASI - SANITASI_RANGE.min) /
        (SANITASI_RANGE.max - SANITASI_RANGE.min)
      : 0
  const sanitasiContribution =
    (bandungNormalized - bekasiNormalized) ** 2 / INDICATORS.length

  return (
    <Container className="flex flex-col gap-12 py-10 sm:py-12">
      <PageHeader
        index="05"
        label="Metodologi"
        title="Dari tabel BPS ke satu angka"
        description="Halaman ini menjelaskan setiap langkah perhitungan, termasuk contoh angka yang bisa kamu ikuti sendiri. Tidak ada angka yang muncul tanpa jalur yang jelas."
        actions={
          <Button
            variant="outline"
            className="min-h-11 md:min-h-9"
            render={<Link href="/sumber-data" />}
            nativeButton={false}
          >
            Lihat sumber data
          </Button>
        }
      />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <SectionLabel index="05.1">Alur</SectionLabel>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Enam langkah, satu skor
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Perhitungan berjalan di browser memakai dataset statis resmi BPS.
            Rumus yang sama diterapkan secara deterministik untuk seluruh
            pasangan wilayah.
          </p>
        </div>
        <ol className="grid gap-x-12 border-t border-border sm:grid-cols-2">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-4 border-b border-border py-4"
            >
              <span className="text-sm text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <MethodSection
        index="05.2"
        label="Normalisasi"
        title="Normalisasi Min-Max"
        description="Setiap indikator punya satuan berbeda. Normalisasi memetakan seluruh nilai ke rentang 0 sampai 1 memakai batas minimum dan maksimum di 27 wilayah."
      >
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-base font-medium">
              Rumus perhitungan
            </h3>
            <p className="text-sm text-muted-foreground">
              X adalah nilai mentah, X min dan X max diambil dari 27 wilayah.
            </p>
          </div>
          <Formula>
            <div className="overflow-x-auto">
              X&apos; = (X - X_min) / (X_max - X_min)
            </div>
            <div className="mt-2 overflow-x-auto border-t border-border/50 pt-2 text-muted-foreground">
              X&apos;_reverse = 1 - X&apos;
            </div>
          </Formula>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Bila semua wilayah punya nilai sama (X max = X min), nilai
            ditetapkan 0,5 karena tidak ada variasi yang dapat dibandingkan.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-base font-medium">
              Contoh nyata: akses sanitasi layak
            </h3>
            <p className="text-sm text-muted-foreground">
              Persentase rumah tangga dengan fasilitas sanitasi layak, data BPS
              2025.
            </p>
          </div>
          {SANITASI_RANGE ? (
            <>
              <dl className="flex flex-col divide-y divide-border border-y border-border">
                <DataRow label="Nilai minimum Jawa Barat">
                  {formatDecimal(SANITASI_RANGE.min)}%
                </DataRow>
                <DataRow label="Nilai maksimum Jawa Barat">
                  {formatDecimal(SANITASI_RANGE.max)}%
                </DataRow>
                <DataRow label="Kota Bandung">
                  {formatDecimal(SANITASI_BANDUNG)}% →{" "}
                  <span className="font-medium text-foreground">
                    {formatDecimal(bandungNormalized)}
                  </span>
                </DataRow>
                <DataRow label="Kota Bekasi">
                  {formatDecimal(SANITASI_BEKASI)}% →{" "}
                  <span className="font-medium text-foreground">
                    {formatDecimal(bekasiNormalized)}
                  </span>
                </DataRow>
              </dl>
            </>
          ) : null}
        </div>
      </MethodSection>

      <MethodSection
        index="05.3"
        label="Jarak"
        title="Weighted Euclidean Distance"
        description="Jarak mengukur seberapa jauh dua profil wilayah, dengan bobot yang bisa diatur per indikator."
      >
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-base font-medium">Rumus jarak</h3>
            <p className="text-sm text-muted-foreground">
              A adalah wilayah acuan, B wilayah pembanding, w bobot indikator
              ke-i.
            </p>
          </div>
          <Formula>
            <div className="overflow-x-auto">
              D(A,B) = √ Σ w_i (A&apos;_i - B&apos;_i)²
            </div>
          </Formula>
          <div className="flex flex-col gap-2 text-xs leading-relaxed text-muted-foreground">
            <p>
              Bobot dinyatakan dalam pecahan. Dengan bobot setara untuk 15
              indikator, setiap w_i bernilai 1/15 atau sekitar 0,0667.
            </p>
            <p>
              Bila sebagian indikator gugur karena data kosong, bobot yang
              tersisa dinormalisasi ulang agar totalnya tetap 1.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-base font-medium">
              Langkah hitung Kota Bandung dan Kota Bekasi
            </h3>
            <p className="text-sm text-muted-foreground">
              Bobot setara 15 indikator, data BPS 2025/2026.
            </p>
          </div>
          <dl className="flex flex-col divide-y divide-border border-y border-border">
            <DataRow label="Kontribusi sanitasi">
              {formatDecimal(sanitasiContribution)}
            </DataRow>
            <DataRow label="Jumlah seluruh kontribusi">
              {BANDUNG_BEKASI
                ? formatDecimal(
                    BANDUNG_BEKASI.contributions.reduce(
                      (sum, item) => sum + item.weighted_difference,
                      0
                    )
                  )
                : "-"}
            </DataRow>
            <DataRow label="Akar jumlah (jarak D)">
              {BANDUNG_BEKASI
                ? formatDecimal(
                    Math.sqrt(
                      BANDUNG_BEKASI.contributions.reduce(
                        (sum, item) => sum + item.weighted_difference,
                        0
                      )
                    )
                  )
                : "-"}
            </DataRow>
            <DataRow label="Skor akhir">
              <span className="font-medium text-foreground">
                {BANDUNG_BEKASI
                  ? formatScore(BANDUNG_BEKASI.similarity_score)
                  : "-"}
              </span>
            </DataRow>
          </dl>
        </div>
      </MethodSection>

      <MethodSection
        index="05.4"
        label="Skor"
        title="Konversi ke skor 0 sampai 100"
        description="Skor adalah kebalikan jarak: makin dekat profil statistiknya, makin tinggi nilainya."
      >
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-base font-medium">Rumus skor</h3>
            <p className="text-sm text-muted-foreground">
              D max adalah jarak teoretis maksimum untuk bobot yang dipakai.
            </p>
          </div>
          <Formula>
            <div className="overflow-x-auto">
              Similarity = 100 × (1 - min(1, D / D_max))
            </div>
            <div className="mt-2 overflow-x-auto border-t border-border/50 pt-2 text-muted-foreground">
              D_max = √ Σ w_i
            </div>
          </Formula>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Dengan 15 indikator berbobot setara, D max sama dengan 1. Jarak
            0,2645 menghasilkan skor 73,55.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-base font-medium">Arti skor</h3>
            <p className="text-sm text-muted-foreground">
              Label ini hanya untuk membantu membaca, bukan ambang resmi
              statistik.
            </p>
          </div>
          <dl className="flex flex-col divide-y divide-border border-y border-border">
            {SCORE_BANDS.map((item) => (
              <DataRow key={item.label} label={item.label}>
                {item.range}
              </DataRow>
            ))}
          </dl>
        </div>
      </MethodSection>

      <MethodSection
        index="05.5"
        label="Kontribusi"
        title="Kontribusi dan penanganan data kosong"
        description="Skor dapat diuraikan per indikator, dan aturan data kosong dibuat sepenuhnya transparan."
      >
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-base font-medium">
              Kontribusi per indikator
            </h3>
            <p className="text-sm text-muted-foreground">
              Semakin besar nilainya, semakin besar pengaruh indikator itu
              terhadap jarak.
            </p>
          </div>
          <Formula>
            <div className="overflow-x-auto">
              C_i = w_i (A&apos;_i - B&apos;_i)²
            </div>
          </Formula>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Porsi kontribusi dihitung dengan membagi C_i dengan jumlah seluruh
            C_i. Porsi inilah yang ditampilkan pada grafik kontribusi perbedaan.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-base font-medium">
              Penanganan data kosong
            </h3>
            <p className="text-sm text-muted-foreground">
              Dataset saat ini lengkap 405 dari 405 nilai, tetapi aturan ini
              tetap berlaku untuk pembaruan berikutnya.
            </p>
          </div>
          <ul className="flex flex-col divide-y divide-border border-y border-border text-xs text-muted-foreground">
            {[
              "Nilai kosong tidak pernah dianggap nol.",
              "Indikator yang tidak tersedia di salah satu wilayah dikeluarkan dari pasangan tersebut.",
              "Bobot indikator yang tersisa dinormalisasi ulang.",
              "Jumlah indikator yang berhasil dibandingkan selalu ditampilkan.",
              "Pasangan tanpa indikator yang bisa dibandingkan tidak diberi skor.",
            ].map((item) => (
              <li key={item} className="py-2.5 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </MethodSection>

      <section className="flex flex-col gap-6 border-t border-border pt-8">
        <div className="flex flex-col gap-2">
          <SectionLabel index="05.6">Indikator</SectionLabel>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            15 indikator dan arahnya
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Arah normal berarti nilai lebih besar dianggap lebih tinggi. Arah
            reverse dibalik sebelum perhitungan.
          </p>
        </div>

        <div className="overflow-x-auto border-t border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Kategori</TableHead>
                <TableHead>Indikator & Definisi</TableHead>
                <TableHead className="hidden w-24 sm:table-cell">
                  Satuan
                </TableHead>
                <TableHead className="w-24 text-right">Arah</TableHead>
                <TableHead className="hidden w-48 text-right md:table-cell">
                  Rujukan BPS & Periode
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INDICATOR_CATEGORIES.map((category) => {
                const indicators = INDICATORS.filter(
                  (indicator) => indicator.category === category
                )
                return indicators.map((indicator, index) => (
                  <TableRow
                    key={indicator.code}
                    className={
                      index === 0 ? "border-t-2 border-border" : undefined
                    }
                  >
                    {index === 0 ? (
                      <TableCell
                        rowSpan={indicators.length}
                        className="border-r border-border/50 align-top text-xs font-medium tracking-wider text-foreground uppercase"
                      >
                        {category}
                      </TableCell>
                    ) : null}
                    <TableCell className="whitespace-normal">
                      <span className="font-medium text-foreground">
                        {indicator.name}
                      </span>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {indicator.description}
                      </p>
                    </TableCell>
                    <TableCell className="hidden tabular-nums sm:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {formatUnitLabel(indicator.unit)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          indicator.direction === "reverse"
                            ? "text-xs font-semibold text-foreground"
                            : "text-xs text-muted-foreground"
                        }
                      >
                        {indicator.direction === "reverse"
                          ? "Reverse"
                          : "Normal"}
                      </span>
                    </TableCell>
                    <TableCell className="hidden text-right tabular-nums md:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {indicator.bps_table} · {indicator.period}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="flex flex-col gap-6 border-t border-border pt-8">
        <div className="flex flex-col gap-2">
          <SectionLabel index="05.7">Batasan</SectionLabel>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Yang tidak bisa disimpulkan dari skor
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Skor kemiripan adalah instrumen statistik perbandingan, bukan
            penilaian kinerja atau keunggulan daerah.
          </p>
        </div>
        <ol className="grid border-t border-border sm:grid-cols-2">
          {LIMITS.map((item, index) => (
            <li
              key={item}
              className="flex gap-4 border-b border-border py-4 sm:odd:pe-8 sm:even:border-s sm:even:border-border sm:even:ps-8"
            >
              <span className="text-xs text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  )
}
