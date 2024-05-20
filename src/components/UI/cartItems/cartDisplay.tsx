import React, { ReactNode } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { CartItem } from "../../../validations/cartItemValidation";

interface CartDisplayProps{
  carts: CartItem[];
  children: ReactNode;
  noCartItems: ReactNode;
  name: string;
  quantities: number;
  totalCost: number;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
  onRemoveItem: (productId: string) => void; 
}

function cartDisplay({
  carts, 
  children,
  noCartItems,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemoveItem,
  name, 
  quantities, 
  totalCost
}: CartDisplayProps) {
  return (
    <div className="card d-flex flex-column">
      <div>
        <h4 className="text-center fw-bold">Order Details</h4>
      </div>

      <div className="row justify-content-center">
        <hr />
        {carts?.map((cart) => (
          <React.Fragment key={cart.productId}>
            <div className="col-4">
              <div className="d-flex flex-column text-start">
                <span className="mb-2">Product</span>
                <span className="mb-2">Price</span>
                <span className="mb-2">
                  {cart.quantity > 1 ? "Quantities" : "Quantity"}
                </span>
              </div>
              <hr />
            </div>

            <div className="col-4 align-self-auto">
              <div className="d-flex flex-column text-center">
                <span className="mb-2 text-start">{cart.name}</span>
                <span className="mb-2 text-start">${cart.price}</span>
                <span className="mb-2 text-start">{cart.quantity}</span>
              </div>
              <hr />
            </div>

            <div className="col-4 align-self-auto">
              <div className="d-flex flex-column text-end">
                <span className="mb-2">
                  <FaDeleteLeft
                    className="stretch-link text-danger"
                    size="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() => onRemoveItem(cart.productId)}
                  />
                </span>
                <span className="mb-2">
                  <FaPlus
                    className="stretch-link text-success"
                    size="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() => onIncreaseQuantity(cart.productId)}
                  />
                </span>
                <span className="mb-2">
                  <FaMinus
                    className="stretch-link text-secondary"
                    size="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() => onDecreaseQuantity(cart.productId)}
                  />
                </span>
                <hr />
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      {carts?.length ? (
        <>
          <div className="row justify-content-center">
            <div className="col align-self-start">
              <div className="d-flex flex-column text-start fw-bold">
                <span className="mb-2">Total Cost</span>
                <span className="mb-2">
                  {quantities > 1 ? "Quantities" : "Quantity"}
                </span>
                <span className="mb-2">Order By</span>
              </div>
            </div>
            <div className="col align-self-start">
              <div className="d-flex flex-column text-end fw-bold">
                <span className="mb-2 align-content-auto">{totalCost}</span>
                <span className="mb-2 align-content-auto">{quantities}</span>
                <span className="mb-2 align-content-auto">{name}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="col d-flex justify-content-between">
            {children}
          </div>
          <hr />
        </>
      ) : (
        <>{noCartItems}</>
      )}
    </div>
  );
}

export default cartDisplay