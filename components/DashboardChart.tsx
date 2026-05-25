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
  { date: "2024-04-01", reservations: 222 },
  { date: "2024-04-02", reservations: 97 },
  { date: "2024-04-03", reservations: 167 },
  { date: "2024-04-04", reservations: 242 },
  { date: "2024-04-05", reservations: 373 },
  { date: "2024-04-06", reservations: 301 },
  { date: "2024-04-07", reservations: 245 },
  { date: "2024-04-08", reservations: 409 },
  { date: "2024-04-09", reservations: 59 },
  { date: "2024-04-10", reservations: 261 },
  { date: "2024-04-11", reservations: 327 },
  { date: "2024-04-12", reservations: 292 },
  { date: "2024-04-13", reservations: 342 },
  { date: "2024-04-14", reservations: 137 },
  { date: "2024-04-15", reservations: 120 },
  { date: "2024-04-16", reservations: 138 },
  { date: "2024-04-17", reservations: 446 },
  { date: "2024-04-18", reservations: 364 },
  { date: "2024-04-19", reservations: 243 },
  { date: "2024-04-20", reservations: 89 },
  { date: "2024-04-21", reservations: 137 },
  { date: "2024-04-22", reservations: 224 },
  { date: "2024-04-23", reservations: 138 },
  { date: "2024-04-24", reservations: 387 },
  { date: "2024-04-25", reservations: 215 },
  { date: "2024-04-26", reservations: 75 },
  { date: "2024-04-27", reservations: 383 },
  { date: "2024-04-28", reservations: 122 },
  { date: "2024-04-29", reservations: 315 },
  { date: "2024-04-30", reservations: 454 },
  { date: "2024-05-01", reservations: 165 },
  { date: "2024-05-02", reservations: 293 },
  { date: "2024-05-03", reservations: 247 },
  { date: "2024-05-04", reservations: 385 },
  { date: "2024-05-05", reservations: 481 },
  { date: "2024-05-06", reservations: 498 },
  { date: "2024-05-07", reservations: 388 },
  { date: "2024-05-08", reservations: 149 },
  { date: "2024-05-09", reservations: 227 },
  { date: "2024-05-10", reservations: 293 },
  { date: "2024-05-11", reservations: 335 },
  { date: "2024-05-12", reservations: 197 },
  { date: "2024-05-13", reservations: 197 },
  { date: "2024-05-14", reservations: 448 },
  { date: "2024-05-15", reservations: 473 },
  { date: "2024-05-16", reservations: 338 },
  { date: "2024-05-17", reservations: 499 },
  { date: "2024-05-18", reservations: 315 },
  { date: "2024-05-19", reservations: 235 },
  { date: "2024-05-20", reservations: 177 },
  { date: "2024-05-21", reservations: 82 },
  { date: "2024-05-22", reservations: 81 },
  { date: "2024-05-23", reservations: 252 },
  { date: "2024-05-24", reservations: 294 },
  { date: "2024-05-25", reservations: 201 },
  { date: "2024-05-26", reservations: 213 },
  { date: "2024-05-27", reservations: 420 },
  { date: "2024-05-28", reservations: 233 },
  { date: "2024-05-29", reservations: 78 },
  { date: "2024-05-30", reservations: 340 },
  { date: "2024-05-31", reservations: 178 },
  { date: "2024-06-01", reservations: 178 },
  { date: "2024-06-02", reservations: 470 },
  { date: "2024-06-03", reservations: 103 },
  { date: "2024-06-04", reservations: 439 },
  { date: "2024-06-05", reservations: 88 },
  { date: "2024-06-06", reservations: 294 },
  { date: "2024-06-07", reservations: 323 },
  { date: "2024-06-08", reservations: 385 },
  { date: "2024-06-09", reservations: 438 },
  { date: "2024-06-10", reservations: 155 },
  { date: "2024-06-11", reservations: 92 },
  { date: "2024-06-12", reservations: 492 },
  { date: "2024-06-13", reservations: 81 },
  { date: "2024-06-14", reservations: 426 },
  { date: "2024-06-15", reservations: 307 },
  { date: "2024-06-16", reservations: 371 },
  { date: "2024-06-17", reservations: 475 },
  { date: "2024-06-18", reservations: 107 },
  { date: "2024-06-19", reservations: 341 },
  { date: "2024-06-20", reservations: 408 },
  { date: "2024-06-21", reservations: 169 },
  { date: "2024-06-22", reservations: 317 },
  { date: "2024-06-23", reservations: 480 },
  { date: "2024-06-24", reservations: 132 },
  { date: "2024-06-25", reservations: 141 },
  { date: "2024-06-26", reservations: 434 },
  { date: "2024-06-27", reservations: 448 },
  { date: "2024-06-28", reservations: 149 },
  { date: "2024-06-29", reservations: 103 },
  { date: "2024-06-30", reservations: 446 },
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
