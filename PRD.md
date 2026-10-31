# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# DAERAH KITA: DAERAH KEMBAR

**Nama Produk:** DAERAH KITA  
**Modul Utama:** Daerah Kembar  
**Deskripsi:** Platform analitik publik untuk menemukan, mengukur, dan membandingkan kemiripan karakteristik antarwilayah di Indonesia berdasarkan indikator sosial, ekonomi, pendidikan, kesehatan, dan pembangunan daerah.  
**Versi:** 3.1  
**Status:** Approved untuk Implementasi  
**Tanggal:** 30 Oktober 2026  
**Subtema WIA:** Data-Driven Decision Support  
**Cakupan MVP:** 27 Kabupaten/Kota di Provinsi Jawa Barat

---

# Ringkasan Eksekutif

## 1. Gambaran Produk

DAERAH KITA adalah platform analitik yang membantu masyarakat, peneliti, mahasiswa, dan pengambil kebijakan menemukan daerah lain yang memiliki karakteristik serupa dengan suatu daerah tertentu.

Selama ini, perbandingan pembangunan antarwilayah sering dilakukan berdasarkan kedekatan geografis, popularitas daerah, atau pemilihan wilayah secara subjektif. Padahal, daerah yang berdekatan belum tentu memiliki karakteristik sosial-ekonomi yang sama.

Sebaliknya, dua daerah yang lokasinya berjauhan bisa saja memiliki kondisi yang sangat mirip, misalnya dari sisi jumlah penduduk, tingkat kemiskinan, kualitas pendidikan, kondisi ekonomi, dan fasilitas kesehatan.

DAERAH KITA menghadirkan pendekatan berbasis data untuk menemukan daerah-daerah tersebut melalui metode pengukuran kemiripan yang transparan dan dapat dijelaskan.

Pengguna cukup memilih satu daerah. Sistem akan menganalisis karakteristik daerah tersebut, menghitung tingkat kemiripannya dengan daerah lain, kemudian menampilkan daftar daerah pembanding berdasarkan skor kemiripan tertinggi.

## 2. Masalah yang Ingin Diselesaikan

1. **Tidak adanya pembanding yang objektif.** Masyarakat dan pemerintah daerah kesulitan menemukan daerah pembanding yang memiliki karakteristik serupa.
2. **Data pembangunan tersebar.** Indikator sosial, ekonomi, pendidikan, dan kesehatan tersedia dari berbagai sumber dan format.
3. **Perbandingan masih dilakukan secara manual.** Pengguna harus mengumpulkan dan membandingkan data dari banyak dokumen.
4. **Sulit memahami kesenjangan antarwilayah.** Data statistik biasanya hanya menampilkan angka tanpa memberikan konteks perbandingan dengan daerah yang memiliki karakteristik serupa.
5. **Tidak transparannya metode perbandingan.** Pengguna sering tidak mengetahui alasan suatu daerah dianggap cocok sebagai pembanding.

## 3. Solusi yang Ditawarkan

DAERAH KITA menyediakan satu sistem analisis kemiripan daerah dengan kemampuan:

- Menemukan daerah yang memiliki karakteristik paling mirip.
- Menghitung skor kemiripan berdasarkan indikator terukur.
- Menampilkan peringkat daerah berdasarkan tingkat kemiripan.
- Membandingkan dua daerah secara langsung.
- Menjelaskan kontribusi setiap indikator terhadap skor kemiripan.
- Menampilkan kesenjangan dan perbedaan karakteristik antarwilayah.
- Menyediakan sumber dan tahun data untuk setiap indikator.
- Memungkinkan pengguna menyesuaikan bobot indikator untuk kebutuhan analisis.

## 4. Unique Value Proposition

**"Temukan daerah yang paling mirip dengan daerahmu, pahami perbedaannya, dan jadikan data sebagai dasar pengambilan keputusan."**

Keunggulan utama produk:

1. **Similarity-based comparison:** Daerah dipilih berdasarkan karakteristik statistik, bukan sekadar lokasi geografis.
2. **Explainable similarity:** Setiap skor kemiripan dapat ditelusuri berdasarkan indikator yang digunakan.
3. **Transparent methodology:** Metode perhitungan, normalisasi, dan bobot indikator ditampilkan secara terbuka.
4. **Data provenance:** Setiap angka memiliki sumber, tahun, dan informasi pembaruan.
5. **Custom analysis:** Pengguna dapat mengubah bobot indikator untuk melihat bagaimana hasil peringkat berubah.

---

# 1. Product Vision, Goals & Objectives

## 1.1 Visi Produk

Menjadi platform referensi perbandingan karakteristik pembangunan daerah berbasis data yang membantu masyarakat dan pengambil kebijakan memahami posisi suatu wilayah secara objektif.

## 1.2 Misi Produk

- Mengubah data statistik publik menjadi informasi yang mudah dipahami.
- Mempermudah identifikasi daerah pembanding.
- Mendorong pengambilan keputusan berbasis data.
- Meningkatkan transparansi informasi pembangunan daerah.
- Membantu mengidentifikasi kesenjangan pembangunan antarwilayah.

## 1.3 Tujuan Bisnis

| Kode  | Tujuan                                                | Indikator Keberhasilan                                |
| ----- | ----------------------------------------------------- | ----------------------------------------------------- |
| BG-01 | Menyediakan sistem pencarian daerah kembar            | Pengguna berhasil memperoleh daftar daerah pembanding |
| BG-02 | Meningkatkan transparansi data                        | 100% indikator yang ditampilkan memiliki sumber       |
| BG-03 | Menyediakan analisis yang dapat dipertanggungjawabkan | Skor kemiripan dapat dijelaskan                       |
| BG-04 | Mendorong penggunaan data publik                      | Jumlah analisis dan perbandingan yang dilakukan       |

## 1.4 Tujuan Pengguna

| Kode  | Tujuan                                                   |
| ----- | -------------------------------------------------------- |
| UG-01 | Menemukan daerah yang memiliki karakteristik serupa      |
| UG-02 | Mengetahui tingkat kemiripan antarwilayah                |
| UG-03 | Memahami perbedaan indikator pembangunan                 |
| UG-04 | Mengetahui indikator yang paling memengaruhi kemiripan   |
| UG-05 | Menyesuaikan prioritas indikator untuk analisis tertentu |
| UG-06 | Mengakses data beserta sumber aslinya                    |

