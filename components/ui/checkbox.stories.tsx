import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Checkbox } from './checkbox'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Dolphin' },
} satisfies Meta<typeof Checkbox>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
/** `count` muestra la cantidad de resultados entre paréntesis (filtros del listado). */
export const WithCount: Story = { args: { label: 'Robots', count: 21 } }
export const Disabled: Story = { args: { disabled: true } }
export const List: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox label="Piscinas" count={35} defaultChecked />
      <Checkbox label="Robots" count={21} />
      <Checkbox label="Accesorios" count={10} />
    </div>
  ),
}
