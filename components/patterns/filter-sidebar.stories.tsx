import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { FilterSidebar } from './filter-sidebar'
import { buildFacets, EMPTY_FILTERS, type Filters } from '../../lib/filters'
import { products } from '../../lib/products'

function Demo({ initial = EMPTY_FILTERS }: { initial?: Filters }) {
  const [filters, setFilters] = useState<Filters>(initial)
  const [sheetOpen, setSheetOpen] = useState(false)
  return (
    <div style={{ maxWidth: 300 }}>
      <FilterSidebar
        title="Todos los productos"
        resultCount={products.length}
        filters={filters}
        facets={buildFacets(products, filters)}
        onChange={setFilters}
        sheetOpen={sheetOpen}
        onSheetOpenChange={setSheetOpen}
        sortLabel="Destacados"
        onOpenSort={() => {}}
      />
    </div>
  )
}

const meta = {
  title: 'Patterns/Filter sidebar',
  component: FilterSidebar,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Columna de filtros del listado: switches de envío, categoría, marca, accionamiento, descuentos, cuotas y precio, con «Filtros aplicados» y «Borrar filtros». En mobile se abre como bottom sheet.' } } },
  args: { title: 'Todos los productos', resultCount: products.length, filters: EMPTY_FILTERS, facets: buildFacets(products, EMPTY_FILTERS), onChange: () => {}, sheetOpen: false, onSheetOpenChange: () => {}, sortLabel: 'Destacados', onOpenSort: () => {} },
} satisfies Meta<typeof FilterSidebar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <Demo /> }
export const WithAppliedFilters: Story = {
  render: () => <Demo initial={{ ...EMPTY_FILTERS, brands: ['Dolphin'], freeShipping: true }} />,
}
