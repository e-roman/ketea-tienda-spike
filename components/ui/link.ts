import { cn } from "@/lib/utils"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const SIZE = { xs: "link--xs", sm: "link--sm" } as const

/** Link de texto — clases de styles/components/link.css. */
export function linkClasses({
  variant = "default",
  underline = false,
  hoverUnderline = false,
  icon = false,
  size,
  className,
}: { variant?: "default" | "subtle" | "inherit"; underline?: boolean; hoverUnderline?: boolean; /** Link con ícono delante: alinea y separa. */ icon?: boolean; size?: "xs" | "sm"; className?: string } = {}) {
  return cn("link", variant === "subtle" && "link--subtle", variant === "inherit" && "link--inherit", underline && "link--underline", hoverUnderline && "link--hover-underline", icon && "link--icon", size && SIZE[size], className)
}
