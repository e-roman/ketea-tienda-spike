"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ChevronRight, User, X } from "lucide-react"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { megaMenuData, type MegaMenuCategory } from "@/lib/data/mega-menu"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const CAT = { true: "mobile-cat mobile-cat--strong", false: "mobile-cat" } as const

const itemHref = (item: string) => `/productos?q=${encodeURIComponent(item)}`

const MORE_LINKS = [
  ["¿Cómo comprar?", "/como-comprar"],
  ["Preguntas frecuentes", "/preguntas-frecuentes"],
  ["Sucursales", "/contacto"],
  ["Contacto", "/contacto"],
]

/**
 * Menú mobile (Figma: Header / Mobile menu) en dos niveles, como en la tienda online de Ketea:
 * 1) bienvenida con acceso a la cuenta y lista de categorías; 2) al elegir una, sus secciones y productos, con botón para volver.
 * Es la única entrada de menú del header mobile: la navegación general va como fila deslizable debajo del header (mobile-nav).
 * Se monta solo cuando está abierto, así siempre arranca en el primer nivel. Clases de styles/patterns/mobile-menu.css.
 */
export function MobileMenu({ onClose, onOpenAuth }: { onClose: () => void; onOpenAuth: () => void }) {
  const [active, setActive] = useState<MegaMenuCategory | null>(null)

  return (
    <div className="mobile-menu md:hidden" role="dialog" aria-modal="true" aria-label={active ? active.label : "Menú"}>
      <div className="mobile-menu__bar">
        {active && (
          <button type="button" onClick={() => setActive(null)} aria-label="Volver al menú" className={iconButtonClasses({ size: "sm", flush: "start" })}>
            <ArrowLeft className="icon-md" aria-hidden="true" />
          </button>
        )}
        <h2 className="mobile-menu__title">{active ? active.label : "Menú"}</h2>
        <button type="button" onClick={onClose} aria-label="Cerrar menú" className={iconButtonClasses({ size: "sm", flush: "end", className: "mobile-menu__close" })}>
          <X className="icon-md" aria-hidden="true" />
        </button>
      </div>

      {!active ? (
        <div className="mobile-menu__body">
          <button type="button" onClick={() => { onClose(); onOpenAuth() }} className="mobile-welcome">
            <span className="mobile-welcome__avatar" aria-hidden="true"><User /></span>
            <span>
              <span className="mobile-welcome__title">Bienvenido</span>
              <span className="mobile-welcome__text">Ingresa a tu cuenta para realizar compras</span>
            </span>
          </button>

          <section aria-labelledby="mobile-cats-title" className="mobile-menu__section">
            <h3 id="mobile-cats-title" className="mobile-menu__section-title">Categorías</h3>
            <ul>
              {megaMenuData.map((cat) => {
                const hasSections = cat.sections.length > 0
                return (
                  <li key={cat.id}>
                    {hasSections ? (
                      <button type="button" onClick={() => setActive(cat)} className={CAT[String(!!cat.highlight) as "true" | "false"]}>
                        {cat.label}
                        <ChevronRight aria-hidden="true" />
                      </button>
                    ) : (
                      <Link href={cat.path ?? itemHref(cat.label)} onClick={onClose} className={CAT[String(!!cat.highlight) as "true" | "false"]}>
                        {cat.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>

          <section aria-labelledby="mobile-more-title" className="mobile-menu__section">
            <h3 id="mobile-more-title" className="mobile-menu__section-title">Ayuda</h3>
            <ul>
              {MORE_LINKS.map(([label, href]) => (
                <li key={label}><Link href={href} onClick={onClose} className="mobile-cat mobile-cat--plain">{label}</Link></li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <div className="mobile-menu__body">
          <Link href={itemHref(active.label)} onClick={onClose} className="mobile-sub__all">Ver todo en {active.label}</Link>
          {active.sections.map((section) => (
            <section key={section.title} aria-label={section.title} className="mobile-sub">
              <h3 className="mobile-sub__title">{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}><Link href={itemHref(item)} onClick={onClose} className="mobile-sub__item">{item}</Link></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
