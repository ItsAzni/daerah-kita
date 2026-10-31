import subprocess
import os
import re
import csv

REGIONS = [
    ("3201", "Kabupaten Bogor", "kabupaten", "Bogor"),
    ("3202", "Kabupaten Sukabumi", "kabupaten", "Sukabumi"),
    ("3203", "Kabupaten Cianjur", "kabupaten", "Cianjur"),
    ("3204", "Kabupaten Bandung", "kabupaten", "Bandung"),
    ("3205", "Kabupaten Garut", "kabupaten", "Garut"),
    ("3206", "Kabupaten Tasikmalaya", "kabupaten", "Tasikmalaya"),
    ("3207", "Kabupaten Ciamis", "kabupaten", "Ciamis"),
    ("3208", "Kabupaten Kuningan", "kabupaten", "Kuningan"),
    ("3209", "Kabupaten Cirebon", "kabupaten", "Cirebon"),
    ("3210", "Kabupaten Majalengka", "kabupaten", "Majalengka"),
    ("3211", "Kabupaten Sumedang", "kabupaten", "Sumedang"),
    ("3212", "Kabupaten Indramayu", "kabupaten", "Indramayu"),
    ("3213", "Kabupaten Subang", "kabupaten", "Subang"),
    ("3214", "Kabupaten Purwakarta", "kabupaten", "Purwakarta"),
    ("3215", "Kabupaten Karawang", "kabupaten", "Karawang"),
    ("3216", "Kabupaten Bekasi", "kabupaten", "Bekasi"),
    ("3217", "Kabupaten Bandung Barat", "kabupaten", "Bandung Barat"),
    ("3218", "Kabupaten Pangandaran", "kabupaten", "Pangandaran"),
    ("3271", "Kota Bogor", "kota", "Bogor"),
    ("3272", "Kota Sukabumi", "kota", "Sukabumi"),
    ("3273", "Kota Bandung", "kota", "Bandung"),
    ("3274", "Kota Cirebon", "kota", "Cirebon"),
    ("3275", "Kota Bekasi", "kota", "Bekasi"),
    ("3276", "Kota Depok", "kota", "Depok"),
    ("3277", "Kota Cimahi", "kota", "Cimahi"),
    ("3278", "Kota Tasikmalaya", "kota", "Tasikmalaya"),
    ("3279", "Kota Banjar", "kota", "Banjar"),
]

