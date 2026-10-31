"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun } from "lucide-react"

import { BrandSymbol } from "@/components/brand-symbol"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/daerah-kembar", label: "Daerah Kembar" },
  { href: "/komparasi", label: "Komparasi" },
  { href: "/metodologi", label: "Metodologi" },
  { href: "/sumber-data", label: "Sumber Data" },
] as const

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // Tema hanya diketahui di klien; snapshot server false agar markup cocok.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-11 md:size-9"
      aria-label={isDark ? "Gunakan tema terang" : "Gunakan tema gelap"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 font-heading text-base font-semibold tracking-tight md:min-h-0"
        >
          <BrandSymbol className="size-8 text-foreground" />
          Daerah Kita
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-16 items-center px-3 text-sm transition-colors",
                  active
                    ? "text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-11 md:hidden"
                  aria-label="Buka menu navigasi"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigasi</SheetTitle>
                <SheetDescription>
                  Pilih halaman yang ingin dibuka.
                </SheetDescription>
              </SheetHeader>
              <nav
                aria-label="Navigasi seluler"
                className="flex flex-col px-6 pb-6"
              >
                {NAV_ITEMS.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-11 items-center border-b border-border text-sm",
                        active
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
