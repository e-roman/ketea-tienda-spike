import type { Metadata } from "next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "@orali/design-tokens/tokens.css"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import MinimumProgressBar from "@/components/minimum-progress-bar"
import RouteProgressBar from "@/components/route-progress-bar"

export const metadata: Metadata = {
  title: "Orali SIPA SRL - express",
  description: "Orali - Pastas, tapas, empanadas y más. La calidad que vos te mereces.",
  keywords: "pastas frescas, tapas empanadas, ravioles, fettuccine, orali, vegano, sin tacc",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <MinimumProgressBar />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
