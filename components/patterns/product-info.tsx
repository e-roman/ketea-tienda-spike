"use client"

import Link from "next/link"
import { Heart, RotateCw, ShieldCheck } from "lucide-react"
import { useFavorites } from "@/lib/favorites-context"
import type { Product } from "@/lib/products"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { Text } from "@/components/ui/text"
import { BuyBox } from "@/components/patterns/buy-box"

/**
 * Columna de información de la ficha: SKU, título con favorito, descripción, garantía, buy box y garantías de compra.
 * Clases de styles/patterns/product-detail.css.
 */
export function ProductInfo({ product }: { product: Product }) {
  const { isFavorite, toggle } = useFavorites()
  const favorite = isFavorite(product.id)

  return (
    <div className="product-info">
      <div className="product-info__top">
        <Text as="span" size="sm" weight="medium" tone="secondary">SKU: {product.sku}</Text>
        <Link href="#productos-similares" className="product-info__similar">Ver similares</Link>
      </div>

      <div className="product-info__heading">
        <h1 className="product-info__title">{product.name}</h1>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-pressed={favorite}
          aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          className={iconButtonClasses({ variant: "subtle", size: "md", className: "product-info__fav" })}
        >
          <Heart className="icon-md" aria-hidden="true" />
        </button>
      </div>

      <p className="product-info__description">{product.description}</p>

      {product.warrantyMonths && (
        <p className="product-info__warranty">
          <ShieldCheck aria-hidden="true" />
          Garantía oficial {product.warrantyMonths} meses
        </p>
      )}

      <BuyBox product={product} />

      <div className="product-info__assurance">
        <ShieldCheck aria-hidden="true" />
        <p>
          <strong>Compra protegida</strong>
          Tus datos cuidados durante toda la compra.
        </p>
      </div>
      <div className="product-info__assurance">
        <RotateCw aria-hidden="true" />
        <p>
          <strong>Cambios y devoluciones</strong>
          Si no te gusta, podés cambiarlo por otro o devolverlo.
        </p>
      </div>
    </div>
  )
}
