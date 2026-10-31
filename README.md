# Daerah Kita

Platform analitik publik untuk menemukan, mengukur, dan membandingkan kemiripan karakteristik wilayah di Indonesia berdasarkan data statistik resmi (cakupan MVP: 27 kabupaten/kota di Provinsi Jawa Barat).

Skor kemiripan menunjukkan kedekatan karakteristik statistik, bukan peringkat kualitas pembangunan.

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
