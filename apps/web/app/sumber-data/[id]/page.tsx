import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"

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
import { DATA_SOURCES, getSource } from "@/data/sources"
import { INDICATORS } from "@/data/indicators"
import { formatDate } from "@/lib/format"

type PageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return DATA_SOURCES.map((source) => ({ id: source.id }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const source = getSource(id)
  if (!source) return { title: "Sumber tidak ditemukan" }
  return {
    title: source.name,
    description: source.description,
  }
}

export default async function SumberDetailPage({ params }: PageProps) {
  const { id } = await params
  const source = getSource(id)
  if (!source) notFound()

  const indicators = INDICATORS.filter((indicator) =>
    source.indicators_covered.includes(indicator.code)
  )

  return (
    <Container className="flex flex-col gap-10 py-10 sm:py-12">
      <PageHeader
        index="06"
        label="Detail sumber"
        title={source.name}
        description={source.description}
        actions={
          <Button
            variant="outline"
            className="min-h-11 md:min-h-9"
            render={<Link href="/sumber-data" />}
            nativeButton={false}
          >
            <ArrowLeft data-icon="inline-start" />
            Katalog sumber
          </Button>
        }
      />

      <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <section aria-labelledby="publication-heading" className="min-w-0">
          <h2
            id="publication-heading"
            className="border-b border-border pb-3 font-heading text-base font-medium"
          >
            Informasi publikasi
          </h2>
          <dl className="flex flex-col divide-y divide-border">
            <DataRow label="Penerbit">{source.publisher}</DataRow>
            <DataRow label="Judul publikasi">
              {source.publication_title}
            </DataRow>
            <DataRow label="Tanggal terbit">
              {formatDate(source.publication_date)}
            </DataRow>
            <DataRow label="Terakhir diakses">
              {formatDate(source.accessed_at)}
            </DataRow>
            <DataRow label="Indikator">{indicators.length}</DataRow>
          </dl>
          <a
            className="mt-4 inline-flex min-h-11 min-w-0 items-center gap-1.5 text-sm underline underline-offset-4 md:min-h-0"
            href={source.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="truncate">{source.url}</span>
            <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
          </a>
        </section>

        <section aria-labelledby="indicators-heading" className="min-w-0">
          <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
            <h2
              id="indicators-heading"
              className="font-heading text-base font-medium"
            >
              Indikator yang diambil
            </h2>
            <span className="text-xs text-muted-foreground tabular-nums">
              {indicators.length} indikator
            </span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indikator</TableHead>
                <TableHead className="hidden sm:table-cell">Satuan</TableHead>
                <TableHead className="text-right">Periode</TableHead>
                <TableHead className="hidden text-right md:table-cell">
                  Rujukan
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indicators.map((indicator) => (
                <TableRow key={indicator.code}>
                  <TableCell className="whitespace-normal">
                    <span className="font-medium">{indicator.name}</span>
                    <p className="text-xs text-muted-foreground">
                      {indicator.category}
                    </p>
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
        </section>
      </div>

      <section className="flex flex-col gap-2">
        <SectionLabel index="6.4">Catatan</SectionLabel>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Nilai indikator disalin tanpa pembulatan tambahan. Bila publikasi
          memperbarui angka, dataset perlu dibuat ulang agar tabel dan skor di
          seluruh halaman ikut berubah.
        </p>
      </section>
    </Container>
  )
}
