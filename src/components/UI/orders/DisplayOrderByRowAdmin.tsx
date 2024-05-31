import { OrderModel } from "../../../models/OrderModel";

interface Props{
  order: OrderModel;
  onViewOrder: (orderId: string) => void; 
  onIsShippedOrder: (order: OrderModel) => void; 
  onIsDeliveredOrder: (order: OrderModel) => void; 
}

function DisplayOrderByRowAdmin({order, onIsDeliveredOrder, onIsShippedOrder, onViewOrder}: Props) {
  return (
    <>
      <td>{order.id.substring(0, 9)}</td>
      <td>{order.customer?.name}</td>
      <td>{order.totalPrice}</td>
      <td>{order.totalQuantity}</td>
      <td>{order.status}</td>
      <td>
        <button
          type="button"
          className="stretch-link text-secondary m-2 fw-bold bg-transparent"
          onClick={() => onViewOrder(order.id)}
          style={{ border: "none" }}
        >
          View
        </button>
        <button
          type="button"
          className="stretch-link text-primary m-2 fw-bold bg-transparent"
          // disabled={order.isShipped}
          onClick={() => onIsShippedOrder(order)}
          style={{ border: "none", cursor: (order.isShipped)? 'not-allowed' : 'pointer' }}
        >
          Shipped
        </button>
        <button
          type="button"
          className="stretch-link text-info m-2 fw-bold bg-transparent"
          // disabled={order.isDelivered}
          onClick={() => onIsDeliveredOrder(order)}
          style={{ border: "none", cursor: order.isDelivered ? 'not-allowed' : 'pointer' }}
        >
          Delivered
        </button>
      </td>
    </>
  );
}

export default DisplayOrderByRowAdmin