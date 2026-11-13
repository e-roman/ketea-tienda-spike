import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { InfoPanel } from './info-panel'

const meta = {
  title: 'Patterns/Info panel',
  component: InfoPanel,
  tags: ['autodocs'],
  args: { title: 'Retiro en sucursal', children: 'Retirá tu compra gratis en Ketea Ramos Mejía, de lunes a viernes de 9 a 18 h.' },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof InfoPanel>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
