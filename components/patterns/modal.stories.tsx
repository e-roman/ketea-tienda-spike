import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Modal } from './modal'
import { Button } from '../ui/button'

const meta = {
  title: 'Patterns/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    open: true,
    onClose: fn(),
    label: 'Ejemplo',
    closeButton: true,
    children: <p>Contenido del modal</p>,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    layer: { control: 'inline-radio', options: ['default', 'top'] },
    scrim: { control: 'inline-radio', options: ['default', 'strong'] },
  },
} satisfies Meta<typeof Modal>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Medium: Story = { args: { size: 'md' } }
export const ConfirmDelete: Story = {
  args: {
    role: 'alertdialog',
    label: 'Eliminar producto',
    closeButton: false,
    children: (
      <div style={{ display: 'grid', gap: 12 }}>
        <p>¿Querés eliminar este producto del carrito?</p>
        <Button variant="outline">Cancelar</Button>
        <Button>Eliminar</Button>
      </div>
    ),
  },
}
