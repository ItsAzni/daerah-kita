import Link from "next/link"

import { Container, SectionLabel } from "@/components/layout-primitives"

const CAPABILITIES = [
  {
    title: "Temukan daerah kembar",
    body: "Pilih satu wilayah acuan, lalu lihat 26 wilayah lain diurutkan dari yang karakteristiknya paling dekat.",
    meta: "26 wilayah · 15 indikator",
    href: "/daerah-kembar",
    action: "Pilih wilayah acuan",
  },
  {
    title: "Bandingkan indikator",
    body: "Lihat nilai tiap indikator berdampingan, lengkap dengan selisih dan kontribusinya terhadap skor.",
    meta: "15 indikator · 5 kategori",
    href: "/komparasi",
    action: "Buka komparasi",
  },
  {
    title: "Sesuaikan bobot",
    body: "Naikkan bobot indikator yang paling relevan dengan pertanyaanmu, lalu peringkat dihitung ulang saat itu juga.",
    meta: "Bobot 0 sampai 100%",
    href: "/daerah-kembar/3273",
    action: "Atur bobot indikator",
  },
]

export function CapabilitiesSection() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="border-b border-border"
    >
      <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-4">
          <SectionLabel index="01">Yang bisa dilakukan</SectionLabel>
          <h2
            id="capabilities-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            Tiga cara membaca karakteristik wilayah
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Setiap tampilan berangkat dari 15 indikator resmi yang sama. Yang
            berubah hanya cara kamu membaca dan membobotnya.
          </p>
        </div>

        <ol className="flex flex-col border-t border-border">
          {CAPABILITIES.map((item, index) => (
            <li
              key={item.title}
              className="grid gap-3 border-b border-border py-6 sm:grid-cols-[2rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
            >
              <span className="text-xs text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-lg font-medium">
                  {item.title}
                </h3>
                <p className="max-w-lg text-sm text-muted-foreground">
                  {item.body}
                </p>
                <p className="text-xs text-muted-foreground">{item.meta}</p>
              </div>
              <Link
                href={item.href}
                className="flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline sm:min-h-0"
              >
                {item.action}
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
