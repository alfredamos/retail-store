import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { CartItem } from "../../validations/cartItemValidation";

interface CheckoutOneItemProps {
  cart: CartItem;
  onDecreaseQuantity: (productId: string) => void;
  onIncreaseQuantity: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
}

function CheckoutOneItem({cart, onDecreaseQuantity, onIncreaseQuantity, onRemoveItem}: CheckoutOneItemProps) {
  return (
    <React.Fragment key={cart.productId}>
      <div className="d-flex justify-content-between align-content-center">
        <div className="d-flex flex-column align-content-center justify-content-center">
          <span className="text-start mb-2">Product</span>
          <span className="text-start mb-2">Price</span>
          <span className="text-start mb-2">
            {cart.quantity > 1 ? "Quantities" : "Quantity"}
          </span>
        </div>

        <div className="d-flex justify-content-center align-content-center mb-1">
          <div className="d-flex flex-column align-content-center justify-content-start">
            <span className="mb-2 text-start">{cart.name}</span>
            <span className="mb-2 text-start">${cart.price}</span>
            <span className="text-start">{cart.quantity}</span>
          </div>
        </div>
        <div className="d-flex flex-column align-content-center justify-content-center mx-4">
          <span className="stretch-link text-danger mb-2 text-start">
            <FaDeleteLeft
              size="25px"
              onClick={() => onRemoveItem(cart.productId)}
              style={{
                cursor: "pointer",
              }}
            />
          </span>
          <span className="stretch-link text-success mb-2 text-start">
            <FaPlus
              size="25px"
              onClick={() => onIncreaseQuantity(cart.productId)}
              style={{
                cursor: "pointer",
              }}
            />
          </span>
          <span className="stretch-link text-secondary text-start">
            <FaMinus
              size="25px"
              onClick={() => onDecreaseQuantity(cart.productId)}
              style={{
                cursor: "pointer",
              }}
            />
          </span>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
}

export default CheckoutOneItem