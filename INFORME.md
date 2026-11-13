# Informe del spike: tienda de Ketea a partir de la tienda de Orali

Primera versión: 2026-11-12. Actualizado: 2026-11-13. Carpeta: `C:\next-projects\ketea-tienda-spike` (repo git local, sin remoto, 32 commits sobre la copia intacta de `orali-tienda`).

## Resumen en 6 líneas

1. **Seguir por este camino, ajustándolo.** Con una capa de tokens (`styles/ketea-theme.css`) y componentes de Orali reutilizados, el spike hoy replica casi todo el recorrido de compra de la tienda de Ketea: portada, listado con filtros, ficha con pestañas, vista rápida, carrito, checkout sin registro, confirmación, favoritos, notificaciones y cuenta, en desktop y mobile.
2. **La cobertura de tokens es alta (89 %), pero engaña:** 169 de las 326 variables son la capa por componente (`--button-primary-bg`…), que **Ketea no tiene**. Las copié de Orali y las apunté a los semánticos de Ketea; eso vive en la tienda, no en los tokens. Para compartir de verdad hay que crear esa capa en `ketea-design-tokens`.
3. **Lo que no salía de Orali se construyó en el spike** (hecho ahora, ya no es "falta"): cuotas, vista rápida, filtros con chips, mega menú lateral, pestañas de la ficha, marcas, notificaciones, favoritos, cuenta y pedidos. Son componentes nuevos que Orali no tiene.
4. **El copy de pastas se limpió:** ya no quedan packs ×3, pedido mínimo, zonas de CABA ni cupón `ORALI10` en pantalla. Los textos nuevos (preguntas frecuentes, cómo comprar, contacto, quiénes somos) son redacción mía a partir de datos del spike y **hay que validarlos con Ketea**.
5. **Lo que sigue simulado:** pagos, sesión de usuario, favoritos, notificaciones y pedidos viven en memoria (se pierden al recargar). No hay backend.
6. **No evalué** Next 16 / React 19 / Tailwind 4 (solo estimo el costo abajo), ni Storybook, ni accesibilidad a fondo, ni rendimiento.

## Qué se hizo

### Base (primera versión)

- Copia de `orali-tienda` sin `node_modules`, `.git` ni `.next`; `npm install --legacy-peer-deps` OK. Stack: Next 14.2.35, React 18, Tailwind 3.4 (sin subir).
- `package.json`: `@ketea/tokens` desde GitHub (`github:e-roman/ketea-design-tokens#v3.0.0`, antes era `file:../ketea-design-tokens`, que no sirve en un clon limpio). `@orali/design-tokens` queda solo para que el preset de Tailwind siga resolviendo.
- `app/layout.tsx` importa `@ketea/tokens/tokens.css` y `styles/ketea-theme.css`.
- Marca: logo de Ketea, Mulish, portada, navbar, footer, newsletter y metadatos. Imágenes de productos, banners y slider copiadas a `public/assets/img`.
- Datos: `lib/products.ts` es un adaptador de `products.json` y `productDetails.json` (copiados a `lib/data/`) que mantiene la forma de Orali y suma campos de Ketea (galería, cuotas, SKU, garantía, retiro, etc.).

### Pantallas y componentes replicados desde la tienda de Ketea

Todo con clases en `styles/**/*.css` y tokens (`npm run lint:ui` da 0 utilidades visuales); Tailwind solo se usa para grilla y visibilidad.

