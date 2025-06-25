"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import type { Payload as RechartsPayload, ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'
import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

type ThemeColors = Record<keyof typeof THEMES, string>

export type ChartConfig = {
  [key: string]: {
    label?: string
    icon?: React.ComponentType<{ className?: string }>
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: ThemeColors }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

// Chart Container Component
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        className={cn("w-full h-[350px]", className)}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

// Chart Tooltip Component
interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: RechartsPayload<ValueType, NameType>[]
  label?: string | number
  hideLabel?: boolean
  hideIcon?: boolean
  format?: (value: number) => string
  valueFormatter?: (value: number) => string
  labelFormatter?: (value: string) => string
  hideColorBadge?: boolean
}

const ChartTooltip: typeof RechartsPrimitive.Tooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({
    className,
    active,
    payload,
    label,
    hideLabel = false,
    hideIcon = false,
    format,
    valueFormatter = (value) => value.toString(),
    labelFormatter = (value) => String(value),
    hideColorBadge = false,
    ...props
  }, ref) => {
    const { config } = useChart()
    
    if (!active || !payload || !payload.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-background p-4 text-sm shadow-sm",
          className
        )}
        {...props}
      >
        {!hideLabel && label && (
          <div className="mb-2 font-medium">
            {labelFormatter(String(label))}
          </div>
        )}
        <div className="space-y-1">
          {payload.map((item, index) => {
            if (!item.dataKey) return null
            const configItem = config[String(item.dataKey)] || {}
            const color = 'color' in configItem ? configItem.color : undefined
            const Icon = configItem.icon
            const value = Number(item.value)
            
            return (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {!hideColorBadge && color && (
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}
                  {!hideIcon && Icon && (
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-muted-foreground">
                    {configItem.label || String(item.name || '')}
                  </span>
                </div>
                <span className="font-medium">
                  {format ? format(value) : valueFormatter(value)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

// Chart Legend Component
interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  payload?: Array<{
    value: string
    type?: string
    id: string
    color?: string
    payload?: RechartsPayload<ValueType, NameType>
  }>
  verticalAlign?: 'top' | 'middle' | 'bottom'
  hideIcon?: boolean
  hideLabel?: boolean
  hideColorBadge?: boolean
  hideValue?: boolean
  format?: (value: number) => string
  valueFormatter?: (value: number) => string
  labelFormatter?: (value: string) => string
}

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({
    className,
    payload = [],
    hideIcon = false,
    hideLabel = false,
    hideColorBadge = false,
    hideValue = false,
    format,
    valueFormatter = (value) => value.toString(),
    labelFormatter = (value) => value,
    ...props
  }, ref) => {
    const { config } = useChart()
    
    if (!payload || !payload.length) return null

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-4", className)}
        {...props}
      >
        {payload.map((item) => {
          const configItem = config[item.value] || {}
          const color = 'color' in configItem ? configItem.color : undefined
          const Icon = configItem.icon
          const value = item.payload?.value ? Number(item.payload.value) : 0

          return (
            <div key={item.id} className="flex items-center gap-2">
              {!hideColorBadge && color && (
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
              {!hideIcon && Icon && (
                <Icon className="h-4 w-4 text-muted-foreground" />
              )}
              {!hideLabel && (
                <span className="text-sm text-muted-foreground">
                  {labelFormatter(configItem.label || item.value)}
                </span>
              )}
              {!hideValue && value !== undefined && (
                <span className="text-sm font-medium">
                  {format ? format(value) : valueFormatter(value)}
                </span>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegendContent"

// Export all components
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};

// Re-export all recharts components
export * from 'recharts';
