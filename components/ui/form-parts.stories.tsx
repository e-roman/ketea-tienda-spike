import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FormHeader, FormDivider, FormFootnote } from './form-parts'

const meta = { title: 'UI/Form parts', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Header: Story = { render: () => <FormHeader title="Ingresá a tu cuenta" subtitle="Seguí tus pedidos y guardá tus favoritos" /> }
export const Divider: Story = { render: () => <FormDivider>o</FormDivider> }
export const Footnote: Story = { render: () => <FormFootnote>Al continuar aceptás los términos y condiciones.</FormFootnote> }
