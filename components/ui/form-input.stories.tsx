import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FormInput } from './form-input'

const meta = {
  title: 'UI/Form input',
  component: FormInput,
  tags: ['autodocs'],
  args: { label: 'Email', placeholder: 'tu@email.com', type: 'email' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof FormInput>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithNote: Story = { args: { note: 'Acá te enviamos la confirmación del pedido.' } }
export const WithError: Story = { args: { defaultValue: 'ana@', error: 'Ingresá un email válido.' } }
export const Valid: Story = { args: { defaultValue: 'ana@example.com', valid: true } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'ana@example.com' } }
