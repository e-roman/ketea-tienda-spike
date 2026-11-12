import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/text"

/** Panel informativo con título y texto (p. ej. «El pack de 3 unidades»). */
export function InfoPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card tone="subtle" radius="xl" padding="lg">
      <Heading as="h2" size="lg" className="info-panel__title">{title}</Heading>
      <Text size="sm" tone="secondary" relaxed>{children}</Text>
    </Card>
  )
}
