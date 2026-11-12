import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CheckoutHeader } from './checkout-header'

const meta = {
  title: 'Patterns/Header/Checkout header',
  component: CheckoutHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CheckoutHeader>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
