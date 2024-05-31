import { OrderModel } from "../../../models/OrderModel";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DisplayOrderByRow from "./DisplayOrderByRow";
import { useAuth } from "../../../hooks/auth/useAuth";

interface Props{
  orders: OrderModel[];
  onViewOrder: (id: string) => void;
  
}

function DisplayTableOrders({orders, onViewOrder}: Props) {
  const {currentUser: {id: userId}} = useAuth();
  return (
    <div className="card">
      {orders.length > 0 ? (
        <>
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
                  <DisplayOrderByRow order={order} onViewOrder={onViewOrder} />
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
              to={`/profiles/${userId}`}
              className="stretch-link text-primary fw-bold"
            >
              Back
            </Link>
          </div>
        </>
      ) : (
        <h4 className="text-center">
          <hr />
          <Link to="/products" className="stretch-link primary">
            <FaArrowLeft />
            No available orders at this time, go back to products to make orders, if so desired!           
          </Link>
          <hr />
        </h4>
      )}
    </div>
  );
}

export default DisplayTableOrders