"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/lib/cart-context"
import { useQuickView } from "@/lib/quick-view-context"
import { getDiscountPercent, type Product } from "@/lib/products"
import { Drawer } from "@/components/patterns/drawer"
import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/ui/stepper"
import { Price } from "@/components/ui/price"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { Heading, Text } from "@/components/ui/text"
import { ProductTags } from "@/components/patterns/product-tags"

/** Carrusel de fotos: la siguiente asoma a la derecha, con flechas y contador. Desplazamiento por scroll-snap. */
function QuickViewGallery({ product }: { product: Product }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const images = product.images
  const multiple = images.length > 1

  function slideStep() {
    const track = trackRef.current
    if (!track || track.children.length < 2) return 0
    return (track.children[1] as HTMLElement).offsetLeft - (track.children[0] as HTMLElement).offsetLeft
  }

  function goTo(next: number) {
    const target = Math.min(Math.max(next, 0), images.length - 1)
    trackRef.current?.scrollTo({ left: target * slideStep(), behavior: "smooth" })
  }

  function onScroll() {
    const step = slideStep()
    if (step > 0 && trackRef.current) setIndex(Math.round(trackRef.current.scrollLeft / step))
  }

  return (
    <div className="quick-view__gallery">
      <div ref={trackRef} onScroll={onScroll} className="quick-view__track">
        {images.map((src, i) => (
          <div key={src} className="quick-view__slide">
            <Image src={src} alt={`${product.name} - foto ${i + 1}`} fill sizes="320px" className="quick-view__photo" />
          </div>
        ))}
      </div>

      {multiple && (
        <div className="quick-view__pager">
          <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Foto anterior" className={iconButtonClasses({ size: "sm" })}>
            <ChevronLeft className="icon-sm" aria-hidden="true" />
          </button>
          <Text as="span" size="sm" tone="secondary">{index + 1}/{images.length}</Text>
          <button type="button" onClick={() => goTo(index + 1)} disabled={index === images.length - 1} aria-label="Foto siguiente" className={iconButtonClasses({ size: "sm" })}>
            <ChevronRight className="icon-sm" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

function QuickViewContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const inStock = !!product.inStock
  const discountPercent = getDiscountPercent(product)

  function handleAdd() {
    if (adding || !inStock) return
    setAdding(true)
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) add(product)
      toast.success(`${product.shortName} agregado al carrito`)
      setAdding(false)
      onClose()
    }, 400)
  }

  return (
    <div className="drawer__body quick-view__body">
      <QuickViewGallery product={product} />

      <Heading as="h3" size="md" className="quick-view__title">{product.name}</Heading>

      <Price
        current={product.priceX3}
        previous={discountPercent > 0 ? product.originalPriceX3 : undefined}
        discountPercent={discountPercent}
      />
      {product.installments && <Text size="sm" weight="medium">{product.installments}</Text>}

      <ProductTags product={product} />

      {product.description && <Text size="sm">{product.description}</Text>}

      {product.keySpecs.length > 0 && (
        <dl className="quick-view__specs">
          {product.keySpecs.map((spec) => (
            <div key={spec.label} className="quick-view__spec">
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="quick-view__buy">
        <Stepper
          size="md"
          min={1}
          unit="unidad"
          value={quantity}
          label={product.name}
          onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
          onIncrement={() => setQuantity((q) => q + 1)}
        />
        <Button variant="primary" onClick={handleAdd} loading={adding} loadingText="Agregando…" disabled={!inStock} className="quick-view__add">
          {inStock ? "Agregar al carrito" : "Sin stock"}
        </Button>
      </div>

      <Link href={`/productos/${product.slug}`} onClick={onClose} className="quick-view__details">
        Ver todos los detalles
        <ChevronRight className="icon-sm" aria-hidden="true" />
      </Link>
    </div>
  )
}

/** Vista rápida: panel lateral con el resumen del producto y la compra sin salir del listado. Se monta una vez en el layout. */
export function QuickViewDrawer() {
  const { product, isOpen, closeQuickView } = useQuickView()
  const pathname = usePathname()

  // Si se navega (ej. "Ver todos los detalles"), el panel se cierra
  useEffect(() => { closeQuickView() }, [pathname, closeQuickView])

  return (
    <Drawer open={isOpen && !!product} onClose={closeQuickView} title="Vista rápida">
      {/* key: cada producto arranca con cantidad 1 y la galería en la primera foto */}
      {product && <QuickViewContent key={product.id} product={product} onClose={closeQuickView} />}
    </Drawer>
  )
}
