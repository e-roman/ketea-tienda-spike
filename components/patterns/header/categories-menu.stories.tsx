import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CategoriesMenu } from './categories-menu'

const meta = {
  title: 'Patterns/Header/Categories menu',
  component: CategoriesMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: '«Todas las categorías»: un botón abre la lista y, al pasar el mouse por una categoría, se despliega al lado el panel con sus secciones. Hacé clic en el botón para abrirlo.' } },
  },
  // El panel se ancla a .header-subnav-row (position: relative), igual que en el header.
  decorators: [
    (Story) => (
      <div style={{ minHeight: 560 }}>
        <div className="header-subnav-row" style={{ padding: '0 24px', maxWidth: 1280, margin: '0 auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof CategoriesMenu>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
