import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BuyBox } from './buy-box'
import { sampleProduct, saleProduct } from '../../.storybook/fixtures'

const meta = {
  title: 'Patterns/Buy box',
  component: BuyBox,
  tags: ['autodocs'],
  args: { product: sampleProduct },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof BuyBox>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const OnSale: Story = { args: { product: saleProduct } }
/** Sin stock: el botón queda deshabilitado y se muestran las etiquetas del producto. */
export const OutOfStock: Story = {
  args: { product: { ...sampleProduct, inStock: false } },
}
