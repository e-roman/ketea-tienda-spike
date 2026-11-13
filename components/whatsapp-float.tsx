"use client"

import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"
import { WHATSAPP_URL } from "@/components/patterns/header/nav-items"

/** Botón flotante de WhatsApp (abajo a la derecha). No se muestra en el checkout. Clases de styles/patterns/whatsapp-float.css. */
export default function WhatsappFloat() {
  const pathname = usePathname()
  if (pathname.startsWith("/checkout")) return null
  // En la ficha, en mobile, hay una barra fija abajo: el botón se sube para no taparla
  const aboveBar = pathname.startsWith("/productos/")
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Escribinos por WhatsApp" className={aboveBar ? "whatsapp-float whatsapp-float--above-bar" : "whatsapp-float"}>
      <MessageCircle aria-hidden="true" />
    </a>
  )
}
