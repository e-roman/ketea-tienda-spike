import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import BottomSheet from './bottom-sheet'

const meta = {
  title: 'Components/Bottom sheet',
  component: BottomSheet,
  tags: ['autodocs'],
  // Es `sm:hidden`: solo se ve en viewport mobile.
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: { layout: 'fullscreen' },
  args: { open: true, title: 'Ordenar por', onClose: fn(), children: <p>Contenido del bottom sheet</p> },
} satisfies Meta<typeof BottomSheet>
export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
export const Closed: Story = { args: { open: false } }