---

# 2. Target Users & User Personas

## 2.1 Target Pengguna

| Segmen                  | Kebutuhan                                                              |
| ----------------------- | ---------------------------------------------------------------------- |
| Pemerintah daerah       | Menemukan daerah pembanding untuk evaluasi dan perencanaan pembangunan |
| Analis kebijakan        | Melakukan analisis perbandingan antarwilayah                           |
| Mahasiswa dan akademisi | Mengakses data dan melakukan penelitian                                |
| Jurnalis                | Mendapatkan konteks statistik untuk pemberitaan                        |
| Masyarakat umum         | Memahami kondisi daerahnya dibandingkan wilayah lain                   |

## 2.2 User Personas

### Persona 1: Analis Pemerintah Daerah

**Profil:** Pegawai Bappeda atau analis pembangunan daerah.

**Kebutuhan:**

- Menemukan daerah dengan karakteristik serupa.
- Membandingkan indikator pembangunan.
- Mengidentifikasi kesenjangan antarwilayah.
- Menggunakan data pembanding untuk bahan perencanaan.

### Persona 2: Mahasiswa dan Peneliti

**Profil:** Mahasiswa atau peneliti bidang ekonomi, pemerintahan, dan pembangunan.

**Kebutuhan:**

- Mengakses data statistik yang terstruktur.
- Membandingkan karakteristik daerah.
- Memahami metode penghitungan skor.
- Menelusuri sumber data.

### Persona 3: Masyarakat Umum

**Profil:** Masyarakat yang ingin mengetahui kondisi daerahnya.

**Kebutuhan:**

- Memahami posisi daerahnya dibandingkan daerah lain.
- Menemukan daerah yang memiliki kondisi serupa.
- Melihat perbedaan indikator secara sederhana.

---

# 3. Product Scope & MVP Boundaries

## 3.1 In-Scope (MVP)

| Modul             | Deskripsi                                                       |
| ----------------- | --------------------------------------------------------------- |
| Beranda           | Pengenalan produk, pencarian daerah, dan ringkasan cakupan data |
| Pencarian Wilayah | Memilih kabupaten/kota yang akan dianalisis                     |
| Daerah Kembar     | Menghitung dan menampilkan peringkat daerah paling mirip        |
| Detail Kemiripan  | Menjelaskan skor dan kontribusi indikator                       |
| Komparasi Daerah  | Membandingkan dua daerah secara langsung                        |
| Filter Indikator  | Memilih indikator yang digunakan dalam analisis                 |
| Bobot Indikator   | Mengatur tingkat kepentingan setiap indikator                   |
| Visualisasi Data  | Grafik dan tabel perbandingan                                   |
| Metodologi        | Menjelaskan metode perhitungan kemiripan                        |
| Sumber Data       | Menampilkan sumber dan tahun data                               |
| Admin Data        | Mengelola indikator dan mengimpor data statistik                |

## 3.2 Post-MVP

- Cakupan seluruh provinsi di Indonesia.
- Perbandingan lebih dari dua daerah secara bersamaan.
- Ekspor laporan ke PDF, CSV, dan PNG.
- Penyimpanan konfigurasi analisis melalui URL.
- Riwayat analisis pengguna.
- Perbandingan perkembangan daerah lintas tahun.
- Rekomendasi daerah pembanding berdasarkan kategori tertentu.
- API publik untuk akses data dan hasil analisis.

## 3.3 Out of Scope

Fitur berikut tidak akan dibangun dalam produk ini:

- Dashboard Anggaran vs Hasil.
- Analisis APBD dan realisasi anggaran.
- Laporan kerusakan infrastruktur.
- Formulir pengaduan masyarakat.
- Pelacakan status pengaduan.
- Manajemen petugas dinas.
- Disposisi dan penanganan laporan.
- Sistem tiket atau pelaporan publik.
- Chatbot atau asisten AI percakapan.
- Aplikasi mobile native.
- Analisis kausalitas kebijakan.
- Prediksi otomatis kondisi pembangunan masa depan.

---

# 4. Core Feature Requirements

## 4.1 Beranda

**Tujuan:** Memperkenalkan fungsi platform dan mengarahkan pengguna untuk memulai analisis.

Komponen utama:

1. Hero section dengan headline dan deskripsi produk.
2. Search bar untuk mencari kabupaten/kota.
3. Ringkasan cakupan wilayah.
4. Ringkasan kategori indikator yang dianalisis.
5. Preview daerah dengan skor kemiripan tinggi.
6. Penjelasan singkat cara kerja Daerah Kembar.
7. Informasi sumber data dan metodologi.

**Acceptance Criteria:**

- Pengguna dapat mencari wilayah berdasarkan nama.
- Hasil pencarian menampilkan nama dan provinsi.
- Pengguna dapat membuka halaman analisis dari hasil pencarian.
- Tidak ada angka statistik tanpa sumber yang valid.

## 4.2 Pencarian dan Pemilihan Wilayah

Pengguna memilih satu wilayah sebagai wilayah acuan.

Fitur:

- Pencarian berdasarkan nama kabupaten/kota.
- Filter berdasarkan provinsi.
- Informasi status kelengkapan data.
- Informasi tahun data terbaru.
- Penanda wilayah yang belum memiliki data cukup.

Alur:

1. Pengguna membuka halaman Daerah Kembar.
2. Pengguna mencari wilayah.
3. Pengguna memilih wilayah.
4. Sistem memvalidasi kelengkapan data.
5. Sistem menjalankan analisis kemiripan.
6. Sistem menampilkan hasil peringkat.

## 4.3 Daerah Kembar: Similarity Ranking

**Ini merupakan fitur inti dan nilai utama produk.**

Sistem menghitung tingkat kemiripan satu wilayah dengan seluruh wilayah pembanding yang tersedia.

Contoh:

Pengguna memilih Kota Bandung.

Sistem akan menganalisis karakteristik Kota Bandung dan membandingkannya dengan 26 kabupaten/kota lain di Jawa Barat.

Hasilnya berupa peringkat daerah berdasarkan skor kemiripan.

Komponen halaman:

