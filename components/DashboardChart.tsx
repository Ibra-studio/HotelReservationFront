"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "An interactive line chart"

const chartData = [
  // Avril 2026
  { date: "2026-04-01", reservations: 12 },
  { date: "2026-04-02", reservations: 8 },
  { date: "2026-04-03", reservations: 15 },
  { date: "2026-04-04", reservations: 21 },
  { date: "2026-04-05", reservations: 18 },
  { date: "2026-04-06", reservations: 9 },
  { date: "2026-04-07", reservations: 7 },
  { date: "2026-04-08", reservations: 19 },
  { date: "2026-04-09", reservations: 24 },
  { date: "2026-04-10", reservations: 16 },
  { date: "2026-04-11", reservations: 22 },
  { date: "2026-04-12", reservations: 14 },
  { date: "2026-04-13", reservations: 11 },
  { date: "2026-04-14", reservations: 6 },
  { date: "2026-04-15", reservations: 17 },
  { date: "2026-04-16", reservations: 23 },
  { date: "2026-04-17", reservations: 28 },
  { date: "2026-04-18", reservations: 31 },
  { date: "2026-04-19", reservations: 25 },
  { date: "2026-04-20", reservations: 13 },
  { date: "2026-04-21", reservations: 9 },
  { date: "2026-04-22", reservations: 20 },
  { date: "2026-04-23", reservations: 26 },
  { date: "2026-04-24", reservations: 33 },
  { date: "2026-04-25", reservations: 29 },
  { date: "2026-04-26", reservations: 18 },
  { date: "2026-04-27", reservations: 11 },
  { date: "2026-04-28", reservations: 8 },
  { date: "2026-04-29", reservations: 22 },
  { date: "2026-04-30", reservations: 27 },
  // Mai 2026
  { date: "2026-05-01", reservations: 30 },
  { date: "2026-05-02", reservations: 35 },
  { date: "2026-05-03", reservations: 28 },
  { date: "2026-05-04", reservations: 19 },
  { date: "2026-05-05", reservations: 14 },
  { date: "2026-05-06", reservations: 24 },
  { date: "2026-05-07", reservations: 32 },
  { date: "2026-05-08", reservations: 38 },
  { date: "2026-05-09", reservations: 41 },
  { date: "2026-05-10", reservations: 36 },
  { date: "2026-05-11", reservations: 22 },
  { date: "2026-05-12", reservations: 17 },
  { date: "2026-05-13", reservations: 29 },
  { date: "2026-05-14", reservations: 44 },
  { date: "2026-05-15", reservations: 48 },
  { date: "2026-05-16", reservations: 39 },
  { date: "2026-05-17", reservations: 33 },
  { date: "2026-05-18", reservations: 21 },
  { date: "2026-05-19", reservations: 16 },
  { date: "2026-05-20", reservations: 27 },
  { date: "2026-05-21", reservations: 35 },
  { date: "2026-05-22", reservations: 42 },
  { date: "2026-05-23", reservations: 38 },
  { date: "2026-05-24", reservations: 31 },
  { date: "2026-05-25", reservations: 19 },
  { date: "2026-05-26", reservations: 14 },
  { date: "2026-05-27", reservations: 26 },
  { date: "2026-05-28", reservations: 37 },
  { date: "2026-05-29", reservations: 43 },
  { date: "2026-05-30", reservations: 40 },
  { date: "2026-05-31", reservations: 34 },
  // Juin 2026 (1 seul jour)
  { date: "2026-06-01", reservations: 5 },
]

const chartConfig = {
  views: {
    label: "reservations",
  },
  reservations: {
    label: "Reservations",
    color: "var(--chart-1)",
  },
 
} satisfies ChartConfig

export function DashboardChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("reservations")

  const total = React.useMemo(
    () => ({
      reservations: chartData.reduce((acc, curr) => acc + curr.reservations, 0),
    
    }),
    []
  )

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Nombre de reservation par Mois</CardTitle>
          <CardDescription>
            nombre total de reservation des 3 derniers mois
          </CardDescription>
        </div>
        <div className="flex">
          {["reservations"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString("fr-FR")}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
