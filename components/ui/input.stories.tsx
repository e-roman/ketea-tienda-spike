import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input, Select } from './input'

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Escribí acá' },
  argTypes: { variant: { control: 'inline-radio', options: ['form', 'pill'] } },
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>

export const Form: Story = {}
export const Pill: Story = { args: { variant: 'pill' } }
export const Disabled: Story = { args: { disabled: true } }
export const SelectLarge: Story = {
  render: () => <Select><option>Ordenar por</option><option>Menor precio</option></Select>,
}
export const SelectMedium: Story = {
  render: () => <Select size="md"><option>Ordenar por</option><option>Menor precio</option></Select>,
}
