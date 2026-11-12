import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { InfoPanel } from './info-panel'

const meta = {
  title: 'Patterns/Info panel',
  component: InfoPanel,
  tags: ['autodocs'],
  args: { title: 'El pack de 3 unidades', children: 'Todos nuestros productos se venden en packs de 3 unidades.' },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof InfoPanel>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
