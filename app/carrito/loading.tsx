import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Row, Stack } from "@/components/ui/layout"

export default function CarritoLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Skeleton radius="sm" h={8} w={40} className="mb-8" />

      <div className="grid md:grid-cols-3 gap-8">
        {/* Items */}
        <Stack gap={4} className="md:col-span-2">
          <Skeleton radius="lg" h={20} />
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} padding="sm">
              <Row gap={4}>
                <Skeleton radius="lg" h={24} w={24} className="noshrink" />
                <Stack gap={2} className="fill">
                  <Skeleton radius="sm" h={4} w="3/4" />
                  <Skeleton radius="sm" h={3} w="1/2" />
                  <Skeleton radius="sm" h={8} w="1/3" className="mt-4" />
                </Stack>
              </Row>
            </Card>
          ))}
        </Stack>

        {/* Resumen */}
        <Skeleton radius="xl" h={64} />
      </div>
    </div>
  )
}
