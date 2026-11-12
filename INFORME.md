# Informe del spike: tienda de Ketea a partir de la tienda de Orali

Fecha: 2026-11-12. Carpeta: `C:\next-projects\ketea-tienda-spike` (repo git local, sin remoto).
Commits: `copia de orali-tienda` (base intacta) y el commit del spike encima.

## Resumen en 5 líneas

1. **Seguir por este camino, ajustándolo.** Con una sola capa de tokens (`styles/ketea-theme.css`) y cero cambios de estilo en los componentes, la tienda de Orali ya se ve como Ketea: azul de marca, Mulish, logo, productos reales (46) en portada, listado y detalle.
2. **La cobertura de tokens es alta (89 %), pero engaña:** 169 de las 326 variables son la capa por componente (`--button-primary-bg`…), que **Ketea no tiene**. Las copié de Orali y las apunté a los semánticos de Ketea; eso vive en la tienda, no en los tokens. Para compartir de verdad hay que crear esa capa en `ketea-design-tokens`.
3. **Lo que falta no es de tokens sino de funciones:** cuotas sin interés, pestañas de especificaciones, mega menú real, vista rápida, filtros del listado, galería con varias fotos. Orali tiene base solo para algunas.
4. **El código de pastas está muy metido en la lógica** (packs ×3, pedido mínimo, zonas de entrega de CABA, cupón ORALI10): en carrito y checkout sigue apareciendo ese copy. Limpiarlo es trabajo real, no cosmético.
5. **No evalué** Next 16 / React 19 / Tailwind 4 (solo estimo el costo abajo), ni la cuenta, favoritos ni los pasos de entrega y pago del checkout (solo el paso 1).

## Qué se hizo

- Copia de `orali-tienda` sin `node_modules`, `.git` ni `.next`; `npm install --legacy-peer-deps` OK. Stack: Next 14.2.35, React 18, Tailwind 3.4 (sin subir).
- `package.json`: se agregó `@ketea/tokens` como `file:../ketea-design-tokens`. `@orali/design-tokens` queda solo para que el preset de Tailwind de Orali siga resolviendo (ya no se importa su `tokens.css`).
- `app/layout.tsx` importa `@ketea/tokens/tokens.css` y `styles/ketea-theme.css`.
- Marca: logo SVG de Ketea, Mulish, textos de portada, navbar, footer, newsletter, metadatos. Copiadas a `public/assets/img` las imágenes de productos, detalle, logo, banners y slider.
- Datos: `lib/products.ts` reescrito como adaptador de `products.json` y `productDetails.json` (copiados a `lib/data/`). Mantiene los nombres que exportaba Orali.
- Servidores: se levantaron 3 (spike, base de Orali, tienda actual de Ketea) y **se cerraron al terminar**. La base de Orali se corrió desde una copia temporal para no tocar `orali-tienda`.
- No se modificó `orali-tienda`, `ketea-tienda`, `ketea-dashboard` ni los repos de tokens (verificado con `git status` en los dos primeros).

## 1. Cobertura de tokens

Tabla completa (326 filas): [informe/tabla-tokens.md](informe/tabla-tokens.md). Se obtuvo extrayendo todos los `var(--…)` de `app/`, `components/`, `styles/` y `lib/` (sin stories).

| Estado | Variables | Qué significa |
| --- | ---: | --- |
| Mismo nombre en Ketea | 29 | Resuelven solas (`--font-size-*`, `--radius-*`, `--duration-*`, `--border-width-*`…) |
| Equivalente directo | 59 | Otro nombre, mismo concepto: `--color-surface-default` → `--color-semantic-surface-default` |
| Aproximado | 33 | Se usó el token más cercano; hay diferencia de valor o de concepto (lista abajo) |
| Falta sin reemplazo | 5 | Capa z: `--z-index-*` (Ketea no tiene) |
| Capa por componente | 169 | Botón, chip, stepper, badge, input… **copiadas de Orali** y apuntadas a los semánticos de Ketea |
| Privadas del componente | 31 | Se definen dentro de la propia clase (`--btn-h`, `--input-px`…); no son tokens |
| **Total** | **326** | |

Resueltas con tokens de Ketea (sin inventar valores): 29 + 59 + 169 = 257, más 33 aproximadas = **290 de 326 (89 %)**. Quedan 5 sin reemplazo y 31 que no aplican.

### Lo que le falta a Ketea (anotado, no inventado)

Cada punto es una decisión de diseño pendiente, no un valor que yo haya puesto:

