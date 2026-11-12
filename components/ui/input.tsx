import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/**
 * Input / Select — clases de styles/components/input.css (`input.form.*`, `input.pill.*`, `select.size.*`).
 * Focus: el borde pasa a `color.form.border-focus` (2px con el box-shadow de globals.css) y el fondo a `surface.default`.
 */
export type InputVariant = "form" | "pill"

/** Clases literales: Tailwind solo conserva las reglas de @layer components que encuentra escritas en el código. */
const variantClass: Record<InputVariant, string> = { form: "input--form", pill: "input--pill" }

export function inputClasses(variant: InputVariant = "form", className?: string) {
  return cn("input", variantClass[variant], className)
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { variant?: InputVariant }>(
  function Input({ variant = "form", className, ...props }, ref) {
    return <input ref={ref} className={inputClasses(variant, className)} {...props} />
  },
)

/** md 40px (barras de herramientas, p. ej. "Ordenar por") · lg 44px (formularios, por defecto). Tokens `select.size.*`. */
export type SelectSize = "md" | "lg"
const selectSizeClass: Record<SelectSize, string> = { md: "select--md", lg: "select--lg" }

export const Select = forwardRef<
  HTMLSelectElement,
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & { variant?: InputVariant; size?: SelectSize }
>(function Select({ variant = "form", size = "lg", className, ...props }, ref) {
  return <select ref={ref} className={inputClasses(variant, cn("select", selectSizeClass[size], className))} {...props} />
})
