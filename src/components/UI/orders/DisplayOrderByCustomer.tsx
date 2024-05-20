import { OrderModel } from "../../../models/orderModel";

interface Props {
  name: string;
  order: OrderModel;
}

function DisplayOrderByCustomer({ order, name }: Props) {
  
  console.log("In display-order-by-customer", {order, name})
  return (
    <div className="card">
      <h4 className="text-center">Order Details</h4>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <article className="d-flex flex-column mb-2">
            <span
              className="text-start fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              Product
            </span>
            <span
              className="text-start fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              Price
            </span>
            <span
              className="text-start fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              Quantity
            </span>
          </article>
        </div>
        <div className="col-md-4">
          <article className="d-flex flex-column mb-2">
            <span
              className="text-start fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              Toyota
            </span>
            <span
              className="text-start fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              $25000
            </span>
            <span
              className="text-start fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              2
            </span>
          </article>
        </div>
        <div className="col-md-4">
          <article className="d-flex flex-column mb-2">
            <span
              className=" text-end fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              Add
            </span>
            <span
              className="text-end fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              Remove
            </span>
            <span
              className="text-end fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              Minus
            </span>
          </article>
        </div>
        <hr />
        <div className="d-flex flex-column">
          <span className="d-flex justify-content-between">
            <span className="fw-bold">Total</span>
            <span className="fw-bold">$50000</span>
          </span>
          <span className="d-flex justify-content-between">
            <span className="fw-bold">Quantities</span>
            <span className="fw-bold">2</span>
          </span>
          <span className="d-flex justify-content-between mb-2">
            <span className="fw-bold">Order By</span>
            <span className="fw-bold">{name}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DisplayOrderByCustomer;
