import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/forms/product/productForm";
import { Product } from "../../validations/productValidation";
import { useQuery } from "@tanstack/react-query";
import { productOneQuery } from "../../queries/products/productOneQuery";
import { getOneProductLoader } from "../../routerActionsAndLoaders/products/getOneProductLoader";


function EditProductView() {
  const {id} = useParams()
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof getOneProductLoader>>
  >;

  const { data } = useQuery({ ...productOneQuery(id!), initialData });

  const product = data as Product;
  console.log({ product });
  const navigate = useNavigate();

  const backToListHandler = () => {
    navigate("/list-products");
  };
  return (
    <ProductForm
      backToListHandler={backToListHandler}
      formName="Edit"
      product={product}
    />
  );
}

export default EditProductView;
