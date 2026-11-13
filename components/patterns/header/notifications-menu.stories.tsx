import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NotificationsMenu } from './notifications-menu'

const meta = {
  title: 'Patterns/Header/Notifications menu',
  component: NotificationsMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Campana con panel de notificaciones: el punto rojo indica avisos sin leer. Se cierra con Escape o al hacer clic afuera. Hacé clic en la campana para abrirlo.' } },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', minHeight: 520, padding: 24, maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationsMenu>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