| Área | Qué quedó |
| --- | --- |
| Header desktop | Mega menú "Todas las categorías" con panel lateral, íconos de favoritos y notificaciones (en lugar de "Ingresar"), logo de 50 px, ajustes de `nav-link`/`utility-bar`. |
| Header mobile | Menú de categorías en dos niveles, fila de navegación deslizable bajo el header, campana de notificaciones con panel a todo el ancho. |
| Portada | Bloques de servicio con ilustraciones, destacados en carrusel (mobile) o grilla de 5, banners promo en 3 medidas (sm/md/lg), fila de Bombas de calor, fondo de página. Se quitó "¿Cómo funciona?". |
| Footer | 4 columnas con newsletter, logos de marcas dentro del footer (carrusel en mobile), medios de pago y acordeón en mobile. |
| Card de producto | Imagen 4:3, favorito, etiquetas compactas, cuotas, envío gratis y botón **Vista rápida** al pasar el mouse. |
| Vista rápida | Drawer nuevo: fotos (una sola ocupa todo el ancho), selector de cantidad alineado, cuotas, entrega y agregar al carrito. |
| Listado `/productos` | Columna de filtros (categoría, marca, accionamiento, descuento, cuotas, precio) con switches y checkboxes, chips de "Filtros aplicados" y "Borrar filtros"; 4 columnas. Mobile: botones Filtrar y Ordenar del mismo tamaño con bottom sheets. |
| Ofertas | Misma grilla que la portada (5 columnas). |
| Ficha `/productos/[slug]` | Miniaturas (5), SKU, garantía, cuotas, beneficios de entrega y retiro, loader en "Agregar al carrito" y **pestañas**: Descripción, Especificaciones, Recursos y descargas, Preguntas frecuentes y Garantía y soporte. Muestra lo que cada producto tiene cargado y completa con contenido genérico por categoría. |
| Carrito y drawer | Sin pedido mínimo ni barra flotante, drawer más ancho, tarjetas sin borde, contador de unidades sobre la foto, leyenda de Envío Express, opciones de entrega y CP compartidos con el checkout. |
| Checkout | Compra **sin registrarse**: Datos personales (email + validación), Domicilio y entrega, Método de pago (MODO, Mercado Pago, tarjeta con cuotas, efectivo; todo simulado). |
| Confirmación | Pantalla de pedido confirmado con próximos pasos, entrega, pago, resumen, ayuda e impresión. |
| Favoritos `/favoritos` | Lista de los productos marcados, con estado vacío. |
| Cuenta `/cuenta` | Ingresar / registrarse (simulado) y panel con **Mis pedidos**, datos y favoritos. Quien compró como invitado también ve sus pedidos. |
| Notificaciones | Campana con panel (desktop y mobile), leído/no leído y aviso de "Pedido confirmado" al comprar. |
| Textos | Preguntas frecuentes, Cómo comprar, Contacto, Quiénes somos y Privacidad reescritos para Ketea. |

### Servidores y repos ajenos

- Se levantaron servidores solo para verificar y **se cerraron al terminar cada tarea** (puerto 3500 del spike; antes 3600 para una copia temporal de la base de Orali y 5173 para la tienda actual de Ketea).
- No se modificó `orali-tienda`, `ketea-tienda`, `ketea-dashboard` ni los repos de tokens. No hubo push, publicación ni PRs.

## 1. Cobertura de tokens

Tabla completa (326 filas): [informe/tabla-tokens.md](informe/tabla-tokens.md). Se obtuvo en la primera versión extrayendo todos los `var(--…)` del código de entonces. **No la recalculé** tras sumar las pantallas nuevas; estas reutilizaron tokens ya mapeados y sumaron solo `--button-danger-*` (botón de acciones destructivas) y ajustes puntuales en `ketea-theme.css`.

| Estado | Variables | Qué significa |
| --- | ---: | --- |
| Mismo nombre en Ketea | 29 | Resuelven solas (`--font-size-*`, `--radius-*`, `--duration-*`, `--border-width-*`…) |
| Equivalente directo | 59 | Otro nombre, mismo concepto: `--color-surface-default` → `--color-semantic-surface-default` |
| Aproximado | 33 | Se usó el token más cercano; hay diferencia de valor o de concepto (lista abajo) |
| Falta sin reemplazo | 5 | Capa z: `--z-index-*` (Ketea no tiene) |
| Capa por componente | 169 | Botón, chip, stepper, badge, input… **copiadas de Orali** y apuntadas a los semánticos de Ketea |
| Privadas del componente | 31 | Se definen dentro de la propia clase (`--btn-h`, `--input-px`…); no son tokens |
| **Total** | **326** | |

Resueltas con tokens de Ketea (sin inventar valores): 29 + 59 + 169 = 257, más 33 aproximadas = **290 de 326 (89 %)**.

### Lo que le falta a Ketea (anotado, no inventado)

Cada punto es una decisión de diseño pendiente, no un valor que yo haya puesto:

