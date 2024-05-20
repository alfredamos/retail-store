import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import { orderService } from "../../APIRoutes/orderRoute";
import DisplayOrderOrCheckout from "../../components/UI/orders/displayOrderOrCheckout";
import { deleteOrder } from "../../features/orderSlice";
import { useAuth } from "../../hooks/auth/useAuth";
import { OrderModel } from "../../models/orderModel";
import { orderOneQuery } from "../../queries/orders/orderOneQuery";
import { getOneOrderLoader } from "../../routerActionsAndLoaders/orders/getOneOrderLoader";
import DeleteModal from "../../utils/DeleteModal";
import { useGetCartItems } from "../../hooks/cartItems/useGetCartItems";

function DeleteOrderView() {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof getOneOrderLoader>>
  >;
  const { data } = useQuery({ ...orderOneQuery(id as string), initialData });

  const order = data as OrderModel;
  
  const { cartItems } = useGetCartItems(order);
  console.log("In detail-order-view", { order, cartItems });

  const { currentUser } = useAuth();

  const backToListHandler = () => {
    navigate("/list-orders");
  };

  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const deleteHandler = async (value: boolean) => {
    console.log({ value });
    if (value) {
      if (id) {
        dispatch(deleteOrder({ id }));
        await orderService.remove(id);
      }
      navigate("/list-orders");
    } else {
      navigate("/list-orders");
    }
  };

  return (
    <>
      <DisplayOrderOrCheckout
        orderOrCheckoutName="Order"
        cartItems={cartItems}
        orderBy={currentUser?.name}
        quantities={order?.totalQuantity}
        totalPrice={order?.totalPrice}
      >
        <button
          type="button"
          className="btn btn-outline-secondary w-50 fw-bold"
          style={{ borderRadius: "20px" }}
          onClick={backToListHandler}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-outline-danger w-50 fw-bold"
          style={{ borderRadius: "20px" }}
          onClick={deleteClickHandler}
        >
          Delete
        </button>
      </DisplayOrderOrCheckout>
      {showModal && (
        <DeleteModal
          deleteTitle="Delete OrderModel Confirmation!"
          deleteMessage={`Do you really want to delete this order by : ${currentUser?.name}?`}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default DeleteOrderView