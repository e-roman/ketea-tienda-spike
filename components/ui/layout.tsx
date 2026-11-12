import type { ElementType, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/**
 * Row / Stack — filas y columnas con gap por token (styles/components/layout.css).
 * Sirven para armar piezas sin utilidades de Tailwind; la grilla de página sigue siendo grid/grid-cols.
 */
const GAP = { 1: "gap-1x", 2: "gap-2x", 3: "gap-3x", 4: "gap-4x", 5: "gap-5x", 6: "gap-6x", 8: "gap-8x", 10: "gap-10x" } as const
const ALIGN = { start: "align-start", center: "align-center", end: "align-end", stretch: "align-stretch" } as const
const JUSTIFY = { start: "justify-start-x", center: "justify-center-x", between: "justify-between-x", end: "justify-end-x" } as const

interface FlowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  gap?: keyof typeof GAP
  align?: keyof typeof ALIGN
  justify?: keyof typeof JUSTIFY
}

export function Row({ as: Tag = "div", gap, align, justify, wrap, inline, className, ...props }: FlowProps & { wrap?: boolean; inline?: boolean }) {
  return <Tag className={cn("row", wrap && "row--wrap", inline && "row--inline", gap && GAP[gap], align && ALIGN[align], justify && JUSTIFY[justify], className)} {...props} />
}

export function Stack({ as: Tag = "div", gap, align, justify, className, ...props }: FlowProps) {
  return <Tag className={cn("stack", gap && GAP[gap], align && ALIGN[align], justify && JUSTIFY[justify], className)} {...props} />
}
