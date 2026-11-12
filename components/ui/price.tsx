import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/products"
import { Badge } from "./badge"

/**
 * Price — precio del pack con precio anterior, descuento y precio por unidad.
 * Clases de styles/components/price.css (`color.commerce.price.*`).
 */
// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const sizes = {
  sm: "price__current price__current--sm",
  md: "price__current price__current--md",
  lg: "price__current price__current--lg",
} as const

export interface PriceProps {
  current: number
  previous?: number
  discountPercent?: number
  unit?: number
  size?: keyof typeof sizes
  className?: string
}

export function Price({ current, previous, discountPercent, unit, size = "md", className }: PriceProps) {
  return (
    <div className={className}>
      {previous !== undefined && (
        <div className="price__previous">
          <span className="sr-only">Precio anterior: </span>
          {formatPrice(previous)}
        </div>
      )}
      <div className="price__row">
        <span className={sizes[size]}>{formatPrice(current)}</span>
        {!!discountPercent && discountPercent > 0 && <Badge variant="discount">-{discountPercent}% OFF</Badge>}
      </div>
      {unit !== undefined && <div className="price__unit">{formatPrice(unit)} por unidad</div>}
    </div>
  )
}
