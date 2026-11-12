import type { ReactNode } from "react"
import { IconBadge } from "@/components/ui/icon-badge"
import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const VARIANT = { page: "empty-state empty-state--page", panel: "empty-state" } as const
const ICON_SIZE = { page: "xl", panel: "xl" } as const

interface EmptyStateProps {
  /** Sin ícono: solo título y texto. */
  icon?: ReactNode
  title: string
  text?: ReactNode
  /** Acción: normalmente un Link con buttonClasses(). */
  children?: ReactNode
  variant?: keyof typeof VARIANT
  iconTone?: "brand-subtle" | "muted" | "soft-brand"
  iconSize?: "xl" | "xxl"
  /** Nivel del título: h1 en páginas, h3 en paneles. */
  titleAs?: "h1" | "h2" | "h3"
  className?: string
}

/** Estado vacío — clases de styles/patterns/empty-state.css. */
export function EmptyState({
  icon, title, text, children, variant = "panel", iconTone = "brand-subtle", iconSize, titleAs: Title = variant === "page" ? "h1" : "h3", className,
}: EmptyStateProps) {
  return (
    <div className={cn(VARIANT[variant], className)}>
      {icon && <IconBadge size={iconSize ?? ICON_SIZE[variant]} tone={iconTone}>{icon}</IconBadge>}
      <Title className="empty-state__title">{title}</Title>
      {text && <p className="empty-state__text">{text}</p>}
      {children}
    </div>
  )
}
