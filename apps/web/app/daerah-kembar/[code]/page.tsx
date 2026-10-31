import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { RankingView } from "@/components/daerah-kembar/ranking-view"
import { REGIONS } from "@/data/regions"

type PageProps = {
  params: Promise<{ code: string }>
}

export async function generateStaticParams() {
  return REGIONS.map((region) => ({ code: region.code }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params
  const region = REGIONS.find((item) => item.code === code)
  if (!region) return { title: "Wilayah tidak ditemukan" }
  return {
    title: `Daerah Mirip ${region.name}`,
    description: `Peringkat kemiripan ${region.name} terhadap 26 kabupaten/kota lain di Jawa Barat berdasarkan 15 indikator BPS 2025/2026.`,
  }
}

export default async function RankingPage({ params }: PageProps) {
  const { code } = await params
  const region = REGIONS.find((item) => item.code === code)
  if (!region) notFound()

  return <RankingView region={region} />
}
