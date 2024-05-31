import { OrderModel } from "../../../models/OrderModel";

interface Props{
  order: OrderModel;
  onViewOrder: (orderId: string) => void; 
  
}

function DisplayOrderByRow({order, onViewOrder}: Props) {
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
      </td>
    </>
  );
}

export default DisplayOrderByRow