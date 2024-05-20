import { Link } from "react-router-dom";
import { OrderModel } from "../../../models/OrderModel";

interface Props {
  order: OrderModel;
}

export default function DisplayOrderRow({ order }: Props) {
  return (
    <>
      <td className="text-start">{order.id}</td>
      <td className="text-start">{order?.customer?.name}</td>
      
      <td>
        <Link
          to={`/list-orders/view/${order?.id}`}
          className="stretch-link text-primary fw-bold m-3"
        >
          View
        </Link>
        <Link
          to={`/list-orders/delete/${order?.id}`}
          className="stretch-link text-danger fw-bold m-3"
        >
          Delete
        </Link>
        <Link
          to={`/list-orders/edit/${order?.id}`}
          className="stretch-link text-secondary fw-bold m-3"
        >
          Edit
        </Link>
      </td>
    </>
  );
}
