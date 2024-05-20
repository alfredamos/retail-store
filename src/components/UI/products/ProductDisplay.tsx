import { Product } from "../../../validations/productValidation";

interface Props {
  product: Product;
  onBackToList: () => void;
  addToCartHandler: (product: Product) => void;
  viewDetailHandler: (productId: string) => void;
  viewCartHandler: () => void;
}

export default function ProductDisplay({
  addToCartHandler,
  viewCartHandler,
  viewDetailHandler,
  product,
}: Props) {
  return (
    <div className="card card-border-primary shadow-lg h-auto text-black">
      <div className="card-header border-light">
        <h4 className="text-center text-black">{product.name}</h4>
      </div>
      <div className="card-body">
        <ul className="list-group">
          <li className="list-group item">
            <p>{product.brand}</p>
          </li>
          <li className="list-group item">
            <p>{product.price}</p>
          </li>
        </ul>
      </div>
      <div className="card-footer text-center">
        <button
          type="button"
          onClick={() => addToCartHandler(product)}
          className="btn btn-outline-secondary fw-bold w-100 font-small"
          style={{ borderRadius: "20px" }}
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => viewCartHandler()}
          className="btn btn-outline-primary fw-bold w-100 font-sm"
          style={{ borderRadius: "20px" }}
        >
          View Cart          
        </button>
        <button
          type="button"
          onClick={() => viewDetailHandler(product.id as string)}
          className="btn btn-outline-dark fw-bold w-100 font-sm"
          style={{ borderRadius: "20px" }}
        >
          Product Detail
        </button>
      </div>
    </div>
  );
}
