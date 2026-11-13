"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Banknote, Check, CreditCard, Store, Truck } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice, getDiscountPercent, type Product } from "@/lib/products"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/ui/stepper"
import { ProductTags } from "@/components/patterns/product-tags"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const CTA_STATE = { true: "btn--added", false: undefined } as const

/**
 * Buy box de la ficha (Figma: Product Detail / Product / Buy box): precio con descuento, cuotas, beneficios de pago y entrega,
 * cantidad y CTA. Clases de styles/patterns/buy-box.css.
 */
export function BuyBox({ product }: { product: Product }) {
  const { add } = useCart()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const discountPercent = getDiscountPercent(product)
  const inStock = !!product.inStock

  // Mismo comportamiento que la card y la vista rápida: loader mientras "agrega", luego confirma
  function handleAdd() {
    if (!inStock || adding) return
    setAdding(true)
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) add(product)
      setAdding(false)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }, 600)
  }

  // Comprar ahora: suma al carrito y sigue directo al checkout
  function handleBuyNow() {
    if (!inStock) return
    for (let i = 0; i < quantity; i++) add(product)
    router.push("/checkout")
  }

  return (
    <div className="buy-box">
      {!inStock && <ProductTags product={product} />}

      <div className="buy-box__price">
        {discountPercent > 0 && product.originalPriceX3 !== undefined && (
          <div className="buy-box__price-old">
            <del><span className="sr-only">Precio anterior: </span>{formatPrice(product.originalPriceX3)}</del>
            <Badge variant="discount">- {discountPercent}% OFF</Badge>
          </div>
        )}
        <p className="buy-box__price-current">{formatPrice(product.priceX3)}</p>
      </div>

      <ul className="buy-box__perks">
        {product.installmentsShort && (
          <li>
            <CreditCard aria-hidden="true" />
            <span><strong>{product.installmentsShort}</strong> <Link href="/como-comprar" className="buy-box__link">Ver tarjetas</Link></span>
          </li>
        )}
        <li>
          <Banknote aria-hidden="true" />
          <span><strong>10% de descuento</strong> pagando con transferencia o depósito. <Link href="/como-comprar" className="buy-box__link">Ver más detalles</Link></span>
        </li>
        <li>
          <Truck aria-hidden="true" />
          <span><strong>Envíos gratis</strong> a partir de $99.000</span>
        </li>
        <li>
          <Store aria-hidden="true" />
          <span><strong>Retiro Gratis</strong> en sucursal ¡Retiralo YA!</span>
        </li>
      </ul>

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
        <Button variant="primary" size="lg" onClick={handleAdd} disabled={!inStock} loading={adding} loadingText="Agregando…" className={CTA_STATE[String(added) as "true" | "false"]}>
          {added ? <><Check className="icon-sm" aria-hidden="true" /> ¡Agregado!</> : inStock ? "Agregar al carrito" : "Sin stock"}
        </Button>
      </div>

      {/* Mobile: barra fija abajo con el precio y las acciones, siempre a la vista. En desktop no se muestra. */}
      <div className="buy-box__bar">
        <div className="buy-box__bar-price">
          <span className="buy-box__bar-current">{formatPrice(product.priceX3)}</span>
          {discountPercent > 0 && product.originalPriceX3 !== undefined && (
            <>
              <del className="buy-box__bar-old"><span className="sr-only">Precio anterior: </span>{formatPrice(product.originalPriceX3)}</del>
              <Badge variant="discount">- {discountPercent}% OFF</Badge>
            </>
          )}
        </div>
        {product.installments && <p className="buy-box__bar-installments">{product.installments}</p>}
        <div className="buy-box__bar-actions">
          <Button
            variant="outline"
            size="lg"
            onClick={handleAdd}
            disabled={!inStock}
            loading={adding}
            loadingText="Agregando…"
            className={CTA_STATE[String(added) as "true" | "false"]}
          >
            {added ? <><Check className="icon-sm" aria-hidden="true" /> ¡Agregado!</> : inStock ? "Agregar" : "Sin stock"}
          </Button>
          {inStock && <Button variant="primary" size="lg" onClick={handleBuyNow}>Comprar</Button>}
        </div>
      </div>
    </div>
  )
}
