import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const RADIUS = { sm: "skeleton--sm", md: "", lg: "skeleton--lg", xl: "skeleton--xl", pill: "skeleton--pill" } as const
const H = {
  1: "skeleton--h-1", 3: "skeleton--h-3", 4: "skeleton--h-4", 5: "skeleton--h-5", 6: "skeleton--h-6", 7: "skeleton--h-7", 8: "skeleton--h-8",
  10: "skeleton--h-10", 11: "skeleton--h-11", 20: "skeleton--h-20", 24: "skeleton--h-24", 40: "skeleton--h-40", 64: "skeleton--h-64",
} as const
const W = {
  16: "skeleton--w-16", 20: "skeleton--w-20", 24: "skeleton--w-24", 32: "skeleton--w-32", 40: "skeleton--w-40", 48: "skeleton--w-48",
  56: "skeleton--w-56", 64: "skeleton--w-64", 80: "skeleton--w-80", "1/3": "skeleton--w-1-3", "1/2": "skeleton--w-1-2", "3/4": "skeleton--w-3-4", full: "skeleton--w-full",
} as const

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  radius?: keyof typeof RADIUS
  /** Más claro: bloques grandes de fondo. */
  soft?: boolean
  /** Alto y ancho por escalón de token (no clases de Tailwind). */
  h?: keyof typeof H
  w?: keyof typeof W
}

/** Bloque de carga — clases de styles/components/surfaces.css. */
export function Skeleton({ radius = "md", soft, h, w, className, ...props }: SkeletonProps) {
  return <div aria-hidden="true" className={cn("skeleton", RADIUS[radius], soft && "skeleton--soft", h && H[h], w && W[w], className)} {...props} />
}
