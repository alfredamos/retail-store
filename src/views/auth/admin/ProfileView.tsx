import { Link, useLoaderData, useNavigate} from "react-router-dom";
import { useState } from "react";
import DisplayOrderList from "../../../components/UI/orders/DisplayOrderList";
import { OrderModel } from "../../../models/OrderModel";
import { orderService } from "../../../APIRoutes/orderRoute";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../../features/orderSlice";
import AlerteModal from "../../../utils/AlerteModal";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useDeleteAllOrdersByUserId } from "../../../hooks/orders/useDeleteAllOrdersByUserId";

function ProfileView() {
  const orders = useLoaderData() as OrderModel[];

  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {currentUser: {id: userId}} = useAuth();

  const { mutateAsync } = useDeleteAllOrdersByUserId(userId);

  const backToProductsHandler = () => {
    navigate("/");
  };

  const deleteClickHandler = (id: string) => {
    setOrderId(id);
    setShowModal(true);
  };

  const deleteHandler = async (value: boolean) => {
    if (value) {
      console.log({ orderId });
      dispatch(deleteOrder({ id: orderId }));
      await orderService.remove(orderId);
      setShowModal(!showModal);
    } else {
      setShowModal(!showModal);
    }
  };

  const viewHandler = async (id: string) => {
    console.log(id);
    navigate(`/orders/detail/${id}`);
  };

  const deleteAllOrdersHandler = () => {
    mutateAsync()
      .then(() => {
        console.log("I have deleted all orders!!!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="row">
      <div className="col-12 col-sm-12 col-container">
        <div className="row">
          {orders?.length > 0 ? (
            orders?.map((order) => (
              <div className="col-4" key={order.id}>
                <DisplayOrderList
                  order={order}
                  onDelete={deleteClickHandler}
                  onView={viewHandler}
                />
              </div>
            ))
          ) : (
            <div className="col-10 mx-auto">
              <div className="card" style={{ margin: "auto" }}>
                <hr />
                <h4 className="text-start">
                  <Link to="/products" className="stretch-link primary">
                    <FaArrowLeft
                      size="15px"
                      style={{ marginRight: "5px", alignSelf: "center" }}
                    />
                    You don't have any available order, go back to products to
                    make others!
                  </Link>
                  <hr />
                </h4>
              </div>
            </div>
          )}
        </div>
        {orders?.length > 0 && (
          <div className="d-flex justify-content-between bg-white p-3 rounded-3">
            <button
              className="btn btn-outline-primary w-50 rounded-5 btn-lg fw-bold"
              onClick={backToProductsHandler}
            >
              To Products
            </button>
            <button
              className="btn btn-outline-danger w-50 rounded-5 btn-lg fw-bold"
              onClick={deleteAllOrdersHandler}
            >
              Clear Orders
            </button>
          </div>
        )}
        {showModal && (
          <AlerteModal
            modalButtonClose="Back"
            modalButtonSave="Delete"
            modalTitle="Delete Order Confirmation!"
            modalMessage={"Do you really want to delete this order!"}
            modalButtonHandler={deleteHandler}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileView;
