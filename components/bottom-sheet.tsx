"use client"

import { useEffect } from "react"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { X } from "lucide-react"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const STATE = { true: "sheet sheet--open sm:hidden", false: "sheet sheet--closed sm:hidden" } as const

/** Bottom sheet mobile — clases de styles/patterns/modal.css. */
export default function BottomSheet({
  open, title, onClose, children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  return (
    <div className={STATE[String(open) as "true" | "false"]}>
      <div onClick={onClose} aria-hidden={!open} className="sheet__scrim" />
      <div role="dialog" aria-modal="true" aria-label={title} className="sheet__panel">
        <div className="sheet__bar">
          <h2 className="sheet__title">{title}</h2>
          <button onClick={onClose} aria-label="Cerrar" className={iconButtonClasses({ size: "sm", flush: "end" })}>
            <X className="icon-md" />
          </button>
        </div>
        <div className="sheet__body">{children}</div>
      </div>
    </div>
  )
}
