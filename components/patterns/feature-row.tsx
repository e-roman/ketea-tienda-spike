import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { IconBadge } from "@/components/ui/icon-badge"
import { Heading, Text } from "@/components/ui/text"

interface FeatureRowProps {
  /** Ícono o número dentro del tile. */
  icon: ReactNode
  title: string
  children: ReactNode
  /** card: dentro de una tarjeta (contacto). plain: suelto (pasos, valores). */
  variant?: "plain" | "card"
  /** Con href, la fila entera es un link externo. */
  href?: string
  className?: string
}

/** Fila con tile de ícono + título + texto. Se arma con Card, IconBadge, Heading y Text. */
export function FeatureRow({ icon, title, children, variant = "plain", href, className }: FeatureRowProps) {
  const body = (
    <>
      <IconBadge size="tile" tone={variant === "card" ? "plain" : "muted"}>{icon}</IconBadge>
      <div>
        <Heading as="h2" size="md" weight="medium" className="feature-row__title">{title}</Heading>
        <Text size="sm" tone="secondary" relaxed>{children}</Text>
      </div>
    </>
  )
  if (variant === "card") {
    const cardClass = "flex items-center gap-4"
    return href ? (
      <Card as="a" href={href} target="_blank" rel="noopener noreferrer" tone="subtle" radius="xl" padding="md" className={`${cardClass} card--interactive ${className ?? ""}`}>{body}</Card>
    ) : (
      <Card tone="subtle" radius="xl" padding="md" className={`${cardClass} ${className ?? ""}`}>{body}</Card>
    )
  }
  return <div className={`feature-row ${className ?? ""}`}>{body}</div>
}
