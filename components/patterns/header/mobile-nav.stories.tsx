import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MobileNav } from './mobile-nav'

const meta = {
  title: 'Patterns/Header/Mobile nav',
  component: MobileNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Fila de links que se desliza de costado, debajo del buscador en el header mobile. Solo se ve por debajo de 768 px.' } },
  },
  globals: { viewport: { value: 'mobile1', isRotated: false } },
} satisfies Meta<typeof MobileNav>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
