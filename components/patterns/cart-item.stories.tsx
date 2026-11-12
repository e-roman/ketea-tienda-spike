import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { CartItem } from './cart-item'
import { sampleProduct, saleProduct } from '../../.storybook/fixtures'

const meta = {
  title: 'Patterns/Cart item',
  component: CartItem,
  tags: ['autodocs'],
  args: {
    product: sampleProduct,
    quantity: 2,
    onIncrement: fn(),
    onDecrement: fn(),
    onRemove: fn(),
  },
  argTypes: { variant: { control: 'inline-radio', options: ['page', 'drawer'] } },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof CartItem>
export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
export const Drawer: Story = { args: { variant: 'drawer' } }
export const DrawerOnSale: Story = { args: { variant: 'drawer', product: saleProduct } }
export const Loading: Story = { args: { loading: 'inc' } }
