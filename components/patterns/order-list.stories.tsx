import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { OrderList } from './order-list'
import { sampleProducts } from '../../.storybook/fixtures'
import type { Order } from '../../lib/orders-context'

const order = (n: number, items: Order['items']): Order => {
  const subtotal = items.reduce((s, i) => s + i.product.priceX3 * i.quantity, 0)
  return {
    email: 'ana@example.com',
    ref: `ORD-2026-4821${n}`,
    date: '13 de noviembre de 2026',
    items,
    subtotal,
    shippingCost: 0,
    total: subtotal,
    deliveryLabel: 'Envío Gratis',
    paymentLabel: n % 2 ? 'MODO' : 'Mercado Pago',
  }
}

const meta = {
  title: 'Patterns/Order list',
  component: OrderList,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>],
} satisfies Meta<typeof OrderList>
export default meta
type Story = StoryObj<typeof meta>

export const OneOrder: Story = { args: { orders: [order(1, [{ product: sampleProducts[0], quantity: 1 }])] } }
export const SeveralOrders: Story = {
  args: {
    orders: [
      order(2, [{ product: sampleProducts[1], quantity: 2 }, { product: sampleProducts[2], quantity: 1 }]),
      order(1, [{ product: sampleProducts[0], quantity: 1 }]),
    ],
  },
}
