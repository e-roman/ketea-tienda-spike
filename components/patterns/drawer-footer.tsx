"use client"

import Link from "next/link"
import { buttonClasses } from "@/components/ui/button"
import { CheckoutCta } from "@/components/patterns/checkout-cta"
import { formatPrice } from "@/lib/products"

interface DrawerFooterProps {
  subtotal: number
  minimumMet: boolean
  remainingForMinimum: number
  loading?: boolean
  onCheckout: () => void
  onNavigate: () => void
}

/** Pie del drawer del carrito — clases de styles/patterns/order-summary.css. */
export function DrawerFooter({ subtotal, minimumMet, remainingForMinimum, loading, onCheckout, onNavigate }: DrawerFooterProps) {
  return (
    <div className="drawer-footer">
      <div className="drawer-footer__row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <CheckoutCta minimumMet={minimumMet} remainingForMinimum={remainingForMinimum} loading={loading} onClick={onCheckout} />
      <Link href="/carrito" onClick={onNavigate} className={buttonClasses({ variant: "link", fullWidth: true })}>
        Ver carrito completo
      </Link>
    </div>
  )
}
