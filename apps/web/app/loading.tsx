import { Container } from "@/components/layout-primitives"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <Container className="flex flex-col gap-10 py-10 sm:py-12">
      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-10 w-full max-w-lg" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-[360px] w-full" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </Container>
  )
}