- **Color de acento** (Orali usa sage para "dietario" y acentos): no existe en Ketea. Se usó `color-brand-hover`.
- **Colores "solid" de feedback**, **bordes inversos translúcidos** y **transparencias de blanco** (10/15/30/50/80/90 %): no existen. Se usó el texto de feedback, el borde fuerte o blanco pleno.
- **Overlay fuerte** (60 %): Ketea tiene un solo overlay (45 %).
- **Pasos de paleta**: faltan green/yellow/red/blue 200/400/600/800/950 (los pide el preset de Tailwind de Orali; no los usan los componentes hoy). Falta `brand-active` (se usó `brand-900`).
- **Tamaños de control** (`size-control-xs…xl`: 32/36/40/44/48 px): no existen. Se usaron `spacing-8/10/12` y `size-touch-min`; el de 36 px (chips, botón pequeño) queda en 32 px.
- **Escala de espaciado**: faltan 2, 6, 10, 28 y 56 px (+ el 0). Se redondeó al paso vecino.
- **Alturas de línea en px**: Ketea las tiene como proporción (1,25 / 1,5…), Orali en px. Se mapeó a la proporción más cercana; hay que revisar títulos y botones.
- **`font-size-2xs`** (10 px) y **`shadow-2xl`**.
- **Capa z** (`header`, `sticky`, `drawer`, `modal`, `progress`…): no existe. **Excepción a tu regla:** copié los enteros de Orali al tema porque sin ellos el drawer queda debajo del header. Están marcados "falta" en el archivo; hay que crearlos en los tokens.
- **Capa por componente completa** (151 variables solo de botón, chip, stepper, badge, input, dropdown): Ketea no la tiene, y es lo que habría que crear para compartir base.

## 2. Capturas comparadas

Carpeta `informe/capturas/`. Nombres: `orali-base-*`, `ketea-spike-*`, `ketea-actual-*`; sufijo `-mobile` para 390 px. Páginas: `home`, `listado`, `detalle`, `carrito-drawer`, `carrito`, `checkout`.

Cómo se obtuvieron: Playwright headless, 1280 y 390 px. La tienda actual de Ketea tiene un `.env.local` que apunta a Supabase; sin red se quedaba en esqueletos, así que bloqueé esas llamadas desde Playwright para que use los JSON locales (no toqué el archivo ni lo leí).

| Página | Spike (Orali con marca Ketea) | Tienda actual de Ketea |
| --- | --- | --- |
| Portada | Bien: logo, azul, Mulish, hero con banner de Ketea, 4 destacados y bombas de calor. Mal: el bloque "¿Cómo funciona?" sigue siendo de Orali (3 pasos genéricos); los banners promo usan imágenes que traen texto propio y chocan con el título. | Mucho más rica: slider, servicios, carruseles de 5, banners, logos de marcas, footer con medios de pago. |
| Listado | Bien: grilla limpia de 46 productos, orden y cards claras. Mal: faltan filtros por marca/categoría/precio; las cards no muestran cuotas. Algunas imágenes salen en blanco en la captura de página completa (probablemente carga diferida, **no lo verifiqué**). | Con filtros, chips y orden. |
| Detalle | Bien: precio, descuento, badges, stepper, productos relacionados. Mal: una sola foto (sin miniaturas), sin cuotas ni "retiro en sucursal", y las "especificaciones" salen como un bloque de texto sin pestañas. Tiene un bloque "Verificá si llegamos a tu zona" heredado de CABA. | Galería con 5 fotos, SKU, cuotas, envío, pestañas (descripción, especificaciones, recursos, FAQ, garantía), bloques con fotos. |
| Carrito (drawer y página) | Bien: estructura clara, resumen, medios de pago. Mal: dice "1 pack", "Pedido mínimo alcanzado", "Envío (CABA)", cupón de ejemplo `ORALI10`. Funciona, pero con copy de pastas. | Más simple; sin pedido mínimo. |
| Checkout | Bien: cabecera propia con logo de Ketea, 3 pasos (cuenta, entrega, pago) y resumen con el producto real. Mal: solo capté el paso 1 (cuenta); los pasos de entrega y pago, con sus zonas de CABA, no se revisaron. | Captura hecha; flujo propio en 3 pasos. |

Mobile: están todas las capturas; las miré por encima (no hay desbordes evidentes), pero no las revisé una por una.

## 3. Código de Orali que sobra para Ketea

