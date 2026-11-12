import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { linkClasses } from './link'

const meta = { title: 'UI/Link', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <a href="#" className={linkClasses()}>Ver todos los productos</a> }
export const Subtle: Story = { render: () => <a href="#" className={linkClasses({ variant: 'subtle' })}>Preguntas frecuentes</a> }
export const Underline: Story = { render: () => <a href="#" className={linkClasses({ underline: true })}>Términos y condiciones</a> }
export const HoverUnderline: Story = { render: () => <a href="#" className={linkClasses({ hoverUnderline: true, size: 'sm' })}>Políticas de privacidad</a> }
