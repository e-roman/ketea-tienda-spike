import { Loader2, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Stepper — control de cantidad. Clases de styles/components/stepper.css (tokens `stepper.*`).
 * Comparte radius y altura con Button "add-to-cart" (se reemplazan en el mismo slot).
 */
export interface StepperProps {
  value: number
  onDecrement: () => void
  onIncrement: () => void
  /** Nombre del producto para el aria-label del grupo. */
  label: string
  /** Unidad de los botones: "pack" → "Quitar un pack" / "Agregar un pack". */
  unit?: string
  loading?: "inc" | "dec" | null
  min?: number
  max?: number
  /** sm 32px (carrito, drawer) · md 40px (card) · lg 44px (PDP). Área táctil de 44px en los tres. */
  size?: "sm" | "md" | "lg"
  className?: string
}

/** Clases literales: Tailwind solo conserva las reglas de @layer components que encuentra escritas en el código. */
const sizeClass = { sm: "stepper--sm", md: "stepper--md", lg: "stepper--lg" } as const

export function Stepper({
  value,
  onDecrement,
  onIncrement,
  label,
  unit = "pack",
  loading = null,
  min = 0,
  max,
  size = "md",
  className,
}: StepperProps) {
  const busy = loading !== null
  const icon = "stepper__icon"
  return (
    <div
      role="group"
      aria-label={`Cantidad de ${label}`}
      className={cn("stepper", sizeClass[size], className)}
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={busy || value <= min}
        aria-label={`Quitar un ${unit}`}
        className="stepper__btn"
      >
        {loading === "dec" ? <Loader2 className={cn(icon, "spinner")} aria-hidden="true" /> : <Minus className={icon} aria-hidden="true" />}
      </button>
      <span aria-live="polite" className="stepper__value">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={busy || (max !== undefined && value >= max)}
        aria-label={`Agregar un ${unit}`}
        className="stepper__btn"
      >
        {loading === "inc" ? <Loader2 className={cn(icon, "spinner")} aria-hidden="true" /> : <Plus className={icon} aria-hidden="true" />}
      </button>
    </div>
  )
}