- Nama wilayah acuan.
- Ringkasan karakteristik wilayah.
- Skor kemiripan.
- Peringkat daerah pembanding.
- Grafik perbandingan.
- Daftar indikator yang digunakan.
- Informasi kelengkapan data.
- Tahun data yang digunakan.

Contoh tampilan hasil:

| Peringkat | Daerah Pembanding | Skor Kemiripan |
| --------- | ----------------- | -------------: |
| 1         | Kota Bekasi       |           93,8 |
| 2         | Kota Depok        |           91,2 |
| 3         | Kota Cimahi       |           86,4 |
| 4         | Kota Bogor        |           85,9 |
| 5         | Kabupaten Bandung |           78,5 |

**Catatan:** Peringkat di atas dihitung menggunakan data resmi BPS Provinsi Jawa Barat (_Provinsi Jawa Barat Dalam Angka 2026_).

Informasi tambahan pada setiap hasil:

- Jumlah indikator yang dibandingkan.
- Indikator dengan kemiripan tertinggi.
- Indikator dengan perbedaan terbesar.
- Sumber dan tahun data.

## 4.4 Detail Kemiripan

Ketika pengguna memilih salah satu daerah dari hasil ranking, sistem menampilkan penjelasan mendalam mengenai alasan kedua wilayah dianggap mirip.

Komponen:

1. Skor kemiripan keseluruhan.
2. Profil wilayah acuan.
3. Profil wilayah pembanding.
4. Perbandingan indikator.
5. Selisih nilai setiap indikator.
6. Kontribusi indikator terhadap skor.
7. Grafik radar atau bar comparison.
8. Sumber data setiap indikator.

Contoh:

| Indikator                        |    Kota Bandung |     Kota Bekasi |        Selisih |
| -------------------------------- | --------------: | --------------: | -------------: |
| Jumlah Penduduk                  |  2.569.100 jiwa |  2.652.950 jiwa |    83.850 jiwa |
| Kepadatan Penduduk               | 15.421 jiwa/km² | 12.453 jiwa/km² | 2.968 jiwa/km² |
| Tingkat Kemiskinan               |           3,78% |           3,96% |          0,18% |
| Tingkat Pengangguran (TPT)       |           7,22% |           7,33% |          0,11% |
| Indeks Pembangunan Manusia (IPM) |           84,66 |           84,43 |           0,23 |
| Pengeluaran Riil per Kapita      |   Rp 19.280.000 |   Rp 17.216.000 |   Rp 2.064.000 |

**Catatan:** Angka bersumber dari data resmi BPS Provinsi Jawa Barat (data tahun 2025/2026).

## 4.5 Komparasi Head-to-Head

Pengguna dapat membandingkan dua wilayah secara langsung.

Fitur:

- Pemilihan wilayah A dan wilayah B.
- Perbandingan seluruh indikator yang tersedia.
- Grafik perbandingan.
- Selisih absolut dan relatif.
- Penanda nilai yang lebih tinggi atau rendah.
- Informasi tahun dan sumber data.

Tujuannya bukan menentukan daerah mana yang lebih baik secara mutlak, melainkan membantu pengguna memahami perbedaan karakteristik kedua wilayah.

## 4.6 Filter dan Bobot Indikator

Pengguna dapat menyesuaikan indikator yang dipakai untuk menentukan kemiripan.

Contoh kategori:

- Demografi.
- Ekonomi.
- Pendidikan.
- Kesehatan.
- Infrastruktur.
- Sosial.

Pengguna dapat:

- Mengaktifkan atau menonaktifkan indikator.
- Mengatur bobot kepentingan indikator.
- Mengembalikan bobot ke pengaturan default.
- Melihat perubahan peringkat secara langsung setelah analisis ulang.

Contoh skenario:

Pengguna ingin mencari daerah yang paling mirip dari aspek ekonomi.

Pengguna dapat meningkatkan bobot indikator ekonomi dan mengurangi bobot kategori lainnya. Sistem kemudian menghitung ulang skor kemiripan.

Bobot harus dinormalisasi agar totalnya bernilai 100%.

## 4.7 Metodologi dan Transparansi

Halaman ini menjelaskan cara sistem menghasilkan skor kemiripan.

Informasi yang ditampilkan:

- Daftar indikator.
- Definisi indikator.
- Satuan pengukuran.
- Sumber data.
- Tahun data.
- Metode normalisasi.
- Bobot indikator.
- Formula skor kemiripan.
- Penanganan data kosong.
- Keterbatasan metode.

Pengguna harus dapat memahami bagaimana suatu daerah memperoleh skor tertentu tanpa harus mempercayai angka yang muncul begitu saja.

## 4.8 Sumber Data

Setiap indikator wajib memiliki informasi:

- Nama indikator.
- Nilai indikator.
- Satuan.
- Tahun atau periode.
- Nama instansi penerbit.
- URL sumber.
- Tanggal pengambilan data.
- Status validasi.

Dataset primer resmi yang digunakan DAERAH KITA telah diekstraksi dan diverifikasi:

| Sumber Data                                | Publikasi / Dataset                                                            | Periode   | Cakupan Data yang Digunakan                                                                                                                                                                                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Badan Pusat Statistik (BPS) Jawa Barat** | _Provinsi Jawa Barat Dalam Angka 2026_ (Terbit 27 Februari 2026)               | 2025–2026 | Demografi (penduduk, kepadatan, rasio jenis kelamin), Ekonomi (pengeluaran per kapita, kemiskinan, pengangguran/TPT), Pendidikan (IPM, HLS, RLS), Kesehatan (AHH), Perumahan & Infrastruktur (air minum layak, sanitasi layak, listrik PLN) |
| **Dinas Kesehatan Provinsi Jawa Barat**    | Rekapitulasi Fasilitas Pelayanan Kesehatan & Tenaga Medis (Kompilasi BPS 2026) | 2025      | Jumlah Puskesmas (rawat inap & non-rawat inap), jumlah tenaga medis/dokter                                                                                                                                                                  |
| **Open Data Jabar / Geoportal**            | Delineasi Batas Administrasi Kabupaten/Kota Jawa Barat                         | 2026      | Batas poligon spasial GeoJSON 27 kabupaten/kota (`data/geojson/jabar_kab_kota.geojson`)                                                                                                                                                     |

