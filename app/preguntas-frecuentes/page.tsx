"use client"

import { useState, type ReactNode } from "react"
import { linkClasses } from "@/components/ui/link"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { PageHeader } from "@/components/patterns/page-header"

const EMAIL = "mailto:info@ketea.com.ar"

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "¿Necesito crear una cuenta para comprar?",
    a: "No. Podés comprar solo con tu email: te pedimos tus datos y la dirección de entrega al finalizar la compra. Si querés, podés crear una cuenta para ver el historial de tus pedidos.",
  },
  {
    q: "¿Cómo funciona Ketea?",
    a: "Es una tienda online de piscinas y equipamiento: robots limpiafondos, bombas de calor, filtros y químicos. Elegís tus productos, los pagás online y los recibís en tu casa o los retirás en nuestro local.",
  },
  {
    q: "¿Cuánto tarda en llegar mi pedido?",
    a: <>Con Envío Gratis, tu pedido llega entre 3 y 5 días hábiles. Con Envío Express llega hoy, con un costo adicional de $25.500.<br />Al cargar tu código postal en el carrito vas a ver la fecha estimada de llegada.</>,
  },
  {
    q: "¿Cuánto cuesta el envío?",
    a: "El Envío Gratis aplica a compras desde $99.000. El Envío Express tiene un costo de $25.500 y el retiro en sucursal es gratis.",
  },
  {
    q: "¿Puedo retirar mi compra en el local?",
    a: "Sí. Elegí Retiro en sucursal al finalizar la compra y te avisamos por email cuando esté listo. Ketea Ramos Mejía: Cnel. Brandsen 2230, de lunes a viernes de 9 a 18 h. Algunos productos, como los Automower, solo se retiran por el local.",
  },
  {
    q: "¿Cuáles son los medios de pago?",
    a: "Aceptás pagar con MODO, Mercado Pago, tarjetas de crédito, débito y prepagas, o en efectivo por Rapipago y Pago Fácil. Hasta en 12 cuotas sin interés en productos seleccionados.",
  },
  {
    q: "¿Tienen descuento por transferencia?",
    a: "Sí, en los productos que lo indican tenés un 10% de descuento pagando con transferencia o depósito.",
  },
  {
    q: "¿Los productos tienen garantía?",
    a: "Sí. Todos los productos cuentan con garantía oficial de la marca. En cada ficha ves los meses que corresponden. Ante cualquier falla, nuestro equipo de soporte gestiona la revisión con el servicio técnico autorizado.",
  },
  {
    q: "¿Cómo sé si un robot es adecuado para mi pileta?",
    a: <>En la ficha de cada producto ves el tamaño de pileta recomendado y el tipo de limpieza. Si tenés dudas, escribinos a <a href={EMAIL} className={linkClasses()}>info@ketea.com.ar</a> y te asesoramos.</>,
  },
  {
    q: "¿Puede recibir otra persona mi pedido?",
    a: "Sí. Avisale a quien reciba que tenga a mano el número de pedido y un documento.",
  },
  {
    q: "¿Puedo arrepentirme de mi compra?",
    a: "Sí. Tenés 10 días corridos desde que recibís el producto para ejercer el arrepentimiento, desde el botón de arrepentimiento al pie de la página. El producto debe estar sin uso y en su embalaje original.",
  },
  {
    q: "¿Realizan ventas al por mayor?",
    a: <>Sí. Si sos profesional o querés comprar por mayor, escribinos a <a href="mailto:info@ketea.com.ar" className={linkClasses()}>info@ketea.com.ar</a>.</>,
  },
  {
    q: "Tengo otra pregunta",
    a: <>Escribinos a <a href={EMAIL} className={linkClasses()}>info@ketea.com.ar</a> y te respondemos a la brevedad.</>,
  },
]

export default function PreguntasFrecuentesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
      <PageHeader eyebrow="Ayuda" title="Preguntas frecuentes">
        Si no encontrás lo que buscás acá, escribinos a{" "}
        <a href={EMAIL} className={linkClasses()}>info@ketea.com.ar</a>{" "}
        y te ayudamos.
      </PageHeader>

      <div className="accordion">
        {FAQS.map((item, i) => {
          const open = openIndex === i
          return (
            <div key={item.q} className="accordion__item">
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="accordion__trigger"
                aria-expanded={open}
              >
                <span>{item.q}</span>
                <ChevronDown className="accordion__chevron" aria-hidden="true" />
              </button>
              {open && (
                <div className="accordion__panel">{item.a}</div>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-center-block mt-12">
        <Link href="/como-comprar" className={linkClasses({ size: "sm" })}>
          Ver la guía completa de compra
        </Link>
      </div>
    </div>
  )
}
