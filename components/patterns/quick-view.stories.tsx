import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useEffect } from 'react'
import { QuickViewDrawer } from './quick-view'
import { useQuickView } from '../../lib/quick-view-context'
import { saleProduct } from '../../.storybook/fixtures'
import type { Product } from '../../lib/products'

/** Abre la vista rápida al montar, con el producto indicado. */
function OpenQuickView({ product }: { product: Product }) {
  const { openQuickView } = useQuickView()
  // Con un pequeño retraso: al montar, QuickViewDrawer cierra el panel por el cambio de ruta y lo taparía.
  useEffect(() => {
    const t = setTimeout(() => openQuickView(product), 150)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

const meta = {
  title: 'Patterns/Quick view',
  component: QuickViewDrawer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Drawer lateral con el resumen del producto: fotos, precio, cuotas, especificaciones y compra sin salir del listado. El pie (cantidad + «Agregar al carrito») queda siempre visible.' } } },
} satisfies Meta<typeof QuickViewDrawer>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <OpenQuickView product={saleProduct} />
      <QuickViewDrawer />
    </>
  ),
}
