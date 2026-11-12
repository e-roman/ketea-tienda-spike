import { forwardRef, type ButtonHTMLAttributes } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Button — clases de styles/components/button.css (tokens `button.*` de @orali/design-tokens).
 * Este archivo solo arma nombres de clase: .btn .btn--{variant} .btn--{size} .btn--pill .btn--full
 * Para links con estilo de botón: <Link className={buttonClasses({ variant: "primary" })}>
 *
 * Forma: 8px por defecto (acciones de compra y de UI). `shape="pill"` solo en marketing:
 * CTAs de hero, banners y newsletter. La variante `inverse` ya es pill.
 */
export type ButtonVariant = "primary" | "add-to-cart" | "secondary" | "outline" | "neutral" | "inverse" | "outline-inverse" | "link"
export type ButtonSize = "sm" | "md" | "lg" | "xl"
export type ButtonShape = "default" | "pill"

/** Clases literales: Tailwind solo conserva las reglas de @layer components que encuentra escritas en el código. */
const variantClass: Record<ButtonVariant, string> = {
  primary: "btn--primary",
  "add-to-cart": "btn--add-to-cart",
  secondary: "btn--secondary",
  outline: "btn--outline",
  neutral: "btn--neutral",
  inverse: "btn--inverse",
  "outline-inverse": "btn--outline-inverse",
  link: "btn--link",
}
const sizeClass: Record<ButtonSize, string> = { sm: "btn--sm", md: "btn--md", lg: "btn--lg", xl: "btn--xl" }

/** Tamaño por defecto de cada jerarquía. */
const defaultSize: Record<ButtonVariant, ButtonSize> = {
  primary: "lg",
  "add-to-cart": "md",
  secondary: "md",
  outline: "lg",
  neutral: "lg",
  inverse: "md",
  "outline-inverse": "lg",
  link: "md",
}

export function buttonClasses({
  variant = "primary",
  size,
  shape = "default",
  fullWidth = false,
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; shape?: ButtonShape; fullWidth?: boolean; className?: string } = {}) {
  return cn(
    "btn",
    variantClass[variant],
    sizeClass[size ?? defaultSize[variant]],
    shape === "pill" && "btn--pill",
    fullWidth && "btn--full",
    className,
  )
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  fullWidth?: boolean
  /** Muestra spinner, mantiene el ancho y bloquea el click. */
  loading?: boolean
  loadingText?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size, shape, fullWidth, loading = false, loadingText, className, children, disabled, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, shape, fullWidth, className })}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="spinner icon-sm" aria-hidden="true" />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  )
})
