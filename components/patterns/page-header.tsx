import type { ReactNode } from "react"
import { Heading, Text } from "@/components/ui/text"

/** Encabezado de página: etiqueta (eyebrow), título h1 y bajada opcional. Clases de styles/patterns/page-parts.css. */
export function PageHeader({ eyebrow, title, children, tight }: {
  eyebrow?: string
  title: string
  /** Bajada bajo el título. */
  children?: ReactNode
  /** Menos aire debajo (listados). */
  tight?: boolean
}) {
  return (
    <header className={tight ? "page-header--tight" : undefined}>
      {eyebrow && <Text as="span" size="xs" tone="accent" eyebrow className="page-header__eyebrow">{eyebrow}</Text>}
      <Heading as="h1" size="page" className={children && !tight ? "page-header__title--spaced" : undefined}>{title}</Heading>
      {children && (tight
        ? <Text size="sm" tone="secondary" className="page-header__lede">{children}</Text>
        : <Text tone="secondary" relaxed className="page-header__lede--spaced">{children}</Text>)}
    </header>
  )
}
