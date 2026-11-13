import type { Preview } from '@storybook/nextjs-vite'
import { Toaster } from '../components/ui/toaster'
import '@ketea/tokens/tokens.css'        // tokens de Ketea (mismo orden que app/layout.tsx)
import '../styles/ketea-theme.css'       // variables de la tienda apuntando a los tokens de Ketea
import '../app/globals.css'              // Tailwind + styles/**/*.css
import { CartProvider } from '../lib/cart-context'
import { DeliveryProvider } from '../lib/delivery-context'
import { AuthProvider } from '../lib/auth-context'
import { OrdersProvider } from '../lib/orders-context'
import { NotificationsProvider } from '../lib/notifications-context'
import { FavoritesProvider } from '../lib/favorites-context'
import { QuickViewProvider } from '../lib/quick-view-context'

const preview: Preview = {
  decorators: [
    // Los patterns usan los mismos contextos que app/layout.tsx (carrito, entrega, favoritos, etc.) y toast().
    (Story) => (
      <CartProvider>
        <DeliveryProvider>
          <AuthProvider>
            <OrdersProvider>
              <NotificationsProvider>
                <FavoritesProvider>
                  <QuickViewProvider>
                    <Story />
                    <Toaster />
                  </QuickViewProvider>
                </FavoritesProvider>
              </NotificationsProvider>
            </OrdersProvider>
          </AuthProvider>
        </DeliveryProvider>
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
