"use client"

import { useState, type ReactNode } from "react"
import { linkClasses } from "@/components/ui/link"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { PageHeader } from "@/components/patterns/page-header"

const WHATSAPP = "https://api.whatsapp.com/send?phone=5491130656942"

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "¿Cómo funciona Tienda Orali?",
    a: "Es una tienda online donde podés comprar toda la variedad de productos de Orali sin moverte de tu casa.",
  },
  {
    q: "¿En qué formato vienen los productos?",
    a: "Todos nuestros productos se venden en packs de 3 unidades. El precio que ves en cada producto es el del pack completo, y también mostramos el precio por unidad para que puedas comparar.",
  },
  {
    q: "¿Hay un pedido mínimo?",
    a: "Sí, el pedido mínimo es de 4 packs (de cualquier combinación de productos). En el carrito vas a ver una barra que te indica cuánto te falta para alcanzarlo.",
  },
  {
    q: "¿Qué días realizan las entregas?",
    a: <>Realizamos entregas de lunes a viernes, de 9 a 15 h.<br />No entregamos sábados ni domingos.</>,
  },
  {
    q: "¿En qué zonas entregan?",
    a: <>Entregamos en CABA y cada barrio tiene un día fijo. Al cargar tu dirección en el checkout te mostramos qué día te toca.<br />Para GBA, contactanos al <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={linkClasses()}>(+54) 911 3065-6942</a>.</>,
  },
  {
    q: "¿Cuánto cuesta el envío?",
    a: <>Envío en CABA: lo recibís gratis en el día que corresponde a tu barrio.<br />Para envíos en GBA, contactanos al <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={linkClasses()}>(+54) 911 3065-6942</a>.</>,
  },
  {
    q: "¿Puede recibir otra persona mi pedido?",
    a: "Sí. En ese caso, al hacer la compra completá el campo «¿Quién recibe?» con el nombre de la persona que va a recibir el pedido.",
  },
  {
    q: "¿Qué pasa si no estoy en mi domicilio al momento de la entrega acordada?",
    a: "El pedido vuelve a nuestro depósito y podés solicitar una nueva entrega, coordinando el día, con costo.",
  },
  {
    q: "¿Cuáles son los medios de pago?",
    a: <>Trabajamos con Mercado Pago, aceptando tarjetas de crédito y débito.<br />Tenemos suspendidos momentáneamente los cobros en efectivo en CABA por motivos de seguridad.</>,
  },
  {
    q: "¿Cuál es la política si hay faltantes cuando arman mi pedido?",
    a: <>Nos comunicamos con vos antes de enviártelo y te damos dos opciones:<br />a) Te hacemos un cupón por un monto mayor al faltante.<br />b) Te devolvemos ese dinero por Mercado Pago.</>,
  },
  {
    q: "¿Qué beneficios tengo al registrarme en Tienda Orali?",
    a: "Al registrarte podés comprar tus productos favoritos de Orali de manera online y recibirlos en tu domicilio. Además, vas a encontrar tu historial de pedidos para que volver a comprar sea mucho más rápido. Y lo más importante: vas a formar parte de nuestra comunidad.",
  },
  {
    q: "¿Los productos vienen congelados?",
    a: "Sí, nuestros productos se entregan congelados para que lleguen frescos y los puedas guardar en el freezer hasta el momento de consumirlos.",
  },
  {
    q: "¿Realizan ventas al por mayor?",
    a: <>Sí. Este canal de venta es solo para consumidores finales. Si tenés un local o querés comprar por mayor, contactanos por correo a <a href="mailto:comercial@pastasorali.com" className={linkClasses()}>comercial@pastasorali.com</a>.</>,
  },
  {
    q: "¿Puedo cambiar o devolver un producto?",
    a: <>Al tratarse de alimentos, no aceptamos devoluciones ni cambios.<br />Si algún producto no coincide con tu orden, escribinos por WhatsApp al <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={linkClasses()}>+54 9 11 3065-6942</a> y nos pondremos en contacto con vos para solucionarlo a la brevedad.</>,
  },
  {
    q: "¿Se puede retirar en el local?",
    a: "No, todas nuestras ventas son online. Si necesitás ayuda para hacer tu pedido, contactanos desde el botón de WhatsApp que ves en la pantalla.",
  },
  {
    q: "Tengo otra pregunta",
    a: <>Contactanos de lunes a viernes de 9 a 18 h al <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={linkClasses()}>(+54) 911 3065-6942</a>.</>,
  },
]

export default function PreguntasFrecuentesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
      <PageHeader eyebrow="Ayuda" title="Preguntas frecuentes">
        Si no encontrás lo que buscás acá, escribinos por{" "}
        <a
          href="https://api.whatsapp.com/send?phone=5491130656942"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses()}
        >
          WhatsApp
        </a>{" "}
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
