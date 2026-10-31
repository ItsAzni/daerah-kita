"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { REGIONS } from "@/data/regions"
import {
  REGION_COMPLETENESS,
  completenessLabel,
  regionTypeLabel,
} from "@/lib/region-completeness"
import { cn } from "@/lib/utils"

/**
 * Satu-satunya dialog pencarian wilayah. Semua halaman memakai komponen ini
 * supaya daftar, urutan, dan keterangannya identik.
 */
export function RegionSearch({
  triggerLabel = "Cari wilayah",
  triggerVariant = "outline",
  triggerSize = "default",
  triggerClassName,
  onSelect,
}: {
  triggerLabel?: string
  triggerVariant?: React.ComponentProps<typeof Button>["variant"]
  triggerSize?: React.ComponentProps<typeof Button>["size"]
  triggerClassName?: string
  onSelect?: (code: string) => void
}) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  function select(code: string) {
    setOpen(false)
    if (onSelect) {
      onSelect(code)
      return
    }
    router.push(`/daerah-kembar/${code}`)
  }

  return (
    <>
      <Button
        variant={triggerVariant}
        size={triggerSize}
        className={cn(
          "justify-start",
          triggerClassName ?? "min-h-11 md:min-h-9"
        )}
        onClick={() => setOpen(true)}
      >
        <Search data-icon="inline-start" />
        {triggerLabel}
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Cari wilayah"
        description="Ketik nama kabupaten atau kota di Jawa Barat."
        className="sm:max-w-lg"
      >
        <Command>
          <CommandInput placeholder="Cari kabupaten atau kota" />
          <CommandList>
            <CommandEmpty>Wilayah tidak ditemukan.</CommandEmpty>
            <CommandGroup heading="27 kabupaten/kota Jawa Barat">
              {REGIONS.map((region) => {
                const completeness = REGION_COMPLETENESS[region.code]
                return (
                  <CommandItem
                    key={region.code}
                    value={`${region.name} ${region.code}`}
                    onSelect={() => select(region.code)}
                  >
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span>{region.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {regionTypeLabel(region.type)} · kode {region.code}
                      </span>
                    </span>
                    {completeness ? (
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {completeness.available}/{completeness.total}{" "}
                        {completenessLabel(completeness.level).toLowerCase()}
                      </span>
                    ) : null}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
