import { forwardRef, type InputHTMLAttributes } from "react"
import { Check, CircleAlert } from "lucide-react"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  note?: string
  /** Mensaje de error: pinta el borde de rojo y muestra un ícono de alerta. */
  error?: string
  /** Campo ya validado: borde verde e ícono de check. */
  valid?: boolean
}

/**
 * Campo de formulario con estado de validación (Figma: Input field / error, success).
 * Etiqueta, borde de color e ícono al final; el mensaje de error va debajo. Clases de styles/components/input.css.
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { label, note, error, valid, className, ...props },
  ref,
) {
  return (
    <Field label={label} note={note} error={error} className={className}>
      <span className="input-wrap">
        <Input
          ref={ref}
          aria-invalid={error ? true : undefined}
          data-valid={valid && !error ? true : undefined}
          className={cn((error || valid) && "input--with-status")}
          {...props}
        />
        {error && <CircleAlert className="input-status-icon input-status-icon--error" aria-hidden="true" />}
        {valid && !error && <Check className="input-status-icon input-status-icon--ok" aria-hidden="true" />}
      </span>
    </Field>
  )
})
