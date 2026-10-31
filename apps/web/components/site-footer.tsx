import Link from "next/link"

import { Container } from "@/components/layout-primitives"
import { BrandSymbol } from "@/components/brand-symbol"

const FOOTER_LINKS = [
  { href: "/daerah-kembar", label: "Mulai analisis wilayah" },
  { href: "/metodologi", label: "Baca metodologi" },
  { href: "/sumber-data", label: "Lihat sumber data" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="grid gap-8 py-10 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:gap-12">
        <div className="flex max-w-md flex-col gap-3">
          <p className="flex items-center gap-2 font-heading text-sm font-semibold tracking-tight">
            <BrandSymbol className="size-6 text-foreground" />
            <span>Daerah Kita</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Alat baca data kemiripan karakteristik wilayah. Seluruh angka
            berasal dari publikasi BPS Provinsi Jawa Barat dan instansi terkait,
            data 2025/2026.
          </p>
        </div>
        <nav
          aria-label="Navigasi footer"
          className="flex flex-col items-start md:items-end"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline md:min-h-8"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
