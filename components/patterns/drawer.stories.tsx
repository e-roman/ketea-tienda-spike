import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Drawer } from './drawer'

const meta = {
  title: 'Patterns/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { open: true, onClose: fn(), title: 'Tu carrito', count: '2 productos', children: <p style={{ padding: 16 }}>Contenido del drawer</p> },
} satisfies Meta<typeof Drawer>
export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
export const WithoutCount: Story = { args: { count: undefined, title: 'Filtros' } }
