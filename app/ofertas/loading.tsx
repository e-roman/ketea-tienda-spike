import { ProductCardSkeleton } from "@/components/patterns/product-card"
import { Skeleton } from "@/components/ui/skeleton"

/** Misma estructura que /ofertas: breadcrumb, título y cantidad y grilla de cards. */
export default function OfertasLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Skeleton radius="sm" h={5} w={48} className="mb-3" />
      <div className="mb-6">
        <Skeleton radius="sm" h={10} w={64} />
        <Skeleton radius="sm" h={5} w={56} className="mt-1" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    </div>
  )
}
