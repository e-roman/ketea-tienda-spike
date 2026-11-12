import { Truck, ShieldCheck, CreditCard, Headset } from "lucide-react"
import ProductCard from "@/components/patterns/product-card"
import Hero from "@/components/hero"
import { TrustStrip, type TrustItem } from "@/components/patterns/trust-strip"
import { PromoBanner } from "@/components/patterns/promo-banner"
import { SectionHeader } from "@/components/patterns/section-header"
import { getFeatured, getProductsByCategory } from "@/lib/products"

const TRUST_ITEMS: TrustItem[] = [
  { icon: <ShieldCheck className="icon-md" />, title: "Compra segura",        desc: "Tus datos, protegidos" },
  { icon: <CreditCard className="icon-md" />,  title: "Hasta 12 cuotas",     desc: "Sin interés con tarjeta" },
  { icon: <Truck className="icon-md" />,       title: "Envío gratis", desc: "En productos seleccionados" },
  { icon: <Headset className="icon-md" />,     title: "Te ayudamos",          desc: "WhatsApp, 9 a 18 h" },
]

export default function HomePage() {
  const featured = getFeatured().slice(0, 4)
  const nuevos = getProductsByCategory("Bombas de Calor").slice(0, 4)

  return (
    <div>
      <Hero />

      <TrustStrip items={TRUST_ITEMS} />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <SectionHeader title="Productos destacados" href="/productos" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="promo-section">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-5">
          <PromoBanner size="sm" className="md:col-span-3" image="/assets/img/banners/item-md-1.png" imageAlt="Válvulas de PVC" title="Válvulas de PVC" href="/productos?nav=piscinas-valvulas" />
          <PromoBanner size="sm" className="md:col-span-3" image="/assets/img/banners/item-md-2.png" imageAlt="Dosificadores" title="Dosificadores" href="/productos?q=dosificador" />
          <PromoBanner size="lg" className="md:col-span-6" image="/assets/img/banners/item-lg-1.png" imageAlt="Bombas de calor" eyebrow="¡Nuevos ingresos!" title="Bombas de calor para piscinas" href="/productos?nav=piscinas-bombas-de-calor" />
          <PromoBanner size="md" className="md:col-span-4" image="/assets/img/banners/item-3col-1.png" imageAlt="Bombas de aguas" title="Bombas de Aguas" text="Descuento del mes" href="/productos?q=bomba" />
          <PromoBanner size="md" className="md:col-span-4" image="/assets/img/banners/item-3col-2.png" imageAlt="Filtros para piscinas" title="Filtros para piscinas" text="Descuento del mes" href="/productos?nav=piscinas-filtros" />
          <PromoBanner size="md" className="md:col-span-4" image="/assets/img/banners/item-3col-3.png" imageAlt="Productos químicos" title="Productos Químicos" text="Descuento del mes" href="/productos?nav=mantenimiento-quimicos" />
        </div>
      </section>

      {nuevos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
          <SectionHeader title="Bombas de calor" href="/productos?cat=Bombas de Calor" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {nuevos.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
