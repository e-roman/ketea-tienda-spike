import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Breadcrumb } from './breadcrumb'

const meta = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/productos' },
      { label: 'Robot limpia piscina Dolphin S200' },
    ],
  },
} satisfies Meta<typeof Breadcrumb>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
