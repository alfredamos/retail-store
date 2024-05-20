import { Link } from "react-router-dom";
import { Customer } from "../../../validations/customerValidation";

interface Props {
  customer: Customer;
}

export default function CustomerDisplay({ customer }: Props) {
  
  return (
    <>
      <td className="text-start">{customer.name}</td>
      <td>
        <Link
          to={`/customers/detail/${customer?.id}`}
          className="stretch-link text-primary fw-bold m-3"
          style={{ borderRadius: "15px" }}
        >
          View
        </Link>
        <Link
          to={`/customers/delete/${customer?.id}`}
          className="stretch-link text-danger fw-bold m-3"
          style={{ borderRadius: "15px" }}
        >
          Delete
        </Link>
        <Link
          to={`/customers/edit/${customer?.id}`}
          className="stretch-link text-secondary fw-bold m-3"
          style={{ borderRadius: "15px" }}
        >
          Edit
        </Link>
        
      </td>
    </>
  );
}
