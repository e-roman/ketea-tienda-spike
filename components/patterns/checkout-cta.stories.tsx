import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { CheckoutCta } from './checkout-cta'

const meta = {
  title: 'Patterns/Checkout CTA',
  component: CheckoutCta,
  tags: ['autodocs'],
  args: { onClick: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof CheckoutCta>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = { args: { loading: true } }
