import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CouponField } from './coupon-field'

const meta = {
  title: 'Patterns/Coupon field',
  component: CouponField,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof CouponField>
export default meta
type Story = StoryObj<typeof meta>

/** Escribí 3+ caracteres y tocá «Aplicar» para ver el estado aplicado. */
export const Default: Story = {}