- `lib/delivery.ts` (zonas de entrega y barrios de CABA).
- `components/minimum-progress-bar.tsx`, `components/patterns/min-order-progress.tsx` y `styles/patterns/min-order-progress.css` (pedido mínimo).
- `lib/cart-context.tsx`: `MINIMUM_PACKS`, cantidades en "packs de 3" (dejado en 1 en el spike para poder comprar).
- `components/patterns/shipping-form.tsx`, `shipping-check.tsx` (zonas / CABA), `coupon-field.tsx` (cupón `ORALI10`), `how-it-works.tsx` + `styles/patterns/how-it-works.css`.
- Copy de pastas aún presente: `app/como-comprar`, `preguntas-frecuentes`, `quienes-somos`, `contacto`, `politicas-de-privacidad`, `components/patterns/order-confirmation.tsx`, `components/patterns/cart-item.tsx` y los textos "pack" de `cart-drawer.tsx`, `app/carrito/page.tsx`, `app/checkout/page.tsx`.
- Datos dietarios: `BADGE_STYLES`, `DIETARY_CHIPS` en `app/productos/page.tsx`, `NutritionTable` en `product-specs.tsx`, `rating-scale` (ui).
- Públicos: `public/logo-orali.*`, `public/imagenes/`.
- Hoy `tsc` marca 15 errores de tipo, todos por esos restos dietarios (`sin-tacc`, `vegano`, `apto-freezer`…) y sus stories. No bloquean `next dev`; sí un `next build` estricto.

## 4. Funciones de Ketea que faltan y no salen de Orali

| Función | ¿Algo parecido en Orali? |
| --- | --- |
| Cuotas sin interés (etiqueta en card, detalle, "3x $…") | No. El dato ya está en el adaptador (`installments`) pero ningún componente lo muestra. Se construye sobre `ui/price.tsx` y `badge.tsx`. |
| Pestañas de especificaciones técnicas | Hay `ui/tabs.tsx` y `product-specs.tsx` (bloques), pensado para tabla nutricional. Base útil, hay que armar el contenido. |
| Mega menú de categorías | `header/mega-menu.tsx` (2 grupos simples). Ketea necesita secciones con muchos ítems: hay que ampliarlo. |
| Vista rápida del producto | No. Hay `modal.tsx` y `bottom-sheet.tsx` como base. |
| Favoritos | Existe `app/favoritos`. No lo evalué. |
| Cuenta | Existe `app/cuenta`. Ketea tiene 11 componentes de perfil (pedidos, tarjetas, direcciones, seguridad…): casi todo por construir. |
| Filtros y orden del listado | Hay orden y chips; los filtros por marca/precio no. |
| Galería de varias fotos | `product-gallery.tsx` existe; en el spike el detalle mostró una foto (los datos tienen `images`, no las conecté). |
| Logos de marcas, banners, carruseles | `promo-banner` y `trust-strip` sirven; carruseles y logos de marcas no. |

## 5. Comparación de componentes

Orali tiene 64 componentes (sin stories). Equivalente en Ketea entre paréntesis. **Coincide** = misma función, solo cambia la marca; **adaptar** = existe pero hay que tocar datos o lógica; **construir** = no sirve o no existe.