Seluruh 15 indikator untuk 27 kabupaten/kota di Jawa Barat (total 405 data point) telah lengkap 100% tanpa nilai kosong (_zero missing data_). File master tersimpan di repositori pada direktori `data/csv/` dan dokumen primer PDF tersimpan di `data/raw/jabar_2026.pdf`.

---

# 5. Similarity Calculation Methodology

## 5.1 Prinsip Perhitungan

Sistem menggunakan pendekatan pengukuran jarak multivariat untuk mengetahui kedekatan karakteristik statistik antarwilayah.

Metode utama MVP:

**Weighted Euclidean Distance dengan normalisasi Min-Max.**

Alasan pemilihan:

- Relatif mudah dijelaskan.
- Mudah diimplementasikan.
- Dapat menggunakan bobot indikator.
- Cocok untuk analisis kemiripan berbasis sejumlah indikator numerik.
- Hasil dapat ditelusuri hingga kontribusi setiap indikator.

## 5.2 Normalisasi Data

Setiap indikator memiliki satuan dan rentang berbeda.

Contoh:

- Jumlah penduduk menggunakan jiwa.
- IPM menggunakan skala indeks.
- Kemiskinan menggunakan persentase.

Sebelum dibandingkan, nilai indikator dinormalisasi menggunakan Min-Max:

\[
X' = \frac{X-X_{\min}}{X_{\max}-X_{\min}}
\]

Untuk indikator yang arahnya perlu dibalik, sistem menggunakan transformasi:

\[
X'_{\text{reverse}} = 1-X'
\]

Normalisasi menggunakan rentang wilayah pembanding dalam dataset analisis yang sama.

Nilai minimum, maksimum, dan versi dataset yang dipakai harus dicatat agar hasil dapat direproduksi.

## 5.3 Perhitungan Jarak

Setelah normalisasi, sistem menghitung jarak antara wilayah acuan dan wilayah pembanding:

\[
D(A,B)=\sqrt{\sum_{i=1}^{n}w_i(A_i'-B_i')^2}
\]

Keterangan:

