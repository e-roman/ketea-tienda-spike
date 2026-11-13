# Tienda Ketea (spike)

Spike: la tienda de Orali re-brandeada para Ketea (Next.js 14, React 18, Tailwind 3.4). El resultado y las conclusiones están en [INFORME.md](INFORME.md).

## Requisitos

- Node 20 o superior.
- Acceso a GitHub por **SSH** a los repos `e-roman/ketea-design-tokens` y `e-roman/orali-design-tokens`: son dependencias que se instalan desde GitHub (el preset de Tailwind todavía usa los tokens de Orali).

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
- Los estilos van en `styles/**/*.css` con tokens; `styles/ketea-theme.css` apunta los nombres de Orali a los tokens de Ketea.
