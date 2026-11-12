import type { Preview } from '@storybook/nextjs-vite'
import { Toaster } from '../components/ui/toaster'
import '@orali/design-tokens/tokens.css' // tokens (mismo orden que app/layout.tsx)
import '../app/globals.css'              // Tailwind + styles/components/*.css
import { CartProvider } from '../lib/cart-context'

const preview: Preview = {
  decorators: [
    // Los patterns usan useCart() y toast(): mismo contexto que app/layout.tsx.
    (Story) => (
      <CartProvider>
        <Story />
        <Toaster />
      </CartProvider>
    ),
  ],
  parameters: {
    nextjs: { appDirectory: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - muestra violaciones solo en la UI de tests; 'error' falla el CI
      test: 'todo',
    },
  },
}

export default preview