INDICATORS_META = [
    {
        "code": "jumlah_penduduk",
        "name": "Jumlah Penduduk",
        "category": "Demografi",
        "unit": "jiwa",
        "direction": "normal",
        "period": "2026",
        "source": "BPS Provinsi Jawa Barat (Proyeksi Penduduk)",
        "table": "Tabel 3.1.1",
        "page": 177,
        "description": "Jumlah penduduk hasil proyeksi interim BPS"
    },
    {
        "code": "kepadatan_penduduk",
        "name": "Kepadatan Penduduk",
        "category": "Demografi",
        "unit": "jiwa/km2",
        "direction": "normal",
        "period": "2026",
        "source": "BPS Provinsi Jawa Barat",
        "table": "Tabel 3.1.1",
        "page": 180,
        "description": "Kepadatan penduduk per kilometer persegi wilayah"
    },
    {
        "code": "rasio_jenis_kelamin",
        "name": "Rasio Jenis Kelamin",
        "category": "Demografi",
        "unit": "rasio",
        "direction": "normal",
        "period": "2026",
        "source": "BPS Provinsi Jawa Barat",
        "table": "Tabel 3.1.1",
        "page": 181,
        "description": "Perbandingan jumlah penduduk laki-laki dengan perempuan (per 100 perempuan)"
    },
    {
        "code": "pengeluaran_per_kapita",
        "name": "Pengeluaran Riil per Kapita Disesuaikan",
        "category": "Ekonomi",
        "unit": "rupiah/tahun",
        "direction": "normal",
        "period": "2025",
        "source": "BPS Provinsi Jawa Barat (Susenas)",
        "table": "Tabel 4.6.6",
        "page": 405,
        "description": "Standar hidup layak / pengeluaran riil per kapita per tahun yang disesuaikan"
    },
    {
        "code": "tingkat_pengangguran",
        "name": "Tingkat Pengangguran Terbuka (TPT)",
        "category": "Ekonomi",
        "unit": "%",
        "direction": "reverse",
        "period": "2025",
        "source": "BPS Provinsi Jawa Barat (Sakernas Agustus)",
        "table": "Tabel 3.2.16",
        "page": 218,
        "description": "Persentase angkatan kerja yang tidak memiliki pekerjaan dan sedang mencari kerja"
    },
    {
        "code": "tingkat_kemiskinan",
        "name": "Persentase Penduduk Miskin",
        "category": "Ekonomi",
        "unit": "%",
        "direction": "reverse",
        "period": "2025",
        "source": "BPS Provinsi Jawa Barat (Susenas)",
        "table": "Tabel 4.6.2",
        "page": 399,
        "description": "Persentase penduduk yang berada di bawah garis kemiskinan"
    },
    {
        "code": "ipm",
        "name": "Indeks Pembangunan Manusia (IPM)",
        "category": "Pendidikan",
        "unit": "indeks",
        "direction": "normal",
        "period": "2025",
        "source": "BPS Provinsi Jawa Barat",
        "table": "Tabel 4.6.5",
        "page": 403,
        "description": "Pencapaian pembangunan manusia berbasis kesehatan, pendidikan, dan standar hidup"
    },
    {
        "code": "harapan_lama_sekolah",
        "name": "Harapan Lama Sekolah (HLS)",
        "category": "Pendidikan",
        "unit": "tahun",
        "direction": "normal",
        "period": "2025",
        "source": "BPS Provinsi Jawa Barat",
        "table": "Tabel 4.6.6",
        "page": 404,
        "description": "Lamanya sekolah yang diharapkan akan dirasakan oleh anak pada umur tertentu di masa mendatang"
    },
    {
        "code": "rata_rata_lama_sekolah",
        "name": "Rata-rata Lama Sekolah (RLS)",
        "category": "Pendidikan",
        "unit": "tahun",
        "direction": "normal",
        "period": "2025",
        "source": "BPS Provinsi Jawa Barat",
        "table": "Tabel 4.6.6",
        "page": 404,
        "description": "Jumlah tahun yang digunakan oleh penduduk usia 25 tahun ke atas dalam menjalani pendidikan formal"
    },
    {
        "code": "angka_harapan_hidup",
        "name": "Umur Harapan Hidup saat Lahir (AHH)",
        "category": "Kesehatan",
        "unit": "tahun",
        "direction": "normal",
        "period": "2025",
        "source": "BPS Provinsi Jawa Barat (Long Form SP2020)",
        "table": "Tabel 4.6.6",
        "page": 404,
        "description": "Perkiraan rata-rata banyaknya tahun yang dapat ditempuh oleh seseorang sejak lahir"
    },
    {
        "code": "jumlah_puskesmas",
        "name": "Jumlah Puskesmas",
        "category": "Kesehatan",
        "unit": "unit",
        "direction": "normal",
        "period": "2025",
        "source": "Dinas Kesehatan Provinsi Jawa Barat / BPS",
        "table": "Tabel 4.2.7",
        "page": 317,
        "description": "Jumlah fasilitas pusat kesehatan masyarakat (rawat inap dan non-rawat inap)"
    },
    {
        "code": "tenaga_medis",
        "name": "Jumlah Tenaga Medis (Dokter)",
        "category": "Kesehatan",
        "unit": "orang",
        "direction": "normal",
        "period": "2025",
        "source": "Dinas Kesehatan Provinsi Jawa Barat / BPS",
        "table": "Tabel 4.2.4",
        "page": 305,
        "description": "Jumlah tenaga medis (dokter spesialis, dokter umum, dan dokter gigi)"
    },
    {
        "code": "akses_air_bersih",
        "name": "Persentase RT Akses Air Minum Layak",
        "category": "Infrastruktur",
        "unit": "%",
        "direction": "normal",
        "period": "2025",
        "source": "BPS Provinsi Jawa Barat (Susenas)",
        "table": "Tabel 4.3.9",
        "page": 344,
        "description": "Persentase rumah tangga yang memiliki akses terhadap sumber air minum layak"
    },
    {
        "code": "akses_sanitasi",
        "name": "Persentase RT Akses Sanitasi Layak",
        "category": "Infrastruktur",
        "unit": "%",
        "direction": "normal",
        "period": "2025",
        "source": "BPS Provinsi Jawa Barat (Susenas)",
        "table": "Tabel 4.3.8",
        "page": 343,
        "description": "Persentase rumah tangga yang memiliki akses terhadap fasilitas sanitasi layak"
    },
    {
        "code": "rasio_elektrifikasi",
        "name": "Persentase RT Berlistrik PLN",
        "category": "Infrastruktur",
        "unit": "%",
        "direction": "normal",
        "period": "2025",
        "source": "BPS Provinsi Jawa Barat (Susenas)",
        "table": "Tabel 4.3.3",
        "page": 336,
        "description": "Persentase rumah tangga dengan sumber penerangan utama listrik PLN"
    }
]

