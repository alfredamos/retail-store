import { Link} from "react-router-dom";
import { OrderModel } from "../../../models/OrderModel";
import DisplayOrderRow from "./DisplayOrderRowAdmin";
import { isArray } from "../../../general/isArray";
import { GrUserAdmin } from "react-icons/gr";
import { FcCamcorderPro } from "react-icons/fc";

interface OrdersTableProps{
  orders: OrderModel[];
  baseUrl: string;
}

function OrdersTable({baseUrl, orders}: OrdersTableProps) {
  const routePicker = baseUrl === "list-orders";
  
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
              <th className="fw-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {isArray<OrderModel[]>(orders) &&
              orders?.map((order) => (
                <tr key={order.id}>
                  <DisplayOrderRow baseUrl={baseUrl} order={order} />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer d-flex justify-content-center p-3 text-center">
        <Link
          to="#"
          className="btn btn-outline-secondary w-50 fw-bold d-flex rounded-5"
        >
          <FcCamcorderPro size="20px"/> Order
        </Link>
        <Link
          to={`${routePicker ? "/admin-panel" : "/admin-main-panel"}`}
          className="btn btn-outline-primary w-50 fw-bold rounded-5"
        >
          <GrUserAdmin size="20px" />
          Admin
        </Link>
      </div>
    </div>
  );
  
}

export default OrdersTable