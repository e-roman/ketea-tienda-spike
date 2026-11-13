import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { OrderConfirmation } from './order-confirmation'
import { DELIVERY_OPTIONS } from '@/lib/delivery'
import { paymentSummary } from '@/lib/checkout'
import { sampleProducts } from '../../.storybook/fixtures'

const items = sampleProducts.slice(0, 2).map((product, i) => ({ product, quantity: i + 1 }))
const subtotal = items.reduce((s, i) => s + i.product.priceX3 * i.quantity, 0)

const meta = {
  title: 'Patterns/Order confirmation',
  component: OrderConfirmation,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    orderRef: 'ORD-2026-10234',
    dateString: 'miércoles 4 de noviembre de 2026',
    customer: { nombre: 'Jose', email: 'joseperez@gmail.com', telefono: '011 6671 9135' },
    address: { line1: 'Av. Rivadavia 4566', line2: 'Haedo, Buenos Aires (1706)' },
    delivery: DELIVERY_OPTIONS.standard,
    shippingCost: 0,
    payment: paymentSummary('modo'),
    items,
    subtotal,
    total: subtotal,
  },
} satisfies Meta<typeof OrderConfirmation>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Express: Story = { args: { delivery: DELIVERY_OPTIONS.express, shippingCost: DELIVERY_OPTIONS.express.cost, total: subtotal + DELIVERY_OPTIONS.express.cost } }
export const Pickup: Story = { args: { delivery: DELIVERY_OPTIONS.pickup, address: undefined } }
export const CashPending: Story = { args: { payment: paymentSummary('cash', 'Rapipago') } }
