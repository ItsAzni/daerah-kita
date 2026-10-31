import { Container } from "@/components/layout-primitives"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-12">
      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
      <div className="grid gap-10 lg:grid-cols-2">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </Container>
  )
}
