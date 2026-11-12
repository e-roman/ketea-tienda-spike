"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useCart, MINIMUM_PACKS } from "@/lib/cart-context"
import type { Product } from "@/lib/products"
import { getDiscountPercent, BADGE_STYLES } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/ui/stepper"
import { Price } from "@/components/ui/price"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

/** Card de producto — clases de styles/patterns/product-card.css. Agregar o Stepper según esté en el carrito. */
/** `titleAs`: h3 bajo un h2 de sección (home, relacionados); h2 en listados cuyo único título previo es el h1. */
export default function ProductCard({ product, titleAs: Title = "h3" }: { product: Product; titleAs?: "h2" | "h3" }) {
  const { items, add, increment, decrement, totalItems } = useCart()
  const cartItem = items.find((i) => i.product.id === product.id)
  const [adding, setAdding] = useState(false)
  const [qtyLoading, setQtyLoading] = useState<null | "inc" | "dec">(null)

  function handleAdd() {
    if (adding) return
    setAdding(true)
    setTimeout(() => {
      add(product)
      const newTotal = totalItems + 1
      const remaining = Math.max(MINIMUM_PACKS - newTotal, 0)
      toast.success(
        remaining === 0
          ? `${product.shortName} agregado · Mínimo cumplido`
          : `${product.shortName} agregado · ${remaining} pack${remaining !== 1 ? "s" : ""} para el mínimo`
      )
      setAdding(false)
    }, 500)
  }

  function handleIncrement() {
    if (qtyLoading) return
    setQtyLoading("inc")
    setTimeout(() => {
      increment(product.id)
      setQtyLoading(null)
    }, 350)
  }

  function handleDecrement() {
    if (qtyLoading) return
    setQtyLoading("dec")
    setTimeout(() => {
      decrement(product.id)
      setQtyLoading(null)
    }, 350)
  }

  // Omit "apto-freezer" y "congelado" en el listado — no aportan señal de decisión de compra.
  // "sin-tacc" tiene su propio badge gráfico (ver más abajo), no se muestra como pill de texto.
  const primaryBadge = product.badges.find((b) => b !== "apto-freezer" && b !== "sin-tacc" && b !== "congelado") ?? null
  const isSinTacc = product.badges.includes("sin-tacc")
  const discountPercent = getDiscountPercent(product)

  return (
    <div className="product-card">
      <Link href={`/productos/${product.slug}`} className="product-card__media">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-card__image"
          onError={(e) => {
            // fallback to placeholder on error
            const t = e.target as HTMLImageElement
            t.style.opacity = "0"
          }}
        />
        {primaryBadge && (
          <div className="product-card__badge">
            <Badge variant="dietary">{BADGE_STYLES[primaryBadge]?.label}</Badge>
          </div>
        )}
        {isSinTacc && (
          <div className="product-card__seal">
            <Image src="/imagenes/badge-sin-tacc.webp" alt="Sin TACC" fill />
          </div>
        )}
      </Link>

      <div className="product-card__info">
        <Link href={`/productos/${product.slug}`}>
          <Title className="product-card__title">{product.name}</Title>
        </Link>
        <p className="product-card__meta">{product.packInfo}</p>

        <div className="product-card__actions">
          <Price
            current={product.priceX3}
            previous={discountPercent > 0 ? product.originalPriceX3 : undefined}
            discountPercent={discountPercent}
            unit={product.priceUnit}
          />

          {cartItem ? (
            <Stepper
              value={cartItem.quantity}
              label={product.name}
              loading={qtyLoading}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
            />
          ) : (
            <Button
              variant="add-to-cart"
              onClick={handleAdd}
              loading={adding}
              loadingText="Agregando…"
              aria-label={`Agregar ${product.name} al carrito`}
            >
              Agregar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

/** Misma geometría que la card real (media 1:1, título, pack, precio y botón) para que al cargar no se corra nada. */
export function ProductCardSkeleton() {
  return (
    <div className="product-card product-card--skeleton" aria-hidden="true">
      <Skeleton className="skeleton-media" />
      <div className="skeleton-body">
        <div className="skeleton-body__title">
          <Skeleton radius="sm" h={5} w="full" />
          <Skeleton radius="sm" h={5} w="3/4" />
        </div>
        <Skeleton radius="sm" h={5} w="1/2" className="skeleton-body__meta" />
        <div className="skeleton-body__price">
          <Skeleton radius="sm" h={7} w="1/2" />
          <Skeleton radius="sm" h={5} w="1/3" />
        </div>
        <Skeleton radius="lg" h={10} />
      </div>
    </div>
  )
}
