import { useLoaderData, useNavigate } from "react-router-dom";
import { OrderDetails } from "./CartView";
import { useDispatch } from "react-redux";
import {
  clearOrder,
  clearTotalCostAndQuantities,
} from "../../features/orderSlice";
import { useAddOrder } from "../../hooks/orders/useCreateOrder";
import { toast } from "react-toastify";
import { FaArrowLeft, FaDeleteLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import DisplayOrderOrCheckout from "../../components/UI/orders/displayOrderOrCheckout";

function CheckoutView() {
  const { order, name, quantities, totalCost } =
    useLoaderData() as OrderDetails; //----> Preload the cart order.

  const { mutateAsync } = useAddOrder();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clearCheckOutHandler = () => {
    toast.success("The checkout has been cleared!");
    console.log("Clear-checkout clicked!");
    dispatch(clearOrder());
    dispatch(clearTotalCostAndQuantities());
    navigate("/products");
  };

  const submitOrderHandler = () => {
    console.log("At point 1, orderToCreate : ", order);
    console.log("submit-order clicked!");
    mutateAsync(order)
      .then(() => {
        toast.success(
          `The order is submitted  for payment!`
        );
        //dispatch(clearTotalCostAndQuantities());
        //navigate("/products");
      })
      .catch((error) => console.log(error));
  };

  const backToCartHandler = () => {
    navigate("/cart");
  };

  return (
    <DisplayOrderOrCheckout
      orderOrCheckoutName="Checkout"
      cartItems={order?.cartItems}
      orderBy={name}
      quantities={quantities}
      totalPrice={totalCost}
    >
      <button
        className="btn btn-outline-secondary fw-bold w-100"
        style={{ alignSelf: "center", borderRadius: "20px" }}
        onClick={backToCartHandler}
      >
        <FaArrowLeft size="20px" style={{ marginRight: "10px" }} />
        Cart
      </button>
      <button
        className="btn btn-outline-danger fw-bold w-100"
        style={{ alignSelf: "center", borderRadius: "20px" }}
        onClick={clearCheckOutHandler}
      >
        <FaDeleteLeft size="20px" style={{ marginRight: "10px" }} /> Clear Order
      </button>
      <button
        className="btn btn-outline-primary fw-bold w-100"
        style={{ alignSelf: "center", borderRadius: "20px" }}
        onClick={submitOrderHandler}
      >
        Payment
        <FaArrowRight size="20px" style={{ marginLeft: "10px" }} />
      </button>
    </DisplayOrderOrCheckout>
  );
}

export default CheckoutView;
