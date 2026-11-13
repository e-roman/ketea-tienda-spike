"use client"

import { getProductBySlug, getProductsByCategory } from "@/lib/products"
import ProductCard from "@/components/patterns/product-card"
import { notFound } from "next/navigation"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ProductGallery } from "@/components/patterns/product-gallery"
import { ProductInfo } from "@/components/patterns/product-info"
import { ProductTabs } from "@/components/patterns/product-tabs"
import { Heading } from "@/components/ui/text"

export default function PDPPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const productData = getProductBySlug(slug)
  if (!productData) notFound()
  const product = productData

  const related = getProductsByCategory(product.categories[0])
    .filter((p) => p.id !== product.id)
    .slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-10">
      <Breadcrumb
        className="mb-6"
        items={[
          ...product.breadcrumb.map((label, i) => ({
            label,
            href: i === 0 ? "/productos" : `/productos?cat=${encodeURIComponent(label)}`,
          })),
          { label: product.shortName },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 mb-16">
        <div>
          <ProductGallery product={product} />
        </div>

        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />

      {/* ── RELATED ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section id="productos-similares" className="scroll-mt-28">
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
