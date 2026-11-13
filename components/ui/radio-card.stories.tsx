import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { RadioGroup } from './radio-card'

type Delivery = 'standard' | 'express' | 'pickup'

const OPTIONS = [
  { value: 'standard' as const, label: 'Envío Gratis', description: ['Llega entre 3 y 5 días hábiles'] },
  { value: 'express' as const, label: 'Envío Express', description: ['Tiene un costo de $25.500 y llega hoy'] },
  { value: 'pickup' as const, label: 'Ketea Ramos Mejía', description: ['Cnel. Brandsen 2230, Ramos Mejía', 'Lunes a Viernes de 9 a 18hs.'] },
]

const meta = {
  title: 'UI/Radio card',
  component: RadioGroup<Delivery>,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof RadioGroup<Delivery>>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: 'delivery', legend: 'Elegí cómo recibirlo', options: OPTIONS, value: 'standard', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState<Delivery>(args.value)
    return <RadioGroup<Delivery> {...args} value={value} onChange={setValue} />
  },
}
export const WithDisabledOption: Story = {
  args: { name: 'delivery-2', options: OPTIONS.map((o) => (o.value === 'express' ? { ...o, disabled: true } : o)), value: 'standard', onChange: () => {} },
}
