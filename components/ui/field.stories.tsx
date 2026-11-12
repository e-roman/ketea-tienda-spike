import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Field } from './field'
import { Input, Select } from './input'

const meta = {
  title: 'UI/Field',
  component: Field,
  tags: ['autodocs'],
  args: { label: 'Email', children: null },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Field>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: (args) => <Field {...args}><Input placeholder="vos@email.com" /></Field> }
export const WithHint: Story = { render: (args) => <Field {...args} hint="Te enviamos el comprobante acá"><Input placeholder="vos@email.com" /></Field> }
export const WithNote: Story = { render: (args) => <Field {...args} label="Teléfono" note="opcional"><Input type="tel" /></Field> }
export const WithError: Story = { render: (args) => <Field {...args} error="Ingresá un email válido"><Input defaultValue="vos@" aria-invalid /></Field> }
export const WithSelect: Story = {
  render: (args) => (
    <Field {...args} label="Provincia">
      <Select defaultValue="ba"><option value="ba">Buenos Aires</option><option value="cba">Córdoba</option></Select>
    </Field>
  ),
}
