"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { buttonClasses } from "@/components/ui/button"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const SLIDE_STATE = { true: "hero__slide hero__slide--active", false: "hero__slide" } as const

const SLIDES = [
  "/assets/img/banners/hero-1.jpg",
  "/assets/img/banners/hero-2.jpg",
  "/assets/img/banners/hero-3.jpg",
]

export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section data-surface="photo" className="hero">
      {/* Background slides */}
      {SLIDES.map((src, i) => (
        <div key={src} className={SLIDE_STATE[String(i === active) as "true" | "false"]}>
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="hero__image"
          />
        </div>
      ))}

      {/* Overlay para legibilidad del texto */}
      <div className="hero__scrim" />

      {/* Content */}
      <div className="hero__content max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-xl">
          <span className="hero__eyebrow">
            Todo para tu pileta
          </span>
          <h1 className="hero__title">
            Tu pileta lista<br />para disfrutar<br />todo el año
          </h1>
          <p className="hero__text">
            Hasta 12 cuotas sin interés{" "}
            <span className="nowrap">y envío gratis.</span>
          </p>
          <div className="hero__actions">
            <Link href="/productos" className={buttonClasses({ shape: "pill" })}>
              Ver todos los productos
            </Link>
            {/* CTA secundario (desactivado): Link a /como-comprar con buttonClasses, variante outline-inverse y shape pill */}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="hero__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ver slide ${i + 1}`}
            aria-current={i === active}
            className="carousel-dot"
          >
            <span className="carousel-dot__mark" />
          </button>
        ))}
      </div>
    </section>
  )
}
