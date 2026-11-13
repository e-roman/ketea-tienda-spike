"use client"

import Image from "next/image"
import Link from "next/link"
import { Eye, Heart } from "lucide-react"
import { useFavorites } from "@/lib/favorites-context"
import { useQuickView } from "@/lib/quick-view-context"
import type { Product } from "@/lib/products"
import { getDiscountPercent } from "@/lib/products"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { Price } from "@/components/ui/price"
import { Skeleton } from "@/components/ui/skeleton"
import { Text } from "@/components/ui/text"
import { ProductTags } from "@/components/patterns/product-tags"

/**
 * Card de producto — clases de styles/patterns/product-card.css.
 * Foto con favorito y "Vista rápida" al pasar el mouse, título, dato técnico, precio con cuotas y etiquetas de entrega.
 * `titleAs`: h3 bajo un h2 de sección (home, relacionados); h2 en listados cuyo único título previo es el h1.
 */
export default function ProductCard({ product, titleAs: Title = "h3" }: { product: Product; titleAs?: "h2" | "h3" }) {
  const { isFavorite, toggle } = useFavorites()
  const { openQuickView } = useQuickView()
  const favorite = isFavorite(product.id)
  const discountPercent = getDiscountPercent(product)
  const href = `/productos/${product.slug}`

  return (
    <div className="product-card">
      <div className="product-card__media">
        <Link href={href} className="product-card__photo-link" aria-label={product.name}>
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="product-card__image"
          />
        </Link>

        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-pressed={favorite}
          aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          className={iconButtonClasses({ variant: "subtle", size: "sm", className: "product-card__fav" })}
        >
          <Heart className="icon-md" strokeWidth={1} aria-hidden="true" />
        </button>

        <button type="button" onClick={() => openQuickView(product)} className="product-card__quick">
          <Eye className="icon-md" aria-hidden="true" />
          Vista rápida
        </button>
      </div>

      <div className="product-card__info">
        <Link href={href}>
          <Title className="product-card__title">{product.name}</Title>
        </Link>
        {product.highlight && <Text size="xs" tone="secondary" className="product-card__spec">{product.highlight}</Text>}

        <div className="product-card__price">
          <Price
            current={product.priceX3}
            previous={discountPercent > 0 ? product.originalPriceX3 : undefined}
            discountPercent={discountPercent}
          />
          {product.installments && <Text size="sm" weight="medium">{product.installments}</Text>}
        </div>

        <ProductTags product={product} />

        <Text size="xs" tone="tertiary" className="product-card__note">Pagá fácil y rápido con Mercado Pago o MODO</Text>
      </div>
    </div>
  )
}

/** Misma geometría que la card real (foto, título, dato, precio, cuotas y nota) para que al cargar no se corra nada. */
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
        <Skeleton radius="sm" h={5} w="full" />
      </div>
    </div>
  )
}
