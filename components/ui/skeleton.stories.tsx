import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Skeleton } from './skeleton'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: { h: 6, w: 'full' },
  argTypes: { radius: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl', 'pill'] } },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = {}
export const Soft: Story = { args: { soft: true, h: 40, radius: 'lg' } }
export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Skeleton h={40} w="full" radius="lg" soft />
      <Skeleton h={4} w="3/4" />
      <Skeleton h={4} w="1/2" />
      <Skeleton h={10} w="full" radius="pill" />
    </div>
  ),
}
