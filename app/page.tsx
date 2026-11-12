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
  { icon: <CreditCard className="icon-md" />,  title: "Pagá con tarjeta",     desc: "A través de Mercado Pago" },
  { icon: <Truck className="icon-md" />,       title: "Envío gratis en CABA", desc: "Lunes a viernes, 9 a 15 h" },
  { icon: <Headset className="icon-md" />,     title: "Te ayudamos",          desc: "WhatsApp, 9 a 18 h" },
]

const HOW_STEPS: HowStep[] = [
  { number: "01", icon: <ShoppingBag className="icon-md" />, title: "Elegí tus productos", text: "Explorá el catálogo y combiná tus sabores favoritos." },
  { number: "02", icon: <ListChecks className="icon-md" />, title: "Completá 4 packs", text: "Podés combinar los productos que quieras. La barra te muestra cuánto te falta.", featured: true, progress: { current: 3, total: 4 } },
  { number: "03", icon: <Truck className="icon-md" />, title: "Recibilas en casa", text: "Elegí el día de entrega y disfrutá tus productos en CABA y GBA." },
]

export default function HomePage() {
  const featured = getFeatured().slice(0, 4)
  const nuevos = getProductsByCategory("alta-cocina").slice(0, 4)

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
        <SectionHeader title="Los más pedidos" href="/productos" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <div className="grid md:grid-cols-2 gap-5">
          <PromoBanner
            image="https://pastasorali.com/images/categorias/9.jpg"
            imageAlt="Línea Verde"
            icon={<Leaf className="icon-md" aria-hidden="true" />}
            title="Línea Verde"
            text="Harina integral orgánica, sal del Himalaya y verduras agroecológicas. 100% vegano."
            href="/productos?cat=linea-verde"
          />
          <PromoBanner
            image="https://pastasorali.com/images/categorias/13.jpg"
            imageAlt="Sin TACC"
            icon={<Wheat className="icon-md" aria-hidden="true" />}
            title="Sin TACC"
            text="Certificados para celíacos. Tapas, rotiseras y ñoquis sin gluten elaborados en ambiente controlado."
            href="/productos?cat=linea-sin-gluten"
          />
        </div>
      </section>

      {nuevos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
          <SectionHeader title="Nuevos · Alta Cocina" href="/productos?cat=alta-cocina" />
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
