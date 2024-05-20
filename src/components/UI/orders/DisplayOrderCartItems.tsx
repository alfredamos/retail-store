import React from "react"
import { CartItem } from "../../../validations/cartItemValidation"

interface Props{
  cart: CartItem
}

function DisplayOrderByCartItems({cart}: Props) {
  return (
    <React.Fragment>
      <article className="d-flex mb-2 mt-2" key={cart.productId}>
              <span
                className="text-start"
                style={{ display: "inline-block", width: "100%" }}
              >
                {cart.name}
              </span>
              <span
                className="text-end"
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
  )
}

export default DisplayOrderByCartItems;