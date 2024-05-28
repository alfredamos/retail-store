import { Link } from "react-router-dom";
import { OrderModel } from "../../../models/OrderModel";

interface Props {
  order: OrderModel;
  baseUrl: string;
}

export default function DisplayOrderRow({ baseUrl, order }: Props) {
  return (
    <>
      <td className="text-start">{order.id.substring(0,8)}...</td>
      <td>
        <Link
          to={`/${baseUrl}/view/${order?.id}`}
          className="stretch-link text-primary fw-bold m-3"
        >
          View
        </Link>
        <Link
          to={`/${baseUrl}/delete/${order?.id}`}
          className="stretch-link text-danger fw-bold m-3"
        >
          Delete
        </Link>
        <Link
          to={`/${baseUrl}/edit/${order?.id}`}
          className="stretch-link text-secondary fw-bold m-3"
        >
          Edit
        </Link>
      </td>
    </>
  );
}
