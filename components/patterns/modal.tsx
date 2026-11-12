"use client"

import { useEffect, type ReactNode } from "react"
import { X } from "lucide-react"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const SIZE = {
  sm: "modal__dialog modal__dialog--sm",
  md: "modal__dialog modal__dialog--md md:p-8",
} as const
const LAYER = { default: "modal", top: "modal modal--top" } as const
const SCRIM = { default: "modal__scrim", strong: "modal__scrim modal__scrim--strong" } as const

interface ModalProps {
  open: boolean
  onClose: () => void
  /** Nombre accesible del diálogo. */
  label?: string
  size?: keyof typeof SIZE
  /** top: por encima de otros modales (el de acceso). */
  layer?: keyof typeof LAYER
  scrim?: keyof typeof SCRIM
  /** alertdialog para confirmaciones destructivas. */
  role?: "dialog" | "alertdialog"
  /** Botón de cerrar en la esquina. */
  closeButton?: boolean
  className?: string
  children: ReactNode
}

/** Modal (Figma: Modal) — clases de styles/patterns/modal.css. Cierra con Escape y al tocar el fondo. */
export function Modal({
  open, onClose, label, size = "sm", layer = "default", scrim = "default", role = "dialog", closeButton = false, className, children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={LAYER[layer]}>
      <div className={SCRIM[scrim]} onClick={onClose} />
      <div role={role} aria-modal="true" aria-label={label} className={cn(SIZE[size], className)}>
        {closeButton && (
          <button onClick={onClose} aria-label="Cerrar" className={iconButtonClasses({ size: "sm", className: "modal__close" })}>
            <X className="icon-sm" aria-hidden="true" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
