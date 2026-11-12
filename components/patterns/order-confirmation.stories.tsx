import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { OrderConfirmation } from './order-confirmation'
import { sampleProducts } from '../../.storybook/fixtures'

const items = sampleProducts.slice(0, 2).map((product, i) => ({ product, quantity: i + 2 }))
const subtotal = items.reduce((s, i) => s + i.product.priceX3 * i.quantity, 0)

const meta = {
  title: 'Patterns/Order confirmation',
  component: OrderConfirmation,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    orderRef: 'ORA-10234',
    dateString: 'miércoles 4 de noviembre de 2026',
    entrega: 'Martes entre 9 y 18 hs',
    items,
    subtotal,
    total: subtotal,
  },
} satisfies Meta<typeof OrderConfirmation>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutDeliveryDate: Story = { args: { entrega: undefined } }
