import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "../../components/forms/product/productForm";
import { Product } from "../../validations/productValidation";

const initialProduct: Product = {
  name: "",
  brand: "",
  description: "",
  image: "",
  quantity: 0,
  price: 0,

}

function CreateProductView() {
  const navigate = useNavigate();
  const location = useLocation();

  const baseUrl = location?.pathname?.split('/')[1];
  
  const backToListHandler = () => {
    navigate(
      `${baseUrl === "admin-products" ? "/admin-products" : "/list-products"}`
    );
  }
  return (
    <ProductForm
      backToListHandler={backToListHandler}
      formName="Create"
      product={initialProduct}
    />
  );
}

export default CreateProductView