- \(A\): Wilayah acuan.
- \(B\): Wilayah pembanding.
- \(n\): Jumlah indikator.
- \(w_i\): Bobot indikator ke-i.
- \(A_i'\): Nilai normalisasi wilayah A.
- \(B_i'\): Nilai normalisasi wilayah B.

Total bobot harus bernilai 1.

## 5.4 Konversi Menjadi Skor Kemiripan

Jarak dikonversi menjadi skor kemiripan dalam rentang 0 sampai 100.

\[
Similarity(A,B)=100\times(1-\min(1,D/D_{\max}))
\]

\(D_{\max}\) merupakan batas jarak teoretis berdasarkan jumlah indikator dan bobot yang digunakan.

Skor yang lebih tinggi menunjukkan karakteristik yang lebih dekat berdasarkan indikator dan konfigurasi analisis tersebut.

**Penting:** Skor kemiripan bukan skor kualitas pembangunan, bukan peringkat keberhasilan daerah, dan bukan ukuran bahwa dua wilayah memiliki kondisi identik.

## 5.5 Kontribusi Indikator

Sistem harus dapat menunjukkan indikator mana yang paling berkontribusi terhadap perbedaan kedua daerah.

Kontribusi jarak indikator dihitung dari:

\[
C_i=w_i(A_i'-B_i')^2
\]

Semakin besar nilai kontribusi, semakin besar pengaruh indikator tersebut terhadap jarak kedua wilayah.

Dengan demikian, pengguna tidak hanya melihat skor akhir, tetapi juga memahami penyebab kemiripan atau perbedaannya.

## 5.6 Penanganan Data Kosong

- Indikator tanpa nilai tidak boleh dianggap bernilai nol.
- Indikator yang tidak tersedia pada salah satu wilayah dikeluarkan dari perhitungan pasangan tersebut.
- Bobot indikator yang tersisa dinormalisasi ulang.
- Sistem menampilkan jumlah dan persentase indikator yang berhasil dibandingkan.
- Hasil dengan kelengkapan data rendah harus diberi peringatan.
- Pasangan wilayah dengan data terlalu sedikit tidak boleh memperoleh skor kemiripan publik.

## 5.7 Batasan Metodologi

- Kemiripan statistik tidak membuktikan kesamaan seluruh kondisi daerah.
- Hasil dipengaruhi pilihan indikator, periode data, normalisasi, dan bobot.
- Perbedaan tahun pengukuran dapat memengaruhi hasil.
- Korelasi antarindikator dapat menyebabkan aspek tertentu terhitung berulang.
- Skor tidak membuktikan hubungan sebab-akibat.

---

# 6. Functional Requirements

| ID    | Requirement                                      | Prioritas |
| ----- | ------------------------------------------------ | --------- |
| FR-01 | Pengguna dapat melihat halaman beranda           | P0        |
| FR-02 | Pengguna dapat mencari kabupaten/kota            | P0        |
| FR-03 | Pengguna dapat memilih wilayah acuan             | P0        |
| FR-04 | Sistem dapat menghitung skor kemiripan           | P0        |
| FR-05 | Sistem dapat menampilkan peringkat daerah kembar | P0        |
| FR-06 | Pengguna dapat membuka detail kemiripan          | P0        |
| FR-07 | Sistem menampilkan kontribusi indikator          | P0        |
| FR-08 | Pengguna dapat membandingkan dua wilayah         | P0        |
| FR-09 | Sistem menampilkan grafik perbandingan           | P0        |
| FR-10 | Pengguna dapat melihat sumber data               | P0        |
| FR-11 | Pengguna dapat melihat metodologi                | P0        |
| FR-12 | Pengguna dapat mengatur bobot indikator          | P1        |
| FR-13 | Pengguna dapat memilih indikator                 | P1        |
| FR-14 | Sistem menghitung ulang hasil sesuai konfigurasi | P1        |
| FR-15 | Pengguna dapat mengekspor hasil analisis         | P2        |
| FR-16 | Admin dapat mengimpor dataset                    | P0        |
| FR-17 | Sistem memvalidasi data sebelum dipublikasikan   | P0        |
| FR-18 | Sistem menyimpan riwayat versi dataset           | P1        |

---

# 7. User Journey & User Flow

## 7.1 Alur Utama Pengguna

1. Pengguna membuka DAERAH KITA.
2. Pengguna memilih menu Daerah Kembar.
3. Pengguna mencari wilayah yang ingin dianalisis.
4. Pengguna memilih wilayah acuan.
5. Sistem memeriksa ketersediaan data.
6. Sistem menjalankan algoritma kemiripan.
7. Sistem menampilkan daftar peringkat daerah kembar.
8. Pengguna memilih salah satu daerah.
9. Sistem menampilkan detail perbandingan.
10. Pengguna dapat membuka sumber data dan metodologi.

## 7.2 Alur Analisis Kustom

1. Pengguna membuka hasil Daerah Kembar.
2. Pengguna membuka pengaturan analisis.
3. Pengguna memilih indikator.
4. Pengguna mengatur bobot.
5. Sistem memvalidasi konfigurasi.
6. Sistem menghitung ulang skor.
7. Sistem menampilkan peringkat terbaru.
8. Pengguna dapat membandingkan perubahan hasil.

---

# 8. Information Architecture & UI/UX Guidelines

## 8.1 Sitemap

```text
DAERAH KITA
│
├── Beranda
│
├── Daerah Kembar
│   ├── Pilih Wilayah
│   ├── Hasil Peringkat
│   ├── Detail Kemiripan
│   ├── Komparasi Daerah
│   └── Pengaturan Analisis
│
├── Metodologi
│   ├── Cara Kerja
│   ├── Formula Kemiripan
│   └── Definisi Indikator
│
├── Sumber Data
│   ├── Katalog Dataset
│   └── Detail Dataset
│
└── Admin
    ├── Dashboard Data
    ├── Manajemen Wilayah
    ├── Manajemen Indikator
    ├── Impor Dataset
    ├── Validasi Dataset
    └── Riwayat Dataset
```

## 8.2 Prinsip Desain

- Data-first design.
- Tampilan profesional dan modern.
- Visualisasi mudah dipahami.
- Fokus pada satu informasi utama per halaman.
- Responsif pada desktop, tablet, dan mobile.
- Tidak mengandalkan warna saja untuk menunjukkan perbedaan.
- Menampilkan sumber dan tahun data secara konsisten.
- Menghindari visualisasi yang menyesatkan.

## 8.3 Komponen Visual Utama

- Searchable region selector.
- Similarity score card.
- Ranking table.
- Indicator comparison table.
- Radar chart.
- Horizontal bar chart.
- Difference indicator.
- Dataset completeness indicator.
- Source attribution panel.
- Weight adjustment control.

---

# 9. Data Model & Database Requirements

Database utama menggunakan **NeonDB** (Neon Serverless PostgreSQL).

## 9.1 Tabel Utama

### regions

Menyimpan data wilayah.

| Field         | Type      | Keterangan                                               |
| ------------- | --------- | -------------------------------------------------------- |
| id            | UUID      | Primary key                                              |
| code          | VARCHAR   | Kode wilayah resmi BPS (misal: 3201-3218, 3271-3279)     |
| name          | VARCHAR   | Nama wilayah                                             |
| type          | VARCHAR   | Kabupaten/Kota                                           |
| province_code | VARCHAR   | Kode provinsi                                            |
| province_name | VARCHAR   | Nama provinsi                                            |
| latitude      | NUMERIC   | Koordinat lintang titik pusat wilayah (untuk marker map) |
| longitude     | NUMERIC   | Koordinat bujur titik pusat wilayah (untuk marker map)   |
| created_at    | TIMESTAMP | Waktu dibuat                                             |
| updated_at    | TIMESTAMP | Waktu diperbarui                                         |

### indicators

Menyimpan definisi indikator.

| Field       | Type    | Keterangan          |
| ----------- | ------- | ------------------- |
| id          | UUID    | Primary key         |
| code        | VARCHAR | Kode indikator      |
| name        | VARCHAR | Nama indikator      |
| description | TEXT    | Definisi            |
| category    | VARCHAR | Kategori            |
| unit        | VARCHAR | Satuan              |
| direction   | VARCHAR | normal atau reverse |
| is_active   | BOOLEAN | Status indikator    |

### datasets

Menyimpan versi dataset.

| Field       | Type      | Keterangan           |
| ----------- | --------- | -------------------- |
| id          | UUID      | Primary key          |
| name        | VARCHAR   | Nama dataset         |
| period      | VARCHAR   | Periode data         |
| source_id   | UUID      | Sumber data          |
| version     | INTEGER   | Versi dataset        |
| status      | VARCHAR   | Draft atau published |
| imported_at | TIMESTAMP | Waktu impor          |

### indicator_values

Menyimpan nilai indikator per wilayah.

| Field        | Type    | Keterangan          |
| ------------ | ------- | ------------------- |
| id           | UUID    | Primary key         |
| region_id    | UUID    | Referensi wilayah   |
| indicator_id | UUID    | Referensi indikator |
| dataset_id   | UUID    | Referensi dataset   |
| value        | NUMERIC | Nilai indikator     |
| period       | VARCHAR | Tahun data          |

### data_sources

Menyimpan informasi sumber data.

| Field       | Type      | Keterangan             |
| ----------- | --------- | ---------------------- |
| id          | UUID      | Primary key            |
| name        | VARCHAR   | Instansi atau penerbit |
| url         | TEXT      | URL sumber             |
| description | TEXT      | Keterangan sumber      |
| accessed_at | TIMESTAMP | Waktu pengambilan      |

### analysis_configs

Menyimpan konfigurasi analisis.

| Field      | Type      | Keterangan          |
| ---------- | --------- | ------------------- |
| id         | UUID      | Primary key         |
| name       | VARCHAR   | Nama konfigurasi    |
| config     | JSONB     | Indikator dan bobot |
| created_at | TIMESTAMP | Waktu dibuat        |

### analysis_cache

Menyimpan hasil perhitungan sementara.

| Field           | Type      | Keterangan            |
| --------------- | --------- | --------------------- |
| id              | UUID      | Primary key           |
| region_id       | UUID      | Wilayah acuan         |
| dataset_version | VARCHAR   | Versi dataset         |
| config_hash     | VARCHAR   | Identitas konfigurasi |
| result          | JSONB     | Hasil ranking         |
| calculated_at   | TIMESTAMP | Waktu perhitungan     |

## 9.2 Relasi Data

```text
regions
  │
  └── indicator_values
         ├── indicators
         ├── datasets
         │     └── data_sources
         └── period

analysis_configs
  │
  └── analysis_cache
```

---

# 10. Technical Considerations & Architecture

## 10.1 Baseline Teknologi

Baseline teknis yang digunakan:

| Layer                     | Teknologi                                                         |
| ------------------------- | ----------------------------------------------------------------- |
| Monorepo                  | Turborepo (bun workspaces)                                        |
| Frontend                  | Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + shadcn/ui  |
| Peta Geospasial           | mapcn (`@mapcn/map` berbasis MapLibre GL)                         |
| Backend API               | Hono JS (`@hono/node-server`)                                     |
| Database                  | **NeonDB** (Neon Serverless PostgreSQL)                           |
| ORM                       | Drizzle ORM (`@neondatabase/serverless`)                          |
| Authentication            | Better Auth                                                       |
| Validation                | Zod                                                               |
| Data Primer               | Dataset Resmi BPS Jawa Barat 2026 (`data/csv/` & `data/geojson/`) |
| Runtime & Package Manager | Bun 1.4.4 / Node.js                                               |
| Deployment                | Docker                                                            |

## 10.2 Arsitektur Sistem

```text
                         USER
                          │
                          ▼
              NEXT.JS FRONTEND (APP ROUTER)
              + mapcn (MapLibre) & shadcn/ui
                          │
                          ▼
                      HONO API
                          │
                ┌─────────┼─────────┐
                │         │         │
                ▼         ▼         ▼
             Drizzle   Similarity  Better Auth
                │        Engine         │
                ▼         │            │
             NEONDB ◄─────┘            │
        (Serverless Postgres)           │
                │                      │
                ▼                      ▼
         DATASET BPS 2026          ADMIN USER
```

## 10.3 Struktur Monorepo

```text
apps/
├── web/
│   └── Next.js 16 frontend (App Router, Tailwind v4, shadcn/ui, mapcn)
│
└── api/
    └── Hono JS API server

packages/
├── database/
│   └── Drizzle schema and migrations (NeonDB)
│
├── domain/
│   └── Similarity calculation engine
│
├── validation/
│   └── Zod schemas
│
├── shared/
│   └── Shared types and utilities
│
└── config/
    └── Shared configuration

data/
├── csv/
│   └── Master dataset BPS 2026 (regions, indicators, indicator_values, sources)
├── geojson/
│   └── jabar_kab_kota.geojson (Batas poligon 27 kab/kota Jawa Barat)
└── raw/
    └── jabar_2026.pdf (Publikasi BPS Jawa Barat Dalam Angka 2026)
```

## 10.4 Similarity Engine

Similarity Engine menjadi package domain terpisah agar algoritma tidak tercampur dengan frontend atau API.

Tanggung jawab:

- Mengambil indikator yang relevan.
- Memvalidasi kelengkapan data.
- Melakukan normalisasi.
- Menerapkan bobot.
- Menghitung jarak.
- Menghasilkan skor kemiripan.
- Menghitung kontribusi indikator.
- Mengurutkan hasil.
- Menghasilkan metadata analisis.

Hasil analisis harus dapat direproduksi menggunakan versi dataset dan konfigurasi yang sama.

---

# 11. API Specification

Semua endpoint menggunakan prefix `/api/v1`.

## 11.1 Public API

| Method | Endpoint                        | Fungsi                     |
| ------ | ------------------------------- | -------------------------- |
| GET    | `/regions`                      | Mendapatkan daftar wilayah |
| GET    | `/regions/:id`                  | Detail wilayah             |
| GET    | `/regions/:id/indicators`       | Indikator wilayah          |
| GET    | `/indicators`                   | Daftar indikator           |
| GET    | `/indicators/:id`               | Detail indikator           |
| GET    | `/sources`                      | Daftar sumber data         |
| GET    | `/analysis/methodology`         | Metodologi analisis        |
| POST   | `/similarity/:regionId`         | Menghitung daerah kembar   |
| GET    | `/similarity/:regionId`         | Mengambil hasil analisis   |
| GET    | `/comparison/:regionA/:regionB` | Komparasi dua wilayah      |

## 11.2 Analysis Request

Contoh request:

```json
{
  "indicators": [
    {
      "code": "population",
      "weight": 0.25
    },
    {
      "code": "poverty_rate",
      "weight": 0.35
    },
    {
      "code": "hdi",
      "weight": 0.4
    }
  ],
  "period": "2025",
  "limit": 10
}
```

## 11.3 Analysis Response

Contoh response:

```json
{
  "region": {
    "code": "3273",
    "name": "Kota Bandung"
  },
  "method": "weighted_euclidean",
  "datasetVersion": "2025-v1",
  "results": [
    {
      "region": {
        "code": "3275",
        "name": "Kota Bekasi"
      },
      "similarityScore": 94.2,
      "matchedIndicators": 3,
      "contributions": [
        {
          "indicator": "population",
          "distanceContribution": 0.02
        }
      ]
    }
  ]
}
```

Data di atas merupakan contoh struktur API, bukan hasil analisis aktual.

---

# 12. Roles, Permissions & Security

## 12.1 Roles

| Role        | Akses                                                 |
| ----------- | ----------------------------------------------------- |
| Public      | Melihat dan menggunakan seluruh fitur analisis publik |
| Admin       | Mengelola dataset, indikator, dan wilayah             |
| Super Admin | Seluruh akses admin dan pengelolaan akun              |

## 12.2 Security Requirements

- Endpoint admin wajib menggunakan autentikasi.
- Hak akses diterapkan melalui RBAC.
- Semua input divalidasi menggunakan Zod.
- Kredensial database disimpan dalam environment variables.
- API publik memiliki rate limiting.
- Impor data harus divalidasi sebelum publikasi.
- Perubahan dataset harus memiliki audit log.
- Tidak ada informasi rahasia yang dikirim ke frontend.

---

# 13. Non-Functional Requirements

| Kategori       | Requirement                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------- |
| Performance    | Halaman utama memiliki target LCP maksimal 2,5 detik pada kondisi pengujian yang ditentukan |
| API            | Endpoint analisis menggunakan cache berdasarkan konfigurasi dan versi dataset               |
| Availability   | Sistem dirancang agar dapat diakses secara publik                                           |
| Scalability    | Mendukung penambahan wilayah dan indikator                                                  |
| Accessibility  | Navigasi keyboard dan kontras warna memadai                                                 |
| Responsive     | Mendukung desktop, tablet, dan mobile                                                       |
| Reliability    | Hasil analisis dapat direproduksi                                                           |
| Data Integrity | Data tanpa sumber tidak dapat dipublikasikan                                                |
| Security       | Validasi, autentikasi admin, RBAC, dan rate limiting                                        |

---

# 14. Business Rules

| ID    | Aturan                                                                      |
| ----- | --------------------------------------------------------------------------- |
| BR-01 | Setiap wilayah harus memiliki kode wilayah resmi                            |
| BR-02 | Setiap indikator harus memiliki definisi dan satuan                         |
| BR-03 | Setiap nilai indikator harus memiliki sumber                                |
| BR-04 | Setiap nilai indikator harus memiliki periode data                          |
| BR-05 | Data kosong tidak boleh dianggap nol                                        |
| BR-06 | Bobot indikator harus bernilai total 100%                                   |
| BR-07 | Skor kemiripan berada pada rentang 0–100                                    |
| BR-08 | Skor yang lebih tinggi berarti lebih mirip berdasarkan konfigurasi analisis |
| BR-09 | Wilayah acuan tidak boleh dibandingkan dengan dirinya sendiri               |
| BR-10 | Perbandingan hanya menggunakan indikator yang tersedia pada kedua wilayah   |
| BR-11 | Sistem harus menampilkan jumlah indikator yang berhasil dibandingkan        |
| BR-12 | Dataset yang belum divalidasi tidak boleh dipublikasikan                    |
| BR-13 | Setiap hasil analisis harus mencatat versi dataset                          |
| BR-14 | Setiap perubahan konfigurasi harus menghasilkan perhitungan baru            |
| BR-15 | Data sintetis harus diberi label yang jelas                                 |

---

# 15. Analytics & Success Metrics

## 15.1 Product Metrics

| Metric                   | Tujuan                                |
| ------------------------ | ------------------------------------- |
| Region Search            | Mengukur penggunaan pencarian wilayah |
| Analysis Started         | Mengukur jumlah analisis yang dimulai |
| Analysis Completed       | Mengukur keberhasilan analisis        |
| Comparison Opened        | Mengukur penggunaan detail komparasi  |
| Custom Analysis Usage    | Mengukur penggunaan bobot kustom      |
| Source Link Clicked      | Mengukur akses ke sumber data         |
| Analysis Completion Time | Mengukur efisiensi penggunaan         |

## 15.2 Data Quality Metrics

| Metric                  | Target                                                   |
| ----------------------- | -------------------------------------------------------- |
| Data Source Coverage    | 100% data publik memiliki sumber                         |
| Indicator Completeness  | Diukur per wilayah dan dataset                           |
| Dataset Validation      | Seluruh dataset tervalidasi sebelum publikasi            |
| Data Period Consistency | Perbedaan periode ditampilkan secara transparan          |
| Reproducibility         | Hasil sama untuk versi dataset dan konfigurasi yang sama |

---

# 16. Error Handling & Edge Cases

| Kondisi                     | Penanganan                                         |
| --------------------------- | -------------------------------------------------- |
| Wilayah tidak ditemukan     | Tampilkan pesan wilayah tidak tersedia             |
| Data indikator kosong       | Keluarkan indikator dari perhitungan pasangan      |
| Semua data indikator kosong | Analisis tidak dapat dilakukan                     |
| Bobot tidak berjumlah 100%  | Tampilkan validasi                                 |
| Dataset belum tersedia      | Tampilkan status data belum tersedia               |
| Periode data berbeda        | Berikan peringatan                                 |
| Data terlalu sedikit        | Tampilkan peringatan kelengkapan                   |
| API gagal                   | Tampilkan error dan opsi mencoba kembali           |
| Perhitungan terlalu lama    | Gunakan cache atau proses asinkron jika diperlukan |
| Dataset berubah             | Invalidasi cache analisis terkait                  |

---

# 17. Testing & Quality Assurance

## 17.1 Unit Testing

Pengujian wajib untuk:

- Normalisasi Min-Max.
- Reverse normalization.
- Validasi bobot.
- Weighted Euclidean Distance.
- Konversi skor kemiripan.
- Perhitungan kontribusi indikator.
- Penanganan data kosong.
- Pengurutan ranking.

## 17.2 Integration Testing

- Pengambilan data wilayah.
- Pengambilan indikator.
- Pengambilan versi dataset.
- Endpoint analisis kemiripan.
- Endpoint komparasi.
- Autentikasi dan otorisasi admin.
- Impor dan validasi dataset.

## 17.3 End-to-End Testing

Skenario utama:

1. Pengguna membuka website.
2. Pengguna memilih Kota Bandung.
3. Sistem menampilkan hasil daerah kembar.
4. Pengguna membuka detail Kota Bekasi.
5. Sistem menampilkan perbandingan indikator.
6. Pengguna membuka sumber data.
7. Pengguna mengubah bobot indikator.
8. Sistem menampilkan hasil analisis yang diperbarui.

---

# 18. Timeline & Development Roadmap

Estimasi berikut merupakan rencana awal dan perlu disesuaikan dengan kapasitas tim.

| Tahap | Pekerjaan                           | Estimasi |
| ----- | ----------------------------------- | -------- |
| 1     | Finalisasi kebutuhan dan metodologi | 2 hari   |
| 2     | Pengumpulan dan validasi dataset    | 4 hari   |
| 3     | Setup monorepo dan infrastruktur    | 2 hari   |
| 4     | Database schema dan data ingestion  | 3 hari   |
| 5     | Pengembangan Similarity Engine      | 4 hari   |
| 6     | API wilayah dan analisis            | 3 hari   |
| 7     | Frontend beranda dan pencarian      | 3 hari   |
| 8     | Halaman Daerah Kembar dan ranking   | 4 hari   |
| 9     | Detail kemiripan dan komparasi      | 3 hari   |
| 10    | Admin dataset                       | 3 hari   |
| 11    | Pengujian dan perbaikan             | 3 hari   |

**Estimasi total: sekitar 34 hari kerja.**

Prioritas pengembangan adalah memastikan algoritma dan kualitas data benar sebelum mengoptimalkan tampilan visual.

---

# 19. Risks, Assumptions & Mitigations

| Risiko                            | Dampak                                              | Mitigasi                                                                                                              |
| --------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Data tidak lengkap                | Skor kemiripan tidak representatif                  | [TERATASI] Seluruh 15 indikator untuk 27 wilayah telah 100% lengkap diekstraksi dari BPS Jabar 2026 tanpa data kosong |
| Perbedaan tahun data              | Perbandingan kurang valid                           | Seluruh indikator telah diselaraskan pada periode rilis resmi mutakhir (2025/2026)                                    |
| Data sumber berubah               | Hasil analisis berubah                              | Simpan versi dataset terverifikasi dalam database NeonDB                                                              |
| Indikator terlalu banyak          | Analisis menjadi sulit dipahami                     | Kelompokkan indikator berdasarkan 5 kategori (Demografi, Ekonomi, Pendidikan, Kesehatan, Infrastruktur)               |
| Bobot subjektif                   | Hasil berubah sesuai preferensi                     | Tampilkan konfigurasi dan bobot secara terbuka                                                                        |
| Salah interpretasi skor           | Pengguna menganggap skor sebagai peringkat kualitas | Berikan penjelasan metodologi dan disclaimer konsisten di seluruh UI                                                  |
| Dataset demo tidak nyata          | Mengurangi kredibilitas                             | [TERATASI] Menggunakan data riil resmi BPS Provinsi Jawa Barat                                                        |
| Data antarwilayah tidak sebanding | Hasil bias                                          | Validasi definisi dan tingkat agregasi indikator kabupaten/kota                                                       |

## 19.1 Asumsi

- MVP difokuskan pada 27 kabupaten/kota di Provinsi Jawa Barat.
- Data awal bersumber langsung dari publikasi resmi mutakhir _Provinsi Jawa Barat Dalam Angka 2026_ (BPS Jawa Barat).
- Seluruh 15 indikator utama telah terbukti tersedia dan lengkap untuk ke-27 wilayah.
- Database cloud backend menggunakan **NeonDB** (Neon Serverless PostgreSQL).
- Pengguna publik dapat mengakses analisis tanpa perlu login.
- Admin bertanggung jawab atas validasi dan pembaruan dataset di NeonDB.
- Metode perhitungan dapat dikembangkan setelah evaluasi metodologis.

---

# 20. Definition of Done

Produk dinyatakan siap untuk MVP apabila:

- [ ] Pengguna dapat mencari dan memilih wilayah.
- [ ] Sistem dapat menghitung skor kemiripan.
- [ ] Ranking daerah kembar ditampilkan dengan benar.
- [ ] Detail kemiripan dapat dibuka.
- [ ] Perbandingan dua daerah tersedia.
- [ ] Kontribusi indikator ditampilkan.
- [ ] Metodologi dapat diakses publik.
- [ ] Sumber data dapat ditelusuri.
- [ ] Dataset memiliki validasi.
- [ ] Data kosong ditangani dengan benar.
- [ ] Data sintetis diberi label.
- [ ] Website responsif.
- [ ] Pengujian algoritma lulus.
- [ ] Tidak ada fitur di luar ruang lingkup Daerah Kembar yang muncul dalam MVP.

---

# 21. Open Questions & Decision Log

| Pertanyaan                                        | Keputusan Awal                                                         |
| ------------------------------------------------- | ---------------------------------------------------------------------- |
| Cakupan awal wilayah?                             | 27 kabupaten/kota Jawa Barat                                           |
| Metode kemiripan?                                 | Weighted Euclidean Distance                                            |
| Normalisasi?                                      | Min-Max                                                                |
| Frontend framework?                               | Next.js 16 (App Router) dengan Tailwind CSS v4, shadcn/ui, dan mapcn   |
| Backend API?                                      | Hono JS (`@hono/node-server`)                                          |
| Cloud Database?                                   | **NeonDB** (Neon Serverless PostgreSQL via `@neondatabase/serverless`) |
| Sumber data primer?                               | BPS Provinsi Jawa Barat (_Provinsi Jawa Barat Dalam Angka 2026_)       |
| Apakah pengguna harus login?                      | Tidak untuk analisis publik                                            |
| Apakah bobot dapat diubah?                        | Ya, sebagai fitur P1                                                   |
| Apakah sistem menampilkan sumber?                 | Wajib untuk 100% data                                                  |
| Apakah skor menentukan daerah terbaik?            | Tidak                                                                  |
| Apakah analisis bersifat prediktif?               | Tidak                                                                  |
| Apakah sistem membuktikan keberhasilan kebijakan? | Tidak                                                                  |

---

# Lampiran A: Prinsip Utama Produk

DAERAH KITA bukan platform pemeringkatan daerah terbaik dan bukan alat untuk menentukan daerah mana yang paling maju.

DAERAH KITA adalah platform untuk menemukan wilayah yang memiliki karakteristik statistik serupa agar dapat dibandingkan secara lebih adil dan relevan.

Prinsip yang harus dijaga:

1. Data harus dapat ditelusuri.
2. Metodologi harus transparan.
3. Skor harus dapat dijelaskan.
4. Data kosong tidak boleh dimanipulasi.
5. Kemiripan tidak boleh disamakan dengan kesetaraan kualitas.
6. Hasil analisis tidak boleh digunakan untuk membuat klaim kausal tanpa penelitian tambahan.

# Lampiran B: Positioning untuk Web In Action

**Subtema utama:** Data-Driven Decision Support.

**Permasalahan:** Pengambilan keputusan pembangunan daerah membutuhkan pembanding yang relevan, tetapi pemilihan daerah pembanding masih sering dilakukan secara subjektif dan manual.

**Solusi:** Platform yang menggunakan analisis statistik untuk menemukan daerah dengan karakteristik paling mirip, menjelaskan tingkat kemiripan, dan menunjukkan kesenjangan pada setiap indikator.

**Nilai inovasi:** Sistem tidak sekadar menampilkan data statistik, tetapi mengubah data tersebut menjadi rekomendasi wilayah pembanding yang transparan, terukur, dan dapat dijelaskan.

**Tagline:**

"Daerah boleh berbeda lokasi, tetapi bisa memiliki cerita yang sama. Temukan daerah kembarmu melalui data."
