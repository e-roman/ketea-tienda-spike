import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProductCard, { ProductCardSkeleton } from './product-card'
import { SeedCart, sampleProduct, saleProduct, sampleProducts } from '../../.storybook/fixtures'

const meta = {
  title: 'Patterns/Product card',
  component: ProductCard,
  tags: ['autodocs'],
  args: { product: sampleProduct },
  // Una card suelta se limita a 280px; las stories con `parameters.fullWidth` (la grilla) usan todo el ancho.
  decorators: [(Story, { parameters }) => (parameters.fullWidth ? <Story /> : <div style={{ maxWidth: 280 }}><Story /></div>)],
} satisfies Meta<typeof ProductCard>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const OnSale: Story = { args: { product: saleProduct } }
export const InCart: Story = {
  decorators: [(Story) => <SeedCart items={[{ product: sampleProduct, quantity: 2 }]}><Story /></SeedCart>],
}
export const Skeleton: Story = { render: () => <ProductCardSkeleton /> }
export const Grid: Story = {
  parameters: { fullWidth: true },
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ maxWidth: 900 }}>
      {sampleProducts.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  ),
}