def get_page_lines(page):
    out = subprocess.run(
        ["pdftotext", "-nodiag", "-tsv", "-f", str(page), "-l", str(page), "data/raw/jabar_2026.pdf", "-"],
        capture_output=True,
        text=True
    )
    rows = []
    for line in out.stdout.splitlines():
        parts = line.split("\t")
        if len(parts) >= 12 and parts[0] == "5":
            left = float(parts[6])
            top = float(parts[7])
            text = parts[11].strip()
            if text:
                rows.append((top, left, text))
    rows.sort()
    lines = []
    curr_line = []
    curr_top = None
    for top, left, text in rows:
        if curr_top is None or abs(top - curr_top) > 3.5:
            if curr_line:
                curr_line.sort(key=lambda x: x[0])
                lines.append((curr_top, [w for _, w in curr_line]))
            curr_line = [(left, text)]
            curr_top = top
        else:
            curr_line.append((left, text))
    if curr_line:
        curr_line.sort(key=lambda x: x[0])
        lines.append((curr_top, [w for _, w in curr_line]))
    return lines

def to_num(s):
    if not s or s in ["–", "-", "NA", "...", "…"]:
        return 0.0
    s = s.replace("r", "").replace(".", "").replace(",", ".").strip()
    return float(s)

def parse_page_indicator(page, value_extractor):
    lines = get_page_lines(page)
    kota_start_idx = 0
    for idx, (_, words) in enumerate(lines):
        line_str = " ".join(words)
        if "Kota/" in line_str or "Kota/Municipality" in line_str:
            kota_start_idx = idx
            break
    
    kab_lines = lines[:kota_start_idx]
    kota_lines = lines[kota_start_idx:]

    data = {}
    for code, full_name, r_type, short_name in REGIONS[:18]:
        for _, words in kab_lines:
            line_str = " ".join(words)
            if short_name == "Bandung" and "Bandung Barat" in line_str:
                continue
            if short_name in line_str:
                data[code] = value_extractor(words)
                break
    for code, full_name, r_type, short_name in REGIONS[18:]:
        for _, words in kota_lines:
            line_str = " ".join(words)
            if short_name in line_str and "Jawa Barat" not in line_str:
                data[code] = value_extractor(words)
                break
    return data

