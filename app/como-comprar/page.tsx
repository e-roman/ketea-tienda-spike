import Link from "next/link"
import { buttonClasses } from "@/components/ui/button"
import { PageHeader } from "@/components/patterns/page-header"
import { FeatureRow } from "@/components/patterns/feature-row"
import { InfoPanel } from "@/components/patterns/info-panel"
import { Text } from "@/components/ui/text"

export default function ComoComprarPage() {
  const steps = [
    { n: "1", title: "Elegí los productos que quieras", desc: "Buscá el producto deseado. Una vez que seleccionaste tu artículo, hacé clic en el botón Agregar al carrito." },
    { n: "2", title: "Mi carrito", desc: "Acá vas a ver el listado de productos que elegiste hasta el momento; también podés seguir comprando. Hacé clic en Finalizar compra para continuar." },
    { n: "3", title: "Completá tus datos", desc: "No hace falta crear una cuenta: ingresá tu email, tus datos y la dirección de entrega. Elegí Envío Gratis, Envío Express o retiro en sucursal." },
    { n: "4", title: "Elegí cómo pagar", desc: "Revisá el resumen de tu compra y elegí el medio de pago: MODO, Mercado Pago, tarjeta o efectivo." },
    { n: "5", title: "Compra finalizada", desc: "Una vez aprobado el pago, te enviamos la confirmación por email y podés ver tu pedido en Mi cuenta, en Mis pedidos." },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
      <PageHeader eyebrow="Guía de compra" title="¿Cómo comprar en Ketea?">
        Pasos para realizar una compra. Envíos gratis a partir de $99.000 y hasta 12 cuotas sin interés.
      </PageHeader>
      <div className="space-y-8 mb-14">
        {steps.map((s) => (
          <FeatureRow key={s.n} icon={<Text as="span" size="lg" weight="semibold">{s.n}</Text>} title={s.title}>
            {s.desc}
          </FeatureRow>
        ))}
      </div>
      <div className="mb-8">
        <InfoPanel title="¿Preferís retirar?">
          Elegí Retiro en sucursal al finalizar la compra. Ketea Ramos Mejía: Cnel. Brandsen 2230, de lunes a viernes de 9 a 18 h. Te avisamos por email cuando tu pedido esté listo.
        </InfoPanel>
      </div>
      <div className="text-center-block">
        <Link href="/productos" className={buttonClasses()}>
          Empezar a comprar
        </Link>
      </div>
    </div>
  )
}
