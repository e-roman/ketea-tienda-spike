import Image from "next/image"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

/**
 * Caja de imagen de la ficha (Figma: Product Detail / Product / Gallery). Clases de
 * styles/patterns/product-detail.css. La proporción por breakpoint se pasa por className (layout).
 */
export function ProductGallery({ product, className }: { product: Product; className?: string }) {
  return (
    <div className={cn("product-gallery", className)}>
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="product-gallery__image"
        priority
      />
    </div>
  )
}