def main():
    print("Extracting indicators from official BPS Jabar Dalam Angka 2026...")
    os.makedirs("data/csv", exist_ok=True)

    extracted = {
        "jumlah_penduduk": parse_page_indicator(177, lambda w: round(to_num([x for x in w if re.match(r"^[\d.,]+$", x)][-1]) * 1000)),
        "kepadatan_penduduk": parse_page_indicator(180, lambda w: to_num([x for x in w if re.match(r"^[\d.,]+$", x)][-1])),
        "rasio_jenis_kelamin": parse_page_indicator(181, lambda w: to_num([x for x in w if re.match(r"^[\d.,]+$", x)][-1])),
        "tingkat_pengangguran": parse_page_indicator(218, lambda w: to_num([x for x in w if re.match(r"^\d+,\d+$", x)][1])),
        "tenaga_medis": parse_page_indicator(305, lambda w: round(to_num([x for x in w if re.match(r"^[\d.,]+$", x)][1]))),
        "jumlah_puskesmas": parse_page_indicator(317, lambda w: round(to_num([x for x in w if re.match(r"^[\d.,]+$", x)][-1]))),
        "rasio_elektrifikasi": parse_page_indicator(336, lambda w: to_num([x for x in w if re.match(r"^\d+,\d+$", x)][0])),
        "akses_sanitasi": parse_page_indicator(343, lambda w: to_num([x for x in w if re.match(r"^\d+,\d+$", x)][-1])),
        "akses_air_bersih": parse_page_indicator(344, lambda w: to_num([x for x in w if re.match(r"^\d+,\d+$", x)][-1])),
        "tingkat_kemiskinan": parse_page_indicator(399, lambda w: to_num([x for x in w if re.match(r"^\d+,\d+$", x)][-1])),
        "ipm": parse_page_indicator(403, lambda w: to_num([x for x in w if re.match(r"^\d+,\d+$", x)][-1])),
        "angka_harapan_hidup": parse_page_indicator(404, lambda w: to_num([x for x in w if re.match(r"^\d+,\d+$", x)][1])),
        "harapan_lama_sekolah": parse_page_indicator(404, lambda w: to_num([x for x in w if re.match(r"^\d+,\d+$", x)][3])),
        "rata_rata_lama_sekolah": parse_page_indicator(404, lambda w: to_num([x for x in w if re.match(r"^\d+,\d+$", x)][5])),
        "pengeluaran_per_kapita": parse_page_indicator(405, lambda w: round(to_num([x for x in w if re.match(r"^[\d.]+$", x)][1]) * 1000)),
    }

    # Verify counts
    for code, m in extracted.items():
        if len(m) != 27:
            print(f"WARNING: {code} has only {len(m)} values!")

    # 1. Write regions.csv
    with open("data/csv/regions.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["code", "name", "type", "province_code", "province_name"])
        for code, name, r_type, _ in REGIONS:
            writer.writerow([code, name, r_type, "32", "Jawa Barat"])
    print("Saved data/csv/regions.csv")

    # 2. Write indicators.csv
    with open("data/csv/indicators.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["code", "name", "category", "unit", "direction", "period", "source_name", "bps_table", "description"])
        for ind in INDICATORS_META:
            writer.writerow([
                ind["code"], ind["name"], ind["category"], ind["unit"],
                ind["direction"], ind["period"], ind["source"], ind["table"], ind["description"]
            ])
    print("Saved data/csv/indicators.csv")

    # 3. Write indicator_values.csv (Normalized Database Format)
    meta_by_code = {ind["code"]: ind for ind in INDICATORS_META}
    with open("data/csv/indicator_values.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["region_code", "region_name", "indicator_code", "indicator_name", "value", "unit", "period", "source_name"])
        for r_code, r_name, _, _ in REGIONS:
            for ind_code, values_dict in extracted.items():
                val = values_dict.get(r_code, 0.0)
                meta = meta_by_code[ind_code]
                writer.writerow([
                    r_code, r_name, ind_code, meta["name"], val, meta["unit"], meta["period"], meta["source"]
                ])
    print("Saved data/csv/indicator_values.csv (405 rows)")

    # 4. Write jabar_indicators_wide.csv (Pivot Table Format for Excel review)
    indicator_codes = [ind["code"] for ind in INDICATORS_META]
    with open("data/csv/jabar_indicators_wide.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        header = ["region_code", "region_name", "region_type"] + indicator_codes
        writer.writerow(header)
        for r_code, r_name, r_type, _ in REGIONS:
            row = [r_code, r_name, r_type]
            for ind_code in indicator_codes:
                row.append(extracted[ind_code].get(r_code, 0.0))
            writer.writerow(row)
    print("Saved data/csv/jabar_indicators_wide.csv (27 rows x 18 columns)")

if __name__ == "__main__":
    main()
