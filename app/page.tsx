import { Truck, ShieldCheck, CreditCard, Headset, Leaf, Wheat, ShoppingBag, ListChecks } from "lucide-react"
import ProductCard from "@/components/patterns/product-card"
import Hero from "@/components/hero"
import NewsletterBanner from "@/components/newsletter-banner"
import { TrustStrip, type TrustItem } from "@/components/patterns/trust-strip"
import { HowItWorks, type HowStep } from "@/components/patterns/how-it-works"
import { PromoBanner } from "@/components/patterns/promo-banner"
import { SectionHeader } from "@/components/patterns/section-header"
import { Heading, Text } from "@/components/ui/text"
import { getFeatured, getProductsByCategory } from "@/lib/products"

const TRUST_ITEMS: TrustItem[] = [
  { icon: <ShieldCheck className="icon-md" />, title: "Compra segura",        desc: "Tus datos, protegidos" },
  { icon: <CreditCard className="icon-md" />,  title: "Hasta 12 cuotas",     desc: "Sin interés con tarjeta" },
  { icon: <Truck className="icon-md" />,       title: "Envío gratis", desc: "En productos seleccionados" },
  { icon: <Headset className="icon-md" />,     title: "Te ayudamos",          desc: "WhatsApp, 9 a 18 h" },
]

const HOW_STEPS: HowStep[] = [
  { number: "01", icon: <ShoppingBag className="icon-md" />, title: "Elegí tus productos", text: "Explorá el catálogo de equipamiento y mantenimiento." },
  { number: "02", icon: <ListChecks className="icon-md" />, title: "Agregalos al carrito", text: "Combiná robots, filtros y químicos en una misma compra.", featured: true },
  { number: "03", icon: <Truck className="icon-md" />, title: "Recibilo en casa", text: "Te lo enviamos a donde estés o lo retirás en sucursal." },
]

export default function HomePage() {
  const featured = getFeatured().slice(0, 4)
  const nuevos = getProductsByCategory("Bombas de Calor").slice(0, 4)

  return (
    <div>
      <Hero />

      <TrustStrip items={TRUST_ITEMS} />

      <section className="pt-14 pb-6 md:pt-16 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Heading size="section" className="mb-2">¿Cómo funciona?</Heading>
          <Text tone="secondary" className="mb-10 max-w-xl">
            Vos elegís los productos y nosotros te los llevamos a casa.
          </Text>
          <HowItWorks steps={HOW_STEPS} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <SectionHeader title="Productos destacados" href="/productos" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <div className="grid md:grid-cols-2 gap-5">
          <PromoBanner
            image="/assets/img/banners/banner-ofertas.png"
            imageAlt="Ofertas"
            icon={<Leaf className="icon-md" aria-hidden="true" />}
            title="Ofertas"
            text="Descuentos en robots, filtros y bombas de calor, con cuotas sin interés."
            href="/productos?nav=ofertas"
          />
          <PromoBanner
            image="/assets/img/banners/banner-novedades.png"
            imageAlt="Novedades"
            icon={<Wheat className="icon-md" aria-hidden="true" />}
            title="Robots limpiafondos"
            text="Dolphin, Aiper, Beatbot y más: tu pileta limpia sin esfuerzo."
            href="/productos?nav=piscinas-robots"
          />
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

      <NewsletterBanner />
    </div>
  )
}
