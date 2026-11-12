"use client"

import { BADGE_STYLES, type Product } from "@/lib/products"
import { Badge } from "@/components/ui/badge"
import { linkClasses } from "@/components/ui/link"
import { BuyBox } from "@/components/patterns/buy-box"
import { ShippingCheck } from "@/components/patterns/shipping-check"

/**
 * Columna de información de la ficha: badges, título, descripción, buy box y verificación de zona.
 * Clases de styles/patterns/product-detail.css. `onViewSpecs` lleva a la tab de especificaciones.
 */
export function ProductInfo({ product, onViewSpecs }: { product: Product; onViewSpecs: (e: React.MouseEvent) => void }) {
  // Se omite "congelado": no aporta señal de decisión de compra.
  const badges = product.badges.filter((b) => b !== "congelado")
  return (
    <div className="product-info">
      {badges.length > 0 && (
        <div className="product-info__badges">
          {badges.map((b) => (
            <Badge key={b} variant="dietary">{BADGE_STYLES[b].label}</Badge>
          ))}
        </div>
      )}

      <div>
        <h1 className="product-info__title">{product.name}</h1>
        <p className="product-info__description">{product.description}</p>
        <a
          href="#detalles-producto"
          onClick={onViewSpecs}
          className={linkClasses({ underline: true, size: "xs", className: "product-info__more" })}
        >
          Ver características
        </a>
      </div>

      <BuyBox product={product} />
      <ShippingCheck />
    </div>
  )
}
