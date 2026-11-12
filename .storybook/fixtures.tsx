import { useEffect, type ReactNode } from 'react'
import { useCart } from '../lib/cart-context'
import { products, type Product } from '../lib/products'

/** Producto de ejemplo para las stories (con y sin oferta). */
export const sampleProduct: Product = products[0]
export const saleProduct: Product = products.find((p) => p.onSale && p.originalPriceX3) ?? products[1]
export const sampleProducts: Product[] = products.slice(0, 3)

/** Abre el drawer del carrito al montar (para stories de CartDrawer). */
export function OpenCart({ children }: { children: ReactNode }) {
  const { openCart } = useCart()
  useEffect(() => {
    openCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>{children}</>
}

/** Carga el carrito con `quantities` packs de cada producto al montar (para stories que leen useCart). */
export function SeedCart({ items, children }: { items: { product: Product; quantity: number }[]; children: ReactNode }) {
  const { add, clear } = useCart()
  useEffect(() => {
    clear()
    items.forEach(({ product, quantity }) => {
      for (let i = 0; i < quantity; i++) add(product)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>{children}</>
}
