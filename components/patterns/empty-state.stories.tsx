import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ShoppingCart } from 'lucide-react'
import { EmptyState } from './empty-state'
import { buttonClasses } from '../ui/button'

const meta = {
  title: 'Patterns/Empty state',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    icon: <ShoppingCart aria-hidden="true" />,
    title: 'Tu carrito está vacío',
    text: 'Agregá productos para empezar tu pedido.',
    children: <a href="#" className={buttonClasses()}>Ver productos</a>,
  },
  argTypes: { variant: { control: 'inline-radio', options: ['page', 'panel'] } },
} satisfies Meta<typeof EmptyState>
export default meta
type Story = StoryObj<typeof meta>

export const Panel: Story = {}
export const Page: Story = { args: { variant: 'page' } }
export const WithoutIcon: Story = { args: { icon: undefined, children: undefined } }
