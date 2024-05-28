import { useLoaderData, useLocation, useNavigate} from "react-router-dom";
import ProductForm from "../../components/forms/product/productForm";
import { Product } from "../../validations/productValidation";


function EditProductView() {
  const location = useLocation();

  const baseUrl = location?.pathname?.split('/')[1];

  const product = useLoaderData() as Product;

  console.log({ product });
  const navigate = useNavigate();

  const backToListHandler = () => {
    navigate(
      `${baseUrl === "admin-products" ? "/admin-products" : "/list-products"}`
    );
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
