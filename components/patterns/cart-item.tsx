"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Stepper } from "@/components/ui/stepper"
import { Price } from "@/components/ui/price"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { formatPrice, getDiscountPercent, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const VARIANT = { page: "cart-item", drawer: "cart-item cart-item--drawer" } as const
const THUMB = { page: "product-thumb product-thumb--lg", drawer: "product-thumb product-thumb--md" } as const

interface CartItemProps {
  product: Product
  quantity: number
  variant?: keyof typeof VARIANT
  loading?: "inc" | "dec" | null
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
  /** Se llama al navegar a la ficha (p. ej. para cerrar el drawer). */
  onNavigate?: () => void
  className?: string
}

/** Ítem de carrito — clases de styles/patterns/cart-item.css. Usa Stepper, Price e iconButtonClasses. */
export function CartItem({
  product, quantity, variant = "page", loading = null,
  onIncrement, onDecrement, onRemove, onNavigate, className,
}: CartItemProps) {
  const href = `/productos/${product.slug}`
  const discount = getDiscountPercent(product)
  const stepper = (
    <Stepper
      value={quantity}
      label={product.name}
      loading={loading}
      onDecrement={onDecrement}
      onIncrement={onIncrement}
      size="sm"
      className="cart-item__stepper"
    />
  )
  const remove = (
    <button
      type="button"
      onClick={onRemove}
      className={cn(iconButtonClasses({ variant: "plain" }), variant === "drawer" && "cart-item__remove")}
      aria-label="Eliminar"
    >
      <Trash2 className="icon-sm" aria-hidden="true" />
    </button>
  )
  const title = (
    <Link href={href} onClick={onNavigate}>
      <h3 className="cart-item__title">{product.name}</h3>
    </Link>
  )

  return (
    <div className={cn(VARIANT[variant], className)}>
      {variant === "drawer" && remove}
      <Link href={href} onClick={onNavigate} className={THUMB[variant]}>
        <Image src={product.image} alt={product.name} fill />
      </Link>

      <div className="cart-item__body">
        {variant === "page" ? (
          <div className="cart-item__head">{title}{remove}</div>
        ) : (
          <div className="cart-item__head cart-item__head--bare">{title}</div>
        )}
        <p className="cart-item__meta">
          {product.packInfo}
          {variant === "page" && <> · {formatPrice(product.priceUnit)} c/u</>}
        </p>
        <div className="cart-item__foot">
          {variant === "drawer" ? (
            <>
              <Price
                size="sm"
                current={product.priceX3 * quantity}
                previous={discount > 0 && product.originalPriceX3 ? product.originalPriceX3 * quantity : undefined}
                discountPercent={discount}
              />
              {stepper}
            </>
          ) : (
            <>
              {stepper}
              <span className="cart-item__price">{formatPrice(product.priceX3 * quantity)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
