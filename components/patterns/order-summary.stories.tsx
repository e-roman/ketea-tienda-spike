import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { OrderSummary } from './order-summary'

const meta = {
  title: 'Patterns/Order summary',
  component: OrderSummary,
  tags: ['autodocs'],
  args: { totalItems: 2, subtotal: 25500, total: 25500, minimumMet: false, remainingForMinimum: 2, onCheckout: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof OrderSummary>
export default meta
type Story = StoryObj<typeof meta>

export const BelowMinimum: Story = {}
export const Ready: Story = { args: { totalItems: 4, subtotal: 51000, total: 51000, minimumMet: true, remainingForMinimum: 0 } }
export const Loading: Story = { args: { ...Ready.args, loading: true } }
