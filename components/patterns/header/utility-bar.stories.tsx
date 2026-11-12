import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { UtilityBar } from './utility-bar'

const meta = {
  title: 'Patterns/Header/Utility bar',
  component: UtilityBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof UtilityBar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/** Se oculta en mobile (la búsqueda activa deja el header pegado arriba). */
export const HiddenOnMobile: Story = { args: { hiddenOnMobile: true } }
