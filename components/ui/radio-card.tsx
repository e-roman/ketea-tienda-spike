import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const CARD = {
  true: "radio-card radio-card--selected",
  false: "radio-card",
} as const

export interface RadioOption<T extends string> {
  value: T
  label: string
  /** Una línea por elemento, bajo el título. */
  description?: string[]
  disabled?: boolean
}

interface RadioGroupProps<T extends string> {
  /** Mismo `name` en todos los grupos que comparten una elección (ej. domicilio y local). */
  name: string
  /** Título del grupo; admite un ícono. */
  legend?: ReactNode
  options: RadioOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

/**
 * Grupo de opciones simples (Figma: Radio group / Radio group item): tarjeta con círculo, título y detalle.
 * La elegida se tiñe con el color de marca. Son <input type="radio"> reales: teclado y lector de pantalla funcionan.
 * Clases de styles/components/radio-card.css.
 */
export function RadioGroup<T extends string>({ name, legend, options, value, onChange, className }: RadioGroupProps<T>) {
  return (
    <fieldset className={cn("radio-group", className)}>
      {legend && <legend className="radio-group__legend">{legend}</legend>}
      {options.map((o) => {
        const selected = o.value === value
        return (
          <label key={o.value} className={cn(CARD[String(selected) as "true" | "false"], o.disabled && "radio-card--disabled")}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={selected}
              disabled={o.disabled}
              onChange={() => onChange(o.value)}
              className="radio-card__input"
            />
            <span className="radio-card__dot" aria-hidden="true" />
            <span className="radio-card__text">
              <span className="radio-card__title">{o.label}</span>
              {o.description?.map((line) => <span key={line} className="radio-card__desc">{line}</span>)}
            </span>
          </label>
        )
      })}
    </fieldset>
  )
}
