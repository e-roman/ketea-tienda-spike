import { ProductCardSkeleton } from "@/components/patterns/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Row, Stack } from "@/components/ui/layout"

/** Misma estructura y alturas que la ficha real (breadcrumb, galería + info, tabs, relacionados) para que al cargar no se corra nada. */
export default function PDPLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      {/* Breadcrumb */}
      <Skeleton radius="sm" w={56} className="pdp-skeleton__breadcrumb mb-6" />

      <div className="grid md:grid-cols-[6fr_4fr] gap-10 mb-16">
        {/* Galería: en desktop se estira con la columna de info, igual que la real */}
        <div>
          <Skeleton radius="xl" className="skeleton--gallery" />
        </div>

        {/* Info */}
        <Stack gap={5}>
          <Row gap={2} className="pdp-skeleton__badges">
            <Skeleton h={6} w={20} />
            <Skeleton h={6} w={24} />
          </Row>
          <Skeleton radius="lg" className="pdp-skeleton__title" />
          <Skeleton radius="lg" className="pdp-skeleton__buybox" />
          <Skeleton radius="lg" className="pdp-skeleton__shipping" />
        </Stack>
      </div>

      {/* Tabs + descripción */}
      <section className="mb-14 pb-16">
        <Row gap={8} className="mb-6">
          <Skeleton radius="sm" h={11} w={24} />
          <Skeleton radius="sm" h={11} w={32} />
        </Row>
        <Stack gap={3} className="pdp-skeleton__panel">
          <Skeleton radius="sm" h={4} w="full" />
          <Skeleton radius="sm" h={4} w="3/4" />
          <Skeleton radius="sm" h={4} w="1/2" />
        </Stack>
      </section>

      {/* Relacionados */}
      <section>
        <Skeleton radius="sm" h={8} w={64} className="mb-5" />
        <div className="snap-row">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="snap-row__item">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
