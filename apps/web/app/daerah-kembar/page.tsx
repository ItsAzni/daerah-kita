import type { Metadata } from "next"

import { RegionPicker } from "@/components/daerah-kembar/region-picker"

export const metadata: Metadata = {
  title: "Pilih Wilayah Acuan",
  description:
    "Pilih satu kabupaten atau kota di Jawa Barat untuk melihat wilayah dengan karakteristik paling mirip.",
}

export default function DaerahKembarPage() {
  return <RegionPicker />
}
