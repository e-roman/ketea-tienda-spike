import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Badge — clases de styles/components/badge.css (`badge.discount.*`, `badge.counter.*`). */
export type BadgeVariant = "discount" | "counter" | "outline"

/** Clases literales: Tailwind solo conserva las reglas de @layer components que encuentra escritas en el código. */
const variantClass: Record<BadgeVariant, string> = { discount: "badge--discount", counter: "badge--counter", outline: "badge--outline" }

export function Badge({ variant, children, className }: { variant: BadgeVariant; children: ReactNode; className?: string }) {
  return <span className={cn("badge", variantClass[variant], className)}>{children}</span>
}
