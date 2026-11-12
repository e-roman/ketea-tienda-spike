import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { chipClasses } from './chip'

const meta = {
  title: 'UI/Chip',
  tags: ['autodocs'],
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const OPTIONS = ['Todos', 'Ravioles', 'Fideos', 'Tapas', 'Veganos']

function Filters() {
  const [selected, setSelected] = useState('Todos')
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {OPTIONS.map((o) => (
        <button key={o} type="button" aria-pressed={selected === o} onClick={() => setSelected(o)} className={chipClasses(selected === o)}>
          {o}
        </button>
      ))}
    </div>
  )
}

export const FilterGroup: Story = { render: () => <Filters /> }
