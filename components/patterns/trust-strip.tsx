import type { ReactNode } from "react"
import { IconBadge } from "@/components/ui/icon-badge"
import { Heading, Text } from "@/components/ui/text"

export interface TrustItem {
  icon: ReactNode
  title: string
  desc: string
}

/** Franja de beneficios (compra segura, pago, envío, ayuda). Banda con línea inferior; grilla de 1/2/4 columnas. */
export function TrustStrip({ items }: { items: TrustItem[] }) {
  return (
    <section aria-label="Beneficios" className="trust-band">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
        {items.map((item) => (
          <div key={item.title} className="trust-item">
            <IconBadge size="control" tone="soft-brand" shape="tile">{item.icon}</IconBadge>
            <div>
              <Heading as="p" size="md" className="trust-item__title">{item.title}</Heading>
              <Text size="sm" tone="secondary">{item.desc}</Text>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
