import { OrderModel } from "../../../models/OrderModel";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DisplayOrderByRowAdmin from "./DisplayOrderByRowAdmin";

interface Props{
  orders: OrderModel[];
  onViewOrder: (id: string) => void;
  onIsDeliveredOrder: (order: OrderModel) => void;
  onIsShippedOrder: (order: OrderModel) => void;
}

function DisplayTableOrdersAdmin({orders, onIsDeliveredOrder, onIsShippedOrder, onViewOrder}: Props) {
  return (
    <div className="card">
      <table className="table table-striped table-responsive table-bordered">
        <thead>
          <tr>
            <th>Order. No.</th>
            <th>Order By</th>
            <th>Total Price</th>
            <th>Quantities</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id}>
              <DisplayOrderByRowAdmin
                order={order}
                onIsDeliveredOrder={onIsDeliveredOrder}
                onIsShippedOrder={onIsShippedOrder}
                onViewOrder={onViewOrder}
              />
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end align-content-center">
        <FaArrowLeft
          size="15px"
          className="text-primary"
          style={{ alignSelf: "center" }}
        />
        <Link
          to="/admin-main-panel"
          className="stretch-link text-primary fw-bold"
        >
          Back To Admin Panel
        </Link>
      </div>
    </div>
  );
}

export default DisplayTableOrdersAdmin