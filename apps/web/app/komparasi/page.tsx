import type { Metadata } from "next"
import { Suspense } from "react"

import { ComparisonView } from "@/components/komparasi/comparison-view"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Komparasi Dua Wilayah",
  description:
    "Bandingkan 15 indikator dua kabupaten atau kota di Jawa Barat berdasarkan data BPS 2025/2026.",
}

export default function KomparasiPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-12 sm:px-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      }
    >
      <ComparisonView />
    </Suspense>
  )
}
