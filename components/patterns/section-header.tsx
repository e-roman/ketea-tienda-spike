import Link from "next/link"
import { Heading } from "@/components/ui/text"
import { linkClasses } from "@/components/ui/link"
import { Row } from "@/components/ui/layout"

/** Encabezado de sección: título a la izquierda y link «Ver todo» a la derecha. */
export function SectionHeader({ title, href, linkLabel = "Ver todo" }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <Row align="center" justify="between" className="section-header">
      <Heading size="section">{title}</Heading>
      {href && (
        <Link href={href} className={linkClasses({ size: "sm" })}>
          {linkLabel}
        </Link>
      )}
    </Row>
  )
}
