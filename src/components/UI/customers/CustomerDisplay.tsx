import { Link } from "react-router-dom";
import { Customer } from "../../../validations/customerValidation";

interface Props {
  customer: Customer;
  baseUrl: string;
}

export default function CustomerDisplay({ baseUrl, customer }: Props) {
  
  return (
    <>
      <td className="text-start">{customer.name}</td>
      <td>
        <Link
          to={`/${baseUrl}/detail/${customer?.id}`}
          className="stretch-link text-primary fw-bold m-3"
          style={{ borderRadius: "15px" }}
        >
          View
        </Link>
        <Link
          to={`/${baseUrl}/delete/${customer?.id}`}
          className="stretch-link text-danger fw-bold m-3"
          style={{ borderRadius: "15px" }}
        >
          Delete
        </Link>
        <Link
          to={`/${baseUrl}/edit/${customer?.id}`}
          className="stretch-link text-secondary fw-bold m-3"
          style={{ borderRadius: "15px" }}
        >
          Edit
        </Link>
        
      </td>
    </>
  );
}
