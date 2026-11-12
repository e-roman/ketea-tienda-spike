"use client"

import Image from "next/image"
import { CheckoutCta } from "@/components/patterns/checkout-cta"
import { CouponField } from "@/components/patterns/coupon-field"
import { formatPrice } from "@/lib/products"
import { cn } from "@/lib/utils"

const PAYMENT_METHODS = [
  { src: "/cards/visa.svg", alt: "Visa", w: 34, h: 24 },
  { src: "/cards/mastercard.svg", alt: "Mastercard", w: 34, h: 24 },
  { src: "/cards/amex.svg", alt: "American Express", w: 34, h: 24 },
  { src: "/cards/cabal.svg", alt: "Cabal", w: 34, h: 24 },
  { src: "/cards/mercado-pago.svg", alt: "Mercado Pago", w: 40, h: 28 },
]

interface OrderSummaryProps {
  totalItems: number
  subtotal: number
  total: number
  minimumMet: boolean
  remainingForMinimum: number
  loading?: boolean
  onCheckout: () => void
  className?: string
}

/** Resumen del pedido — clases de styles/patterns/order-summary.css. Envío gratis en CABA. */
export function OrderSummary({
  totalItems, subtotal, total, minimumMet, remainingForMinimum, loading, onCheckout, className,
}: OrderSummaryProps) {
  return (
    <div className={cn("order-summary", className)}>
      <h2 className="order-summary__title">Resumen del pedido</h2>
      <div className="order-summary__rows">
        <div className="order-summary__row">
          <span>Subtotal ({totalItems} pack{totalItems !== 1 ? "s" : ""})</span>
          <span className="order-summary__value">{formatPrice(subtotal)}</span>
        </div>
        <div className="order-summary__row">
          <span>Envío (CABA)</span>
          <span className="order-summary__value order-summary__value--free">Gratis</span>
        </div>
        <div className="order-summary__row order-summary__row--total">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <CheckoutCta
        minimumMet={minimumMet}
        remainingForMinimum={remainingForMinimum}
        loading={loading}
        onClick={onCheckout}
        className="order-summary__cta"
      />

      <CouponField className="order-summary__coupon" />

      <div className="payment-methods">
        <p className="payment-methods__title">Medios de pago</p>
        <div className="payment-methods__list">
          {PAYMENT_METHODS.map((c) => (
            <span key={c.src} className="payment-methods__item">
              <Image src={c.src} alt={c.alt} width={c.w} height={c.h} className="order-summary__card-logo" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
