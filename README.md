# Daerah Kita

Platform analitik publik untuk menemukan, mengukur, dan membandingkan kemiripan karakteristik wilayah di Indonesia berdasarkan data statistik resmi (cakupan MVP: 27 kabupaten/kota di Provinsi Jawa Barat).

Skor kemiripan menunjukkan kedekatan karakteristik statistik, bukan peringkat kualitas pembangunan.

## Fitur

- Peringkat kemiripan: pilih satu wilayah acuan, lihat 26 wilayah lain diurutkan dari skor tertinggi.
- Komparasi dua wilayah: 15 indikator berdampingan beserta selisih dan selisih relatif.
- Bobot indikator: aktifkan atau matikan indikator lalu atur bobotnya; peringkat dihitung ulang langsung.
- Ringkasan temuan: kalimat otomatis yang menyebut kategori terdekat, kategori paling berjarak, dan indikator penyumbang jarak terbesar.
- Ekspor data: unduh perbandingan 15 indikator sebagai CSV (pemisah titik koma, desimal koma untuk Excel Indonesia), atau salin ringkasan sebagai teks.
- Sumber tiap angka: nama publikasi, tabel BPS, dan periode tercatat pada tabel indikator dan halaman Sumber Data.

## Struktur Repositori

Monorepo ini dikelola menggunakan Turborepo dan Bun:

- `apps/web`: Aplikasi Next.js App Router (React 19, Tailwind CSS v4, shadcn, mapcn).
- `apps/api`: Service backend Hono untuk pengembangan fase lanjutan.
- `packages/shared`: Definisi tipe data bersama antar-aplikasi.
- `packages/validation`: Skema validasi Zod untuk data dan konfigurasi analisis.
- `packages/eslint-config`: Konfigurasi ESLint bersama.
- `packages/typescript-config`: Konfigurasi TypeScript bersama.
- `data/csv`: Dataset numerik indikator resmi BPS Jawa Barat 2025/2026 dan katalog sumber data.
- `data/geojson`: Batas spasial administrasi kabupaten/kota Jawa Barat (Open Data Jabar).
- `scripts`: Skrip utilitas, termasuk generator data web (`generate_web_data.py`).

## Menjalankan Proyek

Pastikan Bun sudah terpasang.

### Instalasi Dependensi

```sh
bun install
```

### Mode Pengembangan

```sh
bun run dev
```

Aplikasi web dapat diakses di `http://localhost:3000`.

### Membangun untuk Produksi

```sh
bun run build
```

### Pemeriksaan Tipe dan Linter

```sh
bun run check-types
bun run lint
```

## Sumber Data

Seluruh angka berasal dari publikasi resmi:
1. Badan Pusat Statistik Provinsi Jawa Barat (Provinsi Jawa Barat Dalam Angka 2026).
2. Dinas Kesehatan Provinsi Jawa Barat (Profil Kesehatan Jawa Barat / Kompilasi BPS 2026).
3. Open Data Jawa Barat (Dataset Spasial dan Sektoral).
