import Image from "next/image"
import { Heading, Text } from "@/components/ui/text"

export interface ServiceBlock {
  /** Ilustración (SVG) que va a la izquierda del texto. */
  image: string
  title: string
  desc: string
}

/** Bloques de servicio (soporte, devolución, envío): tarjeta con borde y una ilustración por ítem — clases de styles/patterns/service-blocks.css. */
export function ServiceBlocks({ items }: { items: ServiceBlock[] }) {
  return (
    <section aria-label="Servicios" className="service-blocks">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="service-blocks__card grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="service-block">
              <Image src={item.image} alt="" width={120} height={120} className="service-block__image" />
              <div>
                <Heading as="p" size="md" className="service-block__title">{item.title}</Heading>
                <Text size="sm" tone="secondary">{item.desc}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
