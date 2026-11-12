import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { IconBadge } from "@/components/ui/icon-badge"
import { buttonClasses } from "@/components/ui/button"

interface PromoBannerProps {
  image: string
  imageAlt: string
  icon: ReactNode
  title: string
  text: string
  href: string
  cta?: string
}

/** Banner promocional sobre foto — clases de styles/patterns/promo-banner.css. */
export function PromoBanner({ image, imageAlt, icon, title, text, href, cta = "Ver productos" }: PromoBannerProps) {
  return (
    <div data-surface="photo" className="promo-banner">
      <Image src={image} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="promo-banner__image" />
      <div className="promo-banner__scrim" />
      <div className="promo-banner__content">
        <IconBadge size="control" tone="glass" className="promo-banner__icon">{icon}</IconBadge>
        <h3 className="promo-banner__title">{title}</h3>
        <p className="promo-banner__text">{text}</p>
        <Link href={href} className={buttonClasses({ variant: "inverse", className: "promo-banner__cta" })}>
          {cta}
        </Link>
      </div>
    </div>
  )
}
