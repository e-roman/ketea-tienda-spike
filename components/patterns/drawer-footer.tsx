"use client"

import Link from "next/link"
import { buttonClasses } from "@/components/ui/button"
import { CheckoutCta } from "@/components/patterns/checkout-cta"
import { formatPrice } from "@/lib/products"

interface DrawerFooterProps {
  total: number
  loading?: boolean
  onCheckout: () => void
  onNavigate: () => void
}

/** Pie del drawer del carrito: total (con el envío elegido), "Iniciar compra" y link al carrito — clases de styles/patterns/order-summary.css. */
export function DrawerFooter({ total, loading, onCheckout, onNavigate }: DrawerFooterProps) {
  return (
    <div className="drawer-footer">
      <div className="drawer-footer__row">
        <span>Total:</span>
        <span>{formatPrice(total)}</span>
      </div>
      <CheckoutCta label="Iniciar compra" loading={loading} onClick={onCheckout} />
      <Link href="/carrito" onClick={onNavigate} className={buttonClasses({ variant: "link", fullWidth: true })}>
        Ver carrito completo
      </Link>
    </div>
  )
}
