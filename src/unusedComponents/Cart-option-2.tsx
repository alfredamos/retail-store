import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { OrderProduct } from "../models/OrderProduct";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addOrder,
  clearOrder,
  clearTotalCostAndQuantities,
  totalCostAndQuantities,
} from "../features/orderSlice";
//import { Link } from "react-router-dom";
import { CartItem } from "../validations/cartItemValidation";
import { FaPlus, FaMinus, FaDeleteLeft, FaArrowLeft } from "react-icons/fa6";
import { increaseOrDecreaseCartQuantity } from "../components/components-utils/increaseOrDecreaseCartQuantity";
import { sumOfQuantitiesAndSumOfCosts } from "../components/components-utils/sumOfQuantitiesAndSumOfCosts";
//import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";

export type OrderDetails = {
  customerId: string;
  name: string;
  order: OrderProduct;
  quantities: number;
  totalCost: number;
};

function Cart() {
  const {
    customerId,
    order,
    name,
    quantities: totalOfQuantity,
    totalCost: totalPrice,
  } = useLoaderData() as OrderDetails; //----> Preload the cart order.

  const [quantities, setQuantities] = useState(totalOfQuantity);
  const [totalCost, setTotalCost] = useState(totalPrice);
  const [carts, setCarts] = useState<CartItem[]>(order?.cartItems);
  const [, setOrderCart] = useState<OrderProduct>({
    customerId: "",
    cartItems: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearCartHandler = () => {
    console.log("Cart is cleared successfully!");
    dispatch(clearOrder());
    dispatch(clearTotalCostAndQuantities());

    toast.success(`The cart has been cleared successfully!`, {
      position: "top-right",
    });

    navigate("/products");
  };

  const checkoutHandler = () => {
    console.log("Checkout is successfully!");
    dispatch(totalCostAndQuantities({ cartItems: carts })); //----> Adjust the totalPrice and quantities.

    toast.success(`The checkout is successful!`, {
      position: "top-right",
    });

    navigate("/checkout");
  };

  const removeItemHandler = (productId: string) => {
    dispatch(clearOrder()); //----> clear the old order
    console.log("Order is removed!");
    //----> Filter out the cart-item to be removed.
    const filteredCartItems = carts?.filter(
      (cart) => cart.productId !== productId
    );
    toast.success(`The cart item has been removed successfully!`, {
      position: "top-right",
    });
    //----> Remove the cart-item and adjust appropriately all the other state variables.
    quantityAdjustmentOrRemoval(filteredCartItems);
  };

  const decreaseQuantityHandler = (productId: string) => {
    dispatch(clearOrder()); //----> clear the old order
    console.log("Quantity is decreased by one!");
    const operation = "reduceQuantity"; //----> Reduce the quantity by one.
    //----> New cart-item with product id with an increase of 1 in quantity.
    const newCartItems = increaseOrDecreaseCartQuantity(
      operation,
      carts,
      productId
    );
    //----> Decrease the quantity and adjust appropriately all the other state variables.
    quantityAdjustmentOrRemoval(newCartItems);

    toast.success(`The cart item is decreased by one!`, {
      position: "top-right",
    });
  };

  const increaseQuantityHandler = (productId: string) => {
    dispatch(clearOrder()); //----> clear the old order
    console.log("Quantity is decreased by one! ");
    const operation = "increaseQuantity"; //----> Add quantity.
    //----> New cart-item with product id with an increase of 1 in quantity.
    const newCartItems = increaseOrDecreaseCartQuantity(
      operation,
      carts,
      productId
    );
    //----> Increase the quantity and adjust appropriate all the other state values.
    quantityAdjustmentOrRemoval(newCartItems);

    toast.success(`The cart item is increased by one!`, {
      position: "top-right",
    });
  };

  const quantityAdjustmentOrRemoval = (carts: CartItem[]) => {
    //----> Modified the cart-items.
    setCarts(carts);
    //----> Update the quantities and total-cost.
    const { sumOfCosts, sumOfQuantities } = sumOfQuantitiesAndSumOfCosts(carts);
    setQuantities(sumOfQuantities); //----> Update the quantities.
    setTotalCost(sumOfCosts); //----> Update the total-cost
    dispatch(totalCostAndQuantities({ cartItems: carts })); //----> Adjust the totalPrice and quantities.
    //----> Check for empty cart.
    if (!carts.length) {
      dispatch(clearOrder());
      dispatch(clearTotalCostAndQuantities());
      return;
    }
    //----> Reflect the change in the order.
    const orderCartTemp: OrderProduct = { customerId, cartItems: carts };
    setOrderCart(orderCartTemp); //----> Modified the cart order.
    dispatch(addOrder({ order: orderCartTemp })); //----> Replace with new order.
  };

  return (
    <div className="card d-flex flex-column">
      <div>
        <h4 className="text-center fw-bold">Order Details</h4>
      </div>
      <hr />
      {carts?.map((cart) => (
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
                  onClick={() => removeItemHandler(cart.productId)}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </span>
              <span className="stretch-link text-success mb-2 text-start">
                <FaPlus
                  size="25px"
                  onClick={() => increaseQuantityHandler(cart.productId)}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </span>
              <span className="stretch-link text-secondary text-start">
                <FaMinus
                  size="25px"
                  onClick={() => decreaseQuantityHandler(cart.productId)}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </span>
            </div>
          </div>
          <hr />
        </React.Fragment>
      ))}
      {carts.length ? (
        <>
          <span className="d-flex justify-content-between fw-bold">
            <span>{quantities > 1 ? "Quantities" : "Quantity"}</span>
            <span>{quantities}</span>
          </span>

          <span className="d-flex justify-content-between fw-bold">
            <span>Total Price</span>
            <span className="text-start">{totalCost}</span>
          </span>
          <span className="d-flex justify-content-between fw-bold">
            <span>Order By</span>
            <span className="text-start">{name}</span>
          </span>
          <hr />
          <span className="d-flex justify-content-between">
            <button
              className="btn btn-outline-secondary w-50 fw-bold"
              onClick={clearCartHandler}
              style={{ borderRadius: "20px" }}
            >
              Clear Cart
            </button>
            <button
              className="btn btn-outline-primary w-50 fw-bold"
              onClick={checkoutHandler}
              style={{ borderRadius: "20px" }}
            >
              Checkout
            </button>
          </span>
          <hr />
        </>
      ) : (
        <h4 className="text-center">
          <Link to="/products" className="stretch-link primary">
            <FaArrowLeft />
            No cart items, go back to products
            <FaArrowLeft />
          </Link>
          <hr />
        </h4>
      )}
    </div>
  );
}

export default Cart;
