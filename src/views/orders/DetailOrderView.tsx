import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useParams,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import DisplayOrderOrCheckout from "../../components/UI/orders/displayOrderOrCheckout";
import { deleteOrder } from "../../features/orderSlice";
import { useAuth } from "../../hooks/auth/useAuth";
import { OrderModel } from "../../models/OrderModel";
import { useGetCartItems } from "../../hooks/cartItems/useGetCartItems";
import AlerteModal from "../../utils/AlerteModal";
import { useDeleteOrderById } from "../../hooks/orders/useDeleteOrderById";

function DetailOrderView() {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const id = useParams()?.id as string;
  const dispatch = useDispatch();

  const location = useLocation();

  const baseURL = location?.pathname?.split("/")[1];

  const nextRoutePicker = baseURL === "list-orders";

  const order = useLoaderData() as OrderModel;
  const { mutateAsync } = useDeleteOrderById(id);

  const { cartItems } = useGetCartItems(order);

  const { currentUser } = useAuth();

  const backToListHandler = () => {
    navigate(-1);
  };

  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const deleteHandler = async (value: boolean) => {
    if (value) {
      mutateAsync()
        .then(() => {
          dispatch(deleteOrder({ id }));
          navigate(
            `${
              nextRoutePicker
                ? "/list-orders"
                : baseURL === "admin-orders"
                ? "/admin-orders"
                : `/profiles/${currentUser?.id}`
            }`
          );
        })
        .catch((error) => console.log(error));
    } else {
      setShowModal(!showModal);
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
        <AlerteModal
          modalButtonClose="Back"
          modalButtonSave="Delete"
          modalTitle="Delete Order Confirmation!"
          modalMessage={`Do you really want to delete this order by : ${currentUser?.name}?`}
          modalButtonHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default DetailOrderView;
