import { clsx, type ClassValue } from "clsx"

/**
 * Une clases condicionales. Sin tailwind-merge a propósito: interpreta clases de componente como `text--sm`
 * o `card--pad-md` como utilidades de Tailwind y las descarta. Los componentes viven en @layer components,
 * así que una utilidad de layout en className siempre gana por orden de capas.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
