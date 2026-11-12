"use client"

import Image from "next/image"
import { useState } from "react"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const THUMB = { true: "product-gallery__thumb product-gallery__thumb--active", false: "product-gallery__thumb" } as const

/**
 * Galería de la ficha (Figma: Product Detail / Product / Gallery): miniaturas a la izquierda (debajo en mobile),
 * imagen principal y etiqueta de oferta. Clases de styles/patterns/product-detail.css.
 */
export function ProductGallery({ product, className }: { product: Product; className?: string }) {
  const [active, setActive] = useState(0)
  const images = product.gallery.length > 0 ? product.gallery : [product.image]

  return (
    <div className={cn("product-gallery", className)}>
      <div className="product-gallery__main">
        {product.onSale && <span className="product-gallery__ribbon">Mega Oferta Del Mes</span>}
        <Image
          src={images[active]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="product-gallery__image"
          priority
        />
      </div>

      {images.length > 1 && (
        <ul className="product-gallery__thumbs" aria-label="Fotos del producto">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === active}
                className={THUMB[String(i === active) as "true" | "false"]}
              >
                <Image src={src} alt="" fill sizes="100px" className="product-gallery__thumb-image" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
