import { cn } from "@/lib/utils"

/**
 * Icon button — clases de styles/components/icon-button.css (Figma "Icon button").
 * Para <button> y <a>/<Link>. Siempre con aria-label.
 */
export type IconButtonVariant = "ghost" | "subtle" | "primary" | "success" | "plain" | "danger"
export type IconButtonSize = "sm" | "md" | "lg" | "xl"

/** Clases literales: Tailwind solo conserva las reglas de @layer components que encuentra escritas en el código. */
const variantClass: Record<IconButtonVariant, string> = {
  ghost: "icon-btn--ghost",
  subtle: "icon-btn--subtle",
  primary: "icon-btn--primary",
  success: "icon-btn--success",
  plain: "icon-btn--plain",
  danger: "icon-btn--danger",
}
const sizeClass: Record<IconButtonSize, string> = { sm: "icon-btn--sm", md: "icon-btn--md", lg: "icon-btn--lg", xl: "icon-btn--xl" }

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const FLUSH = { start: "icon-btn--flush-start", end: "icon-btn--flush-end" } as const

export function iconButtonClasses({
  variant = "ghost",
  size,
  label = false,
  flush,
  className,
}: { variant?: IconButtonVariant; size?: IconButtonSize; /** Ícono + texto corto (p. ej. "Ingresar" en el header) */ label?: boolean; /** Compensa el aire del botón para alinear el ícono con el borde del contenedor. */ flush?: "start" | "end"; className?: string } = {}) {
  return cn("icon-btn", variantClass[variant], size && sizeClass[size], label && "icon-btn--label", flush && FLUSH[flush], className)
}
