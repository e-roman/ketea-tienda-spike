"use client"

import { useState } from "react"
import { getProductBySlug, getProductsByCategory } from "@/lib/products"
import ProductCard from "@/components/patterns/product-card"
import { notFound } from "next/navigation"
import { Tabs } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ProductGallery } from "@/components/patterns/product-gallery"
import { ProductInfo } from "@/components/patterns/product-info"
import { ProductDescription, ProductSpecs } from "@/components/patterns/product-specs"
import { Heading } from "@/components/ui/text"

export default function PDPPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const productData = getProductBySlug(slug)
  if (!productData) notFound()
  const product = productData

  const [detailTab, setDetailTab] = useState<"descripcion" | "especificaciones">("descripcion")

  const sku = `ORL-${product.id.toUpperCase()}`

  function handleViewSpecs(e: React.MouseEvent) {
    e.preventDefault()
    setDetailTab("especificaciones")
    document.getElementById("detalles-producto")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const related = getProductsByCategory(product.categories[0])
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <Breadcrumb
        className="mb-6"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/productos" },
          { label: product.shortName },
        ]}
      />

      <div className="grid md:grid-cols-[6fr_4fr] gap-10 mb-16">
        <div>
          <ProductGallery product={product} />
        </div>

        <ProductInfo product={product} onViewSpecs={handleViewSpecs} />
      </div>

      {/* ── DESCRIPCIÓN / ESPECIFICACIONES ──────────────── */}
      <section id="detalles-producto" className="mb-14 scroll-mt-28 pb-16">
        <Tabs
          label="Detalles del producto"
          className="mb-6"
          value={detailTab}
          onChange={setDetailTab}
          items={[
            { id: "descripcion", label: "Descripción" },
            { id: "especificaciones", label: "Especificaciones" },
          ]}
        />

        {detailTab === "descripcion" && <ProductDescription product={product} />}
        {detailTab === "especificaciones" && <ProductSpecs product={product} sku={sku} />}
      </section>

      {/* ── RELATED ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section>
          <Heading size="xl" className="mb-5">También te puede gustar</Heading>
          <div className="snap-row">
            {related.map((p) => (
              <div key={p.id} className="snap-row__item">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
