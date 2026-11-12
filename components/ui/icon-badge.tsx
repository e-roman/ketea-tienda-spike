import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const SIZE = { sm: "icon-badge--sm", md: "icon-badge--md", lg: "icon-badge--lg", xl: "icon-badge--xl", xxl: "icon-badge--xxl", control: "icon-badge--control", tile: "icon-badge--tile" } as const
const TONE = { default: "", subtle: "icon-badge--subtle", brand: "icon-badge--brand", "brand-subtle": "icon-badge--brand-subtle", muted: "icon-badge--muted", plain: "icon-badge--plain", "soft-brand": "icon-badge--soft-brand", glass: "icon-badge--glass", success: "icon-badge--success" } as const
const SHAPE = { round: "", tile: "icon-badge--rounded" } as const

interface IconBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: keyof typeof SIZE
  tone?: keyof typeof TONE
  /** round: círculo. tile: cuadrado de esquinas redondeadas (radius lg). */
  shape?: keyof typeof SHAPE
}

/** Círculo con ícono — clases de styles/components/surfaces.css. El ícono (lucide) se pasa como children. */
export function IconBadge({ size = "md", tone = "default", shape = "round", className, ...props }: IconBadgeProps) {
  return <span className={cn("icon-badge", SIZE[size], TONE[tone], SHAPE[shape], className)} {...props} />
}
