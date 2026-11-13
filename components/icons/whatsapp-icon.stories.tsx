import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { WhatsappIcon } from './whatsapp-icon'

const meta = {
  title: 'UI/WhatsApp icon',
  component: WhatsappIcon,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 48, height: 48, color: 'var(--color-green-500)' }}><Story /></div>],
} satisfies Meta<typeof WhatsappIcon>
export default meta
type Story = StoryObj<typeof meta>

/** Hereda el color del texto (`currentColor`) y el tamaño del contenedor. */
export const Default: Story = {}
