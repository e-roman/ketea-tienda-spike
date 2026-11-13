import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PersonalForm } from './personal-form'
import { EMPTY_PERSONAL } from '../../lib/checkout'

const meta = {
  title: 'Patterns/Personal form',
  component: PersonalForm,
  tags: ['autodocs'],
  args: { defaultValues: EMPTY_PERSONAL, onSubmit: () => {} },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
  parameters: { docs: { description: { component: 'Paso 1 del checkout: datos de contacto y facturación, sin crear cuenta. Valida al salir de cada campo y al continuar.' } } },
} satisfies Meta<typeof PersonalForm>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}
export const Filled: Story = {
  args: {
    defaultValues: { ...EMPTY_PERSONAL, email: 'ana@example.com', nombre: 'Ana', apellido: 'Pérez', telefono: '11 2233 4455', calle: 'Siempre Viva', numero: '742' },
  },
}
