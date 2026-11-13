import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import WhatsappFloat from './whatsapp-float'

const meta = {
  title: 'Patterns/Support chat (WhatsApp)',
  component: WhatsappFloat,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Botón flotante de ayuda (réplica del SupportChat de la tienda actual): etiqueta, botón verde y cuadro para escribir la consulta, que se envía por WhatsApp. Solo se ve desde 769 px, como en Ketea. Sin número cargado en `WHATSAPP_PHONE`, WhatsApp pide elegir el contacto.' } },
  },
  decorators: [(Story) => <div style={{ minHeight: 560 }}><Story /></div>],
} satisfies Meta<typeof WhatsappFloat>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
