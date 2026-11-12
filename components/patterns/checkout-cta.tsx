"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CheckoutCtaProps {
  loading?: boolean
  onClick: () => void
  label?: string
  className?: string
}

/** Botón de finalizar compra (Figma: Cart / Order summary). Compartido por el resumen del carrito y el drawer. */
export function CheckoutCta({ loading = false, onClick, label = "Finalizar compra", className }: CheckoutCtaProps) {
  return (
    <div className={cn("checkout-cta", className)}>
      <Button fullWidth onClick={onClick} loading={loading} loadingText="Redirigiendo…">
        {label}
      </Button>
    </div>
  )
}
