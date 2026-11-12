import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { ShippingForm, DeliveryZoneNotice } from './shipping-form'

const meta = {
  title: 'Patterns/Shipping form',
  component: ShippingForm,
  tags: ['autodocs'],
  args: { onSubmit: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof ShippingForm>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}
export const Prefilled: Story = {
  args: {
    defaultValues: {
      nombre: 'María', apellido: 'González', direccion: 'Av. Corrientes 1234',
      localidad: 'Palermo', cp: '1414', telefono: '11 4567-8901',
    },
  },
}
export const OutsideCaba: Story = { args: { defaultValues: { localidad: 'La Plata', cp: '1900' } } }
export const Loading: Story = { args: { ...Prefilled.args, loading: true } }

export const ZoneNoticeCaba: Story = { render: () => <DeliveryZoneNotice localidad="Palermo" cp="1414" /> }
export const ZoneNoticeNeedsNeighborhood: Story = { render: () => <DeliveryZoneNotice localidad="" cp="1414" /> }
export const ZoneNoticeOutside: Story = { render: () => <DeliveryZoneNotice localidad="La Plata" cp="1900" /> }
