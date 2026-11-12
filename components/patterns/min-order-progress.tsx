"use client"

import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useCart, MINIMUM_PACKS } from "@/lib/cart-context"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// Mapas literales (ver ui/progress.tsx).
const VARIANT = { card: "min-order--card", compact: "min-order--compact" } as const
const STATE = { true: "min-order--met", false: "min-order--short" } as const

/**
 * Progreso del pedido mínimo — clases de styles/patterns/min-order-progress.css.
 * card: alerta con borde, % y detalle en unidades (carrito). compact: una fila (drawer).
 */
export function MinOrderProgress({ variant = "card", className }: { variant?: keyof typeof VARIANT; className?: string }) {
  const { totalItems, remainingForMinimum, minimumMet } = useCart()
  const progress = Math.min((totalItems / MINIMUM_PACKS) * 100, 100)
  const Icon = minimumMet ? CheckCircle2 : AlertCircle
  const title = minimumMet
    ? "Pedido mínimo alcanzado"
    : `Faltan ${remainingForMinimum} pack${remainingForMinimum !== 1 ? "s" : ""} para el pedido mínimo`
  const state = minimumMet ? "success" : "error"
  const label = `${totalItems} de ${MINIMUM_PACKS} packs`

  const root = cn("min-order", VARIANT[variant], STATE[String(minimumMet) as "true" | "false"], className)

  if (variant === "compact") {
    return (
      <div className={root}>
        <div className="min-order__title">
          <Icon className="min-order__icon" aria-hidden="true" />
          <span className="min-order__label">{title}</span>
        </div>
        <div className="min-order__row w-full">
          <Progress value={progress} state={state} label={title} />
          <span className="min-order__count">{label}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={root}>
      <Icon className="min-order__icon" aria-hidden="true" />
      <div className="min-order__body">
        <div className="min-order__head">
          <span className="min-order__title">{title}</span>
          <span className="min-order__pct">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} state={state} label={title} />
        <p className="min-order__caption">
          {label} · {totalItems * 3} unidades
        </p>
      </div>
    </div>
  )
}
