import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { OrderProduct } from "../../models/OrderProduct";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearOrder,
  clearTotalCostAndQuantities,
  totalCostAndQuantities,
} from "../../features/orderSlice";
import { CartItem } from "../../validations/cartItemValidation";
import { increaseOrDecreaseCartQuantity } from "../../components/components-utils/increaseOrDecreaseCartQuantity";
import { toast } from "react-toastify";
import CartDisplay from "../../components/UI/cartItems/cartDisplay";
import { FaArrowLeft } from "react-icons/fa";
import { quantityAdjustmentOrRemoval } from "../../components/components-utils/increaseOrRemoveQuantity";

export type OrderDetails = {
  customerId: string;
  name: string;
  order: OrderProduct;
  quantities: number;
  totalCost: number;
};

function CartView() {
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

    toast.success(`The cart-items are sent out to cart successful!`, {
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
    //quantityAdjustmentOrRemoval(filteredCartItems);
    quantityAdjustmentOrRemoval(
      filteredCartItems,
      dispatch,
      customerId,
      setCarts,
      setQuantities,
      setTotalCost,
      setOrderCart
    );
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
    quantityAdjustmentOrRemoval(
      newCartItems,
      dispatch,
      customerId,
      setCarts,
      setQuantities,
      setTotalCost,
      setOrderCart
    );

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
    quantityAdjustmentOrRemoval(
      newCartItems,
      dispatch,
      customerId,
      setCarts,
      setQuantities,
      setTotalCost,
      setOrderCart
    );

    toast.success(`The cart item is increased by one!`, {
      position: "top-right",
    });
  };

  const noCartItems = (
    <h4 className="text-center">
      <Link to="/products" className="stretch-link primary">
        <FaArrowLeft />
        No cart items, go back to products
        <FaArrowLeft />
      </Link>
      <hr />
    </h4>
  );

  return (
    <CartDisplay
      carts={carts}
      name={name}
      quantities={quantities}
      totalCost={totalCost}
      onDecreaseQuantity={decreaseQuantityHandler}
      onIncreaseQuantity={increaseQuantityHandler}
      onRemoveItem={removeItemHandler}
      noCartItems={noCartItems}
    >
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
    </CartDisplay>
  );
}

export default CartView;
