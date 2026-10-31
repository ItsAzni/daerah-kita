import Link from "next/link"
import { Container } from "@/components/layout-primitives"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <Container className="py-16">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Halaman atau wilayah tidak ditemukan</EmptyTitle>
          <EmptyDescription>
            Alamat yang kamu buka tidak cocok dengan wilayah mana pun di dataset
            Jawa Barat. Periksa kembali kode wilayah, atau mulai dari daftar 27
            kabupaten/kota.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              render={<Link href="/daerah-kembar" />}
              nativeButton={false}
            >
              Pilih wilayah
            </Button>
            <Button
              variant="outline"
              render={<Link href="/" />}
              nativeButton={false}
            >
              Kembali ke beranda
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </Container>
  )
}
