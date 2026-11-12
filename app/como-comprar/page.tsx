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
    { n: "3", title: "Creá tu cuenta o iniciá sesión", desc: "Iniciá sesión con tu correo electrónico y contraseña, o registrate completando tus datos. Después cargá tu dirección: según tu barrio te mostramos qué día llega tu pedido." },
    { n: "4", title: "Validá tus datos y los productos", desc: "Revisá el resumen de tu compra, hacé clic en Pagar con Mercado Pago y completá los datos que te pida Mercado Pago." },
    { n: "5", title: "Compra finalizada", desc: "Una vez aprobado el pago, vas a poder consultar el estado de tu pedido desde tu perfil, en Mis pedidos." },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
      <PageHeader eyebrow="Guía de compra" title="¿Cómo comprar en Orali?">
        Pasos para realizar una compra. Envío gratis en CABA, de lunes a viernes de 9 a 15 h.
      </PageHeader>
      <div className="space-y-8 mb-14">
        {steps.map((s) => (
          <FeatureRow key={s.n} icon={<Text as="span" size="lg" weight="semibold">{s.n}</Text>} title={s.title}>
            {s.desc}
          </FeatureRow>
        ))}
      </div>
      <div className="mb-8">
        <InfoPanel title="El pack de 3 unidades">
          Todos nuestros productos vienen en packs de 3 unidades — ideal para tener siempre en el freezer. El precio que ves es el del pack completo. El precio por unidad lo mostramos debajo en cada producto.
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
