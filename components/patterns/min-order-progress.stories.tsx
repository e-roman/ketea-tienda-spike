import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MinOrderProgress } from './min-order-progress'
import { SeedCart, sampleProduct } from '../../.storybook/fixtures'

const meta = {
  title: 'Patterns/Min order progress',
  component: MinOrderProgress,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'inline-radio', options: ['card', 'compact'] } },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof MinOrderProgress>
export default meta
type Story = StoryObj<typeof meta>

const withPacks = (quantity: number): NonNullable<Story['decorators']> => [
  (Story) => <SeedCart items={[{ product: sampleProduct, quantity }]}><Story /></SeedCart>,
]

export const Empty: Story = { decorators: withPacks(0) }
export const InProgress: Story = { decorators: withPacks(2) }
export const MinimumMet: Story = { decorators: withPacks(4) }
export const CompactInProgress: Story = { args: { variant: 'compact' }, decorators: withPacks(1) }
export const CompactMinimumMet: Story = { args: { variant: 'compact' }, decorators: withPacks(5) }
