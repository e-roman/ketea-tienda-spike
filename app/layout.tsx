import type { Metadata } from "next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "@ketea/tokens/tokens.css"
import "../styles/ketea-theme.css"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { FavoritesProvider } from "@/lib/favorites-context"
import { DeliveryProvider } from "@/lib/delivery-context"
import { AuthProvider } from "@/lib/auth-context"
import { OrdersProvider } from "@/lib/orders-context"
import { NotificationsProvider } from "@/lib/notifications-context"
import { QuickViewProvider } from "@/lib/quick-view-context"
import { QuickViewDrawer } from "@/components/patterns/quick-view"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import WhatsappFloat from "@/components/whatsapp-float"
import RouteProgressBar from "@/components/route-progress-bar"

export const metadata: Metadata = {
  title: "Ketea - Piscinas y equipamiento",
  description: "Ketea - Robots limpiafondos, bombas de calor, filtros y químicos para tu pileta.",
  keywords: "piscinas, robots limpiafondos, bombas de calor, filtros, cloro, ketea",
  icons: {
    icon: "/assets/img/favicon/favicon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <CartProvider>
          <DeliveryProvider>
          <AuthProvider>
          <OrdersProvider>
          <NotificationsProvider>
          <FavoritesProvider>
            <QuickViewProvider>
              <Nav />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
              <QuickViewDrawer />
              <WhatsappFloat />
              <Toaster />
            </QuickViewProvider>
          </FavoritesProvider>
          </NotificationsProvider>
          </OrdersProvider>
          </AuthProvider>
          </DeliveryProvider>
        </CartProvider>
      </body>
    </html>
  )
}
