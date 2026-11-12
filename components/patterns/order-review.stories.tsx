import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { OrderReview, RecapCard } from './order-review'
import { sampleProducts } from '../../.storybook/fixtures'

const items = sampleProducts.slice(0, 2).map((product, i) => ({ product, quantity: i + 1 }))
const subtotal = items.reduce((s, i) => s + i.product.priceX3 * i.quantity, 0)

const meta = {
  title: 'Patterns/Order review',
  component: OrderReview,
  tags: ['autodocs'],
  args: { items, subtotal, total: subtotal },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof OrderReview>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Recap: Story = {
  render: () => (
    <RecapCard title="Envío" editLabel="Editar envío" onEdit={fn()}>
      <p>María González</p>
      <p>Av. Corrientes 1234, Palermo</p>
    </RecapCard>
  ),
}
