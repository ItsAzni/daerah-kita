"""Konversi dataset BPS di data/csv dan data/geojson ke modul TypeScript.

Dijalankan sekali saat data berubah:

    python3 scripts/generate_web_data.py

Script ini hanya menulis ulang apps/web/data/*.ts dari sumber resmi.
Tidak menyentuh kode UI atau CSS.
"""

from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSV_DIR = ROOT / "data" / "csv"
GEOJSON = ROOT / "data" / "geojson" / "jabar_kab_kota.geojson"
OUT_DIR = ROOT / "apps" / "web" / "data"

HEADER = "// Dibangkitkan dari data/csv dan data/geojson oleh scripts/generate_web_data.py.\n// Jangan diedit manual; ubah sumber CSV lalu jalankan ulang script.\n\n"


def read_csv(name: str) -> list[dict[str, str]]:
    with (CSV_DIR / name).open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def ts(value: object) -> str:
    return json.dumps(value, ensure_ascii=False)


def write(name: str, body: str) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / name).write_text(HEADER + body, encoding="utf-8")
    print(f"wrote apps/web/data/{name}")


regions = read_csv("regions.csv")
indicators = read_csv("indicators.csv")
values = read_csv("indicator_values.csv")
sources = read_csv("sources.csv")

# regions.ts
region_rows = []
for row in regions:
    region_rows.append(
        "  {"
        f'id: {ts(row["code"])}, code: {ts(row["code"])}, name: {ts(row["name"])}, '
        f'type: {ts(row["type"])}, province_code: {ts(row["province_code"])}, '
        f'province_name: {ts(row["province_name"])}, latitude: {row["latitude"]}, '
        f'longitude: {row["longitude"]}'
        "},"
    )
write(
    "regions.ts",
    "import type { Region } from \"@daerah-kita/shared\"\n\n"
    "/** 27 kabupaten/kota Jawa Barat, kode BPS resmi. */\n"
    "export const REGIONS: Region[] = [\n" + "\n".join(region_rows) + "\n]\n\n"
    "export const PROVINCE_NAME = \"Jawa Barat\"\n"
    "export const PROVINCE_CODE = \"32\"\n",
)

# indicators.ts
indicator_rows = []
for row in indicators:
    indicator_rows.append(
        "  {"
        f'id: {ts(row["code"])}, code: {ts(row["code"])}, name: {ts(row["name"])}, '
        f'description: {ts(row["description"])}, category: {ts(row["category"])}, '
        f'unit: {ts(row["unit"])}, direction: {ts(row["direction"])}, '
        f'is_active: true, period: {row["period"]}, '
        f'source_name: {ts(row["source_name"])}, bps_table: {ts(row["bps_table"])}'
        "},"
    )
write(
    "indicators.ts",
    "import type { Indicator, IndicatorCategory } from \"@daerah-kita/shared\"\n\n"
    "/** 15 indikator dari 5 kategori, diekstraksi dari publikasi BPS 2026. */\n"
    "export const INDICATORS: Indicator[] = [\n" + "\n".join(indicator_rows) + "\n]\n\n"
    "export const INDICATOR_CATEGORIES: IndicatorCategory[] = [\n"
    "  \"Demografi\",\n  \"Ekonomi\",\n  \"Pendidikan\",\n  \"Kesehatan\",\n  \"Infrastruktur\",\n]\n\n"
    "export function indicatorsByCategory(category: IndicatorCategory): Indicator[] {\n"
    "  return INDICATORS.filter((indicator) => indicator.category === category)\n"
    "}\n",
)

# indicator-values.ts
# Tabel ringkas: satu baris per wilayah, nilai mengikuti urutan INDICATORS.
lookup = {(row["region_code"], row["indicator_code"]): row["value"] for row in values}
lines = []
for region in regions:
    cells = [lookup[(region["code"], indicator["code"])] for indicator in indicators]
    lines.append(f'  "{region["code"]}": [{", ".join(cells)}],')
write(
    "indicator-values.ts",
    "import type { IndicatorValue } from \"@daerah-kita/shared\"\n\n"
    "import { INDICATORS } from \"./indicators\"\n"
    "import { REGIONS } from \"./regions\"\n\n"
    "/** Nilai per wilayah, urutannya sama dengan INDICATORS. */\n"
    "const VALUE_TABLE: Record<string, number[]> = {\n" + "\n".join(lines) + "\n}\n\n"
    "/** 405 nilai resmi BPS Jawa Barat (2025/2026), tanpa nilai kosong. */\n"
    "export const INDICATOR_VALUES: IndicatorValue[] = REGIONS.flatMap((region) => {\n"
    "  const row = VALUE_TABLE[region.code] ?? []\n"
    "  return INDICATORS.map((indicator, index) => ({\n"
    "    id: `${region.code}-${indicator.code}`,\n"
    "    region_id: region.code,\n"
    "    indicator_id: indicator.code,\n"
    "    value: row[index] ?? Number.NaN,\n"
    "    period: indicator.period,\n"
    "  }))\n"
    "})\n\n"
    "export const VALUE_INDEX: Map<string, number> = new Map(\n"
    "  INDICATOR_VALUES.map((entry) => [`${entry.region_id}:${entry.indicator_id}`, entry.value]),\n"
    ")\n\n"
    "export function getValue(regionCode: string, indicatorCode: string): number | undefined {\n"
    "  return VALUE_INDEX.get(`${regionCode}:${indicatorCode}`)\n"
    "}\n",
)

# sources.ts
source_rows = []
for row in sources:
    covered = [item.strip() for item in row["indicators_covered"].split(",") if item.strip()]
    source_rows.append(
        "  {"
        f'id: {ts(row["id"])}, name: {ts(row["name"])}, publisher: {ts(row["publisher"])}, '
        f'url: {ts(row["url"])}, description: {ts(row["description"])}, '
        f'publication_title: {ts(row["publication_title"])}, '
        f'publication_date: {ts(row["publication_date"])}, accessed_at: {ts(row["accessed_at"])}, '
        f"indicators_covered: {ts(covered)}"
        "},"
    )
write(
    "sources.ts",
    "import type { DataSource } from \"@daerah-kita/shared\"\n\n"
    "/** Katalog instansi penerbit data yang dipakai platform. */\n"
    "export const DATA_SOURCES: DataSource[] = [\n" + "\n".join(source_rows) + "\n]\n\n"
    "export function getSource(id: string): DataSource | undefined {\n"
    "  return DATA_SOURCES.find((source) => source.id === id)\n"
    "}\n",
)

# geojson.ts
geojson = json.loads(GEOJSON.read_text(encoding="utf-8"))
compact = json.dumps(geojson, ensure_ascii=False, separators=(",", ":"))
write(
    "geojson.ts",
    "import type { FeatureCollection, Geometry } from \"geojson\"\n\n"
    "export type RegionProperties = {\n"
    "  code: string\n"
    "  name: string\n"
    "  type: \"kabupaten\" | \"kota\"\n"
    "  province_code: string\n"
    "  province_name: string\n"
    "  longitude: number\n"
    "  latitude: number\n"
    "}\n\n"
    "/** Batas poligon 27 kabupaten/kota Jawa Barat, sumber Open Data Jabar. */\n"
    f"export const JABAR_GEOJSON = {compact} as FeatureCollection<Geometry, RegionProperties>\n",
)

print("done")
