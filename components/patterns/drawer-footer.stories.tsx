import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { DrawerFooter } from './drawer-footer'

const meta = {
  title: 'Patterns/Drawer footer',
  component: DrawerFooter,
  tags: ['autodocs'],
  args: { total: 25500, onCheckout: fn(), onNavigate: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof DrawerFooter>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithExpress: Story = { args: { total: 51000 } }
