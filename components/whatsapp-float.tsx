"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Send, X } from "lucide-react"
import { WhatsappIcon } from "@/components/icons/whatsapp-icon"
import { whatsappUrl } from "@/components/patterns/header/nav-items"

/**
 * Botón flotante de ayuda (réplica del SupportChat de la tienda actual de Ketea): etiqueta «¿Necesitás ayuda?», botón verde y,
 * al abrirlo, un cuadro para escribir la consulta que se envía por WhatsApp. Solo en pantallas de 769 px o más, como en Ketea.
 * No se muestra en el checkout. Clases de styles/patterns/support-chat.css.
 */
export default function WhatsappFloat() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  if (pathname.startsWith("/checkout")) return null

  function send(e: React.FormEvent) {
    e.preventDefault()
    const text = message.trim() || `Hola, tengo una consulta sobre esta página: ${window.location.href}`
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer")
    setMessage("")
    setOpen(false)
  }

  return (
    <div className={open ? "support-chat support-chat--open" : "support-chat"}>
      <button type="button" onClick={() => setOpen((v) => !v)} tabIndex={open ? -1 : 0} aria-hidden={open} className="support-chat__label">
        ¿Necesitás ayuda?
      </button>

      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="support-chat-popup" aria-label="Escribinos por WhatsApp" className="support-chat__button">
        <WhatsappIcon />
      </button>

      <div id="support-chat-popup" role="dialog" aria-label="Escribinos por WhatsApp" aria-hidden={!open} className="support-chat__popup">
        <button type="button" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} aria-label="Cerrar" className="support-chat__close">
          <X aria-hidden="true" />
        </button>

        <div className="support-chat__header">
          <WhatsappIcon className="support-chat__header-icon" />
          <p className="support-chat__description">Envianos tu consulta y te responderemos a la brevedad.</p>
        </div>

        <form onSubmit={send} className="support-chat__form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            tabIndex={open ? 0 : -1}
            placeholder="Escribe aquí tu mensaje..."
            aria-label="Tu mensaje"
            className="support-chat__input"
          />
          <button type="submit" tabIndex={open ? 0 : -1} aria-label="Enviar por WhatsApp" className="support-chat__send">
            <Send aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  )
}
