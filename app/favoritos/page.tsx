"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import ProductCard from "@/components/patterns/product-card"
import { PageHeader } from "@/components/patterns/page-header"
import { EmptyState } from "@/components/patterns/empty-state"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { buttonClasses } from "@/components/ui/button"
import { useFavorites } from "@/lib/favorites-context"
import { products } from "@/lib/products"

/** Favoritos del visitante (en memoria, sin cuenta). Misma grilla que Ofertas. */
export default function FavoritosPage() {
  const { ids } = useFavorites()
  const favorites = products.filter((p) => ids.includes(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Breadcrumb className="mb-3" items={[{ label: "Catálogo", href: "/productos" }, { label: "Favoritos" }]} />

      <PageHeader title="Tus favoritos" tight>
        {favorites.length === 0
          ? "Todavía no guardaste productos"
          : `${favorites.length} ${favorites.length === 1 ? "producto guardado" : "productos guardados"}`}
      </PageHeader>

      {favorites.length === 0 ? (
        <EmptyState
          className="py-20"
          iconTone="muted"
          icon={<Heart className="icon-xl" aria-hidden="true" />}
          title="Todavía no tenés favoritos"
          text="Tocá el corazón de un producto para guardarlo y encontrarlo más rápido."
        >
          <Link href="/productos" className={buttonClasses()}>Ver productos</Link>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {favorites.map((product) => <ProductCard key={product.id} product={product} titleAs="h2" />)}
        </div>
      )}
    </div>
  )
}
