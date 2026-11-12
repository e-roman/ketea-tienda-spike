"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const HINT = { true: "checkout-cta__hint checkout-cta__hint--ready", false: "checkout-cta__hint" } as const

interface CheckoutCtaProps {
  minimumMet: boolean
  remainingForMinimum: number
  loading?: boolean
  onClick: () => void
  label?: string
  className?: string
}

/**
 * Botón de finalizar compra + leyenda de estado (Figma: Cart / Order summary).
 * Deshabilitado hasta alcanzar el pedido mínimo. Compartido por el resumen del carrito y el drawer.
 */
export function CheckoutCta({
  minimumMet, remainingForMinimum, loading = false, onClick, label = "Finalizar compra", className,
}: CheckoutCtaProps) {
  return (
    <div className={cn("checkout-cta", className)}>
      {minimumMet ? (
        <Button fullWidth onClick={onClick} loading={loading} loadingText="Redirigiendo…">
          {label}
        </Button>
      ) : (
        <Button fullWidth disabled>
          {label}
        </Button>
      )}
      <p className={HINT[String(minimumMet) as "true" | "false"]}>
        {minimumMet ? (
          <>
            <Check className="checkout-cta__icon" aria-hidden="true" /> Listo para finalizar
          </>
        ) : (
          `Faltan ${remainingForMinimum} pack${remainingForMinimum !== 1 ? "s" : ""} para poder finalizar la compra`
        )}
      </p>
    </div>
  )
}
