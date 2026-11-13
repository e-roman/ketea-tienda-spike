"use client"

import { useEffect, useState } from "react"
import ProductCard, { ProductCardSkeleton } from "@/components/patterns/product-card"
import { PageHeader } from "@/components/patterns/page-header"
import { EmptyState } from "@/components/patterns/empty-state"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { getOnSaleProducts } from "@/lib/products"

export default function OfertasPage() {
  const products = getOnSaleProducts()

  // Igual que /productos: simula la latencia del backend y muestra el skeleton de las cards
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-10">
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Catálogo", href: "/productos" },
          { label: "Ofertas de la semana" },
        ]}
      />

      <PageHeader title="Productos con descuento" tight>
        {products.length} productos en oferta esta semana
      </PageHeader>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {Array.from({ length: Math.max(products.length, 4) }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          className="py-20"
          title="No hay ofertas activas por el momento"
          text="Volvé a mirar pronto, renovamos las ofertas todas las semanas."
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} titleAs="h2" />
          ))}
        </div>
      )}
    </div>
  )
}
