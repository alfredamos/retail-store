import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../features/productSlice";
import { productService } from "../../APIRoutes/productRoute";
import { useState } from "react";
import DeleteModal from "../../utils/DeleteModal";
import { Product } from "../../validations/productValidation";
import { getOneProductLoader } from "../../routerActionsAndLoaders/products/getOneProductLoader";
import { useQuery } from "@tanstack/react-query";
import { productOneQuery } from "../../queries/products/productOneQuery";
import DisplayOneProduct from "../../components/UI/products/DisplayOneProduct";

function Delete() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof getOneProductLoader>>
  >;
  const { data } = useQuery({ ...productOneQuery(id!), initialData });

  const backToList = () => {
    navigate("/list-products");
  };

  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const deleteHandler = async (value: boolean) => {
    console.log({ value });
    if (value) {
      if (id) {
        dispatch(deleteProduct({ id }));
        await productService.remove(id);
      }
      navigate("/list-products");
    } else {
      navigate("/list-products");
    }
  };
  return (
    <>
      <DisplayOneProduct product={data as Product}>
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
          deleteMessage={`Do you really want to delete this product : ${
            (data as Product)?.name
          }?`}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default Delete;
