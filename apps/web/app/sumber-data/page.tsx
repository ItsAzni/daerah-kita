import Link from "next/link"
import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"

import {
  Container,
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
import { DATA_SOURCES } from "@/data/sources"
import { INDICATORS } from "@/data/indicators"
import { formatDate } from "@/lib/format"

export const metadata: Metadata = {
  title: "Sumber Data",
  description:
    "Katalog instansi penerbit, publikasi, dan indikator yang dipakai Daerah Kita.",
}

export default function SumberDataPage() {
  return (
    <Container className="flex flex-col gap-12 py-10 sm:py-12">
      <PageHeader
        index="06"
        label="Sumber data"
        title="Setiap angka punya asal"
        description="Tiga instansi penerbit, satu publikasi utama, dan 15 indikator. Tabel berikut mencatat apa yang dipakai, dari mana, dan kapan diakses."
        actions={
          <Button
            variant="outline"
            className="min-h-11 md:min-h-9"
            render={<Link href="/metodologi" />}
            nativeButton={false}
          >
            Baca metodologi
          </Button>
        }
      />

      <section className="flex flex-col gap-4">
        <SectionLabel index="6.1">Katalog</SectionLabel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Penerbit dan publikasi</TableHead>
              <TableHead className="hidden md:table-cell">Cakupan</TableHead>
              <TableHead className="hidden text-right sm:table-cell">
                Terbit
              </TableHead>
              <TableHead className="text-right">Diakses</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_SOURCES.map((source) => (
              <TableRow key={source.id}>
                <TableCell className="whitespace-normal">
                  <Link
                    className="font-medium underline-offset-4 hover:underline"
                    href={`/sumber-data/${source.id}`}
                  >
                    {source.name}
                  </Link>
                  <p className="mt-0.5 max-w-md text-xs text-muted-foreground">
                    {source.publication_title}
                  </p>
                </TableCell>
                <TableCell className="hidden tabular-nums md:table-cell">
                  <span className="text-muted-foreground">
                    {source.indicators_covered.length} indikator
                  </span>
                </TableCell>
                <TableCell className="hidden text-right tabular-nums sm:table-cell">
                  <span className="text-muted-foreground">
                    {formatDate(source.publication_date)}
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatDate(source.accessed_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-xs text-muted-foreground">
          Setiap penerbit membuka halaman detail berisi deskripsi publikasi,
          alamat sumber, dan daftar indikator yang diambil.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel index="6.2">Pemetaan indikator</SectionLabel>
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Indikator dan rujukan tabelnya
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Nama tabel mengikuti penomoran di publikasi asal. Arah reverse
            berarti nilai lebih kecil dibaca sebagai kondisi lebih baik.
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indikator</TableHead>
              <TableHead className="hidden md:table-cell">Kategori</TableHead>
              <TableHead className="hidden sm:table-cell">Satuan</TableHead>
              <TableHead className="text-right">Periode</TableHead>
              <TableHead className="hidden text-right md:table-cell">
                Rujukan
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INDICATORS.map((indicator) => (
              <TableRow key={indicator.code}>
                <TableCell className="whitespace-normal">
                  <span className="font-medium">{indicator.name}</span>
                  <p className="text-xs text-muted-foreground">
                    {indicator.source_name}
                  </p>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-muted-foreground">
                    {indicator.category}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-muted-foreground">
                    {indicator.unit}
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {indicator.period}
                </TableCell>
                <TableCell className="hidden text-right md:table-cell">
                  <span className="text-xs text-muted-foreground">
                    {indicator.bps_table}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-xs text-muted-foreground">
          Semua nilai tersedia lengkap untuk 27 kabupaten/kota: 405 dari 405 sel
          terisi.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel index="6.3">Akses</SectionLabel>
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Tautan ke penerbit asli
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Dataset disalin apa adanya dari publikasi resmi. Untuk keperluan
            kutipan, gunakan tautan dan tanggal akses berikut.
          </p>
        </div>
        <ul className="flex flex-col border-t border-border">
          {DATA_SOURCES.map((source) => (
            <li
              key={source.id}
              className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{source.publisher}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  Diakses {formatDate(source.accessed_at)}
                </span>
              </div>
              <a
                className="inline-flex min-h-11 items-center gap-1.5 text-sm underline-offset-4 hover:underline sm:min-h-0"
                href={source.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {source.url.replace(/^https?:\/\//, "")}
                <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
