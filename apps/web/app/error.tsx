"use client"

import Link from "next/link"
import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"

import { Container } from "@/components/layout-primitives"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="flex flex-col gap-6 py-16">
      <Alert variant="destructive">
        <AlertTriangle />
        <AlertTitle>Halaman gagal dimuat</AlertTitle>
        <AlertDescription>
          Ada kesalahan saat merender halaman ini. Data tidak diubah. Coba muat
          ulang, atau kembali ke beranda.
        </AlertDescription>
      </Alert>
      <div className="flex flex-wrap gap-2">
        <Button onClick={reset}>Muat ulang halaman</Button>
        <Button
          variant="outline"
          render={<Link href="/" />}
          nativeButton={false}
        >
          Kembali ke beranda
        </Button>
      </div>
      {error.digest ? (
        <p className="text-xs text-muted-foreground">
          Kode kesalahan: {error.digest}
        </p>
      ) : null}
    </Container>
  )
}
