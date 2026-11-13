import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DeliveryOptions } from './delivery-options'
import { SeedCart, sampleProduct } from '../../.storybook/fixtures'
import { products } from '../../lib/products'

const pickupOnlyProduct = products.find((p) => p.pickupOnly)

const meta = {
  title: 'Patterns/Delivery options',
  component: DeliveryOptions,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof DeliveryOptions>
export default meta
type Story = StoryObj<typeof meta>

/** Código postal, envío a domicilio (gratis o Express) y retiro en sucursal. El método elegido se comparte con el carrito y el checkout. */
export const Default: Story = {}
export const WithoutPostalCode: Story = { args: { showPostalCode: false } }
/** Con un producto que solo se retira (Automower) el envío a domicilio queda deshabilitado. */
export const PickupOnlyCart: Story = {
  decorators: [
    (Story) => (
      <SeedCart items={[{ product: pickupOnlyProduct ?? sampleProduct, quantity: 1 }]}>
        <Story />
      </SeedCart>
    ),
  ],
}
