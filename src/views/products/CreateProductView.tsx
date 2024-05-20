import { useNavigate } from "react-router-dom";
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
  
  const backToListHandler = () => {
    navigate("/list-products");
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