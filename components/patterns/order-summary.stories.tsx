import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { OrderSummary } from './order-summary'

const meta = {
  title: 'Patterns/Order summary',
  component: OrderSummary,
  tags: ['autodocs'],
  args: { totalItems: 2, subtotal: 3385460, total: 3385460, onCheckout: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof OrderSummary>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const SeveralProducts: Story = { args: { totalItems: 4, subtotal: 6770920, total: 6770920 } }
export const Loading: Story = { args: { loading: true } }
