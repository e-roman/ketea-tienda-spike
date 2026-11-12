import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { MegaMenu } from './mega-menu'
import { PASTAS_ITEMS, TAPAS_ITEMS } from './nav-items'

const meta = {
  title: 'Patterns/Header/Mega menu',
  component: MegaMenu,
  tags: ['autodocs'],
  args: {
    label: 'Pastas',
    items: PASTAS_ITEMS,
    verTodosKey: 'pastas-todos',
    open: true,
    onToggle: fn(),
    onItemClick: fn(),
  },
  decorators: [(Story) => <div style={{ minHeight: 320, padding: 16 }}><Story /></div>],
} satisfies Meta<typeof MegaMenu>
export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
export const Closed: Story = { args: { open: false } }
export const Tapas: Story = { args: { label: 'Tapas', items: TAPAS_ITEMS, verTodosKey: 'tapas-todos' } }
