"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { megaMenuData, type MegaMenuCategory } from "@/lib/data/mega-menu"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const PANEL = { true: "categories-menu__panel categories-menu__panel--wide", false: "categories-menu__panel" } as const
const ITEM = { true: "categories-menu__cat categories-menu__cat--active", false: "categories-menu__cat" } as const
const STRONG = { true: " categories-menu__cat--strong", false: "" } as const

const itemHref = (item: string) => `/productos?q=${encodeURIComponent(item)}`
const catHref = (cat: MegaMenuCategory) => cat.path ?? itemHref(cat.label)

/**
 * "Todas las categorías": un botón abre la lista de categorías; al pasar el mouse por una,
 * se despliega al lado el panel con sus secciones (mismo comportamiento que la tienda actual de Ketea).
 * Se cierra al sacar el mouse del conjunto, con Escape o al elegir un link. Estilos en styles/patterns/categories-menu.css.
 */
export function CategoriesMenu() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(megaMenuData[0].id)
  const rootRef = useRef<HTMLDivElement>(null)
  const active = megaMenuData.find((c) => c.id === activeId) ?? megaMenuData[0]
  const hasSections = active.sections.length > 0

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  function close() {
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="categories-menu" onMouseLeave={close}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="categories-menu-panel"
        className="nav-link"
      >
        <Menu className="icon-md" aria-hidden="true" />
        Todas las categorías
      </button>

      {open && (
        <>
          <div className="categories-menu__backdrop" aria-hidden="true" onClick={close} onMouseEnter={close} />
          <div id="categories-menu-panel" className={PANEL[String(hasSections) as "true" | "false"]}>
            <nav aria-label="Categorías" className="categories-menu__list">
              {megaMenuData.map((cat) => (
                <Link
                  key={cat.id}
                  href={catHref(cat)}
                  onClick={close}
                  onMouseEnter={() => setActiveId(cat.id)}
                  onFocus={() => setActiveId(cat.id)}
                  className={cn(ITEM[String(cat.id === active.id) as "true" | "false"], cat.highlight ? STRONG.true : STRONG.false)}
                >
                  {cat.label}
                </Link>
              ))}
            </nav>

            {hasSections && (
              <div className="categories-menu__sections">
                {active.sections.map((section) => (
                  <div key={section.title} className="categories-menu__section">
                    <p className="categories-menu__title">{section.title}</p>
                    <ul className="categories-menu__links">
                      {section.items.map((item) => (
                        <li key={item}>
                          <Link href={itemHref(item)} onClick={close} className="categories-menu__link">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
