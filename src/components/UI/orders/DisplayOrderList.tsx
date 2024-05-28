import {
  FaArrowLeft,
  FaDeleteLeft,
  FaMagnifyingGlassArrowRight,
} from "react-icons/fa6";
import { OrderModel } from "../../../models/OrderModel";
import { Link } from "react-router-dom";

interface Props {
  order: OrderModel;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

function DisplayOrderList({ order, onDelete, onView }: Props) {
  console.log("In profiles, order: ", order);
  return (
    <div className="card d-flex flex-column gap-2 mb-5">
      <div className="d-flex justify-content-between">
        <span className="text-start">Order No.</span>
        <span className="text-end">{`${order.id.substring(0, 8)}...`}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <span className="text-start">Total Cost</span>
        <span className="text-end">${order.totalPrice}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <span className="text-start">
          {order.totalQuantity > 1 ? "Quantities" : "Quantity"}
        </span>
        <span className="text-end">{order.totalQuantity}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between w-100">
        <button
          className="btn btn-outline-primary w-50 fw-bold rounded-2"
          onClick={() => onView(order.id)}
        >
          <FaMagnifyingGlassArrowRight size="20px" />
        </button>
        <button
          className="btn btn-outline-danger w-50 fw-bold rounded-2"
          onClick={() => onDelete(order.id)}
        >
          <FaDeleteLeft size="20px" />
        </button>
      </div>
    </div>
  );
}

export default DisplayOrderList;
