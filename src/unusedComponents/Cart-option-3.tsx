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
      <div className="row row-align-start">
        {carts?.map((cart) => (
          <React.Fragment key={cart.productId}>
            <div className="col-4 align-self-auto">
              <div className="d-flex flex-column text-start">
                <span className="mb-2">Product</span>
                <span className="mb-2">Price</span>
                <span className="mb-2">Quantity</span>
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
                <span className="mb-2 text-start">
                  <FaDeleteLeft
                    className="stretch-link text-danger"
                    size="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeItemHandler(cart.productId)}
                  />
                </span>
                <span className="mb-2 text-start">
                  <FaPlus
                    className="stretch-link text-success"
                    size="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() => increaseQuantityHandler(cart.productId)}
                  />
                </span>
                <span className="mb-2 text-start">
                  <FaMinus
                    className="stretch-link text-secondary"
                    size="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() => decreaseQuantityHandler(cart.productId)}
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
          <div className="row">
            <div className="col align-self-start">
              <div className="d-flex flex-column text-start fw-bold">
                <span className="mb-2">Total Cost</span>
                <span className="mb-2">Quantities</span>
                <span className="mb-2">Order By</span>
              </div>
            </div>
            <div className="col align-self-start">
              <div className="d-flex flex-column text-end fw-bold">
                <span className="mb-2">{totalCost}</span>
                <span className="mb-2">{quantities}</span>
                <span className="mb-2">{name}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="col d-flex justify-content-between">
            <button
              className="btn btn-outline-secondary fw-bold w-50"
              onClick={clearCartHandler}
              style={{ borderRadius: "20px" }}
            >
              Clear Order
            </button>
            <button
              className="btn btn-outline-primary fw-bold w-50"
              onClick={checkoutHandler}
              style={{ borderRadius: "20px" }}
            >
              Checkout
            </button>
          </div>
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
