import { ProductCardSkeleton } from "@/components/patterns/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Row } from "@/components/ui/layout"

export default function HomeLoading() {
  return (
    <div>
      {/* Hero */}
      <Skeleton className="hero-height" />

      {/* ¿Cómo funciona? */}
      <div className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Skeleton radius="sm" h={7} w={64} className="mb-2" />
          <Skeleton radius="sm" h={4} w={80} className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} soft radius="xl" h={40} />
            ))}
          </div>
        </div>
      </div>

      {/* Los más pedidos */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <Row align="center" justify="between" className="mb-7">
          <Skeleton radius="sm" h={7} w={48} />
          <Skeleton radius="sm" h={4} w={16} />
        </Row>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  )
}
