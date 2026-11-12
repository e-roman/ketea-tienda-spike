import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CartDrawer from './cart-drawer'
import { OpenCart, SeedCart, sampleProducts } from '../.storybook/fixtures'

const meta = {
  title: 'Components/Cart drawer',
  component: CartDrawer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CartDrawer>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  decorators: [(Story) => <OpenCart><Story /></OpenCart>],
}
export const BelowMinimum: Story = {
  decorators: [
    (Story) => (
      <SeedCart items={[{ product: sampleProducts[0], quantity: 2 }]}>
        <OpenCart><Story /></OpenCart>
      </SeedCart>
    ),
  ],
}
export const MinimumMet: Story = {
  decorators: [
    (Story) => (
      <SeedCart items={[{ product: sampleProducts[0], quantity: 2 }, { product: sampleProducts[1], quantity: 2 }]}>
        <OpenCart><Story /></OpenCart>
      </SeedCart>
    ),
  ],
}
