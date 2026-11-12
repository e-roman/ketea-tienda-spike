import { forwardRef, type InputHTMLAttributes } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Checkbox con etiqueta y cantidad opcional (ej. "Dolphin (13)") — clases de styles/components/checkbox.css.
 * Es un <input type="checkbox"> real; el recuadro se dibuja al lado.
 */
export const Checkbox = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string; count?: number }>(
  function Checkbox({ label, count, className, ...props }, ref) {
    return (
      <label className={cn("checkbox", className)}>
        <input ref={ref} type="checkbox" className="checkbox__input" {...props} />
        <span className="checkbox__box" aria-hidden="true">
          <Check className="checkbox__tick" />
        </span>
        <span className="checkbox__label">{label}{count !== undefined && ` (${count})`}</span>
      </label>
    )
  },
)
