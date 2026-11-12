import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Field — label + control + hint/error. Clases de styles/components/field.css.
 * Label: `typography.label` (14px / 500) en `color.form.label`, igual que Figma "Input field".
 * `note` es el texto entre paréntesis ("opcional", "si no sos vos"): mismo peso que el label.
 * Envuelve al control en <label>, así no hace falta id/htmlFor.
 */
export function Field({
  label,
  note,
  hint,
  error,
  className,
  children,
}: {
  label: ReactNode
  note?: string
  hint?: ReactNode
  error?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <label className={cn("field", className)}>
      <span className="field__label">
        {label}
        {note && <span className="field__note"> ({note})</span>}
      </span>
      {children}
      {error ? (
        <span role="alert" className="field__error">{error}</span>
      ) : hint ? (
        <span className="field__hint">{hint}</span>
      ) : null}
    </label>
  )
}
