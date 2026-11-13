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
