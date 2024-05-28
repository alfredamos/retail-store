import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Link} from "react-router-dom";
import { OrderModel } from "../../../models/OrderModel";
import DisplayOrderRow from "./DisplayOrderRow";
import { isArray } from "../../../general/isArray";

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
          <FaPlus
            size="15px"
            style={{ marginRight: "5px", alignSelf: "center" }}
          />{" "}
          Order
        </Link>
        <Link
          to={`${routePicker ? "/admin-panel" : "/admin-main-panel"}`}
          className="btn btn-outline-primary w-50 fw-bold rounded-5"
        >
          <FaArrowLeft
            size="15px"
            style={{
              marginRight: "5px",
              alignSelf: "center",
              fontWeight: "bold",
            }}
          />
          Admin
        </Link>
      </div>
    </div>
  );
  
}

export default OrdersTable