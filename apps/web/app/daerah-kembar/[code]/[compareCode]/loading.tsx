import { Container } from "@/components/layout-primitives"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <Container className="flex flex-col gap-10 py-10 sm:py-12">
      <div className="flex flex-col gap-3 border-b border-border pb-8">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-[420px] w-full" />
    </Container>
  )
}