- **Color de acento** (Orali usa sage para "dietario" y acentos): no existe en Ketea. Se usó `color-brand-hover`.
- **Colores "solid" de feedback**, **bordes inversos translúcidos** y **transparencias de blanco** (10/15/30/50/80/90 %): no existen. Se usó el texto de feedback, el borde fuerte o blanco pleno.
- **Overlay fuerte** (60 %): Ketea tiene un solo overlay (45 %).
- **Pasos de paleta**: faltan green/yellow/red/blue 200/400/600/800/950. Falta `brand-active` (se usó `brand-900`).
- **Tamaños de control** (`size-control-xs…xl`: 32/36/40/44/48 px): no existen. Se usaron `spacing-8/10/12` y `size-touch-min`.
- **Escala de espaciado**: faltan 2, 6, 10, 28 y 56 px (+ el 0). Se redondeó al paso vecino. Las pantallas nuevas también lo usan (por ejemplo `--space-0-5`, `--space-1-5`).
- **Alturas de línea en px**: Ketea las tiene como proporción, Orali en px. Se mapeó a la proporción más cercana.
- **`font-size-2xs`** (10 px) y **`shadow-2xl`**.
- **Capa z** (`header`, `sticky`, `drawer`, `modal`, `progress`…): no existe. **Excepción a la regla de no usar valores sueltos:** copié los enteros de Orali al tema porque sin ellos el drawer queda debajo del header. Están marcados "falta"; hay que crearlos en los tokens.
- **Botón de peligro** (`--button-danger-*`): lo definí en el tema a partir de los colores de feedback de error; Ketea no tiene esa capa.
- **Capa por componente completa**: Ketea no la tiene, y es lo que habría que crear para compartir base.

## 2. Capturas

Carpeta `informe/capturas/`.

- **Comparación inicial** (`orali-base-*`, `ketea-spike-*`, `ketea-actual-*`, sufijo `-mobile` para 390 px): se tomaron con el spike en su primera versión, **no representan el estado actual**. Sirven para ver el punto de partida.
- **Estado actual por tema**: `header-*`, `home-*`, `footer-*`, `marcas-*`, `service-blocks-*`, `promo-banners-*`, `card-*`, `vista-rapida-*`, `listado-*`, `tabs-*`, `detalle-top`, `drawer-*`, `carrito-*`, `checkout-*`, `confirmacion-*`, `desktop-favoritos*`, `desktop-cuenta-*`, `mobile-*` y `mob-*` (mobile: ficha, carrito, checkout, notificaciones, cuenta con pedidos, ofertas y productos).
- Cómo se obtuvieron: Playwright headless (1440 y 390 px). La tienda actual de Ketea tiene un `.env.local` que apunta a Supabase; sin red se quedaba en esqueletos, así que bloqueé esas llamadas desde Playwright para que use los JSON locales (no toqué ni leí el archivo).

Verificación mobile (390 px): ficha, drawer del carrito, carrito, los 3 pasos del checkout, favoritos, cuenta con pedidos, ofertas, productos y las páginas de ayuda no tienen scroll horizontal. Fue una revisión de la pantalla en esos recorridos, no una prueba en dispositivos reales.

## 3. Código de Orali que sobra o queda por limpiar

Ya resuelto:

- Pedido mínimo (barra flotante, `minimum-progress-bar`, `min-order-progress`) y "packs de 3": eliminados de la interfaz.
- Cupón `ORALI10`, "Envío (CABA)" y copy de pastas en preguntas frecuentes, cómo comprar, contacto, quiénes somos y privacidad: reemplazados.
- Zonas de entrega de CABA: `lib/delivery.ts` ahora define los 3 métodos de Ketea (Gratis, Express, Retiro en Ramos Mejía).

Pendiente:

- Archivos de Orali sin uso en pantalla: `components/patterns/how-it-works.tsx` (+ CSS) y `shipping-check.tsx` (solo stories), `public/logo-orali.*` y `public/imagenes/`.
- Datos dietarios: `BADGE_STYLES`, `NutritionTable` en `product-specs.tsx` (+ stories), `rating-scale`.
- `tsc` marca 2 errores, ambos en `buy-box.stories.tsx` (resto dietario). No bloquean `next dev`; sí un `next build` estricto.
- Textos que dependen de Ketea y hay que validar (ver sección Notas).

