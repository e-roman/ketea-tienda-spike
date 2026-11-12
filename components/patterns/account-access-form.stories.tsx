import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { AccountAccessForm } from './account-access-form'

const meta = {
  title: 'Patterns/Account access form',
  component: AccountAccessForm,
  tags: ['autodocs'],
  args: { onSuccess: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof AccountAccessForm>
export default meta
type Story = StoryObj<typeof meta>

export const Register: Story = {}
export const Login: Story = { args: { initialMode: 'login' } }
export const CustomSubmitLabels: Story = { args: { submitLabels: { register: 'Crear cuenta y continuar' } } }
