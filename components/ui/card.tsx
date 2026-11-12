import type { ElementType, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const TONE = { default: "", subtle: "card--subtle", muted: "card--muted", brand: "card--brand" } as const
const RADIUS = { md: "", lg: "card--lg", xl: "card--xl" } as const
const PAD = { none: "", sm: "card--pad-sm", md: "card--pad-md", lg: "card--pad-lg", panel: "card--panel" } as const

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  /** Solo con as="a". */
  href?: string
  target?: string
  rel?: string
  tone?: keyof typeof TONE
  radius?: keyof typeof RADIUS
  padding?: keyof typeof PAD
  shadow?: boolean
  borderless?: boolean
}

/** Card — clases de styles/components/surfaces.css. El layout interno (flex, grid, gap) va con utilidades de Tailwind. */
export function Card({ as: Tag = "div", tone = "default", radius = "md", padding = "none", shadow, borderless, className, ...props }: CardProps) {
  return (
    <Tag
      className={cn("card", TONE[tone], RADIUS[radius], PAD[padding], shadow && "card--shadow", borderless && "card--borderless", className)}
      {...props}
    />
  )
}
