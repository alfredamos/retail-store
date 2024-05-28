import { Link } from "react-router-dom";
import { Product } from "../../../validations/productValidation";

interface Props {
  product: Product;
  baseUrl: string;
}

export default function DisplayProductRow({ baseUrl, product }: Props) {
  return (
    <>
      <td className="text-start">{product.name}</td>
      <td>
        <Link
          to={`/${baseUrl}/view/${product?.id}`}
          className="stretch-link text-primary fw-bold m-3"
        >
          View
        </Link>
        <Link
          to={`/${baseUrl}/delete/${product?.id}`}
          className="stretch-link text-danger fw-bold m-3"
        >
          Delete
        </Link>
        <Link
          to={`/${baseUrl}/edit/${product?.id}`}
          className="stretch-link text-secondary fw-bold m-3"
        >
          Edit
        </Link>
      </td>
    </>
  );
}
