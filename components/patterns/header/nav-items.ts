/** Número de WhatsApp de Ketea, con código de país y sin signos (ej. 5491100000000). Pendiente: sin número, WhatsApp abre el selector de contacto. */
export const WHATSAPP_PHONE = ""
export const WHATSAPP_URL = `https://api.whatsapp.com/send${WHATSAPP_PHONE ? `?phone=${WHATSAPP_PHONE}` : ""}`

export const CONTACT_EMAIL = "info@ketea.com.ar"
export const CONTACT_URL = `mailto:${CONTACT_EMAIL}`

/** Links de navegación general (sin Home): fila de la barra desktop y fila deslizable del header mobile. */
export const SECTION_LINKS: [label: string, href: string][] = [
  ["Novedades", "/productos"],
  ["Ofertas de la semana", "/productos?nav=ofertas"],
  ["Más vendido", "/productos"],
  ["Sucursales", "/contacto"],
  ["Contacto", "/contacto"],
]
