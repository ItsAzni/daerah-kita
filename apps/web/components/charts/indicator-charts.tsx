"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export function CategoryRadarChart({
  data,
  labelA,
  labelB,
}: {
  data: { category: string; a: number; b: number }[]
  labelA: string
  labelB: string
}) {
  const config: ChartConfig = {
    a: { label: labelA, color: "var(--foreground)" },
    b: { label: labelB, color: "var(--muted-foreground)" },
  }

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[340px] w-full"
    >
      <RadarChart data={data} accessibilityLayer outerRadius="72%">
        <PolarGrid stroke="var(--border)" strokeDasharray="2 4" />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          tickLine={false}
        />
        <Radar
          name={labelA}
          dataKey="a"
          stroke="var(--foreground)"
          fill="var(--foreground)"
          fillOpacity={0.14}
          strokeWidth={1.5}
        />
        <Radar
          name={labelB}
          dataKey="b"
          stroke="var(--muted-foreground)"
          fill="none"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </RadarChart>
    </ChartContainer>
  )
}

/**
 * Kontribusi indikator terhadap perbedaan, 5 terbesar.
 *
 * Dibuat sebagai daftar peringkat dengan batang tipis, bukan chart kedua
 * berukuran penuh, supaya radar tetap menjadi grafik utama halaman.
 */
export function ContributionBarChart({
  data,
}: {
  data: { name: string; value: number }[]
}) {
  const max = Math.max(...data.map((entry) => entry.value), 0.0001)

  return (
    <ol className="flex flex-col border-t border-border">
      {data.map((entry) => (
        <li
          key={entry.name}
          className="flex flex-col gap-1.5 border-b border-border py-3"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm">{entry.name}</span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {(entry.value * 100).toFixed(1)}%
            </span>
          </div>
          <span aria-hidden="true" className="h-1 w-full bg-muted">
            <span
              className="block h-full bg-foreground"
              style={{ width: `${(entry.value / max) * 100}%` }}
            />
          </span>
        </li>
      ))}
    </ol>
  )
}

export function CategoryBarChart({
  data,
  labelA,
  labelB,
}: {
  data: { category: string; a: number; b: number }[]
  labelA: string
  labelB: string
}) {
  const config: ChartConfig = {
    a: { label: labelA, color: "var(--foreground)" },
    b: { label: labelB, color: "var(--muted-foreground)" },
  }

  return (
    <ChartContainer config={config} className="aspect-auto h-[280px] w-full">
      <BarChart
        data={data}
        accessibilityLayer
        margin={{ left: 0, right: 8, top: 8 }}
      >
        <CartesianGrid
          vertical={false}
          stroke="var(--border)"
          strokeDasharray="2 4"
        />
        <XAxis
          dataKey="category"
          tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
          stroke="var(--border)"
          tickLine={false}
          tickFormatter={(val: string) =>
            val === "Infrastruktur"
              ? "Infras."
              : val === "Pendidikan"
                ? "Pend."
                : val === "Kesehatan"
                  ? "Kesehat."
                  : val
          }
          interval={0}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          stroke="var(--border)"
          tickLine={false}
          width={28}
        />
        <Bar dataKey="a" fill="var(--foreground)" radius={[2, 2, 0, 0]} />
        <Bar dataKey="b" fill="var(--muted-foreground)" radius={[2, 2, 0, 0]} />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  )
}
