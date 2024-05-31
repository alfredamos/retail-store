import { useLoaderData, useNavigate} from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { OrderModel } from "../../models/OrderModel";

function OrderDetailView() {
  const navigate = useNavigate();
  
  const order = useLoaderData() as OrderModel;

  console.log("In detail-order : ",{order})

  const { currentUser } = useAuth();

  const backToListHandler = () => {
    navigate("/admin-orders");
  };

  const shippedHandler = () => {
    console.log("Shipped!!!!!!!");
  }

  const deliveredHandler = () => {
console.log("delivered!!!!!!!");
  }
  

  return (
    <>
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
            <tr>
              <td>{order.id.substring(0, 9)}</td>
              <td>{currentUser?.name}</td>
              <td>{order.totalPrice}</td>
              <td>{order.totalQuantity}</td>
              <td>{order.status}</td>
              <td>
                <button
                  type="button"
                  className="stretch-link text-secondary m-2 fw-bold"
                  onClick={backToListHandler}
                  style={{ border: "none" }}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="stretch-link text-primary m-2 fw-bold"
                  onClick={shippedHandler}
                  style={{ border: "none" }}
                >
                  Shipped
                </button>
                <button
                  type="button"
                  className="stretch-link text-info m-2 fw-bold"
                  onClick={deliveredHandler}
                  style={{ border: "none" }}
                >
                  Delivered
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderDetailView;
