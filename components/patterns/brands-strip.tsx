"use client"

import Image from "next/image"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { iconButtonClasses } from "@/components/ui/icon-button"

// Logo -> marca. El orden y las repeticiones siguen a la tienda actual de Ketea (relleno hasta que haya todas las marcas).
const BRANDS = [
  ["logo-7", "Aguas"], ["logo-2", "AstralPool"], ["logo-1", "Nataclor"], ["logo-4", "Elektrim"], ["logo-5", "Dolphin"], ["logo-3", "Cepex"],
  ["logo-7", "Aguas"], ["logo-2", "AstralPool"], ["logo-1", "Nataclor"], ["logo-4", "Elektrim"], ["logo-5", "Dolphin"], ["logo-3", "Cepex"],
]

/**
 * Marcas (Figma: Brands strip): fila de logos en gris que se desliza de costado, con flechas en escritorio.
 * En mobile es un carrusel por scroll-snap, igual que la navegación del header. Clases de styles/patterns/brands-strip.css.
 */
export function BrandsStrip() {
  const trackRef = useRef<HTMLUListElement>(null)

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <section aria-label="Marcas" className="brands">
      <div className="max-w-7xl mx-auto px-4 md:px-6 brands__wrap">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Marcas anteriores" className={iconButtonClasses({ variant: "subtle", size: "sm", className: "brands__arrow brands__arrow--prev" })}>
          <ChevronLeft className="icon-md" aria-hidden="true" />
        </button>

        <ul ref={trackRef} className="brands__track">
          {BRANDS.map(([file, name], i) => (
            <li key={`${file}-${i}`} className="brands__item">
              <Image src={`/assets/img/brands/logos/${file}.png`} alt={name} width={285} height={135} className="brands__logo" />
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => scrollBy(1)} aria-label="Más marcas" className={iconButtonClasses({ variant: "subtle", size: "sm", className: "brands__arrow brands__arrow--next" })}>
          <ChevronRight className="icon-md" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
