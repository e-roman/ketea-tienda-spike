import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { PaymentPanel } from './payment-panel'

const meta = {
  title: 'Patterns/Payment panel',
  component: PaymentPanel,
  tags: ['autodocs'],
  args: { total: 51000, loading: false, onPay: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof PaymentPanel>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = { args: { loading: true } }
