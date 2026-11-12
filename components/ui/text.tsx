import type { ElementType, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/**
 * Text / Heading — clases de styles/components/typography.css. Tamaño, tono y peso por props;
 * nunca clases de Tailwind de tipografía. Mapas literales: Tailwind purga las clases de
 * @layer components que no encuentra escritas.
 */
export const TEXT_SIZE = {
  xs: "text--xs", sm: "text--sm", md: "text--md", lg: "text--lg",
  xl: "text--xl", "2xl": "text--2xl", "3xl": "text--3xl", "4xl": "text--4xl",
} as const
export const TEXT_TONE = {
  primary: "text--primary", secondary: "text--secondary", tertiary: "text--tertiary", brand: "text--brand",
  accent: "text--accent", success: "text--success", error: "text--error", inverse: "text--inverse",
  "inverse-muted": "text--inverse-muted", "shipping-free": "text--shipping-free",
} as const
export const TEXT_WEIGHT = { regular: "", medium: "text--medium", semibold: "text--semibold", bold: "text--bold" } as const

export type TextSize = keyof typeof TEXT_SIZE
export type TextTone = keyof typeof TEXT_TONE
export type TextWeight = keyof typeof TEXT_WEIGHT

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  size?: TextSize
  tone?: TextTone
  weight?: TextWeight
  /** Interlineado 1: numerales grandes. */
  flush?: boolean
  /** Mayúsculas espaciadas, para etiquetas sobre un título. */
  eyebrow?: boolean
  /** Interlineado holgado para textos largos. */
  relaxed?: boolean
}

export function Text({ as: Tag = "p", size = "md", tone = "primary", weight = "regular", flush, eyebrow, relaxed, className, ...props }: TextProps) {
  return (
    <Tag
      className={cn("text", TEXT_SIZE[size], TEXT_TONE[tone], TEXT_WEIGHT[weight], flush && "text--flush", eyebrow && "text--eyebrow", relaxed && "text--relaxed", className)}
      {...props}
    />
  )
}

const HEADING_SIZE = {
  display: "heading--display", headline: "heading--xl", title: "heading--lg", subtitle: "heading--md", label: "heading--sm", section: "heading--section", page: "heading--page",
} as const
const HEADING_TEXT_SIZE = { ...TEXT_SIZE } as const

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p"
  /** Preset de título (display, headline, title, subtitle, label, section, page) o un escalón de Text (xs…4xl). */
  size?: keyof typeof HEADING_SIZE | TextSize
  tone?: TextTone
  weight?: TextWeight
}

export function Heading({ as: Tag = "h2", size = "title", tone, weight = "semibold", className, ...props }: HeadingProps) {
  const sizeClass = size in HEADING_SIZE ? HEADING_SIZE[size as keyof typeof HEADING_SIZE] : HEADING_TEXT_SIZE[size as TextSize]
  return <Tag className={cn("heading", sizeClass, tone && TEXT_TONE[tone], TEXT_WEIGHT[weight], className)} {...props} />
}
