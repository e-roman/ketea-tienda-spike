import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { MobileMenu } from './mobile-menu'

const meta = {
  title: 'Patterns/Header/Mobile menu',
  component: MobileMenu,
  tags: ['autodocs'],
  // El menú es `md:hidden`: se muestra en viewport mobile.
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: { layout: 'fullscreen' },
  args: { onClose: fn(), onOpenAuth: fn() },
} satisfies Meta<typeof MobileMenu>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
