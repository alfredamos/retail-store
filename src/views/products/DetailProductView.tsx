import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../features/productSlice";
import { useState } from "react";
import DeleteModal from "../../utils/DeleteModal";
import { Product } from "../../validations/productValidation";
import DisplayOneProduct from "../../components/UI/products/DisplayOneProduct";
import { useDeleteOrderById } from "../../hooks/orders/useDeleteOrderById";

function DetailProductView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useParams()?.id as string;

  const [showModal, setShowModal] = useState(false);

  const product = useLoaderData() as Product;
  const { mutateAsync } = useDeleteOrderById(id);

  const backToList = () => {
    navigate(-1);
  };

  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const deleteHandler = async (value: boolean) => {
    console.log({ value });
    if (value) {
      mutateAsync()
        .then(() => {
          dispatch(deleteProduct({ id }));

          navigate("/list-products");
        })
        .catch((error) => console.log(error));
    } else {
      navigate(-1);
    }
  };
  return (
    <>
      <DisplayOneProduct product={product}>
        <button
          type="button"
          className="btn btn-outline-secondary w-50 fw-bold"
          style={{ borderRadius: "20px" }}
          onClick={backToList}
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
      </DisplayOneProduct>
      {showModal && (
        <DeleteModal
          deleteTitle="Delete Product Confirmation!"
          deleteMessage={`Do you really want to delete this product : ${product?.name}?`}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default DetailProductView;
