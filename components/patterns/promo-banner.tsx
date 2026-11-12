import Image from "next/image"
import Link from "next/link"
import { buttonClasses } from "@/components/ui/button"
import { linkClasses } from "@/components/ui/link"
import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const SIZE = { sm: "promo-banner--sm", md: "promo-banner--md", lg: "promo-banner--lg" } as const
// Tamaño intrínseco de la imagen por variante (px del archivo; el tamaño visible lo fija la clase).
const IMAGE = { sm: 165, md: 200, lg: 270 } as const

export interface PromoBannerProps {
  /** sm: imagen arriba y link; md: título, texto y botón con imagen al costado; lg: igual que md con eyebrow y título grande. */
  size?: keyof typeof SIZE
  image: string
  imageAlt: string
  title: string
  href: string
  /** Solo md: línea bajo el título (ej. "Descuento del mes"). */
  text?: string
  /** Solo lg: línea sobre el título (ej. "¡Nuevos ingresos!"). */
  eyebrow?: string
  cta?: string
  className?: string
}

const buttonLook = buttonClasses({
  variant: "outline",
  size: "sm",
})
const ctaClasses = cn(buttonLook, "promo-banner__cta")

/** Banner promocional en tres medidas (sm, md, lg) — clases de styles/patterns/promo-banner.css. */
export function PromoBanner({ size = "md", image, imageAlt, title, href, text, eyebrow, cta = "Ver Productos", className }: PromoBannerProps) {
  const px = IMAGE[size]
  const picture = (
    <Image src={image} alt={imageAlt} width={px} height={size === "md" ? 214 : px} className="promo-banner__image" />
  )

  if (size === "sm") {
    return (
      <div className={cn("promo-banner", SIZE.sm, className)}>
        {picture}
        <div className="promo-banner__body">
          <h3 className="promo-banner__title">{title}</h3>
          <Link href={href} className={linkClasses({ className: "promo-banner__link" })}>{cta}</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("promo-banner", SIZE[size], className)}>
      <div className="promo-banner__body">
        <div>
          {eyebrow && <p className="promo-banner__eyebrow">{eyebrow}</p>}
          <h3 className="promo-banner__title">{title}</h3>
          {text && <p className="promo-banner__text">{text}</p>}
        </div>
        <Link href={href} className={ctaClasses}>{cta}</Link>
      </div>
      {picture}
    </div>
  )
}
