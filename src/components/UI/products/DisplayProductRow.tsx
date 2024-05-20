import { Link } from "react-router-dom";
import { Product } from "../../../validations/productValidation";

interface Props {
  product: Product;
}

export default function DisplayProductRow({ product }: Props) {
  return (
    <>
      <td className="text-start">{product.name}</td>
      <td>
        <Link
          to={`/list-products/view/${product?.id}`}
          className="stretch-link text-primary fw-bold m-3"
        >
          View
        </Link>
        <Link
          to={`/list-products/delete/${product?.id}`}
          className="stretch-link text-danger fw-bold m-3"
        >
          Delete
        </Link>
        <Link
          to={`/list-products/edit/${product?.id}`}
          className="stretch-link text-secondary fw-bold m-3"
        >
          Edit
        </Link>
      </td>
    </>
  );
}
