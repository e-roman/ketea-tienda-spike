import Image from "next/image"
import { Pencil } from "lucide-react"
import type { ReactNode } from "react"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { formatPrice, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"

interface OrderReviewProps {
  items: { product: Product; quantity: number }[]
  subtotal: number
  shippingCost?: number
  total: number
  className?: string
}

/** Resumen de compra del checkout (Figma: Cart / Order review). Clases de styles/patterns/order-review.css. */
export function OrderReview({ items, subtotal, shippingCost = 0, total, className }: OrderReviewProps) {
  return (
    <div className={cn("order-review", className)}>
      <h3 className="order-review__title">Resumen de la compra</h3>

      <div className="order-review__items">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="order-review__item">
            <div className="product-thumb product-thumb--md">
              <Image src={product.image} alt={product.name} fill />
            </div>
            <div className="order-review__body">
              <div className="order-review__row">
                <p className="order-review__name">{product.name}</p>
                <span className="order-review__price">{formatPrice(product.priceX3 * quantity)}</span>
              </div>
              <p className="order-review__meta">{product.packInfo}</p>
              <div className="order-review__row">
                <span className="order-review__qty">{quantity} × {formatPrice(product.priceX3)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-review__totals">
        <div className="order-review__total-row">
          <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
        </div>
        <div className="order-review__total-row order-review__total-row--free">
          <span>Envío</span><span>{shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}</span>
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
