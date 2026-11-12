import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Row, Stack } from "@/components/ui/layout"

export default function CheckoutLoading() {
  return (
    <div className="page page--subtle">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Stepper */}
        <Row align="center" justify="center" gap={3} className="mb-12 max-w-xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <Row key={i} align="center" gap={2} className="fill">
              <Skeleton radius="pill" className="icon-2xl" />
              {i < 2 && <Skeleton radius="pill" h={1} className="fill" />}
            </Row>
          ))}
        </Row>

        <div className="grid md:grid-cols-[6fr_4fr] gap-8 items-start">
          <Card radius="xl" padding="panel">
            <Stack gap={4}>
              <Skeleton radius="sm" h={6} w={48} />
              <Skeleton radius="sm" h={4} w={64} className="mb-2" />
              <Skeleton radius="lg" h={11} />
              <Skeleton radius="lg" h={11} />
              <Skeleton radius="lg" h={11} className="mt-6" />
            </Stack>
          </Card>
          <Skeleton radius="xl" h={64} />
        </div>
      </div>
    </div>
  )
}