## 4. Funciones de Ketea: estado

| Función | Estado en el spike |
| --- | --- |
| Cuotas sin interés (card, detalle, vista rápida, checkout) | Hecho. |
| Pestañas de la ficha | Hecho. Solo el Dolphin S200 tiene ficha completa y archivos; el resto muestra datos básicos y contenido genérico por categoría. |
| Mega menú de categorías | Hecho (panel lateral con secciones). |
| Vista rápida | Hecho (drawer nuevo). |
| Filtros y orden del listado | Hecho (desktop y bottom sheets en mobile). |
| Galería de varias fotos | Hecho (hasta 5 miniaturas). |
| Logos de marcas y carruseles | Hecho (en el footer y portada). |
| Favoritos | Hecho, en memoria. |
| Cuenta | Parcial: acceso simulado, pedidos de la visita, datos básicos y favoritos. Ketea tiene 11 componentes de perfil (tarjetas, direcciones, seguridad, facturas…) que **no** se replicaron. |
| Notificaciones | Hecho, en memoria. Los avisos de ejemplo son inventados; solo "Pedido confirmado" es real. |
| Pagos | Simulados. Para producción lo recomendado es el Payment Brick de Mercado Pago, que cubre tarjeta, cuotas y MODO. |
| Soporte por chat, reseñas, banners de listado | No se replicaron. |

## 5. Comparación de componentes

Orali tiene 64 componentes (sin stories). Equivalente en Ketea entre paréntesis. **Coincide** = misma función, solo cambia la marca; **adaptar** = existe pero hay que tocar datos o lógica; **construir** = no sirve o no existe. La columna "Estado" refleja la primera revisión; los componentes marcados con ✔ ya se adaptaron o construyeron en el spike.

