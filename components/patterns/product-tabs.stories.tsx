import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProductTabs } from './product-tabs'
import { getProductBySlug, products } from '../../lib/products'

// Dolphin S200: ficha completa (descripción, qué incluye, consejos, bloques con foto y archivos). El resto tiene datos básicos.
const full = getProductBySlug('robot-limpia-piscinas-dolphin-s200') ?? products[0]
const basic = products.find((p) => p.slug !== full.slug) ?? products[1]

const meta = {
  title: 'Patterns/Product tabs',
  component: ProductTabs,
  tags: ['autodocs'],
  args: { product: full },
  parameters: { layout: 'padded', docs: { description: { component: 'Pestañas de la ficha: Descripción, Especificaciones, Recursos y descargas (solo si el producto tiene archivos), Preguntas frecuentes y Garantía y soporte.' } } },
} satisfies Meta<typeof ProductTabs>
export default meta
type Story = StoryObj<typeof meta>

export const CompleteProduct: Story = {}
/** Sin descripción larga ni archivos: la pestaña «Recursos y descargas» no aparece. */
export const BasicProduct: Story = { args: { product: basic } }
