---
name: Daerah Kita
kind: public data analysis platform
dial: ENERGY 2 / RHYTHM 2 / MOTION 1
---

# Arah Visual Daerah Kita

## Identitas

Daerah Kita adalah alat baca data, bukan kampanye pemasaran. Halaman harus terasa seperti
lembar analisis yang disusun rapi: satu pertanyaan per layar, satu angka utama, sisanya
mendukung. Peta adalah instrumen kerja, bukan wallpaper.

Kepribadian: tenang, presisi, editorial. Bukan institusional kaku, bukan startup playful.

## Palet

Token warna shadcn di `apps/web/app/globals.css` dipakai apa adanya dan tidak diubah.
Tidak ada warna baru yang ditambahkan ke file itu.

- Latar, teks, border, dan permukaan memakai token semantik: `bg-background`,
  `text-foreground`, `text-muted-foreground`, `border-border`, `bg-muted`, `bg-card`.
- Aksen tunggal adalah `primary` (tinta gelap di mode terang, tinta terang di mode gelap).
  Aksen dipakai untuk satu tindakan utama per layar dan untuk nilai terpilih.
- Warna data hanya muncul di dalam peta dan chart. Skala choropleth memakai ramp netral
  hangat (batu) dari `#e7e5e4` ke `#1c1917` di mode terang, dibalik di mode gelap.
  Chart memakai `var(--foreground)` dan `var(--muted-foreground)` supaya kontras aman
  di kedua tema.
- Tidak ada gradient dekoratif, glow, atau glassmorphism.

## Tipografi

Plus Jakarta Sans untuk seluruh teks. Alasan: huruf latin buatan Indonesia (Tokotype),
tegas di ukuran besar, dan tetap nyaman untuk tabel angka.

- Judul halaman: 32 sampai 56 px, tracking rapat (`tracking-tight`), berat 600.
- Angka besar (skor): `tabular-nums`, berat 600, ukuran 48 sampai 72 px.
- Label kecil memakai huruf normal, bukan uppercase dengan tracking lebar.
- Tabel memakai `tabular-nums` agar digit sejajar.

## Layout

- Grid editorial asimetris: kolom teks lebih sempit dari kolom data.
- Garis rambut (`border-border`) memisahkan blok, bukan kartu mengambang di mana-mana.
- Nomor bagian ditulis sebagai penanda editorial: `01 / Cakupan`, `02 / Kemampuan`.
  Ini motif identitas yang berulang dari beranda sampai halaman informasi.
- Whitespace dipakai untuk memisahkan kelompok informasi, bukan sisa ruang.
- Setiap layar punya satu fokus: peta di beranda, tabel peringkat di halaman ranking,
  skor besar di halaman detail.

## Gerak

MOTION 1: hanya transisi hover, fokus, dan buka-tutup komponen. Tidak ada animasi masuk,
parallax, atau angka yang menghitung naik. Peta boleh bergerak saat pengguna menggeser.

## Larangan lokal

- Jangan mengubah token, radius, atau warna di `apps/web/app/globals.css`.
- Jangan memakai `className` untuk menimpa warna atau tipografi komponen shadcn.
  `className` hanya untuk layout.
- Jangan menambah section yang tidak punya klaim data.
- Jangan menampilkan angka tanpa sumber dan tahun.
