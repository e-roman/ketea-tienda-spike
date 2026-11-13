import ProductCard from "@/components/patterns/product-card"
import Hero from "@/components/hero"
import { ServiceBlocks, type ServiceBlock } from "@/components/patterns/service-blocks"
import { PromoBanner } from "@/components/patterns/promo-banner"
import { SectionHeader } from "@/components/patterns/section-header"
import { getFeatured, getProductsByCategory } from "@/lib/products"

const SERVICES: ServiceBlock[] = [
  { image: "/assets/svg/icons/icon1.svg", title: "Soporte 24/7", desc: "Contáctanos las 24 horas, los 7 días de la semana." },
  { image: "/assets/svg/icons/icon2.svg", title: "30 días de devolución", desc: "Reembolso completo dentro de los 30 días posteriores a la compra." },
  { image: "/assets/svg/icons/icon3.svg", title: "Envío gratuito", desc: "Recibe automáticamente envío estándar gratuito en cada pedido." },
]

export default function HomePage() {
  const featured = getFeatured().slice(0, 5)
  const nuevos = getProductsByCategory("Bombas de Calor").slice(0, 5)

  return (
    <div className="home">
      <Hero />

      <ServiceBlocks items={SERVICES} />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <SectionHeader title="Productos destacados" href="/productos" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Fila 1: dos banners chicos y uno grande */}
      <section className="promo-section">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-5">
          <PromoBanner size="sm" className="md:col-span-3" image="/assets/img/banners/item-md-1.png" imageAlt="Válvulas de PVC" title="Válvulas de PVC" href="/productos?nav=piscinas-valvulas" />
          <PromoBanner size="sm" className="md:col-span-3" image="/assets/img/banners/item-md-2.png" imageAlt="Dosificadores" title="Dosificadores" href="/productos?q=dosificador" />
          <PromoBanner size="lg" className="md:col-span-6" image="/assets/img/banners/item-lg-1.png" imageAlt="Bombas de calor" eyebrow="¡Nuevos ingresos!" title="Bombas de calor para piscinas" href="/productos?nav=piscinas-bombas-de-calor" />
        </div>
      </section>

      {nuevos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
          <SectionHeader title="Bombas de calor" href="/productos?cat=Bombas de Calor" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {nuevos.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Fila 2: tres banners medianos */}
      <section className="promo-section">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-5">
          <PromoBanner size="md" className="md:col-span-4" image="/assets/img/banners/item-3col-1.png" imageAlt="Bombas de aguas" title="Bombas de Aguas" text="Descuento del mes" href="/productos?q=bomba" />
          <PromoBanner size="md" className="md:col-span-4" image="/assets/img/banners/item-3col-2.png" imageAlt="Filtros para piscinas" title="Filtros para piscinas" text="Descuento del mes" href="/productos?nav=piscinas-filtros" />
          <PromoBanner size="md" className="md:col-span-4" image="/assets/img/banners/item-3col-3.png" imageAlt="Productos químicos" title="Productos Químicos" text="Descuento del mes" href="/productos?nav=mantenimiento-quimicos" />
        </div>
      </section>
    </div>
  )
}
