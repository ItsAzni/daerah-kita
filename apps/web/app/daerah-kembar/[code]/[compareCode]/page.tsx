import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { DetailView } from "@/components/daerah-kembar/detail-view"
import { REGIONS } from "@/data/regions"

type PageProps = {
  params: Promise<{ code: string; compareCode: string }>
}

// 702 kombinasi terlalu banyak untuk diprerender. Halaman detail dirender
// saat diminta; datanya statis sehingga hasilnya deterministik.

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code, compareCode } = await params
  const regionA = REGIONS.find((item) => item.code === code)
  const regionB = REGIONS.find((item) => item.code === compareCode)
  if (!regionA || !regionB) return { title: "Wilayah tidak ditemukan" }
  return {
    title: `${regionA.name} dan ${regionB.name}`,
    description: `Perbandingan 15 indikator ${regionA.name} dan ${regionB.name} berdasarkan data BPS Jawa Barat 2025/2026.`,
  }
}

export default async function DetailPage({ params }: PageProps) {
  const { code, compareCode } = await params
  const regionA = REGIONS.find((item) => item.code === code)
  const regionB = REGIONS.find((item) => item.code === compareCode)
  if (!regionA || !regionB) notFound()
  // Membandingkan wilayah dengan dirinya sendiri tidak punya arti, jadi
  // diarahkan ke halaman peringkat wilayah tersebut.
  if (regionA.code === regionB.code) redirect(`/daerah-kembar/${regionA.code}`)

  return <DetailView regionA={regionA} regionB={regionB} />
}
