import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tabs } from './tabs'

const ITEMS = [
  { id: 'descripcion', label: 'Descripción' },
  { id: 'ingredientes', label: 'Ingredientes' },
  { id: 'conservacion', label: 'Conservación' },
] as const

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [value, setValue] = useState<(typeof ITEMS)[number]['id']>('descripcion')
  return <Tabs items={ITEMS} value={value} onChange={setValue} label="Información del producto" />
}

export const Default: Story = {
  args: { items: ITEMS, value: 'descripcion', onChange: () => {}, label: 'Información del producto' },
  render: () => <Demo />,
}
