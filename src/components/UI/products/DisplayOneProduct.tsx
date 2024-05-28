import { ReactNode } from "react";
import { Product } from "../../../validations/productValidation";
import { useLocation } from "react-router-dom";

interface DisplayOneProductNewProps {
  product: Product;
  children?: ReactNode;
}

function DisplayOneProduct({
  product,
  children,
}: DisplayOneProductNewProps) {
  const location = useLocation();
  const baseURL = location?.pathname?.split('/')[1];

  const classPicker = baseURL === "list-products";

  const firstName = product.name?.split(" ")[0];
  
  return (
    <div className={`${classPicker ? "card" : "card w-50 mx-auto"}`}>
      <div className="col-md-10 offset-md-1">
        <h4 className="text-center text-success">{firstName}'s Details</h4>
        <hr />
        <article className="d-flex justify-content-between">
          <span>{firstName}</span>
          <span>
            Photo <img src="" alt="" />
          </span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Name</span>
          <span>{product.name}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Brand</span>
          <span>{product.brand}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Price</span>
          <span>{product.price}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>{product.quantity > 1 ? "Quantities" : "Quantity"}</span>
          <span>{product.quantity}</span>
        </article>
        <hr />
        <article className="d-flex justify-content-between">
          <span>Description</span>
          <span>{product.description}</span>
        </article>
        <hr />
        <div className="d-flex justify-content-between">{children}</div>
        <hr />
      </div>
    </div>
  );
}

export default DisplayOneProduct;
