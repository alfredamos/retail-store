import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getOneOrderLoader } from "../../routerActionsAndLoaders/orders/getOneOrderLoader";
import { useQuery } from "@tanstack/react-query";
import { orderOneQuery } from "../../queries/orders/orderOneQuery";
import { useAuth } from "../../hooks/auth/useAuth";
import { OrderModel } from "../../models/OrderModel";
import DisplayOrderOrCheckout from "../../components/UI/orders/displayOrderOrCheckout";
import { useState } from "react";
import DeleteModal from "../../utils/DeleteModal";
import { deleteOrder } from "../../features/orderSlice";
import { orderService } from "../../APIRoutes/orderRoute";
import {useDispatch} from "react-redux"
import { useGetCartItems } from "../../hooks/cartItems/useGetCartItems";

function DetailOrderView() {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const  id  = useParams().id as string; 
  const dispatch = useDispatch(); 
  
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof getOneOrderLoader>>
  >;  
  const { data} = useQuery({ ...orderOneQuery(id), initialData });

  console.log("data = " ,data)

  const {cartItems} = useGetCartItems(data as OrderModel);
  
  console.log("In detail-order-view cart-items = ", cartItems );

  const { currentUser } = useAuth();

  const backToListHandler = () => {
    navigate("/list-orders")
  }

  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const deleteHandler = async (value: boolean) => {
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
        quantities={(data as OrderModel)?.totalQuantity}
        totalPrice={(data as OrderModel)?.totalPrice}
      >
        <button
          type="button"
          className="btn btn-outline-secondary w-50 fw-bold rounded-5"
          onClick={backToListHandler}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-outline-danger w-50 fw-bold rounded-5"
          onClick={deleteClickHandler}
        >
          Delete
        </button>
      </DisplayOrderOrCheckout>
      {showModal && (
        <DeleteModal
          deleteTitle="Delete Order Confirmation!"
          deleteMessage={`Do you really want to delete this order by : ${
           currentUser?.name
          }?`}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default DetailOrderView;
