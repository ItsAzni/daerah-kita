// Dibangkitkan dari data/csv dan data/geojson oleh scripts/generate_web_data.py.
// Jangan diedit manual; ubah sumber CSV lalu jalankan ulang script.

import type { DataSource } from "@daerah-kita/shared"

/** Katalog instansi penerbit data yang dipakai platform. */
export const DATA_SOURCES: DataSource[] = [
  {
    id: "bps-jabar",
    name: "Badan Pusat Statistik Provinsi Jawa Barat",
    publisher: "BPS Provinsi Jawa Barat",
    url: "https://jabar.bps.go.id",
    description:
      "Publikasi resmi Provinsi Jawa Barat Dalam Angka 2026 yang menyajikan data demografi, sosial, ekonomi, ketenagakerjaan, pendidikan, kesehatan, dan perumahan.",
    publication_title: "Provinsi Jawa Barat Dalam Angka 2026",
    publication_date: "2026-02-27",
    accessed_at: "2026-10-30",
    indicators_covered: [
      "jumlah_penduduk",
      "kepadatan_penduduk",
      "rasio_jenis_kelamin",
      "pengeluaran_per_kapita",
      "tingkat_pengangguran",
      "tingkat_kemiskinan",
      "ipm",
      "harapan_lama_sekolah",
      "rata_rata_lama_sekolah",
      "angka_harapan_hidup",
      "akses_air_bersih",
      "akses_sanitasi",
      "rasio_elektrifikasi",
    ],
  },
  {
    id: "dinkes-jabar",
    name: "Dinas Kesehatan Provinsi Jawa Barat",
    publisher: "Dinas Kesehatan Provinsi Jawa Barat / BPS",
    url: "https://diskes.jabarprov.go.id",
    description:
      "Data rekapitulasi fasilitas pelayanan kesehatan (Puskesmas) dan tenaga medis/kesehatan menurut kabupaten/kota di Jawa Barat.",
    publication_title: "Profil Kesehatan Jawa Barat / Kompilasi BPS 2026",
    publication_date: "2026-02-27",
    accessed_at: "2026-10-30",
    indicators_covered: ["jumlah_puskesmas", "tenaga_medis"],
  },
  {
    id: "opendata-jabar",
    name: "Open Data Jawa Barat (Satu Data Jabar)",
    publisher: "Diskominfo Provinsi Jawa Barat",
    url: "https://opendata.jabarprov.go.id",
    description:
      "Portal Satu Data Jawa Barat yang menyediakan data terbuka pemerintah daerah, batas administrasi geospasial, dan indikator sektoral.",
    publication_title: "Dataset Spasial dan Sektoral Jawa Barat",
    publication_date: "2026-01-15",
    accessed_at: "2026-10-30",
    indicators_covered: ["batas_administrasi_wilayah"],
  },
]

export function getSource(id: string): DataSource | undefined {
  return DATA_SOURCES.find((source) => source.id === id)
}
