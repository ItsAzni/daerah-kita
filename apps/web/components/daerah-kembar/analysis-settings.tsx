"use client"

import * as React from "react"
import { RotateCcw, Scale, SlidersHorizontal } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { INDICATORS, INDICATOR_CATEGORIES } from "@/data/indicators"
import { DEFAULT_WEIGHTS, equalWeightPercentages } from "@/lib/similarity"

export type AnalysisSettingsValue = {
  weights: Record<string, number>
  activeCodes: string[]
}

export function AnalysisSettings({
  value,
  onChange,
  trigger,
}: {
  value: AnalysisSettingsValue
  onChange: (next: AnalysisSettingsValue) => void
  trigger?: React.ReactElement
}) {
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<AnalysisSettingsValue>(value)

  // Setiap kali panel dibuka, draft diambil dari nilai yang sedang dipakai.
  // Reset dilakukan di event handler, bukan di effect, agar tidak memicu
  // render berantai.
  function handleOpenChange(next: boolean) {
    if (next) setDraft(value)
    setOpen(next)
  }

  // Hanya indikator aktif yang dihitung, karena indikator nonaktif dikeluarkan
  // dari perhitungan dan bobotnya dinormalisasi ulang.
  const total = draft.activeCodes.reduce(
    (sum, code) => sum + (draft.weights[code] ?? 0),
    0
  )
  const totalRounded = Math.round(total * 10) / 10
  const isValid =
    Math.abs(totalRounded - 100) < 0.01 && draft.activeCodes.length > 0

  const activeCodes = draft.activeCodes

  function toggleIndicator(code: string, enabled: boolean) {
    setDraft((current) => {
      const nextActive = enabled
        ? [...current.activeCodes, code]
        : current.activeCodes.filter((item) => item !== code)
      return { ...current, activeCodes: nextActive }
    })
  }

  function setWeight(code: string, weight: number) {
    setDraft((current) => ({
      ...current,
      weights: { ...current.weights, [code]: weight },
    }))
  }

  function normalize() {
    const even = equalWeightPercentages(draft.activeCodes)
    setDraft((current) => ({
      ...current,
      weights: Object.fromEntries(
        INDICATORS.map((indicator) => [
          indicator.code,
          even[indicator.code] ?? 0,
        ])
      ),
    }))
  }

  function reset() {
    setDraft({
      weights: { ...DEFAULT_WEIGHTS },
      activeCodes: INDICATORS.map((indicator) => indicator.code),
    })
  }

  function apply() {
    onChange(draft)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {trigger ? (
        <SheetTrigger render={trigger} />
      ) : (
        <SheetTrigger
          render={
            <Button variant="outline" className="min-h-11 md:min-h-9">
              <SlidersHorizontal data-icon="inline-start" />
              Atur bobot indikator
            </Button>
          }
        />
      )}
      <SheetContent
        side="right"
        className="w-full gap-0 data-[side=right]:sm:max-w-lg"
      >
        <SheetHeader>
          <SheetTitle>Bobot indikator</SheetTitle>
          <SheetDescription>
            Matikan indikator yang tidak relevan, lalu atur bobotnya. Total
            bobot harus tepat 100%.
          </SheetDescription>
        </SheetHeader>

        <div className="flex items-center justify-between gap-3 border-y border-border px-6 py-3">
          <span className="text-sm">Total bobot</span>
          <Badge variant={isValid ? "secondary" : "destructive"}>
            <span className="tabular-nums">{totalRounded}%</span>
          </Badge>
        </div>

        <Tabs
          defaultValue={INDICATOR_CATEGORIES[0]}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="border-b border-border px-6">
            <TabsList
              variant="line"
              className="flex h-10 w-full [scrollbar-width:none] items-center justify-between gap-2 overflow-x-auto overflow-y-hidden bg-transparent px-0 py-0 [&::-webkit-scrollbar]:hidden"
            >
              {INDICATOR_CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="relative inline-flex h-full flex-none items-center justify-center px-1 text-xs font-medium whitespace-nowrap text-muted-foreground transition-colors data-active:text-foreground data-active:after:absolute data-active:after:inset-x-0 data-active:after:bottom-0 data-active:after:h-0.5 data-active:after:bg-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <div className="px-6 py-2">
              {INDICATOR_CATEGORIES.map((category) => (
                <TabsContent
                  key={category}
                  value={category}
                  className="mt-0 outline-none"
                >
                  <FieldGroup className="gap-0">
                    {INDICATORS.filter(
                      (indicator) => indicator.category === category
                    ).map((indicator) => {
                      const enabled = activeCodes.includes(indicator.code)
                      return (
                        <Field
                          key={indicator.code}
                          data-disabled={!enabled}
                          className="flex flex-col gap-3 border-b border-border/60 py-4.5 transition-opacity last:border-b-0 data-[disabled=true]:opacity-50"
                        >
                          <Field orientation="horizontal">
                            <FieldContent>
                              <FieldLabel htmlFor={`switch-${indicator.code}`}>
                                {indicator.name}
                              </FieldLabel>
                              <FieldDescription>
                                {indicator.unit} · {indicator.period}
                              </FieldDescription>
                            </FieldContent>
                            <Switch
                              id={`switch-${indicator.code}`}
                              checked={enabled}
                              onCheckedChange={(checked) =>
                                toggleIndicator(indicator.code, checked)
                              }
                              aria-label={`Aktifkan ${indicator.name}`}
                            />
                          </Field>
                          <div className="flex items-center gap-3">
                            <Slider
                              value={draft.weights[indicator.code] ?? 0}
                              min={0}
                              max={100}
                              step={1}
                              disabled={!enabled}
                              onValueChange={(next) =>
                                setWeight(
                                  indicator.code,
                                  typeof next === "number" ? next : Number(next)
                                )
                              }
                              aria-label={`Bobot ${indicator.name}`}
                            />
                            <span className="w-10 text-end text-sm text-muted-foreground tabular-nums">
                              {Math.round(draft.weights[indicator.code] ?? 0)}%
                            </span>
                          </div>
                        </Field>
                      )
                    })}
                  </FieldGroup>
                </TabsContent>
              ))}
            </div>
          </ScrollArea>
        </Tabs>

        <SheetFooter className="border-t border-border">
          {!isValid ? (
            <Alert variant="destructive">
              <AlertTitle>Total bobot {totalRounded}%</AlertTitle>
              <AlertDescription>
                Sesuaikan bobot sampai berjumlah 100%, atau tekan Normalisasi
                bobot.
              </AlertDescription>
            </Alert>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={normalize}>
              <Scale data-icon="inline-start" />
              Normalisasi bobot
            </Button>
            <Button variant="ghost" onClick={reset}>
              <RotateCcw data-icon="inline-start" />
              Reset
            </Button>
          </div>
          <Button onClick={apply} disabled={!isValid}>
            Terapkan ke peringkat
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
