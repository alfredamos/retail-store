import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { OrderModel } from "../../../models/OrderModel";
import DisplayOrderRow from "./DisplayOrderRow";
import { isArray } from "../../../general/isArray";

interface OrdersTableProps{
  orders: OrderModel[]
}

function OrdersTable({orders}: OrdersTableProps) {
  console.log("In orders-table ---***--- orders = ", orders)
  return (
    <div className="card">
      <div className="card-header bg-primary text-white p-3">
        <h4 className="text-center">Order List</h4>
      </div>
      <div className="card-body">
        <table className="table table-responsive table-striped table-bordered">
          <thead>
            <tr>
              <th className="fw-bold">Order No.</th>
              <th className="fw-bold">Order By</th>
              <th className="fw-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {isArray<OrderModel[]>(orders) && orders?.map((order) => (
              <tr key={order.id}>
                <DisplayOrderRow order={order} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex justify-content-center p-3 text-center">
        <Link
          to="/list-orders/new"
          className="btn btn-outline-secondary w-50 fw-bold d-flex"
          style={{ borderRadius: "20px" }}
        >
          <FaPlus size="17px" style={{ marginRight: "5px" }} /> Order
        </Link>
        <Link
          to="/admin-panel"
          style={{ borderRadius: "20px" }}
          className="btn btn-outline-primary w-50 fw-bold"
        >
          Admin Panel
        </Link>
      </div>
    </div>
  );
  
}

export default OrdersTable