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
import { useAuth } from "../../hooks/auth/useAuth";

function CheckoutView() {
  const { order, name, quantities, totalCost } =
    useLoaderData() as OrderDetails; //----> Preload the cart order.
    const {currentUser: {id: userId}} = useAuth();

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
      .then((newOrder) => {
        console.log("Order created, newOrder : ", newOrder)
        toast.success(
          `The order is submitted  for payment!`
        );

        dispatch(clearTotalCostAndQuantities());
        dispatch(clearOrder())
        navigate(`/profiles/${userId}`);
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
        className="btn btn-outline-secondary fw-bold w-30 btn-sm rounded-3"
        onClick={backToCartHandler}
      >
        <FaArrowLeft size="15px" style={{ marginRight: "2px" }} />
        Cart
      </button>
      <button
        className="btn btn-outline-danger fw-bold w-30 btn-sm rounded-3"
        onClick={clearCheckOutHandler}
      >
        <FaDeleteLeft size="15px" style={{ marginRight: "2px" }} />Clear
      </button>
      <button
        className="btn btn-outline-primary fw-bold w-30 btn-sm rounded-3"
        onClick={submitOrderHandler}
      >
        Pay
        <FaArrowRight size="15px" style={{ marginLeft: "2px" }} />
      </button>
    </DisplayOrderOrCheckout>
  );
}

export default CheckoutView;
