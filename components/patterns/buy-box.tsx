"use client"

import { useState } from "react"
import { Check, Info, ShoppingCart, Snowflake } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice, getDiscountPercent, type Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/ui/stepper"
import { Price } from "@/components/ui/price"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const CTA_STATE = { true: "btn--added", false: undefined } as const

/**
 * Buy box de la ficha (Figma: Product Detail / Product / Buy box): precio, cantidad de packs,
 * CTA y aviso de freezer. Clases de styles/patterns/buy-box.css y styles/components/callout.css.
 */
export function BuyBox({ product }: { product: Product }) {
  const { add } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const discountPercent = getDiscountPercent(product)

  function handleAdd() {
    for (let i = 0; i < quantity; i++) add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="buy-box">
      <div className="price-box">
        <Price
          size="lg"
          current={product.priceX3}
          previous={discountPercent > 0 ? product.originalPriceX3 : undefined}
          discountPercent={discountPercent}
          unit={product.priceUnit}
        />
        <div className="price-box__pack">
          <Info aria-hidden="true" />
          <span><strong>{product.packInfo}</strong></span>
        </div>
      </div>

      <div>
        <p className="buy-box__label">¿Cuántas unidades querés?</p>
        <div className="buy-box__quantity">
          <Stepper
            size="lg"
            min={1}
            unit="unidad"
            value={quantity}
            label={product.name}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            onIncrement={() => setQuantity((q) => q + 1)}
            className="buy-box__stepper"
          />
          <span className="buy-box__hint">
            Total · {formatPrice(product.priceX3 * quantity)}
          </span>
        </div>
      </div>

      <Button variant="add-to-cart" size="lg" onClick={handleAdd} className={CTA_STATE[String(added) as "true" | "false"]}>
        {added ? (
          <><Check className="icon-sm" aria-hidden="true" /> ¡Agregado al carrito!</>
        ) : (
          <><ShoppingCart className="icon-sm" aria-hidden="true" /> Agregar {quantity} unidad{quantity > 1 ? "es" : ""}</>
        )}
      </Button>

      {product.badges.includes("apto-freezer") && (
        <div className="callout callout--info">
          <Snowflake aria-hidden="true" />
          <span>Garantía oficial del fabricante. Conservá la factura de compra.</span>
        </div>
      )}
    </div>
  )
}
