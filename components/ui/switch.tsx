import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/**
 * Switch (interruptor con etiqueta) — clases de styles/components/switch.css.
 * Es un <input type="checkbox" role="switch"> real: se opera con teclado y lo lee el lector de pantalla.
 */
export const Switch = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string }>(
  function Switch({ label, className, ...props }, ref) {
    return (
      <label className={cn("switch", className)}>
        <span className="switch__label">{label}</span>
        <input ref={ref} type="checkbox" role="switch" className="switch__input" {...props} />
        <span className="switch__track" aria-hidden="true" />
      </label>
    )
  },
)
