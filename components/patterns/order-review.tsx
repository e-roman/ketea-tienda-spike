import Image from "next/image"
import { Pencil } from "lucide-react"
import type { ReactNode } from "react"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { formatPrice, type Product } from "@/lib/products"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface OrderReviewProps {
  items: { product: Product; quantity: number }[]
  subtotal: number
  shippingCost?: number
  /** Nombre del método de envío elegido (ej. «Envío Express»). */
  shippingLabel?: string
  total: number
  className?: string
}

/** Resumen de compra del checkout (Figma: Cart / Order review). Clases de styles/patterns/order-review.css. */
export function OrderReview({ items, subtotal, shippingCost = 0, shippingLabel, total, className }: OrderReviewProps) {
  return (
    <div className={cn("order-review", className)}>
      <h3 className="order-review__title">Resumen de la compra</h3>

      <div className="order-review__items">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="order-review__item">
            <div className="order-review__thumb">
              <Badge variant="counter" className="order-review__qty-badge">{quantity}</Badge>
              <div className="product-thumb product-thumb--md">
                <Image src={product.image} alt={product.name} fill />
              </div>
            </div>
            <div className="order-review__body">
              <p className="order-review__name">{product.name}</p>
              <p className="order-review__price">{formatPrice(product.priceX3)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="order-review__totals">
        <div className="order-review__total-row">
          <span>Producto ({items.reduce((n, i) => n + i.quantity, 0)})</span><span>{formatPrice(subtotal)}</span>
        </div>
        {shippingLabel && (
          <div className="order-review__total-row">
            <span>Método de envío</span><span>{shippingLabel}</span>
          </div>
        )}
        <div className={shippingCost === 0 ? "order-review__total-row order-review__total-row--free" : "order-review__total-row"}>
          <span>Costo de envío</span><span>{shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}</span>
        </div>
        <div className="order-review__total-row order-review__total-row--grand">
          <span>Total</span><span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}

/** Tarjeta de recap de un paso completado, con botón de editar. */
export function RecapCard({ title, editLabel, onEdit, children }: {
  title: string
  editLabel: string
  onEdit: () => void
  children: ReactNode
}) {
  return (
    <div className="recap-card">
      <div className="recap-card__head">
        <p className="recap-card__title">{title}</p>
        <button onClick={onEdit} aria-label={editLabel} className={iconButtonClasses({ variant: "plain" })}>
          <Pencil className="icon-xs" aria-hidden="true" />
        </button>
      </div>
      <div className="recap-card__body">{children}</div>
    </div>
  )
}