| Componente de Orali | Equivalente en Ketea | Estado |
| --- | --- | --- |
| `auth-modal`, `account-access-form` | LoginModal | adaptar |
| `bottom-sheet` | CategoriesModal / SearchMobileModal | adaptar |
| `cart-drawer`, `drawer`, `drawer-footer`, `cart-item` | SidebarCart | coincide |
| `categories-section` | CategorySlider | adaptar |
| `confirm-delete-modal`, `modal` | ConfirmModal, LogoutModal | coincide |
| `footer` | Footer | adaptar (faltan logos de marcas y medios de pago reales) |
| `hero` | HeroSlider | coincide |
| `nav`, `header/utility-bar`, `header/search-field`, `header/search-results`, `header/mobile-menu` | Header/* | adaptar |
| `header/mega-menu` | MegaMenu | construir (más secciones) |
| `header/checkout-header`, `step-indicator` | Checkout* | coincide |
| `newsletter-banner` | Footer (newsletter) | adaptar |
| `route-progress-bar` | RouteSkeleton | coincide |
| `buy-box`, `product-info` | ProductDetail | adaptar (cuotas, envío, retiro) |
| `product-gallery` | ProductGallery / Mobile | adaptar (varias fotos) |
| `product-specs` | ProductInfoTabs, ProductSpecificationsBlocks | construir |
| `product-card` | ProductCard / Mobile | adaptar (cuotas, favoritos, envío) |
| `checkout-cta`, `order-review`, `order-summary`, `payment-panel`, `order-confirmation` | Checkout, CheckoutPayment, OrderComplete | adaptar |
| `shipping-form`, `shipping-check` | CheckoutShipping | adaptar (zonas de CABA sobran) |
| `coupon-field` | MethodsDiscountModal | adaptar |
| `empty-state`, `section-header`, `page-header`, `info-panel` | (sueltos en cada página) | coincide |
| `feature-row`, `trust-strip` | BlockServices | coincide |
| `promo-banner` | Block2ColsBanners / Block3ColsBanners | coincide |
| `minimum-progress-bar`, `min-order-progress`, `how-it-works` | — | sobra |
| `ui/badge`, `chip`, `card`, `button`, `icon-button`, `icon-badge`, `input`, `field`, `form-parts`, `text`, `link`, `layout`, `logo`, `breadcrumb`, `progress` | clases de Bootstrap + ButtonSpinner | coincide |
| `ui/price` | precio en ProductCard | adaptar (cuotas) |
| `ui/stepper` | QuantityControl | coincide |
| `ui/tabs` | ProductInfoTabs | coincide |
| `ui/skeleton` | skeletons/* | coincide |
| `ui/toaster` | AlertFloating | coincide |
| `ui/rating-scale` | ProductReviews (código muerto en Ketea) | sobra |

Sin equivalente en Orali (construir): QuickView, SearchFilters / FilterList / SearchFilterChips, SearchSort, BrandsLogos, ProductCarousel, ListingBanner, SupportChat, los 11 de `profile/*`, los modales de cuenta (tarjeta, factura, direcciones).

Resumen: de los 64, unos 38 coinciden o casi; 20 hay que adaptar; 6 sobran. Son estimaciones por nombre y función; **no abrí uno por uno el código de los 77 componentes de Ketea**.

## 6. Costo de subir el stack y compartir la base

Todo es estimación, no lo probé.

- **Next 14 → 16 y React 18 → 19:** el código usa App Router, 27 `next/link`, 10 `next/image`, 8 `next/navigation`; 5 usos de APIs que cambian (`forwardRef`, etc.). Calculo 1 a 2 días, más correr Storybook y ajustar. Hay que leer `node_modules/next/dist/docs/` de la versión destino antes de tocar nada.
- **Tailwind 3 → 4:** buena noticia: **0 `@apply`** y los estilos son CSS plano por clases (47 bloques `@layer`). Lo delicado: el preset de Orali usa `rgb(var(--…-rgb) / <alpha-value>)`, y en Tailwind 4 conviene pasar a `@theme` en CSS. Estimo 1 a 2 días, y hay que decidir si el preset de tokens se reescribe (impacta también a `@ketea/tokens/tailwind`).
- **Base compartida entre las dos marcas:** lo mínimo sería (a) crear la capa por componente en `ketea-design-tokens` (hoy solo existe en Orali, 146 variables de botón), (b) sacar los componentes a un paquete y dejar cada tienda con su tema y sus datos, (c) unificar nombres: `color-semantic-*` vs `color-*`. Eso es 1 a 2 semanas de trabajo ordenado y es la decisión de fondo; este spike solo muestra que (a) y (c) son lo que bloquea.

## 7. Recomendación

**Seguir, pero cambiando el orden:** primero crear en `ketea-design-tokens` los nombres y la capa por componente que usa Orali (con lo que falta de la sección 1), y recién ahí armar la tienda, en vez de copiar y parchar como hice acá. La base de Orali rinde: layout, carrito, drawer, listado y detalle salen casi gratis. No conviene hacerlo para igualar la tienda actual a corto plazo: faltan cuotas, pestañas técnicas, mega menú, filtros, galería y cuenta, que son lo más visible de la tienda real. Dos cosas quedaron a medias y no las escondo: los pasos de entrega y pago del checkout no se revisaron, y el copy de pastas sigue en carrito y checkout.

## Notas y límites

- `styles/ketea-theme.css` está generado por un script (en la carpeta temporal de la sesión, no incluido) a partir de la tabla; no tiene hex ni px sueltos. Lo único fuera de los tokens son los 7 enteros de capa z, marcados.
- Se omitió Storybook (no se levantó) y los tests.
- El cambio de `MINIMUM_PACKS` a 1 y el reemplazo de textos "pack" fueron solo para poder ver los flujos; no son una solución.
