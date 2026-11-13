"use client"

import { useEffect, type ReactNode } from "react"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { X } from "lucide-react"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const STATE = { true: "sheet sheet--open lg:hidden", false: "sheet sheet--closed lg:hidden" } as const
const PANEL = { true: "sheet__panel sheet__panel--tall", false: "sheet__panel" } as const

/**
 * Bottom sheet (mobile y tablet) — clases de styles/patterns/modal.css. Barra con título y X, cuerpo con scroll
 * y, si se pasa `footer`, un pie fijo con las acciones. `tall` lo deja casi a pantalla completa (filtros).
 * Cierra con Escape y con el fondo; bloquea el scroll de la página mientras está abierto.
 */
export default function BottomSheet({
  open, title, onClose, footer, tall = false, children,
}: {
  open: boolean
  title: string
  onClose: () => void
  footer?: ReactNode
  tall?: boolean
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  return (
    <div className={STATE[String(open) as "true" | "false"]}>
      <div onClick={onClose} aria-hidden="true" className="sheet__scrim" />
      <div role="dialog" aria-modal="true" aria-label={title} aria-hidden={!open} className={PANEL[String(tall) as "true" | "false"]}>
        <div className="sheet__bar">
          <h2 className="sheet__title">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" className={iconButtonClasses({ size: "sm", flush: "end" })}>
            <X className="icon-md" aria-hidden="true" />
          </button>
        </div>
        <div className="sheet__body">{children}</div>
        {footer && <div className="sheet__footer">{footer}</div>}
      </div>
    </div>
  )
}
