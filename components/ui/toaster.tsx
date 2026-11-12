"use client"

import { Toaster as Sonner, toast } from "sonner"
import { CircleCheck, CircleX, Info, Trash2, TriangleAlert } from "lucide-react"

/**
 * Toaster de la tienda — sonner sin estilos propios (`unstyled`) y clases de styles/components/toast.css.
 * Íconos de lucide: verde en éxito, rojo en errores y en «eliminado». Botón X para cerrar.
 */
export function Toaster() {
  return (
    <Sonner
      position="top-right"
      offset={90}
      closeButton
      icons={{
        success: <CircleCheck className="icon-md toast__icon--success" aria-hidden="true" />,
        error: <CircleX className="icon-md toast__icon--error" aria-hidden="true" />,
        info: <Info className="icon-md toast__icon--info" aria-hidden="true" />,
        warning: <TriangleAlert className="icon-md toast__icon--warning" aria-hidden="true" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "toast",
          icon: "toast__icon",
          content: "toast__content",
          title: "toast__title",
          description: "toast__description",
          closeButton: "toast__close",
        },
      }}
    />
  )
}

/** Aviso de elemento eliminado: ícono de papelera en rojo. */
export function toastRemoved(message: string) {
  toast(message, { icon: <Trash2 className="icon-md toast__icon--error" aria-hidden="true" /> })
}
