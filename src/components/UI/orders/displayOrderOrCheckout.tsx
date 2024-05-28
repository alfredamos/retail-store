import React, { ReactNode } from "react";
import { CartItem } from "../../../validations/cartItemValidation";
import { isArray } from "../../../general/isArray";
import { useLocation } from "react-router-dom";

interface Props {
  orderOrCheckoutName: string;
  cartItems: CartItem[];
  children: ReactNode;
  orderBy: string;
  quantities: number;
  totalPrice: number;
}

function DisplayOrderOrCheckout({
  cartItems,
  children,
  orderBy,
  orderOrCheckoutName,
  totalPrice,
  quantities,
}: Props) {
  const location = useLocation();

  const baseURL = location?.pathname?.split("/")[1];
  const classPicker = baseURL === "list-orders"
  return (
    <div className={`${classPicker ? "card" : "card w-50 mx-auto"}`}>
      <div className="row">
        <h4 className="text-center">{orderOrCheckoutName} Details</h4>

        <div className="col-md-10 offset-md-1">
          <hr />
          <article className="d-flex mb-2 mr-4">
            <span
              className="text-start text-wrap fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              Product
            </span>
            <span
              className="text-end fw-bold ml-2"
              style={{ display: "inline-block", width: "100%" }}
            >
              Price
            </span>
            <span
              className="text-end fw-bold"
              style={{ display: "inline-block", width: "100%" }}
            >
              Quantity
            </span>
          </article>
          <hr />
          {isArray<CartItem[]>(cartItems) &&
            cartItems?.map((cart) => (
              <React.Fragment key={cart.productId}>
                <article className="d-flex mb-2 mt-2">
                  <span
                    className="text-start mr-2 "
                    style={{ display: "inline-block", width: "100%" }}
                  >
                    {cart.name}
                  </span>
                  <span
                    className="text-end ml-2"
                    style={{ display: "inline-block", width: "100%" }}
                  >
                    {cart.price}
                  </span>
                  <span
                    className="text-end"
                    style={{ display: "inline-block", width: "100%" }}
                  >
                    {cart.quantity}
                  </span>
                  <hr />
                </article>
              </React.Fragment>
            ))}
          <hr />
          <div className="d-flex flex-column mt-2">
            <span className="d-flex justify-content-between mb-2">
              <span className="fw-bold">Total</span>
              <span className="fw-bold">{totalPrice}</span>
            </span>
            <span className="d-flex justify-content-between mb-2">
              <span className="fw-bold">Quantities</span>
              <span className="fw-bold">{quantities}</span>
            </span>
            <span className="d-flex justify-content-between mb-2">
              <span className="fw-bold">Order By</span>
              <span className="fw-bold">{orderBy}</span>
            </span>
          </div>
          <hr />
          <div className="d-flex justify-content-around align-content-center">
            {children}
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default DisplayOrderOrCheckout