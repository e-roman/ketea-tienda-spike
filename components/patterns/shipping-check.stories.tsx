import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ShippingCheck } from './shipping-check'

const meta = {
  title: 'Patterns/Shipping check',
  component: ShippingCheck,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof ShippingCheck>
export default meta
type Story = StoryObj<typeof meta>

/** Probá 1414 (CABA) y 1900 (fuera de zona). */
export const Default: Story = {}
