import type { Metadata } from "next"

import { Container } from "@/components/layout-primitives"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Memuat wilayah",
}

export default function Loading() {
  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-12">
      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-56" />
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
        <Skeleton className="h-[360px] w-full" />
      </div>
    </Container>
  )
}
