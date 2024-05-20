import { useLoaderData, useNavigate } from "react-router-dom";
import { OrderProduct } from "../models/OrderProduct";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addOrder,
  clearOrder,
  clearTotalCostAndQuantities,
  totalCostAndQuantities,
} from "../features/orderSlice";
import { Link } from "react-router-dom";
import { CartItem } from "../validations/cartItemValidation";
import { FaPlus, FaMinus, FaDeleteLeft } from "react-icons/fa6";
import { increaseOrDecreaseCartQuantity } from "../components/components-utils/increaseOrDecreaseCartQuantity";
import { sumOfQuantitiesAndSumOfCosts } from "../components/components-utils/sumOfQuantitiesAndSumOfCosts";
import {FaArrowLeft} from "react-icons/fa6"
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

    toast.success(
      `The cart has been cleared successfully!`,
      {
        position: "top-right",
      }
    );

    navigate("/products");
  };

  const checkoutHandler = () => {
    console.log("Checkout is successfully!");
    dispatch(totalCostAndQuantities({ cartItems: carts })); //----> Adjust the totalPrice and quantities.

    toast.success(
      `The checkout is successful!`,
      {
        position: "top-right",
      }
    );

    navigate("/checkout");
  };

  const removeItemHandler = (productId: string) => {
    dispatch(clearOrder()); //----> clear the old order
    console.log("Order is removed!");
    //----> Filter out the cart-item to be removed.
    const filteredCartItems = carts?.filter(
      (cart) => cart.productId !== productId
    );
    toast.success(
      `The cart item has been removed successfully!`,
      {
        position: "top-right",
      }
    );
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

    toast.success(
      `The cart item is decreased by one!`,
      {
        position: "top-right",
      }
    );
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
    <div className="card">
      <div className="row mb-2">
        <h4 className="text-center fw-bold">Order Details</h4>
      </div>
      <div className="row">
        <hr />
      </div>
      <div className="row">
        <div className="col col-md-8">
          <div className="card-body text-start">
            {carts?.length ? (
              <>
                <article className="fw-bold">Name: </article>
                <article className="fw-bold">Quantities : </article>
                <article className="fw-bold">Total Cost: </article>
                <div className="mt-2">
                  {carts?.map((cart, index) => (
                    <React.Fragment key={index}>
                      <hr />
                      <div className="d-flex flex-column mb-2">
                        <article className="d-flex justify-content-between">
                          <span>Product : </span>
                          <span>
                            <FaDeleteLeft
                              className="stretch-link text-danger text-start"
                              onClick={() => removeItemHandler(cart.productId)}
                              style={{ cursor: "pointer" }}
                            />
                          </span>
                        </article>
                        <article className="d-flex justify-content-between">
                          <span>Unit Price : </span>
                          <span>
                            <FaPlus
                              className="stretch-link text-secondary text-start"
                              onClick={() =>
                                increaseQuantityHandler(cart.productId)
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </span>
                        </article>
                        <article className="d-flex justify-content-between">
                          <span>Quantity : </span>
                          <span>
                            <FaMinus
                              className="stretch-link text-dark"
                              onClick={() =>
                                decreaseQuantityHandler(cart.productId)
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </span>
                        </article>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div>
                  <span className="d-flex justify-content-between fw-bold">
                    <span>Quantities</span>
                    <span>{quantities}</span>
                  </span>

                  <span className="d-flex justify-content-between fw-bold">
                    <span>Total Price</span>
                    <span>{totalCost}</span>
                  </span>
                  <span className="d-flex justify-content-between fw-bold">
                    <span>Order By</span>
                    <span>{name}</span>
                  </span>
                </div>
              </>
            ) : (
              <h4 className="text-end">
                <Link to="/products" className="stretch-link primary">
                  <FaArrowLeft />
                  No cart items, go back to products
                  <FaArrowLeft />
                </Link>
              </h4>
            )}
          </div>
        </div>
        <div className="col col-md-4">
          <div className="card-body text-start">
            {carts?.length ? (
              <>
                <article className="fw-bold">{name}</article>
                <article className="fw-bold">{quantities}</article>
                <article className="fw-bold">=N={totalCost}</article>
                <div className="mt-2">
                  {carts?.map((cartItem) => (
                    <React.Fragment key={cartItem.productId}>
                      <hr />
                      <div className="d-flex flex-column mb-2">
                        <article>{cartItem.name} </article>
                        <article>{cartItem.price}</article>
                        <article>{cartItem.quantity}</article>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {carts?.length ? (
        <>
          <div className="row">
            <hr />
          </div>
          <div className="row mb-2">
            <div className="col col-6">
              <button
                className="btn btn-outline-secondary w-100 fw-bold"
                onClick={clearCartHandler}
                style={{ borderRadius: "20px" }}
              >
                Clear Order
              </button>
            </div>
            <div className="col col-6 w100">
              <button
                className="btn btn-outline-primary w-100 fw-bold"
                onClick={checkoutHandler}
                style={{ borderRadius: "20px" }}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="row">
        <hr />
      </div>
    </div>
  );
}

export default Cart;
