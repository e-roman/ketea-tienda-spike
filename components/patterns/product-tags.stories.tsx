import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProductTags } from './product-tags'
import { products } from '../../lib/products'

const withTags = products.find((p) => p.freeShipping && p.pickupToday) ?? products[0]
const outOfStock = products.find((p) => !p.inStock) ?? products[1]

const meta = {
  title: 'Patterns/Product tags',
  component: ProductTags,
  tags: ['autodocs'],
  args: { product: withTags },
} satisfies Meta<typeof ProductTags>
export default meta
type Story = StoryObj<typeof meta>

/** Envío gratis, «Retiralo hoy», etc., según los datos del producto. */
export const Default: Story = {}
export const OutOfStock: Story = { args: { product: outOfStock } }
