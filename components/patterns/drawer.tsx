"use client"

import { useEffect, type ReactNode } from "react"
import { X } from "lucide-react"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { Badge } from "@/components/ui/badge"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const STATE = { true: "drawer drawer--open", false: "drawer" } as const
const WIDTH = { true: " drawer--wide", false: "" } as const

interface DrawerProps {
  open: boolean
  onClose: () => void
  /** Título visible y nombre accesible del diálogo. */
  title: string
  /** Texto del contador junto al título (p. ej. «3 packs»). */
  count?: string
  closeLabel?: string
  /** Panel más ancho (carrito). */
  wide?: boolean
  children: ReactNode
}

/** Drawer lateral derecho — clases de styles/patterns/modal.css. Bloquea el scroll y cierra con Escape. */
export function Drawer({ open, onClose, title, count, closeLabel = "Cerrar", wide = false, children }: DrawerProps) {
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
    <div className={STATE[String(open) as "true" | "false"] + WIDTH[String(wide) as "true" | "false"]}>
      <div className="drawer__scrim" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label={title} className="drawer__panel">
        <div className="drawer__bar">
          <h2 className="drawer__title">
            {title}
            {count && <Badge variant="outline">{count}</Badge>}
          </h2>
          <button onClick={onClose} aria-label={closeLabel} className={iconButtonClasses({ size: "sm" })}>
            <X className="icon-md" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
