import { ProductCardSkeleton } from "@/components/patterns/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Row } from "@/components/ui/layout"

export default function ProductosLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        <Skeleton radius="sm" h={10} w={56} className="mb-2" />
        <Skeleton radius="sm" h={4} w={32} />
      </div>

      {/* Chips + orden */}
      <Row align="center" gap={2} className="hidden-mobile mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} radius="pill" h={8} w={20} />
        ))}
        <Skeleton h={8} w={32} className="push-end" />
      </Row>
      <Row align="center" gap={3} className="only-mobile mb-8">
        <Skeleton h={10} className="fill" />
        <Skeleton h={10} className="fill" />
      </Row>

      {/* Grid de productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    </div>
  )
}
