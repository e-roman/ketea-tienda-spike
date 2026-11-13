# Tienda Ketea (spike)

Tienda de Ketea de prueba (Next.js 14, React 18, Tailwind 3.4): portada, listado con filtros, ficha de producto, carrito, checkout sin registro, favoritos y cuenta, en desktop y mobile. Los componentes están documentados en Storybook.

## Requisitos

- Node 20 o superior.
- Acceso a GitHub por **SSH** al repo `e-roman/ketea-design-tokens`: es una dependencia que se instala desde GitHub.

## Uso

```bash
npm install --legacy-peer-deps   # instala también @ketea/tokens (v3.0.0) desde GitHub
npm run dev                      # tienda en http://localhost:3000
npm run storybook                # Storybook en http://localhost:6006
npm run lint:ui                  # revisa que no haya utilidades visuales de Tailwind ni valores sueltos
```

## Notas

- Sesión, favoritos, notificaciones y pedidos son simulados y viven en memoria; el pago también es simulado.
- `WHATSAPP_PHONE` (en `components/patterns/header/nav-items.ts`) está vacío a propósito: falta el número oficial.
- Los estilos van en `styles/**/*.css` con tokens; `styles/ketea-theme.css` define las variables de la tienda apuntando a los tokens de Ketea.
