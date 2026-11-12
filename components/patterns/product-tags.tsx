import type { Product } from "@/lib/products"

/** Etiquetas de stock y entrega (Sin stock / Envío gratis / Retirá hoy) — clases de styles/patterns/product-card.css. Compartido por la card y la vista rápida. */
export function ProductTags({ product }: { product: Product }) {
  if (!product.inStock) {
    return <div className="product-tags"><span className="product-tag product-tag--danger">Sin Stock</span></div>
  }
  if (!product.freeShipping && !product.pickupToday) return null
  return (
    <div className="product-tags">
      {product.freeShipping && <span className="product-tag product-tag--success">Envío Grátis</span>}
      {product.pickupToday && <span className="product-tag product-tag--success">Retiralo Hoy</span>}
    </div>
  )
}