| Componente de Orali | Equivalente en Ketea | Estado |
| --- | --- | --- |
| `auth-modal`, `account-access-form` | LoginModal | adaptar |
| `bottom-sheet` | CategoriesModal / SearchMobileModal | adaptar ✔ (filtros y orden) |
| `cart-drawer`, `drawer`, `drawer-footer`, `cart-item` | SidebarCart | coincide ✔ |
| `categories-section` | CategorySlider | adaptar |
| `confirm-delete-modal`, `modal` | ConfirmModal, LogoutModal | coincide |
| `footer` | Footer | adaptar ✔ |
| `hero` | HeroSlider | coincide |
| `nav`, `header/*` | Header/* | adaptar ✔ |
| `header/mega-menu` | MegaMenu | construir ✔ |
| `header/checkout-header`, `step-indicator` | Checkout* | coincide ✔ |
| `newsletter-banner` | Footer (newsletter) | adaptar ✔ |
| `route-progress-bar` | RouteSkeleton | coincide |
| `buy-box`, `product-info` | ProductDetail | adaptar ✔ |
| `product-gallery` | ProductGallery / Mobile | adaptar ✔ |
| `product-specs` | ProductInfoTabs, ProductSpecificationsBlocks | construir ✔ (`product-tabs`) |
| `product-card` | ProductCard / Mobile | adaptar ✔ |
| `checkout-cta`, `order-review`, `order-summary`, `payment-panel`, `order-confirmation` | Checkout, CheckoutPayment, OrderComplete | adaptar ✔ |
| `shipping-form`, `shipping-check` | CheckoutShipping | adaptar ✔ (`shipping-form`) |
| `coupon-field` | MethodsDiscountModal | adaptar ✔ (sin cupón de ejemplo) |
| `empty-state`, `section-header`, `page-header`, `info-panel` | (sueltos en cada página) | coincide |
| `feature-row`, `trust-strip` | BlockServices | coincide ✔ (`service-blocks`) |
| `promo-banner` | Block2ColsBanners / Block3ColsBanners | coincide ✔ (3 medidas) |
| `minimum-progress-bar`, `min-order-progress`, `how-it-works` | — | sobra (los dos primeros eliminados) |
| `ui/*` (badge, chip, card, button, input, …) | clases de Bootstrap + ButtonSpinner | coincide |
| `ui/price` | precio en ProductCard | adaptar ✔ |
| `ui/stepper`, `ui/tabs`, `ui/skeleton`, `ui/toaster` | QuantityControl, ProductInfoTabs, skeletons, AlertFloating | coincide |
| `ui/rating-scale` | ProductReviews (código muerto en Ketea) | sobra |

Construidos en el spike sin equivalente en Orali: QuickView, filtros (`filter-sidebar`, chips), brands-strip, notifications-menu, mobile-menu/mobile-nav, delivery-options, personal-form, payment-methods, order-list, product-tabs, páginas de favoritos y cuenta, contexto de pedidos.

Sin construir: BrandsLogos de listado, ListingBanner, SupportChat, los 11 de `profile/*` y los modales de cuenta (tarjeta, factura, direcciones).

Son estimaciones por nombre y función; **no abrí uno por uno el código de los 77 componentes de Ketea**.

## 6. Costo de subir el stack y compartir la base

Todo es estimación, no lo probé.

- **Next 14 → 16 y React 18 → 19:** el código usa App Router, `next/link`, `next/image`, `next/navigation` y algunos `forwardRef`. Calculo 1 a 2 días, más Storybook. Hay que leer `node_modules/next/dist/docs/` de la versión destino antes de tocar nada (lo pide `AGENTS.md`).
- **Tailwind 3 → 4:** buena noticia: **0 `@apply`** y los estilos son CSS plano por clases. Lo delicado: el preset usa `rgb(var(--…-rgb) / <alpha-value>)`, y en Tailwind 4 conviene pasar a `@theme`. Estimo 1 a 2 días, y hay que decidir si el preset de tokens se reescribe (impacta también a `@ketea/tokens/tailwind`).
- **Base compartida entre las dos marcas:** lo mínimo sería (a) crear la capa por componente en `ketea-design-tokens`, (b) sacar los componentes a un paquete y dejar cada tienda con su tema y sus datos, (c) unificar nombres: `color-semantic-*` vs `color-*`. Eso es 1 a 2 semanas y es la decisión de fondo; el spike muestra que (a) y (c) son lo que bloquea.

## 7. Recomendación

**Seguir, pero cambiando el orden:** primero crear en `ketea-design-tokens` los nombres y la capa por componente que usa Orali (con lo que falta de la sección 1), y recién ahí armar la tienda, en vez de copiar y parchar como se hizo acá. La base de Orali rindió: layout, carrito, drawer, listado, ficha y checkout se adaptaron sin rehacer la arquitectura, y lo que no existía (vista rápida, filtros, pestañas, notificaciones, cuenta) se pudo construir con los mismos tokens y patrones.

Para pasar de spike a producto faltan, en este orden: backend real (catálogo, pedidos, sesión y pago), la cuenta completa, datos de ficha para todos los productos (hoy solo uno), pruebas de accesibilidad y rendimiento, y la decisión sobre la capa de tokens.

## Notas y límites

- `styles/ketea-theme.css` se generó con un script a partir de la tabla y después se editó a mano; no tiene hex ni px sueltos. Lo único fuera de los tokens son los enteros de capa z, marcados.
- **Contenido a validar con Ketea** (redacción mía a partir de datos del spike): "Envíos gratis a partir de $99.000", plazo de arrepentimiento de 10 días, textos de Quiénes somos, razón social "Ketea S.A." y email en la política de privacidad (es un texto legal: necesita revisión), y las respuestas de preguntas frecuentes y cómo comprar. Los enlaces de la pestaña Recursos y descargas son `#` en los datos y no navegan.
- Quedan textos y enlaces de Orali en `/cuenta` del footer ("Ingresar", "Registrarse") que apuntan todos a la misma página de cuenta.
- Favoritos, sesión, notificaciones y pedidos son en memoria: se pierden al recargar o al abrir la página por una URL directa.
- No se levantó Storybook ni se corrieron tests automáticos; la verificación fue con scripts de Playwright y `tsc`/`lint:ui`.
- Las cifras de comparación de capturas iniciales y de la tabla de tokens son de la primera versión (2026-11-12).
