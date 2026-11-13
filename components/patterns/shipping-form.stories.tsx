import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { ShippingForm } from './shipping-form'

const meta = {
  title: 'Patterns/Shipping form',
  component: ShippingForm,
  tags: ['autodocs'],
  args: { onSubmit: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>],
} satisfies Meta<typeof ShippingForm>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}
export const Prefilled: Story = {
  args: {
    defaultValues: { calle: 'Tronador', numero: '411', cp: '1706', tipo: 'Casa', provincia: 'Buenos Aires', ciudad: 'Haedo' },
  },
}
export const Loading: Story = { args: { ...Prefilled.args, loading: true } }
