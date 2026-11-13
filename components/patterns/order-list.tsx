import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/products"
import type { Order } from "@/lib/orders-context"

/** Lista de pedidos de Mi cuenta. Clases de styles/patterns/account.css. */
export function OrderList({ orders }: { orders: Order[] }) {
  return (
    <ul className="order-list">
      {orders.map((o) => (
        <li key={o.ref} className="order-list__item">
          <div className="order-list__head">
            <div>
              <p className="order-list__ref">Pedido #{o.ref}</p>
              <p className="order-list__meta">{o.date}</p>
            </div>
            <Badge variant="outline">Confirmado</Badge>
          </div>

          <ul className="order-list__products">
            {o.items.map(({ product, quantity }) => (
              <li key={product.id} className="order-list__product">
                <span className="order-list__thumb">
                  <Image src={product.image} alt="" fill sizes="64px" />
                </span>
                <span className="order-list__name">{product.name}</span>
                <span className="order-list__qty">x{quantity}</span>
              </li>
            ))}
          </ul>

          <dl className="order-list__foot">
            <div><dt>Entrega</dt><dd>{o.deliveryLabel}</dd></div>
            <div><dt>Pago</dt><dd>{o.paymentLabel}</dd></div>
            <div><dt>Total</dt><dd className="order-list__total">{formatPrice(o.total)}</dd></div>
          </dl>
        </li>
      ))}
    </ul>
  )
}
