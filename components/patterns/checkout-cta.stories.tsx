import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { CheckoutCta } from './checkout-cta'

const meta = {
  title: 'Patterns/Checkout CTA',
  component: CheckoutCta,
  tags: ['autodocs'],
  args: { minimumMet: false, remainingForMinimum: 2, onClick: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof CheckoutCta>
export default meta
type Story = StoryObj<typeof meta>

export const BelowMinimum: Story = {}
export const OnePackMissing: Story = { args: { remainingForMinimum: 1 } }
export const Ready: Story = { args: { minimumMet: true, remainingForMinimum: 0 } }
export const Loading: Story = { args: { minimumMet: true, remainingForMinimum: 0, loading: true } }
